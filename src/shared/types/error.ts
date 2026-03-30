export interface ErrorResponse {
    timestamp: string,
    status: number,
    error: string,
    message: string,
    validationErrors: Record<string, string> | null,
}