import { TicketState } from './ticket.state';
import { RpcError } from '@tickets/common';
import { ITicket, TicketStateStatus } from '@tickets/interfaces';

export class TicketAnsweredState extends TicketState {

  changeStatus(status: TicketStateStatus): Promise<ITicket> {
    if (status === TicketStateStatus.CREATED) {
      throw new RpcError('cant_change_status', 'ticket');
    }
    return super.changeStatus(status);
  }

  answer(answeredUserId: number, answer: string,): Promise<ITicket> {
    throw new RpcError('cant_answer_with_wrong_status', 'ticket');
  }
}
