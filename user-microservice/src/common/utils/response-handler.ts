export class ResponseHandler {
    static successResponse(data: any, message: string, statusCode: number) {
        return {
            statusCode: statusCode || 200,
            message: message,
            data: data,
            success: true,
        };
    }

    static errorResponse(error: any, message: string) {
        return {
            statusCode: error.status || 500,
            message: message,
            success: false,
            error: error.message || 'Internal Server Error',
        };
    }
}