import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RmqRpcInterceptor } from '@tickets/common';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'auth';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new RmqRpcInterceptor());
  await app.init();
  Logger.log(
    '🚀 Application auth is running'
  );
}

bootstrap();
