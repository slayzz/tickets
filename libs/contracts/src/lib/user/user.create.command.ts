import { IsEmail, IsString } from 'class-validator';
import { IPayload, IUser } from '@tickets/interfaces';

export namespace UserCreate {
  export const topic = 'user.create.command';
  export const queue = 'user.create';

  export class Request {
    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsString()
    passwordHash: string;
  }

  export class ResponsePayload {
    user: Omit<IUser, 'passwordHash'>;
  }

  export class Response implements IPayload<ResponsePayload>{
    error: Error | null;
    payload: ResponsePayload | null;
  }
}
