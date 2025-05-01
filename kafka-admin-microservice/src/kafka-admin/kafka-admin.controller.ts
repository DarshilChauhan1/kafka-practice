import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KafkaAdminService } from './kafka-admin.service';
import { CreateKafkaAdminDto } from './dto/create-kafka-admin.dto';
import { UpdateKafkaAdminDto } from './dto/update-kafka-admin.dto';
import { CreateTopicDto } from './dto/create-topic.dto';
import { CreatePartitionDto } from './dto/create-partition.dto';

@Controller('admin')
export class KafkaAdminController {
  constructor(private readonly kafkaAdminService: KafkaAdminService) {}

  @Post('create-topic')
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.kafkaAdminService.createTopic(createTopicDto);
  }

  @Post('create-partition')
  createPartition(@Body() createPartionDto: CreatePartitionDto) {
    return this.kafkaAdminService.createPartition(createPartionDto);
  }

  @Get('list-topics')
  listTopics() {
    return this.kafkaAdminService.listTopics();
  }

  @Delete('delete-topic/:topicName')
  deleteTopic(@Param('topicName') topicName: string) {
    return this.kafkaAdminService.deleteTopic(topicName);
  }

  @Get()
  findAll() {
    return this.kafkaAdminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kafkaAdminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKafkaAdminDto: UpdateKafkaAdminDto) {
    return this.kafkaAdminService.update(+id, updateKafkaAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kafkaAdminService.remove(+id);
  }
}
