import { Injectable } from '@nestjs/common';
import { ackErrorHandler, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { SupportGetTicketQuery } from '@tickets/contracts';
import { EXHANGES } from '@tickets/rmq';
import { RpcError } from '@tickets/common';

import { TicketRepository } from './repository/ticket.repository';

@Injectable()
export class SupportQueries {
  constructor(
    private readonly ticketRepository: TicketRepository,
  ) {
  }

  @RabbitRPC({
    exchange: EXHANGES.ticket.name,
    routingKey: SupportGetTicketQuery.topic,
    queue: SupportGetTicketQuery.queue,
    errorHandler: ackErrorHandler,
  })
  async getTicket({ id }: SupportGetTicketQuery.Request): Promise<SupportGetTicketQuery.Response> {
    const ticket = await this.ticketRepository.getTicket(id);
    if (!ticket) {
      throw new RpcError('ticket_not_found', 'support');
    }
    return { error: null, payload: { ticket }};
  }

}
