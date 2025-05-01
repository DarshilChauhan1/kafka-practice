import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaAdminModule } from './kafka-admin/kafka-admin.module';

@Module({
  imports: [KafkaAdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
