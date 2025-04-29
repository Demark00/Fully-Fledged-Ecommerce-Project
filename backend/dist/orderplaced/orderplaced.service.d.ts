import { PrismaService } from 'src/prisma/prisma.service';
import { OrderPlacedDto } from './dto/orderplaced.dto';
export declare class OrderPlacedService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createOrder(userId: number, dto: OrderPlacedDto): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        productId: number;
        quantity: number;
        totalPrice: number;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
    createMultipleOrders(userId: number): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        productId: number;
        quantity: number;
        totalPrice: number;
        status: import(".prisma/client").$Enums.OrderStatus;
    }[]>;
    getOrders(userId: number): Promise<({
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
        totalPrice: number;
        status: import(".prisma/client").$Enums.OrderStatus;
    })[]>;
    deleteOrder(userId: number, orderId: number): Promise<{
        message: string;
    }>;
}
