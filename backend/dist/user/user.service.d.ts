import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    editUser(userId: number, dto: EditUserDto): Promise<{
        updatedUser: {
            email: string;
            name: string | null;
            createdAt: Date;
        };
        message: string;
    }>;
}
