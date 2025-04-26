import { IsEmail, IsOptional, IsString, Length } from "class-validator"

export class EditUserDto{
    @IsString()
    @IsOptional()
    name?: string

    @IsEmail()
    @IsOptional()
    email?: string

    @IsString()
    @IsOptional()
    @Length(6,20)
    currentPassword?: string

    @IsString()
    @IsOptional()
    @Length(6,20)
    newPassword?: string
}