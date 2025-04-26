import { Body, Controller, Get, HttpCode, HttpStatus, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UserService } from './user.service';
import { EditUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
    @HttpCode(HttpStatus.OK)
    @Get('me')
    getMe(@GetUser() user: User){
        console.log(user)
        return user;
    }


    @HttpCode(HttpStatus.OK)
    @Patch('edit')
    editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto){
        return this.userService.editUser(userId, dto)
    }
}
