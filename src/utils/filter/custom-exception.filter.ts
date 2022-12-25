import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const isHttpException = exception instanceof HttpException;
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus() == null ? 500 : exception.getStatus();

    const message = isHttpException
      ? exception.getResponse()['message']
      : exception.toString();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}
