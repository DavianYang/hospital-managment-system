import { AdminRoute } from '@routes/admin.route';
import { DoctorRoute } from '@routes/doctor.route';
import { IndexRoute } from '@routes/index.route';
import { LoginRoute } from '@routes/login.route';
import { RoleRoute } from '@routes/role.route';
import { logger } from '@utils/logger';
import App from './app';

process.on('uncaughtException', (err: Error) => {
	logger.error('UNCAUGHT EXCEPTION!! Shutting down...');
	logger.error(`${err.name}: ${err.message}`);

	process.exit(1);
});

const app = new App([
	new IndexRoute(),
	new LoginRoute(),
	new AdminRoute(),
	new DoctorRoute(),
	new RoleRoute(),
]);

const server = app.listen();

process.on('unhandledRejection', (err: Error) => {
	logger.error('UNHANDLED REJECTION!! Shutting down...');
	logger.error(`${err.name}: ${err.message}`);

	server.close(() => {
		process.exit(1);
	});
});

process.on('SIGTERM', () => {
	logger.info('SIGTERM RECEIVED. Shutting down....');
	server.close(() => {
		logger.info('Process terminated!');
	});
});
