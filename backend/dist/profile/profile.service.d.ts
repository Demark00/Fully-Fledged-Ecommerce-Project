import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto';
import { EditProfileDto } from './dto/edit-profile.dto';
export declare class ProfileService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: number): Promise<({
        addresses: {
            id: number;
            houseNo: number | null;
            block: string | null;
            area: string;
            city: string;
            state: string;
            pincode: number;
            profileId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        phone: string;
        image: string | null;
    }) | null>;
    createProfile(userId: number, dto: CreateProfileDto): Promise<{
        addresses: {
            id: number;
            houseNo: number | null;
            block: string | null;
            area: string;
            city: string;
            state: string;
            pincode: number;
            profileId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        phone: string;
        image: string | null;
    }>;
    editProfile(userId: number, dto: EditProfileDto): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        phone: string;
        image: string | null;
    }>;
}
