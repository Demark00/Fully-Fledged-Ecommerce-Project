import { Injectable, NotFoundException, InternalServerErrorException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async createCart(userId: number, dto: CreateCartDto) {
    try {
      // Check if the product exists
      const product = await this.prisma.product.findUnique({
        where: { id: dto.productId },
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      // Add the product to the user's cart
      const cartItem = await this.prisma.cart.create({
        data: {
          userId,
          productId: dto.productId,
          quantity: dto.quantity,
        },
      });

      return cartItem;
    } catch (error) {
      throw new InternalServerErrorException('Failed to add product to cart');
    }
  }

  async getCart(userId: number) {
    try {
      // Fetch all cart items for the user
      const cartItems = await this.prisma.cart.findMany({
        where: { userId },
        include: {
          product: true, // Include product details
        },
      });

      return cartItems;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch cart');
    }
  }

  async deleteCart(userId: number, cartId: number) {
    try {
      // Check if the cart item exists and belongs to the user
      const cartItem = await this.prisma.cart.findUnique({
        where: { id: cartId },
      });

      if (!cartItem) {
        throw new NotFoundException('Cart item not found');
      }

      if (cartItem.userId !== userId) {
        throw new ForbiddenException('You are not allowed to delete this cart item');
      }

      // Delete the cart item
      await this.prisma.cart.delete({
        where: { id: cartId },
      });

      return { message: 'Cart item deleted successfully' };
    } catch (error) {
      console.error('Error deleting cart item:', error);
      throw new InternalServerErrorException('Failed to delete cart item');
    }
  }
}