import { AxiosError } from "axios";
import { ErrorResponse } from "@/shared/types/error";

/**
 * Форматирует ошибку для отображения в toast
 * Извлекает message и validationErrors из ответа бэкенда
 */
export function formatErrorForToast(error: unknown): {
    message: string;
    description: string;
} {
    // Если это AxiosError, пытаемся извлечь данные из response
    if (error instanceof AxiosError) {
        const errorData = error.response?.data as ErrorResponse | undefined;
        
        if (errorData) {
            const message = errorData.message || "Произошла ошибка";
            const validationErrors = errorData.validationErrors;
            
            // Формируем описание: message + validationErrors (если есть)
            let description = message;
            
            if (validationErrors && Object.keys(validationErrors).length > 0) {
                const validationMessages = Object.entries(validationErrors)
                    .map(([field, errorMsg]) => `${field}: ${errorMsg}`)
                    .join("\n");
                description = `${message}\n${validationMessages}`;
            }
            
            return {
                message: errorData.error || "Ошибка",
                description,
            };
        }
        
        // Если есть error.message, используем его
        if (error.message) {
            return {
                message: "Ошибка",
                description: error.message,
            };
        }
    }
    
    // Если это обычный Error
    if (error instanceof Error) {
        return {
            message: "Ошибка",
            description: error.message || "Произошла неизвестная ошибка",
        };
    }
    
    // Fallback
    return {
        message: "Ошибка",
        description: "Произошла неизвестная ошибка",
    };
}

