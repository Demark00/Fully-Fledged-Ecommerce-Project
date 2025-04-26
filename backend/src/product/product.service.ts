import { Injectable, NotFoundException, InternalServerErrorException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { EditProductDto } from './dto/edit-product.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async getAllProducts() {
        try {
            return await this.prisma.product.findMany();
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch products');
        }
    }

    async getProductById(id: number) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id },
            });

            if (!product) {
                throw new NotFoundException('Product not found');
            }

            return product;
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch product');
        }
    }

    async createProduct(userId: number, dto: CreateProductDto) {
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
        } catch (error) {
          if (error instanceof PrismaClientKnownRequestError) {
            // For example: userId does not exist
            throw new ForbiddenException('Invalid user');
          }
          throw new InternalServerErrorException('Failed to create product');
        }
      }

    async editProduct(userId: number, id: number, dto: EditProductDto) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id },
            });

            if (!product) {
                throw new NotFoundException('Product not found');
            }

            // Ensure the product belongs to the current user
            if (product.userId !== userId) {
                throw new ForbiddenException('You are not allowed to edit this product');
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
        } catch (error) {
            throw new InternalServerErrorException('Failed to update product');
        }
    }

    async deleteProduct(userId: number, id: number) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id },
            });

            if (!product) {
                throw new NotFoundException('Product not found');
            }

            // Ensure the product belongs to the current user
            if (product.userId !== userId) {
                throw new ForbiddenException('You are not allowed to delete this product');
            }

            await this.prisma.product.delete({
                where: { id },
            });

            return { message: 'Product deleted successfully' };
        } catch (error) {
            throw new InternalServerErrorException('Failed to delete product');
        }
    }
}