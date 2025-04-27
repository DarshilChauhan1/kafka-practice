export interface ResponseInterface {
    statusCode: number;
    message: string;
    data?: any;
    success: boolean;
    error?: string;
    redirectTo?: string; // Optional field for redirect URL
}