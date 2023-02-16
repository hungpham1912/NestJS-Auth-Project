import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { statusCode } = response;
    const { url, method } = request;

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `💥💥 ${method} ~ ${statusCode} ~ ${url}... ${Date.now() - now}ms`,
          ),
        ),
      );
  }
}
