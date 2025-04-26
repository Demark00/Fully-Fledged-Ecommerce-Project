import { IsOptional, IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from 'src/address/dto';


export class CreateProfileDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  phone: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  addresses: CreateAddressDto[];
}
