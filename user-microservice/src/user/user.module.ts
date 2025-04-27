import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports : [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
