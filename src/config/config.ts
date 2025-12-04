import dotenv from 'dotenv';

dotenv.config({
    path:`.env.${process.env.NODE_ENV}`
})

interface Config {
    PORT:number,
    DB_HOST:string,
    DB_USER:string,
    DB_DATABASE:string,
    DB_PASSWORD:string,
    JWT_SECRETKEY:string
}

const config:Config = {
    PORT: Number(process.env.PORT) || 5000,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_DATABASE: process.env.DB_DATABASE || 'thesis_db',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    JWT_SECRETKEY:process.env.JWT_SECRETKEY || 'Ssst!'
}   

export default config;