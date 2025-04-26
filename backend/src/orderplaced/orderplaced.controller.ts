import { Body, Controller, Delete, Get, Param, Post, UseGuards, ParseIntPipe } from '@nestjs/common';
import { OrderPlacedService } from './orderplaced.service';
import { OrderPlacedDto } from './dto/orderplaced.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator';

@Controller('orderplaced')
@UseGuards(JwtGuard) // Protect all routes with JWT authentication
export class OrderPlacedController {
    constructor(private readonly orderPlacedService: OrderPlacedService) { }

    @Post()
    async createOrder(@GetUser('id') userId: number, @Body() dto: OrderPlacedDto) {
        return this.orderPlacedService.createOrder(userId, dto);
    }

    @Post('buy-all')
    async createMultipleOrders(@GetUser('id') userId: number) {
        return this.orderPlacedService.createMultipleOrders(userId);
    }

    @Get()
    async getOrders(@GetUser('id') userId: number) {
        return this.orderPlacedService.getOrders(userId);
    }

    @Delete(':id')
    async deleteOrder(@GetUser('id') userId: number, @Param('id', ParseIntPipe) orderId: number) {
        return this.orderPlacedService.deleteOrder(userId, orderId);
    }
}