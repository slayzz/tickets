import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { getRabbitmqConfig } from './configs/rabbitmq.config';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitmqConfig())
  ],
  exports: [RabbitMQModule],
})
export class RmqModule {
}
