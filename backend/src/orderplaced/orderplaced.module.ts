import { Module } from '@nestjs/common';
import { OrderPlacedController } from './orderplaced.controller';
import { OrderPlacedService } from './orderplaced.service';

@Module({
  controllers: [OrderPlacedController],
  providers: [OrderPlacedService]
})
export class OrderplacedModule {}
