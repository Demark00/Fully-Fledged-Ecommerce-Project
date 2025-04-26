import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signup(dto: AuthDto) {
    try {
      // generate a new hash password
      const hashPassword = await argon.hash(dto.password);

      // save new user to db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashPassword,
          name: dto.name,
        },
      });

      // return the saved user
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw new InternalServerErrorException('Failed to sign up');
    }
  }

  async signin(dto: AuthDto) {
    try {
      // find user by email
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (!user || !user.password || !user.password.startsWith('$argon2')) {
        throw new ForbiddenException('Invalid credentials');
      }

      // compare password
      const passwordMatch = await argon.verify(user.password, dto.password);

      if (!passwordMatch) {
        throw new ForbiddenException('Credentials not match');
      }

      // send back the user without hash
      return this.signToken(user.id, user.email);
    } catch (error) {
      throw new InternalServerErrorException('Failed to sign in');
    }
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    try {
      const paylod = {
        sub: userId,
        email,
      };

      const secret = this.config.get('JWT_SECRET');

      const token = await this.jwt.signAsync(paylod, {
        expiresIn: '7d',
        secret: secret,
      });

      return { access_token: token };
    } catch (error) {
      throw new InternalServerErrorException('Failed to generate token');
    }
  }
}