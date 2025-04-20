import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalCatchHandler } from './common/utils/global-catch-handler';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalCatchHandler());
  app.connectMicroservice<MicroserviceOptions>({
    transport : Transport.KAFKA,
    options : {
      client : {
        clientId : 'kafka-admin',
        brokers : ['localhost:9092']
      }
    }
  })
  await app.listen(3000);
}
bootstrap();
