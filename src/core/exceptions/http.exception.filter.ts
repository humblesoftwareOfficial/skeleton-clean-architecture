/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorMessages } from './utils.exceptions';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = exception?.getResponse ? exception.getResponse() : undefined;
    const message =
      exceptionResponse && typeof exceptionResponse === 'object' && 'message' in exceptionResponse
        ? (exceptionResponse as { message: unknown }).message
        : exceptionResponse ?? ErrorMessages.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      code: status,
      message,
      data: null,
      success: false,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
