import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { AddressModule } from './address/address.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { OrderplacedModule } from './orderplaced/orderplaced.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    ProfileModule,
    AddressModule,
    ProductModule,
    CartModule,
    OrderplacedModule,
  ],
})
export class AppModule {}