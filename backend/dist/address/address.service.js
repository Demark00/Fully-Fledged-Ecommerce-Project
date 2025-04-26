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
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AddressService = class AddressService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAddress(profileId) {
        try {
            const profile = await this.prisma.profile.findUnique({
                where: {
                    id: profileId,
                },
            });
            if (!profile) {
                throw new common_1.NotFoundException('Profile not found');
            }
            const address = await this.prisma.address.findMany({
                where: {
                    profileId: profileId,
                },
            });
            return address;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch addresses');
        }
    }
    async createAddress(profileId, dto) {
        try {
            const profile = await this.prisma.profile.findUnique({
                where: {
                    id: profileId,
                },
            });
            if (!profile) {
                throw new common_1.NotFoundException('Profile not found');
            }
            const address = await this.prisma.address.create({
                data: {
                    ...dto,
                    profileId,
                },
            });
            return address;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to create address');
        }
    }
    async deleteAddress(profileId, addressId) {
        try {
            const address = await this.prisma.address.findUnique({
                where: {
                    id: addressId,
                },
            });
            if (!address || address.profileId !== profileId) {
                throw new common_1.NotFoundException('Address not found for this profile');
            }
            await this.prisma.address.delete({
                where: {
                    id: addressId,
                },
            });
            return { message: 'Address deleted successfully' };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to delete address');
        }
    }
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AddressService);
//# sourceMappingURL=address.service.js.map