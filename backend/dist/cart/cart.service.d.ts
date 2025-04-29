import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
export declare class CartService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createCart(userId: number, dto: CreateCartDto): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        productId: number;
        quantity: number;
    }>;
    getCart(userId: number): Promise<({
        product: {
            name: string;
            id: number;
            createdAt: Date;
            userId: number;
            image: string | null;
            description: string | null;
            price: number;
            stock: number;
            category: string;
            updatedAt: Date;
        };
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        productId: number;
        quantity: number;
    })[]>;
    deleteCart(userId: number, cartId: number): Promise<{
        message: string;
    }>;
}
