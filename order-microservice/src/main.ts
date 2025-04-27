import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'kafka-test',
        brokers: ['localhost:9092']
      }
    }
  })
  await app.startAllMicroservices();
  await app.listen(4000);
}
bootstrap();
