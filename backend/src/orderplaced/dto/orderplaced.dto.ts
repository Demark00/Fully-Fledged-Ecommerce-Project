import { IsNumber, IsPositive, Min, IsEnum } from 'class-validator';

export enum OrderStatus {
  ACCEPTED = 'ACCEPTED',
  ONTHEWAY = 'ONTHEWAY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export class OrderPlacedDto {
  @IsNumber()
  @IsPositive()
  productId: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @IsPositive()
  totalPrice: number;

  @IsEnum(OrderStatus)
  status: OrderStatus; // Must be one of the enum values
}