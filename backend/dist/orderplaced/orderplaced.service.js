"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderPlacedService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrderPlacedService = class OrderPlacedService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrder(userId, dto) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id: dto.productId },
            });
            if (!product) {
                throw new common_1.NotFoundException('Product not found');
            }
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
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to create order');
        }
    }
    async createMultipleOrders(userId) {
        try {
            const cartItems = await this.prisma.cart.findMany({
                where: { userId },
                include: {
                    product: true,
                },
            });
            if (cartItems.length === 0) {
                throw new common_1.NotFoundException('No items in the cart to place orders');
            }
            const orders = await this.prisma.$transaction(cartItems.map((cartItem) => this.prisma.orderPlaced.create({
                data: {
                    userId,
                    productId: cartItem.productId,
                    quantity: cartItem.quantity,
                    totalPrice: cartItem.quantity * cartItem.product.price,
                    status: 'ACCEPTED',
                },
            })));
            await this.prisma.cart.deleteMany({
                where: { userId },
            });
            return orders;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to create multiple orders');
        }
    }
    async getOrders(userId) {
        try {
            const orders = await this.prisma.orderPlaced.findMany({
                where: { userId },
                include: {
                    product: true,
                },
            });
            return orders;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch orders');
        }
    }
    async deleteOrder(userId, orderId) {
        try {
            const order = await this.prisma.orderPlaced.findUnique({
                where: { id: orderId },
            });
            if (!order) {
                throw new common_1.NotFoundException('Order not found');
            }
            if (order.userId !== userId) {
                throw new common_1.ForbiddenException('You are not allowed to delete this order');
            }
            await this.prisma.orderPlaced.delete({
                where: { id: orderId },
            });
            return { message: 'Order deleted successfully' };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to delete order');
        }
    }
};
exports.OrderPlacedService = OrderPlacedService;
exports.OrderPlacedService = OrderPlacedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderPlacedService);
//# sourceMappingURL=orderplaced.service.js.map