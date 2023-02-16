import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
        if (!data.statusCode || data.statusCode == HttpStatus.OK) {
          context.switchToHttp().getResponse().status(HttpStatus.OK);
          return { ...data };
        } else {
          context.switchToHttp().getResponse().status(data.statusCode);
          return { ...data };
        }
      }),
    );
  }
}
