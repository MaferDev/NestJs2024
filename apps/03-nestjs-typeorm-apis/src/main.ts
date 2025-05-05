require('dotenv').config();

import { MyLoggerService } from '@dev/logger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './app/core/filters';
import { createDocument } from './app/docs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(new MyLoggerService('context'));
  app.setGlobalPrefix('/api/v1');
  app.useGlobalFilters(new HttpExceptionFilter());

  createDocument(app);
  await app.listen(process.env.PORT ?? 3005);
}
bootstrap();
