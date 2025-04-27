import { Injectable } from '@nestjs/common';
import { CreateNotificationServiceDto } from './dto/create-notification-service.dto';
import { UpdateNotificationServiceDto } from './dto/update-notification-service.dto';
import { Consumer, Kafka } from 'kafkajs';
import { OnModuleInit } from '@nestjs/common';
import { KafkaTopics } from 'src/common/enums/kafka-topics.enum';

@Injectable()
export class NotificationServiceService implements OnModuleInit {
  private kafka: Kafka
  private kafkaConsumer: Consumer
  constructor() {
    this.kafka = new Kafka({
      clientId: 'kafka-test',
      brokers: ['localhost:9092']
    })
  }

  // as there are two partitions and 1 consume all messages will be consumed by one consumer
  async onModuleInit() {
    // connect to kafka consumer
    console.log('Connecting to Kafka Consumer...');
    this.kafkaConsumer = this.kafka.consumer({ groupId: 'notification-consumer-group' });
    await this.kafkaConsumer.connect();
    console.log('Connected to Kafka Consumer')

    // await this.kafkaConsumer.subscribe({ topics: [KafkaTopics.USER_TOPIC], fromBeginning: true });
    // console.log('Subscribed to Kafka Topic: USER_TOPIC')

    // await this.kafkaConsumer.run({
    //   eachMessage: async ({ topic, partition, message }) => {
    //     const user = JSON.parse(message.value.toString());
    //     console.log(`Received message: ${user} : ${topic} - ${partition}`);
    //     // Process the user data and send notification
    //     // For example, send an email or push notification
    //   },
    // });
    // console.log('Kafka Consumer is running...')

  }
  create(createNotificationServiceDto: CreateNotificationServiceDto) {
    return 'This action adds a new notificationService';
  }

  findAll() {
    return `This action returns all notificationService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificationService`;
  }

  update(id: number, updateNotificationServiceDto: UpdateNotificationServiceDto) {
    return `This action updates a #${id} notificationService`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificationService`;
  }
}
