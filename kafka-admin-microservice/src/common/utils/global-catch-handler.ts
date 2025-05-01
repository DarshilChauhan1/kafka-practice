import { ExceptionFilter, HttpStatus } from "@nestjs/common";
import { ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { Response } from "express";
import { ResponseHandler } from "./response-handler";

@Catch()
export class GlobalCatchHandler implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>();
        try {
            const exceptionResponse = exception instanceof HttpException ? exception.getResponse() : ""

            const httpStatus : number = exception instanceof HttpException ? exception.getStatus() : exception['statusCode'] || HttpStatus.INTERNAL_SERVER_ERROR;
            let responseBody = {
                statusCode: httpStatus,
                message: exceptionResponse['message'] ? exceptionResponse['message'] : exception.message || "Something went wrong",
                success: false
            }

            //For custom error if we provide redirectTo
            if (exceptionResponse['redirectTo'] != "") responseBody['redirectTo'] = exceptionResponse['redirectTo']
            //sending the error response 
            response.status(httpStatus).json(responseBody);
        } catch (error) {
            console.log(error)
            const errorResponse = ResponseHandler.errorResponse(error, "Something went wrong")
            response.status(errorResponse.statusCode).json(errorResponse);
        }
    }

}