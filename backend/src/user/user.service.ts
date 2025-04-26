import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';
import * as argon from "argon2";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async editUser(userId: number, dto: EditUserDto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                throw new ForbiddenException('User not found');
            }

            const updateData: any = {};

            if (dto.name) updateData.name = dto.name;
            if (dto.email) updateData.email = dto.email;

            // Handle password change
            if (dto.currentPassword && dto.newPassword) {
                const passwordMatch = await argon.verify(user.password, dto.currentPassword);

                if (!passwordMatch) {
                    throw new ForbiddenException('Incorrect current password');
                }

                updateData.password = await argon.hash(dto.newPassword);
            }

            const updatedUser = await this.prisma.user.update({
                where: { id: userId },
                data: updateData,
                select: {
                    name: true,
                    email: true,
                    createdAt: true,
                },
            });

            return {updatedUser: updatedUser , message:"User Updated Successfully"};
        } catch (error) {
            throw new InternalServerErrorException('Failed to update user');
        }
    }
}