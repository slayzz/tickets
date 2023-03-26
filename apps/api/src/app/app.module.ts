import { Module } from '@nestjs/common';

import { SupportModule } from './support/support.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'envs/.api.env',
      isGlobal: true,
    }),
    AuthModule,
    SupportModule,
  ],
})
export class AppModule {
}
