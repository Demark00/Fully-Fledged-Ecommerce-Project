import { User } from '@prisma/client';
import { UserService } from './user.service';
import { EditUserDto } from './dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getMe(user: User): {
        id: number;
        email: string;
        name: string | null;
        password: string;
        isActive: boolean;
        createdAt: Date;
    };
    editUser(userId: number, dto: EditUserDto): Promise<{
        updatedUser: {
            email: string;
            name: string | null;
            createdAt: Date;
        };
        message: string;
    }>;
}
