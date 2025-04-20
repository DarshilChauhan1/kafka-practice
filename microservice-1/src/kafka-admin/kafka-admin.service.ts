import { ConflictException, Injectable, OnModuleDestroy } from '@nestjs/common';
import { CreateKafkaAdminDto } from './dto/create-kafka-admin.dto';
import { UpdateKafkaAdminDto } from './dto/update-kafka-admin.dto';
import { OnModuleInit } from '@nestjs/common';
import { Admin, Kafka, ITopicConfig } from 'kafkajs';
import { ResponseInterface } from 'src/common/interfaces/response.interface';
import { CreateTopicDto } from './dto/create-topic.dto';
import { ResponseHandler } from 'src/common/utils/response-handler';

@Injectable()
export class KafkaAdminService implements OnModuleInit, OnModuleDestroy {
  kafka: Kafka;
  kafkaAdmin: Admin
  constructor() {
    this.kafka = new Kafka({
      clientId: 'kafka-admin',
      brokers: ['localhost:9092'],
    });
    this.kafkaAdmin = this.kafka.admin();
  }

  // on module intialize connect to kafka admin
  async onModuleInit() {
    // connect to kafka admin
    console.log('Connecting to Kafka Admin...');
    await this.kafkaAdmin.connect();
    console.log('Connected to Kafka Admin');
  }

  async onModuleDestroy() {
    // disconnect from kafka admin
    console.log('Disconnecting from Kafka Admin...');
    await this.kafkaAdmin.disconnect();
    console.log('Disconnected from Kafka Admin');
  }


  async createTopic(payload: CreateTopicDto): Promise<ResponseInterface> {
    const { topicName, partitions, replicationFactor } = payload;
    const topic = topicName.toLowerCase();

    // check if topic already exists
    const topicExits = await this.kafkaAdmin.listTopics();
    if (topicExits.includes(topic)) throw new ConflictException(`Topic ${topic} already exists`);

    // create topic config
    const topicCreateConfig: ITopicConfig = {
      topic: topic,
      numPartitions: partitions,
      replicationFactor: replicationFactor,
      // other options can be added here
    };
    // create topic
    const response = await this.kafkaAdmin.createTopics({
      topics: [topicCreateConfig],
      validateOnly: payload.onlyValidateRequest,
      timeout: payload.creationTimeoutMs,
      waitForLeaders: payload.waitForPartitionLeaders,
    });
    return ResponseHandler.successResponse(response, `Topic ${topic} created successfully`, 201);
  }

  findAll() {
    return `This action returns all kafkaAdmin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kafkaAdmin`;
  }

  update(id: number, updateKafkaAdminDto: UpdateKafkaAdminDto) {
    return `This action updates a #${id} kafkaAdmin`;
  }

  remove(id: number) {
    return `This action removes a #${id} kafkaAdmin`;
  }
}
