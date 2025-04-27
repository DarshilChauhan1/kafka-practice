import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ type: 'string', default: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @ApiProperty({ type: 'string', example : 'johndoe@gmail.com' })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ type: 'string', example : 'password123' })
    @IsString()
    @IsNotEmpty()
    password: string;

}
