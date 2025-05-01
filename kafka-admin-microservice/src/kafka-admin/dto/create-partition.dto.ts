import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePartitionDto {
    @ApiProperty({ type : 'boolean', default: false })
    @IsBoolean()
    onlyValidateRequest: boolean = false;

    @ApiProperty({ type : 'number', default : 1000 })
    @IsNumber()
    @IsNotEmpty()
    creationTimeoutMs: number = 1000;

    @ApiProperty({ type : 'string', default : 'topic1' })
    @IsNotEmpty()
    @IsString()
    topicName: string;


    @ApiProperty({ type : 'number', example : 2})
    @IsNotEmpty()
    @IsNumber()
    newPartitions: number;
}