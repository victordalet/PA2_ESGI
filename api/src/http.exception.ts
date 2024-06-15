import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import {Request, Response} from 'express';
import * as process from "node:process";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const request = ctx.getRequest<Request>();


        const status = exception.getStatus();

        if (status === 500) {
            process.exit()
        }


        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message:
                exception.message
                || exception.getResponse()['message']
                || 'Internal Server Error',
        });
    }


}