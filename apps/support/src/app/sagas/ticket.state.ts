import { TicketSaga } from './ticket.saga';
import { ITicket, TicketStateStatus } from '@tickets/interfaces';

export abstract class TicketState {
  saga: TicketSaga;

  setContext(saga: TicketSaga) {
    this.saga = saga;
  }

  async changeStatus(status: TicketStateStatus): Promise<ITicket> {
    await this.saga.ticketRepository.updateTicketStatus(this.saga.ticket.id, status);
    return this.saga.ticket.updateStatus(status);
  }

  abstract answer(answeredUserId: number, answer: string,): Promise<ITicket>;
}
