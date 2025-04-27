import { Module } from '@nestjs/common';
import { KafkaAdminService } from './kafka-admin.service';
import { KafkaAdminController } from './kafka-admin.controller';

@Module({
  controllers: [KafkaAdminController],
  providers: [KafkaAdminService],
})
export class KafkaAdminModule {}
