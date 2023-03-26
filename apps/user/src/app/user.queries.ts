import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { RpcError } from '@tickets/common';
import { UserEntity } from './entities/user.entity';
import { UserGet } from '@tickets/contracts';
import { ackErrorHandler, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { EXHANGES } from '@tickets/rmq';

@Injectable()
export class UserQueries {
  constructor(
    private readonly userRepository: UserRepository,
  ) {
  }

  @RabbitRPC({
    exchange: EXHANGES.user.name,
    routingKey: UserGet.topic,
    queue: UserGet.queue,
    errorHandler: ackErrorHandler,
  })
  async getUser({ email }: UserGet.Request) {
    console.log('GETUSER?');
    const user = await this.userRepository.findUser(email);
    if (!user) {
      throw new RpcError('user_not_found', 'user');
    }

    const userEntity = await new UserEntity(user);

    return { error: null, payload: { user: userEntity } };
  }
}
