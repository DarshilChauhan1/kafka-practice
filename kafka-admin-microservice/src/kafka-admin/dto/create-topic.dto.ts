import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateTopicDto{
    @ApiProperty({ type: String, example: 'test-topic' })
    @IsString()
    @IsNotEmpty()
    topicName: string;

    @ApiProperty({ type: String, example: 1 })
    @IsNumber()
    @IsNotEmpty()
    partitions: number;

    @ApiProperty({ type: Number, example: '1' })
    @IsNumber()
    @IsNotEmpty()
    replicationFactor: number;

    // default: true
    @ApiProperty({ type: Boolean, example: true })
    @IsBoolean()
    @IsOptional()
    onlyValidateRequest : boolean;

    // default: 5000
    @ApiProperty({type : Number, example : 5000})
    @IsNumber()
    @IsOptional()
    creationTimeoutMs : number;

    // default: true
    @ApiProperty({type : Boolean, example : true})
    @IsBoolean()
    @IsOptional()
    waitForPartitionLeaders : boolean;

}