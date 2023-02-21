import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';

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
    const now = new Date().toISOString();
    console.log(`💥💥 ${method}  ~ ${url}... ${now}`);
    return next.handle().pipe(
      map((data) => {
        return this.matching(method, data, context);
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
    let status = 200;

    switch (true) {
      case !data:
        break;
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
    return data;
  }
}

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
}
