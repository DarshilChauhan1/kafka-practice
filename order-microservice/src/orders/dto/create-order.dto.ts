import { 
    IsString, 
    IsNumber, 
    IsBoolean, 
    IsDate, 
    IsOptional,
    IsNotEmpty
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'status field',
    example: false
})
    @IsNotEmpty()
    undefined
  status: OrderStatus;

  @ApiProperty({
    description: 'userId field',
    example: 'example string'
})
    @IsNotEmpty()
    @IsString()
  userId: string;

  @ApiProperty({
    description: 'products field',
    example: false
})
    @IsNotEmpty()
    undefined
  products: Product[];

  @ApiProperty({
    description: 'createdAt field',
    example: false
})
    @IsNotEmpty()
    undefined
  createdAt: Date;

  @ApiProperty({
    description: 'updatedAt field',
    example: false
})
    @IsNotEmpty()
    undefined
  updatedAt: Date;


}