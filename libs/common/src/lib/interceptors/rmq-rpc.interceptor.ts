import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { catchError, of } from 'rxjs';
import { isRabbitContext } from '@golevelup/nestjs-rabbitmq';
import { RpcError } from '../errors/rpc-error';

@Injectable()
export class RmqRpcInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    if (!isRabbitContext(context)) {
      return next.handle();
    }

    return next
      .handle()
      .pipe(
        catchError((error: Error) => {
          if (error instanceof RpcError) {
            return of({ error: { message: error.message, name: error.name }, payload: null });
          }

          return of({ error: { message: error.message, name: error.name }, payload: null });
        }),
      );
  }
}
