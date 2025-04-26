import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt-strategy.auth';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport'; // <-- import this

@Module({
  imports: [
    PassportModule, // <-- add this
    JwtModule.register({}),
    ConfigModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
