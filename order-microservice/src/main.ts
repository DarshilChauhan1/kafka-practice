import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { GlobalCatchHandler } from './common/utils/global-catch-handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalCatchHandler());
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
