import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();

    const getRes: any = exception.getResponse();

    response.status(status).json({
      statusCode: status,
      message: getRes.message,
      error: 'BAD_REQUEST',
    });
  }
}

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response
      .status(status)

      .json({
        statusCode: status,
        message: 'Insufficient permissions to take action',
        error: 'FORBIDDEN',
      });
  }
}

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response
      .status(status)

      .json({
        statusCode: status,
        error: 'UNAUTHORIZED',
      });
  }
}
