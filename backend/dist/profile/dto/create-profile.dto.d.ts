import { CreateAddressDto } from 'src/address/dto';
export declare class CreateProfileDto {
    userId: number;
    phone: number;
    image?: string;
    addresses: CreateAddressDto[];
}
