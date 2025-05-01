import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
    @ApiProperty({ type: 'string'})
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ type: 'string', example : 'password123' })
    @IsString()
    @IsNotEmpty()
    password: string;
}