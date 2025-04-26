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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let ProductService = class ProductService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllProducts() {
        try {
            return await this.prisma.product.findMany();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch products');
        }
    }
    async getProductById(id) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id },
            });
            if (!product) {
                throw new common_1.NotFoundException('Product not found');
            }
            return product;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch product');
        }
    }
    async createProduct(userId, dto) {
        try {
            const product = await this.prisma.product.create({
                data: {
                    user: { connect: { id: userId } },
                    name: dto.name,
                    description: dto.description,
                    price: dto.price,
                    stock: dto.stock,
                    image: dto.image,
                    category: dto.category
                },
            });
            return product;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                throw new common_1.ForbiddenException('Invalid user');
            }
            throw new common_1.InternalServerErrorException('Failed to create product');
        }
    }
    async editProduct(userId, id, dto) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id },
            });
            if (!product) {
                throw new common_1.NotFoundException('Product not found');
            }
            if (product.userId !== userId) {
                throw new common_1.ForbiddenException('You are not allowed to edit this product');
            }
            const updatedProduct = await this.prisma.product.update({
                where: { id },
                data: {
                    name: dto.name,
                    description: dto.description,
                    price: dto.price,
                    stock: dto.stock,
                    image: dto.image,
                    category: dto.category,
                },
            });
            return updatedProduct;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to update product');
        }
    }
    async deleteProduct(userId, id) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id },
            });
            if (!product) {
                throw new common_1.NotFoundException('Product not found');
            }
            if (product.userId !== userId) {
                throw new common_1.ForbiddenException('You are not allowed to delete this product');
            }
            await this.prisma.product.delete({
                where: { id },
            });
            return { message: 'Product deleted successfully' };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to delete product');
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map