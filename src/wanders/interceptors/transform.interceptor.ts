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
    return next.handle().pipe(
      map((data) => {
        return this.matching(data, context);
      }),
      timeout(30000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  }

  matching(data: any, context: ExecutionContext) {
    let status = 200;
    const request = context.switchToHttp().getRequest();
    const { url, method } = request;
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

    const now = new Date().toISOString();
    context.switchToHttp().getResponse().status(status);

    console.log(`💥💥 ${method}  ~ ${url}  ${status} ... ${now}`);
    return data;
  }
}

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
}
