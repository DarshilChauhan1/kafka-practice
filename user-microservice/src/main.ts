import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalCatchHandler } from './common/utils/global-catch-handler';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

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

  const config = new DocumentBuilder()
    .setTitle('Kafka Admin API')
    .setDescription('Kafka Admin API description')
    .setVersion('1.0')
    .addTag('kafka-admin')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
