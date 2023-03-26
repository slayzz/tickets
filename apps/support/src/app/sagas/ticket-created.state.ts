import { TicketState } from './ticket.state';
import { ITicket, TicketStateStatus } from '@tickets/interfaces';
import { RpcError } from '@tickets/common';
import { authorize } from 'passport';

export class TicketCreatedState extends TicketState {

  async changeStatus(status: TicketStateStatus): Promise<ITicket> {
    if (status === TicketStateStatus.ANSWERED) {
      throw new RpcError('cant_change_status', 'ticket');
    }
    return super.changeStatus(status);
  }

  answer(answeredUserId: number, answer: string,): Promise<ITicket> {
    throw new RpcError('cant_answer_wrong_status', 'ticket');
  }
}

