import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RmqModule } from '@tickets/rmq';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { getJWTConfig } from '../configs/jwt.config';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync(getJWTConfig()),
    RmqModule,
  ],
  providers: [JwtStrategy],
  controllers: [AuthController],

})
export class AuthModule {
}
