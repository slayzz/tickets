import { IsEmail, IsString } from 'class-validator';
import { IPayload } from '@tickets/interfaces';

export namespace AuthRegister {
  export const topic = 'auth.register.command';
  export const queue = 'auth.register';


  export class Request {
    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
  }


  export class ResponsePayload {
    id: number;
    fullName: string;
    email: string;
  }

  export class Response implements IPayload<ResponsePayload> {
    error: Error | null;
    payload: ResponsePayload | null;
  }
}
