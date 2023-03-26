import { IPayload, ITicket } from '@tickets/interfaces';

export namespace SupportCreateTicketCommand {

  export const topic = 'support.create-ticket.command';
  export const queue = 'support.create-ticket';

  export class Request {
    userId: number;
    question: string;
  }

  export class ResponsePayload {
    ticket: ITicket;
  }

  export class Response implements IPayload<ResponsePayload> {
    error: Error | null;
    payload: ResponsePayload | null;
  }
}
