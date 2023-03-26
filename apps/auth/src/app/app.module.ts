import { Module } from '@nestjs/common';
import { RmqModule } from '@tickets/rmq';

import { AuthCommands } from './auth.commands';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from './configs/jwt.config';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'envs/.auth.env',
      isGlobal: true,
    }),
    JwtModule.registerAsync(getJWTConfig()),
    RmqModule
  ],
  controllers: [],
  providers: [AuthCommands, AuthService],
})
export class AppModule {
}
