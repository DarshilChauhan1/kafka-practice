export class ResponseHandler {
    static successResponse(data: any, message: string, statusCode: number) {
        return {
            statusCode: statusCode || 200,
            message: message,
            data: data,
            success: true,
        };
    }

    static errorResponse(message: string, statusCode: number, error?: any) {
        return {
            statusCode: statusCode || 500,
            message: message,
            success: false,
            error: error.message || 'Internal Server Error',
        };
    }
}