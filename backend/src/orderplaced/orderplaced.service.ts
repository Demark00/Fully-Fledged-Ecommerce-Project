import { Injectable, NotFoundException, InternalServerErrorException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderPlacedDto } from './dto/orderplaced.dto';

@Injectable()
export class OrderPlacedService {
    constructor(private readonly prisma: PrismaService) { }

    async createOrder(userId: number, dto: OrderPlacedDto) {
        try {
            // Check if the product exists
            const product = await this.prisma.product.findUnique({
                where: { id: dto.productId },
            });

            if (!product) {
                throw new NotFoundException('Product not found');
            }

            // Create the order
            const order = await this.prisma.orderPlaced.create({
                data: {
                    userId,
                    productId: dto.productId,
                    quantity: dto.quantity,
                    totalPrice: dto.totalPrice,
                    status: dto.status,
                },
            });

            return order;
        } catch (error) {
            throw new InternalServerErrorException('Failed to create order');
        }
    }

    async createMultipleOrders(userId: number) {
        try {
            // Fetch all cart items for the user
            const cartItems = await this.prisma.cart.findMany({
                where: { userId },
                include: {
                    product: true, // Include product details
                },
            });

            if (cartItems.length === 0) {
                throw new NotFoundException('No items in the cart to place orders');
            }

            // Create orders for all cart items
            const orders = await this.prisma.$transaction(
                cartItems.map((cartItem) =>
                    this.prisma.orderPlaced.create({
                        data: {
                            userId,
                            productId: cartItem.productId,
                            quantity: cartItem.quantity,
                            totalPrice: cartItem.quantity * cartItem.product.price,
                            status: 'ACCEPTED',
                        },
                    }),
                ),
            );

            // Clear the cart after placing orders
            await this.prisma.cart.deleteMany({
                where: { userId },
            });

            return orders;
        } catch (error) {
            throw new InternalServerErrorException('Failed to create multiple orders');
        }
    }

    async getOrders(userId: number) {
        try {
            // Fetch all orders for the user
            const orders = await this.prisma.orderPlaced.findMany({
                where: { userId },
                include: {
                    product: true, // Include product details
                },
            });

            return orders;
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch orders');
        }
    }

    async deleteOrder(userId: number, orderId: number) {
        try {
            // Check if the order exists and belongs to the user
            const order = await this.prisma.orderPlaced.findUnique({
                where: { id: orderId },
            });

            if (!order) {
                throw new NotFoundException('Order not found');
            }

            if (order.userId !== userId) {
                throw new ForbiddenException('You are not allowed to delete this order');
            }

            // Delete the order
            await this.prisma.orderPlaced.delete({
                where: { id: orderId },
            });

            return { message: 'Order deleted successfully' };
        } catch (error) {
            throw new InternalServerErrorException('Failed to delete order');
        }
    }
}