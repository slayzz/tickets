import { IPayload, ITicket } from '@tickets/interfaces';

export namespace SupportGetTicketQuery {
  export const topic = 'support.get-ticket.query';
  export const queue = 'support.get-ticket';

  export class Request {
    id: number;
  }

  export class ResponsePayload {
    ticket: ITicket;
  }

  export class Response implements IPayload<ResponsePayload> {
    error: Error | null;
    payload: ResponsePayload | null;
  }
}
