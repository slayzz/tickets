import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { RmqRpcInterceptor } from '@tickets/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'user';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new RmqRpcInterceptor());
  await app.init()
  Logger.log(
    `🚀 User Application is running`
  );
}

bootstrap();
