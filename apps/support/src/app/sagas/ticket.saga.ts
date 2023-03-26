import { TicketEntity } from '../entities/ticket.entity';
import { TicketStateStatus } from '@tickets/interfaces';
import { TicketState } from './ticket.state';
import { TicketCreatedState } from './ticket-created.state';
import { TicketWaitingAnswerState } from './ticket-waiting-answer.state';
import { TicketAnsweredState } from './ticket-answered.state';
import { TicketClosedState } from './ticket-closed.state';
import { TicketRepository } from '../repository/ticket.repository';

export class TicketSaga {
  private state: TicketState;

  constructor(
    public ticket: TicketEntity,
    public ticketRepository: TicketRepository
  ) {
    this.setState(ticket.state);
  }

  getState(): TicketState {
    return this.state;
  }

  setState(stateStatus: TicketStateStatus) {
    switch (stateStatus) {
      case TicketStateStatus.CREATED:
        this.state = new TicketCreatedState();
        break
      case TicketStateStatus.WAITING_ANSWER:
        this.state = new TicketWaitingAnswerState();
        break
      case TicketStateStatus.ANSWERED:
        this.state = new TicketAnsweredState();
        break
      case TicketStateStatus.CLOSED:
        this.state = new TicketClosedState();
        break
    }
    this.state.setContext(this);
  }

}
