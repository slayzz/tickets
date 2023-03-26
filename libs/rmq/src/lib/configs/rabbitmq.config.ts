import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq/lib/rabbitmq.interfaces';

import { AsyncModuleConfig } from '@golevelup/nestjs-modules/lib/dynamicModules';
import { ConfigService } from '@nestjs/config';
import { EXHANGES } from '../exchanges';

export const getRabbitmqConfig = (): AsyncModuleConfig<RabbitMQConfig> => ({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    exchanges: Object.values(EXHANGES),
    uri: `amqp://${configService.get('AMQP_USER')}:${configService.get('AMQP_PASSWORD')}@${configService.get('AMQP_HOSTNAME')}:${configService.get('AMQP_PORT')}`,
    connectionInitOptions: { wait: false },
    prefetchCount: 32,
  }),
});
