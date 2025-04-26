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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProfileService = class ProfileService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProfile(userId) {
        try {
            const profile = await this.prisma.profile.findFirst({
                where: {
                    userId: userId,
                },
                include: {
                    addresses: true,
                },
            });
            return profile;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch profile');
        }
    }
    async createProfile(userId, dto) {
        try {
            const profile = await this.prisma.profile.create({
                data: {
                    userId,
                    phone: dto.phone.toString(),
                    image: dto.image,
                    addresses: {
                        create: dto.addresses.map(address => ({
                            houseNo: address.houseNo,
                            block: address.block,
                            area: address.area,
                            city: address.city,
                            state: address.state,
                            pincode: address.pincode,
                        })),
                    },
                },
                include: {
                    addresses: true,
                },
            });
            return profile;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to create profile');
        }
    }
    async editProfile(userId, dto) {
        const profile = await this.prisma.profile.findFirst({
            where: {
                userId: userId,
            }
        });
        if (!profile) {
            throw new common_1.NotFoundException("Profile associated with this user not found");
        }
        const newProfile = await this.prisma.profile.update({
            where: {
                id: profile.id,
            },
            data: {
                ...dto,
            },
        });
        return newProfile;
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map