import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto';
export declare class AddressService {
    private prisma;
    constructor(prisma: PrismaService);
    getAddress(profileId: number): Promise<{
        id: number;
        houseNo: number | null;
        block: string | null;
        area: string;
        city: string;
        state: string;
        pincode: number;
        profileId: number;
    }[]>;
    createAddress(profileId: number, dto: CreateAddressDto): Promise<{
        id: number;
        houseNo: number | null;
        block: string | null;
        area: string;
        city: string;
        state: string;
        pincode: number;
        profileId: number;
    }>;
    deleteAddress(profileId: number, addressId: number): Promise<{
        message: string;
    }>;
}
