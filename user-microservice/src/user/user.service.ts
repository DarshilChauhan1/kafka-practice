import { Inject, Injectable, OnModuleInit, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseHandler } from 'src/common/utils/response-handler';
import {KafkaTopics} from '../common/enums/kafka-topics.enum'
import { Kafka, Producer } from 'kafkajs';
import { KafkaPartions } from 'src/common/enums/kafka-partitions.enum';

@Injectable()
export class UserService implements OnModuleInit {
  private kafka : Kafka
  private kafkaProducer : Producer
  constructor(
  ) {
    this.kafka = new Kafka({
      clientId: 'kafka-test',
      brokers: ['localhost:9092'],
    });
  }

  async onModuleInit() {
    // connect to kafka producer
    console.log('Connecting to Kafka Producer...');
    this.kafkaProducer = this.kafka.producer();
    await this.kafkaProducer.connect();
    console.log('Connected to Kafka Producer');
  }

  async create(createUserDto: CreateUserDto) {
    const { fullName, email, password } = createUserDto;
    const user = {
      action: 'create',
      data : {
        fullName,
        email,
        password,
      }
    };
    // Send the user data to the Kafka topic 
    // 1st Parameter is the topic name, 2nd parameter is the data to be sent
    await this.kafkaProducer.send({
      topic: KafkaTopics.USER_TOPIC,
      messages: [
        {
          key: 'user',
          value: JSON.stringify(user),
        },
      ]
    });
    return ResponseHandler.successResponse(user, 'User created successfully', 201);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
