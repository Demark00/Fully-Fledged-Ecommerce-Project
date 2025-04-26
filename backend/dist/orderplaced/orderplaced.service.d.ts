import { PrismaService } from 'src/prisma/prisma.service';
import { OrderPlacedDto } from './dto/orderplaced.dto';
export declare class OrderPlacedService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createOrder(userId: number, dto: OrderPlacedDto): Promise<{
        id: number;
        userId: number;
        productId: number;
        quantity: number;
        totalPrice: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
    createMultipleOrders(userId: number): Promise<{
        id: number;
        userId: number;
        productId: number;
        quantity: number;
        totalPrice: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
    }[]>;
    getOrders(userId: number): Promise<({
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
        totalPrice: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
    })[]>;
    deleteOrder(userId: number, orderId: number): Promise<{
        message: string;
    }>;
}
