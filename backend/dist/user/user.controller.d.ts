import { User } from '@prisma/client';
import { UserService } from './user.service';
import { EditUserDto } from './dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getMe(user: User): {
        email: string;
        password: string;
        name: string | null;
        id: number;
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
