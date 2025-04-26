import { IsString , IsOptional} from "class-validator"


export class EditProfileDto{
    @IsString()
    @IsOptional()
    phone?: string

    @IsString()
    @IsOptional()
    image?: string  
}