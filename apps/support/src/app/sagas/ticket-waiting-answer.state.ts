import { TicketState } from './ticket.state';
import { ITicket, TicketStateStatus } from '@tickets/interfaces';
import { RpcError } from '@tickets/common';

export class TicketWaitingAnswerState extends TicketState {
  async changeStatus(status: TicketStateStatus): Promise<ITicket> {
    if (status === TicketStateStatus.CREATED || status === TicketStateStatus.ANSWERED) {
      throw new RpcError('cant_change_status', 'ticket');
    }
    return super.changeStatus(status);
  }

  async answer(answeredUserId: number, answer: string): Promise<ITicket> {
    await this.saga.ticketRepository.setTicketAnswer(this.saga.ticket.id, answeredUserId, answer);
    return this.saga.ticket.setAnswer(answeredUserId, answer).updateStatus(TicketStateStatus.ANSWERED);
  }
}
