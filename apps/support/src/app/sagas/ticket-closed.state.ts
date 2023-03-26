import { TicketState } from './ticket.state';
import { ITicket, TicketStateStatus } from '@tickets/interfaces';
import { RpcError } from '@tickets/common';

export class TicketClosedState extends TicketState {
  changeStatus(status: TicketStateStatus): Promise<ITicket> {
    if (status === TicketStateStatus.CREATED || status === TicketStateStatus.ANSWERED) {
      throw new RpcError('cant_change_status', 'ticket');
    }
    return super.changeStatus(status);
  }

  answer(answeredUserId: number, answer: string,): Promise<ITicket> {
    throw new RpcError('cant_answer_with_wrong_status', 'ticket');
  }
}
