import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator';

@Controller('cart')
@UseGuards(JwtGuard) // Protect all routes with JWT authentication
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async createCart(@GetUser('id') userId: number, @Body() dto: CreateCartDto) {
    return this.cartService.createCart(userId, dto);
  }

  @Get()
  async getCart(@GetUser('id') userId: number) {
    return this.cartService.getCart(userId);
  }

  @Delete(':id')
  async deleteCart(@GetUser('id') userId: number, @Param('id', ParseIntPipe) cartId: number) {
    return this.cartService.deleteCart(userId, cartId);
  }
}