"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
const library_1 = require("@prisma/client/runtime/library");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    prisma;
    config;
    jwt;
    constructor(prisma, config, jwt) {
        this.prisma = prisma;
        this.config = config;
        this.jwt = jwt;
    }
    async signup(dto) {
        try {
            const hashPassword = await argon.hash(dto.password);
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hashPassword,
                    name: dto.name,
                },
            });
            return this.signToken(user.id, user.email);
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException('Credentials taken');
                }
            }
            throw new common_1.InternalServerErrorException('Failed to sign up');
        }
    }
    async signin(dto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: dto.email,
                },
            });
            if (!user || !user.password || !user.password.startsWith('$argon2')) {
                throw new common_1.ForbiddenException('Invalid credentials');
            }
            const passwordMatch = await argon.verify(user.password, dto.password);
            if (!passwordMatch) {
                throw new common_1.ForbiddenException('Credentials not match');
            }
            return this.signToken(user.id, user.email);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to sign in');
        }
    }
    async signToken(userId, email) {
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
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to generate token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map