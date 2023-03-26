import { IsEmail } from 'class-validator';
import { IPayload, IUser } from '@tickets/interfaces';

export namespace UserGet {
  export const topic = 'user.get.query';
  export const queue = 'user.get';

  export class Request {
    @IsEmail()
    email: string;
  }


  export class ResponsePayload {
    user: IUser;
  }

  export class Response implements IPayload<ResponsePayload>{
    error: Error | null;
    payload: ResponsePayload | null;
  }
}
