import { Injectable } from '@nestjs/common';
import { TicketRepository } from './repository/ticket.repository';
import {
  SupportAnswerTicketCommand,
  SupportChangeStatusTicketCommand,
  SupportCreateTicketCommand
} from '@tickets/contracts';
import { TicketEntity } from './entities/ticket.entity';
import { ITicket, TicketStateStatus } from '@tickets/interfaces';
import { RpcError } from '@tickets/common';
import { TicketSaga } from './sagas/ticket.saga';

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepository: TicketRepository) {
  }

  async createTicket({ question, userId }: SupportCreateTicketCommand.Request): Promise<ITicket> {
    const ticketEntity = new TicketEntity({
      question,
      state: TicketStateStatus.CREATED,
      creatorUserId: userId,
      answer: null,
      answeredUserId: null,
    });
    return this.ticketRepository.createTicket(ticketEntity);
  }

  async changeStatus({ id, status }: SupportChangeStatusTicketCommand.Request): Promise<ITicket> {
    const ticket = await this.ticketRepository.getTicket(id)
    if (!ticket) {
      throw new RpcError('ticket_not_found', 'support');
    }

    const ticketEntity = new TicketEntity({
      ...ticket.dataValues,
    });
    const saga = new TicketSaga(ticketEntity, this.ticketRepository);
    return saga.getState().changeStatus(status);
  }

  async answerTicket({ id, answer, answeredUserId }: SupportAnswerTicketCommand.Request): Promise<ITicket> {
    const ticket = await this.ticketRepository.getTicket(id)
    const ticketEntity = new TicketEntity({
      ...ticket.dataValues,
    });
    const saga = new TicketSaga(ticketEntity, this.ticketRepository);
    return saga.getState().answer(answeredUserId, answer);
  }
}
