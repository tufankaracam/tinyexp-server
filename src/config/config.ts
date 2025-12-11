import dotenv from 'dotenv';

dotenv.config({
    path:`.env.${process.env.NODE_ENV}`
})

interface Config {
    URL:string,
    PORT:number,
    DB_HOST:string,
    DB_USER:string,
    DB_DATABASE:string,
    DB_PASSWORD:string,
    JWT_SECRETKEY:string,
    SMTP_HOST:string,
    SMTP_PORT:string,
    SMTP_USER:string,
    SMTP_PASS:string,
}

const config:Config = {
    URL:process.env.URL || "https://tinyexp.pro",
    PORT: Number(process.env.PORT) || 5000,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_DATABASE: process.env.DB_DATABASE || 'thesis_db',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    JWT_SECRETKEY:process.env.JWT_SECRETKEY || 'Ssst!',
    SMTP_HOST:process.env.SMTP_HOST!,
    SMTP_PORT:process.env.SMTP_PORT!,
    SMTP_USER:process.env.SMTP_USER!,
    SMTP_PASS:process.env.SMTP_PASS!,
}   

export default config;