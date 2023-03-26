import { ackErrorHandler, AmqpConnection, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { AuthLogin, AuthRegister, UserGet, UserCreate } from '@tickets/contracts';
import { AuthService } from './auth.service';
import { RpcError } from '@tickets/common';
import { Injectable } from '@nestjs/common';
import { EXHANGES } from '@tickets/rmq';

@Injectable()
export class AuthCommands {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly authService: AuthService,
  ) {
  }

  @RabbitRPC({
    exchange: EXHANGES.user.name,
    routingKey: AuthRegister.topic,
    queue: AuthRegister.queue,
    errorHandler: ackErrorHandler,
  })
  async register({ fullName, email, password }: AuthRegister.Request): Promise<AuthRegister.Response> {
    const passwordHash = await this.authService.hashPassword(password);
    const { error, payload } = await this.amqpConnection.request<UserCreate.Response>({
      exchange: EXHANGES.user.name,
      routingKey: UserCreate.topic,
      payload: { fullName, email, passwordHash }
    });
    if (error) {
      throw new RpcError(error.message, error.name);
    }

    const { user } = payload;

    return { error: null, payload: { id: user.id, fullName: user.fullName, email: user.email } };
  }

  @RabbitRPC({
    exchange: EXHANGES.user.name,
    routingKey: AuthLogin.topic,
    queue: AuthLogin.queue,
    errorHandler: ackErrorHandler,
  })
  async login({ password, email }: AuthLogin.Request): Promise<AuthLogin.Response> {
    const { error, payload } = await this.amqpConnection.request<UserGet.Response>({
      exchange: EXHANGES.user.name,
      routingKey: UserGet.topic,
      payload: { email },
    });
    if (error) {
      throw new RpcError(error.message, error.name);
    }
    const { user } = payload;
    const isValidated = await this.authService.validatePassword(password, user.passwordHash);
    if (!isValidated) {
      throw new RpcError('wrong_password', 'auth');
    }

    const accessToken = await this.authService.signJwt(user);
    return { error: null, payload: { accessToken } };
  }
}
