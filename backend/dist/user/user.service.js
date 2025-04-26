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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async editUser(userId, dto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                throw new common_1.ForbiddenException('User not found');
            }
            const updateData = {};
            if (dto.name)
                updateData.name = dto.name;
            if (dto.email)
                updateData.email = dto.email;
            if (dto.currentPassword && dto.newPassword) {
                const passwordMatch = await argon.verify(user.password, dto.currentPassword);
                if (!passwordMatch) {
                    throw new common_1.ForbiddenException('Incorrect current password');
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
            return { updatedUser: updatedUser, message: "User Updated Successfully" };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to update user');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map