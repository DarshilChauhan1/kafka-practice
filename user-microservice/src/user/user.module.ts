import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { JwtAuthService } from 'src/jwt-auth/jwt-auth.service';
import { JwtAuthModule } from 'src/jwt-auth/jwt-auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports : [TypeOrmModule.forFeature([User, Role]), JwtAuthModule, ConfigModule],
  controllers: [UserController],
  providers: [UserService, JwtAuthService],
})
export class UserModule {}
