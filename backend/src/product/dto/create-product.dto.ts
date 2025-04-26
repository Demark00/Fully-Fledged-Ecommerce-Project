import { IsString, IsOptional, IsNumber, IsPositive, Min, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsString()
  @IsUrl()
  image?: string;

  @IsString()
  category: string; 
}