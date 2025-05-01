import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalCatchHandler } from './common/utils/global-catch-handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalCatchHandler());
  await app.listen(4000);
}
bootstrap();
