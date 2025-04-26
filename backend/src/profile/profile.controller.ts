import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator';
import { CreateProfileDto } from './dto';
import { EditProfileDto } from './dto/edit-profile.dto';

@UseGuards(JwtGuard)
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getProfile(@GetUser('id') userId: number) {
    return this.profileService.getProfile(userId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createProfile(
    @GetUser('id') userId: number,
    @Body() dto: CreateProfileDto,
  ) {
    return this.profileService.createProfile(userId, dto);
  }

  @Patch()
  editProfile(
    @GetUser('id') userId: number,
    @Body() dto: EditProfileDto,
  ) {
    return this.profileService.editProfile(userId, dto)
  }
}
