import { IPayload, ITicket } from '@tickets/interfaces';

export namespace SupportAnswerTicketCommand {

  export const topic = 'support.answer-ticket.command';
  export const queue = 'support.answer-ticket';

  export class Request {
    id: number;
    answeredUserId: number;
    answer: string;
  }

  export class ResponsePayload {
    ticket: ITicket;
  }

  export class Response implements IPayload<ResponsePayload> {
    error: Error | null;
    payload: ResponsePayload | null;
  }
}
