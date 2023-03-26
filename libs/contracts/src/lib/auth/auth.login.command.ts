import { IsEmail, IsString } from 'class-validator';
import { IPayload } from '@tickets/interfaces';

export namespace AuthLogin {
  export const topic = 'auth.login.command';
  export const queue = 'auth.login';

  export class Request {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
  }

  export class ResponsePayload {
    accessToken: string;
  }

  export class Response implements IPayload<ResponsePayload>{
    error: Error | null;
    payload: ResponsePayload | null;
  }
}
