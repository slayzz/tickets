
export enum TicketStateStatus {
  CREATED = 'CREATED',
  WAITING_ANSWER = 'WAITING_ANSWER',
  ANSWERED = 'ANSWERED',
  CLOSED = 'CLOSED'
}

export interface ITicket {
  id?: number;
  question: string;
  answer: string | null;
  state: TicketStateStatus;
  creatorUserId: number;
  answeredUserId: number | null;
}

