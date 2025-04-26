import { IsOptional, IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';

export class CreateAddressDto {
    @IsOptional()
    @IsNumber()
    houseNo?: number;
  
    @IsOptional()
    @IsString()
    block?: string;
  
    @IsString()
    area: string;  // ✅ area is required, good!
  
    @IsString()
    city: string;
  
    @IsString()
    state: string;
  
    @IsNumber()
    pincode: number;
}