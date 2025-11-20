import { AxiosError } from "axios";

export const handleError = (error: unknown, defaultMessage: string) => {
    if (error instanceof AxiosError) {
        return Promise.reject(error.response?.data || defaultMessage);
    } else if (error instanceof Error) {
        return Promise.reject(error.message || defaultMessage);
    } else {
        return Promise.reject(defaultMessage);
    }
};