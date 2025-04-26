import { AddressService } from './address.service';
import { CreateAddressDto } from './dto';
export declare class AddressController {
    private addressService;
    constructor(addressService: AddressService);
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
