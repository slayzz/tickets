import { Injectable } from '@nestjs/common';
import { ackErrorHandler, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { EXHANGES } from '@tickets/rmq';
import {
  SupportAnswerTicketCommand,
  SupportChangeStatusTicketCommand,
  SupportCreateTicketCommand
} from '@tickets/contracts';

import { TicketService } from './ticket.service';

@Injectable()
export class SupportCommands {

  constructor(
    private readonly ticketService: TicketService,
  ) {

  }

  @RabbitRPC({
    exchange: EXHANGES.ticket.name,
    routingKey: SupportCreateTicketCommand.topic,
    queue: SupportCreateTicketCommand.queue,
    errorHandler: ackErrorHandler,
  })
  async createTicket(msg: SupportCreateTicketCommand.Request): Promise<SupportCreateTicketCommand.Response> {
    const ticket = await this.ticketService.createTicket(msg);
    return { error: null, payload: { ticket } };
  }

  @RabbitRPC({
    exchange: EXHANGES.ticket.name,
    routingKey: SupportChangeStatusTicketCommand.topic,
    queue: SupportChangeStatusTicketCommand.queue,
    errorHandler: ackErrorHandler,
  })
  async changeStatus(msg: SupportChangeStatusTicketCommand.Request): Promise<SupportChangeStatusTicketCommand.Response> {
    const changedTicket = await this.ticketService.changeStatus(msg);
    return { error: null, payload: { ticket: changedTicket } };
  }


  @RabbitRPC({
    exchange: EXHANGES.ticket.name,
    routingKey: SupportAnswerTicketCommand.topic,
    queue: SupportAnswerTicketCommand.queue,
    errorHandler: ackErrorHandler,
  })
  async answer(msg: SupportAnswerTicketCommand.Request): Promise<SupportChangeStatusTicketCommand.Response> {
    const changedTicket = await this.ticketService.answerTicket(msg);
    return { error: null, payload: { ticket: changedTicket } };
  }
}
