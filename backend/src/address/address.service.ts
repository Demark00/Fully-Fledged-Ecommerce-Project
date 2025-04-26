import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto';

@Injectable()
export class AddressService {
    constructor(private prisma: PrismaService) {}

    async getAddress(profileId: number) {
        try {
            const profile = await this.prisma.profile.findUnique({
                where: {
                    id: profileId,
                },
            });

            if (!profile) {
                throw new NotFoundException('Profile not found');
            }

            const address = await this.prisma.address.findMany({
                where: {
                    profileId: profileId,
                },
            });

            return address;
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch addresses');
        }
    }

    async createAddress(profileId: number, dto: CreateAddressDto) {
        try {
            const profile = await this.prisma.profile.findUnique({
                where: {
                    id: profileId,
                },
            });

            if (!profile) {
                throw new NotFoundException('Profile not found');
            }

            const address = await this.prisma.address.create({
                data: {
                    ...dto,
                    profileId,
                },
            });

            return address;
        } catch (error) {
            throw new InternalServerErrorException('Failed to create address');
        }
    }

    async deleteAddress(profileId: number, addressId: number) {
        try {
            const address = await this.prisma.address.findUnique({
                where: {
                    id: addressId,
                },
            });

            if (!address || address.profileId !== profileId) {
                throw new NotFoundException('Address not found for this profile');
            }

            await this.prisma.address.delete({
                where: {
                    id: addressId,
                },
            });

            return { message: 'Address deleted successfully' };
        } catch (error) {
            throw new InternalServerErrorException('Failed to delete address');
        }
    }
}