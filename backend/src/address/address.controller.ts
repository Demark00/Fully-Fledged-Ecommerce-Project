import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('profile/:profileId/address')
export class AddressController {
    constructor(private addressService: AddressService){}

    @Get()
    getAddress(@Param('profileId', ParseIntPipe) profileId: number){
        return this.addressService.getAddress(profileId)
    }

    @Post()
    createAddress(@Param('profileId', ParseIntPipe) profileId: number, @Body() dto:CreateAddressDto){
        return this.addressService.createAddress(profileId, dto)
    }

    @Delete("/:addressId")
    deleteAddress(@Param('profileId', ParseIntPipe) profileId: number, @Param('addressId', ParseIntPipe) addressId: number){
        return this.addressService.deleteAddress(profileId, addressId)
    }
}
