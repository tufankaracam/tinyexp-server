class AppError extends Error {
    operational = true;

    constructor(
        public code: number,
        message: string
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export default AppError;