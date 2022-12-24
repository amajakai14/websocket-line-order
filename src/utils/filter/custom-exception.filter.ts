import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const isError = exception instanceof Error;
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    console.log(exception);
    const status = exception.getStatus() == null ? 500 : exception.getStatus();
    const message = isError ? exception.message : exception.toString();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}
