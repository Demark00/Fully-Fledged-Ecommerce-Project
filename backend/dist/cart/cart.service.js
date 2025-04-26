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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CartService = class CartService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createCart(userId, dto) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id: dto.productId },
            });
            if (!product) {
                throw new common_1.NotFoundException('Product not found');
            }
            const cartItem = await this.prisma.cart.create({
                data: {
                    userId,
                    productId: dto.productId,
                    quantity: dto.quantity,
                },
            });
            return cartItem;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to add product to cart');
        }
    }
    async getCart(userId) {
        try {
            const cartItems = await this.prisma.cart.findMany({
                where: { userId },
                include: {
                    product: true,
                },
            });
            return cartItems;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch cart');
        }
    }
    async deleteCart(userId, cartId) {
        try {
            const cartItem = await this.prisma.cart.findUnique({
                where: { id: cartId },
            });
            if (!cartItem) {
                throw new common_1.NotFoundException('Cart item not found');
            }
            if (cartItem.userId !== userId) {
                throw new common_1.ForbiddenException('You are not allowed to delete this cart item');
            }
            await this.prisma.cart.delete({
                where: { id: cartId },
            });
            return { message: 'Cart item deleted successfully' };
        }
        catch (error) {
            console.error('Error deleting cart item:', error);
            throw new common_1.InternalServerErrorException('Failed to delete cart item');
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map