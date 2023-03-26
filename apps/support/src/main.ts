/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { RmqRpcInterceptor } from '@tickets/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'support';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new RmqRpcInterceptor());
  await app.init();
  Logger.log(
    '🚀 Application support is running'
  );
}

bootstrap();
