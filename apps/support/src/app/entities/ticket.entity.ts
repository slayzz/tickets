import { ITicket, TicketStateStatus } from '@tickets/interfaces';

export class TicketEntity implements ITicket {
  id: number;
  question: string;
  answer: string | null;
  state: TicketStateStatus;
  creatorUserId: number;
  answeredUserId: number | null;

  constructor(ticket: ITicket) {
    this.id = ticket.id;
    this.question = ticket.question;
    this.answer = ticket.answer;
    this.state = ticket.state;
    this.creatorUserId = ticket.creatorUserId;
    this.answeredUserId = ticket.answeredUserId;
  }

  updateStatus(state: TicketStateStatus): this {
    this.state = state;
    return this;
  }

  setAnswer(answeredUserId: number, answer: string): this {
    this.answeredUserId = answeredUserId;
    this.answer = answer;
    return this;
  }
}
