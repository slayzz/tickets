import { IPayload, ITicket, TicketStateStatus } from '@tickets/interfaces';

export namespace SupportChangeStatusTicketCommand {

  export const topic = 'support.change-status-ticket.command';
  export const queue = 'support.change-status-ticket';

  export class Request {
    id: number;
    status: TicketStateStatus;
  }

  export class ResponsePayload {
    ticket: ITicket;
  }

  export class Response implements IPayload<ResponsePayload> {
    error: Error | null;
    payload: ResponsePayload | null;
  }
}
