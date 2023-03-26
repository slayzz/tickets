import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RmqModule } from '@tickets/rmq';

import { ConfigModule } from '@nestjs/config';
import { getMysqlConfig } from './configs/mysql.config';
import { UserModel } from './models/user.model';
import { UserRepository } from './repository/user.repository';
import { UserCommands } from './user.commands';
import { UserQueries } from './user.queries';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'envs/.user.env',
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync(getMysqlConfig()),
    SequelizeModule.forFeature([UserModel]),
    RmqModule,
  ],
  providers: [UserRepository, UserCommands, UserQueries],
})
export class AppModule {
}
