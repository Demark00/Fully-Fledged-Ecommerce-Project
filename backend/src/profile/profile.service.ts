import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto';
import { EditProfileDto } from './dto/edit-profile.dto';

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) {}

    async getProfile(userId: number) {
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
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch profile');
        }
    }

    async createProfile(userId: number, dto: CreateProfileDto) {
        try {
            const profile = await this.prisma.profile.create({
                data: {
                    userId,
                    phone: dto.phone.toString(), // assuming phone is stored as string in DB
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
        } catch (error) {
            throw new InternalServerErrorException('Failed to create profile');
        }
    }

    async editProfile(userId: number, dto:EditProfileDto){
        const profile = await this.prisma.profile.findFirst({
            where:{
                userId: userId,
            }
        })

        if(!profile){
            throw new NotFoundException("Profile associated with this user not found")
        }

        const newProfile = await this.prisma.profile.update({
            where: {
                id: profile.id, // Use the unique ID of the profile
            },
            data: {
                ...dto,
            },
        });

        return newProfile
    }
}