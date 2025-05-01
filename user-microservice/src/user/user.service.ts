import { Inject, Injectable, NotFoundException, OnModuleInit, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseHandler } from 'src/common/utils/response-handler';
import  * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { Repository } from 'typeorm';
import { Kafka, Producer } from 'kafkajs';
import { KafkaTopics } from 'src/common/enums/kafka-topics.enum';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthService } from 'src/jwt-auth/jwt-auth.service';

@Injectable()
export class UserService implements OnModuleInit {
  kafka : Kafka
  kafkaProducer : Producer
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly jwtAuthService: JwtAuthService,
  ) {
    this.kafka = new Kafka({
      clientId: 'kafka-test',
      brokers: ['localhost:9092'],
    });
  }

  async onModuleInit() {
    this.kafkaProducer = this.kafka.producer();
    await this.kafkaProducer.connect();
    console.log('Kafka producer connected');
  }

  async create(createUserDto: CreateUserDto) {
    const { fullName, email, password } = createUserDto;

    // check if the email already exists
    // const existingUser = await this.userRepository.findOne({ where: { email } });
    // if (existingUser) {
    //   return ResponseHandler.errorResponse('Email already exists', 400);
    // }

    const hashedPassword = await bcrypt.hash(password, 10);
    const findRole = await this.roleRepository.findOne({ where: { name: 'user' } });

    const newUser = this.userRepository.create({
      fullName : fullName,
      email : email,
      password : hashedPassword,
      roles : [findRole],
    });

    const savedUser = await this.userRepository.save(newUser); 
    this.kafkaProducer.send({
      topic : KafkaTopics.USER_TOPIC,
      messages : [
        {
          partition : 0,
          value : JSON.stringify({
            action : 'send-mail-verification',
            data : {
              email : savedUser.email,
              subject : 'Welcome to our service',
              fullName : savedUser.fullName,
              userId : savedUser.id,
            }
          })
        }
      ]
    })
    return ResponseHandler.successResponse(savedUser, 'User created successfully', 201);
  }

  async login(loginPayload : LoginUserDto) {
    const { email, password } = loginPayload;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return ResponseHandler.errorResponse('Invalid password', 401);
    }

    const token = await this.jwtAuthService.generateToken({
      userId: user.id,
    });

    return ResponseHandler.successResponse({...user, accessToken : token}, 'Login successful', 200);

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
