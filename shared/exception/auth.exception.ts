import { HttpException, HttpStatus } from '@nestjs/common';

export const Unauthorized = (message: string, error: string) => {
  return new HttpException(
    {
      statusCode: HttpStatus.UNAUTHORIZED,
      message: message,
      error: error,
    },
    HttpStatus.UNAUTHORIZED,
  );
};
