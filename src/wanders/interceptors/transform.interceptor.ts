import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, map, tap, timeout } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();
    const { url, method } = request;
    const now = Date.now();

    return next.handle().pipe(
      map((data) => {
        return this.matching(method, data, context);
      }),
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        console.log(
          `💥💥 ${method} ~ ${statusCode} ~ ${url}... ${Date.now() - now}ms`,
        );
      }),
      timeout(5000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  }

  matching(method: string, data: any, context: ExecutionContext) {
    let status = 0;
    switch (true) {
      case typeof data.statusCode != 'number' && method == HttpMethod.GET:
        status = HttpStatus.OK;
        break;
      case typeof data.statusCode != 'number' && method == HttpMethod.POST:
        status = HttpStatus.CREATED;
        break;
      case typeof data.statusCode == 'number':
        status = data.statusCode;
        break;
    }
    context.switchToHttp().getResponse().status(status);
    return { ...data };
  }
}

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
}
