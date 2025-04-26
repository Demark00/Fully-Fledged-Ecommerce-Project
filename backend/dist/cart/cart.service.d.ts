import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
export declare class CartService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createCart(userId: number, dto: CreateCartDto): Promise<{
        id: number;
        userId: number;
        productId: number;
        quantity: number;
        createdAt: Date;
    }>;
    getCart(userId: number): Promise<({
        product: {
            id: number;
            userId: number;
            createdAt: Date;
            name: string;
            description: string | null;
            price: number;
            image: string | null;
            category: string;
            stock: number;
            updatedAt: Date;
        };
    } & {
        id: number;
        userId: number;
        productId: number;
        quantity: number;
        createdAt: Date;
    })[]>;
    deleteCart(userId: number, cartId: number): Promise<{
        message: string;
    }>;
}
