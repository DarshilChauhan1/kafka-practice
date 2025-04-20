import { PartialType } from '@nestjs/mapped-types';
import { CreateKafkaAdminDto } from './create-kafka-admin.dto';

export class UpdateKafkaAdminDto extends PartialType(CreateKafkaAdminDto) {}
