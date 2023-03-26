import { Body, Controller, Post, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { AuthLogin, AuthRegister } from '@tickets/contracts';

import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { EXHANGES } from '@tickets/rmq';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly amqpConnection: AmqpConnection) {
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() dto: RegisterDto) {
    const { error, payload } = await this.amqpConnection.request<AuthRegister.Response>({
      exchange: EXHANGES.user.name,
      routingKey: AuthRegister.topic,
      payload: dto
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return payload;
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() { password, email }: LoginDto) {
    const { error, payload } = await this.amqpConnection.request<AuthLogin.Response>({
      exchange: EXHANGES.user.name,
      routingKey: AuthLogin.topic,
      payload: {
        password,
        email,
      }
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return payload;
  }
}
