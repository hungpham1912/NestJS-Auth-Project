import { HttpException, HttpStatus } from '@nestjs/common';

export const Unauthorized = (message: string) => {
  return new HttpException(
    {
      statusCode: HttpStatus.UNAUTHORIZED,
      message: message,
      error: 'Unauthorized',
    },
    HttpStatus.UNAUTHORIZED,
  );
};
