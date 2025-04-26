import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private config;
    private jwt;
    constructor(prisma: PrismaService, config: ConfigService, jwt: JwtService);
    signup(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    signin(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    signToken(userId: number, email: string): Promise<{
        access_token: string;
    }>;
}
