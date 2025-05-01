import {
    IsString,
    IsNotEmpty,
    IsOptional
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({
        description: 'name field',
        example: 'example string'
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'description field',
        example: 'example string'
    })
    @IsNotEmpty()
    @IsOptional()
    description: string;

}