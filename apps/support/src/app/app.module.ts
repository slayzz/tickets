import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { RmqModule } from '@tickets/rmq';

import { getMysqlConfig } from './configs/mysql.config';
import { SupportQueries } from './support.queries';
import { SupportCommands } from './support.commands';
import { TicketModel } from './model/ticket.model';
import { TicketRepository } from './repository/ticket.repository';
import { TicketService } from './ticket.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'envs/.support.env',
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync(getMysqlConfig()),
    SequelizeModule.forFeature([TicketModel]),
    RmqModule,
  ],
  providers: [TicketRepository, SupportQueries, SupportCommands, TicketService]
})
export class AppModule {
}
