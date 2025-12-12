import mysql from 'mysql2/promise';
import config from './config/config';

const pool = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    database: config.DB_DATABASE,
    password: config.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    dateStrings: true,
});

export default pool;