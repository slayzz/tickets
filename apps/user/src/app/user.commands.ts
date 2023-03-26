import { Injectable } from '@nestjs/common';
import { ackErrorHandler, RabbitRPC, } from '@golevelup/nestjs-rabbitmq';
import { UserCreate } from '@tickets/contracts';
import { RpcError } from '@tickets/common';
import { EXHANGES } from '@tickets/rmq';

import { UserRepository } from './repository/user.repository';
import { UserEntity } from './entities/user.entity';


@Injectable()
export class UserCommands {
  constructor(
    private readonly userRepository: UserRepository,
  ) {
  }

  @RabbitRPC({
    exchange: EXHANGES.user.name,
    routingKey: UserCreate.topic,
    queue: UserCreate.queue,
    errorHandler: ackErrorHandler,
  })
  async register({ fullName, passwordHash, email }: UserCreate.Request) {
    const existedUser = await this.userRepository.findUser(email);
    if (existedUser) {
      throw new RpcError('user_already_exists', 'user');
    }

    const newUserEntity = await new UserEntity({
      fullName,
      email,
      passwordHash,
    });
    const user = await this.userRepository.createUser(newUserEntity);

    return { error: null, payload: { user: new UserEntity(user).getPublicProfile() } };
  }

}
