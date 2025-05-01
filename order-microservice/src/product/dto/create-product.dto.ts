import {
  IsString,
  IsNumber,
  IsBoolean,
  IsNotEmpty
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'name field',
    example: 'example string'
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'price field',
    example: 0
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'description field',
    example: 'example string'
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'imageUrl field',
    example: 'example string'
  })
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @ApiProperty({
    description: 'stock field',
    example: 0
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ApiProperty({
    description: 'isActive field',
    example: false
  })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;



}