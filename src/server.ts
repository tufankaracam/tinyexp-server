import app from './app';
import pool from './db';
import config from './config/config';

const startServer = async () => {
	try {
		const conn = await pool.getConnection();
		console.log(`Database connection successfully!`);
		conn.release();

		const server = app.listen(config.PORT, () => {
			console.log(`Server running on ${config.PORT}`);
		});

		const gracefulShutdown = async () => {
			console.log('⏹️ Shutdown signal received, closing connections...');

			server.close(async () => {
				console.log('✅ HTTP server closed');

				try {
					await pool.end();
					console.log('✅ Database connection closed');
					process.exit(0);
				} catch (error) {
					console.error('❌ Error closing database:', error);
					process.exit(1);
				}
			});

			setTimeout(() => {
				console.error('⚠️ Force shutdown after 30s timeout');
				process.exit(1);
			}, 30000);
		};

		process.on('SIGTERM', gracefulShutdown);
		process.on('SIGINT', gracefulShutdown);

		process.on('unhandledRejection', (reason, promise) => {
			console.error('Unhandled Rejection:', reason);
			process.exit(1);
		});

	} catch (err: any) {
		console.error(`Server start failed!`, err.message);
		process.exit(1);
	}
};

startServer();