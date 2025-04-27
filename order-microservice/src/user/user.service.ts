import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Consumer, Kafka } from 'kafkajs';
import { OnModuleInit } from '@nestjs/common';
import { KafkaTopics } from 'src/common/enums/kafka-topics.enum';
import { KafkaGroups } from 'src/common/enums/kafka-groups.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService implements OnModuleInit {
  private kafka : Kafka
  private kafkConsumer : Consumer
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    this.kafka = new Kafka({
      clientId: 'kafka-test',
      brokers: ['localhost:9092'],
    });
  }

  async onModuleInit() {
    // connect to kafka consumer
    console.log('Connecting to Kafka Consumer...');
    this.kafkConsumer = this.kafka.consumer({ groupId: KafkaGroups.USER_GROUP });
    await this.kafkConsumer.connect();
    console.log('Connected to Kafka Consumer');
    // subscribe to the topic
    await this.kafkConsumer.subscribe({ topic: KafkaTopics.USER_TOPIC, fromBeginning: true });
    // consume the messages
    await this.kafkConsumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        // Parse the message value to get the object content
        const payload = JSON.parse(message.value.toString());
        // check the action type
        if (payload.action === 'create') {
          // add the user to the database
          await this.addUserToDatabase(payload.data);
          console.log('User added to database', payload.data);
        }
      },
    });
  }

  // add the database entry of the user 
  async addUserToDatabase(user: any) {
    // check if the user already exists in the database
    const existingUser = await this.userRepository.findOne({ where: { email: user.email } });
    if (existingUser) {
      console.log('User already exists in the database', user.email);
      return;
    }
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
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
