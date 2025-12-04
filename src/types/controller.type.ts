export interface ApiResponse<T = null> {
    success: boolean;
    data?: T;
    message: string | null;
    timestamp: string;
}