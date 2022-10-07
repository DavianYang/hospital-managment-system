import { AdminRoute } from '@routes/admin.route';
import { DashboardRoute } from '@routes/dashboard.route';
import { DoctorRoute } from '@routes/doctor.route';
import { HospitalRoute } from '@routes/hospital.route';
import { IndexRoute } from '@routes/index.route';
import { LoginRoute } from '@routes/login.route';
import { PatientRoute } from '@routes/patient.route';
import { PublicRoute } from '@routes/public.route';
import { RoleRoute } from '@routes/role.route';
import { ScheduleRoute } from '@routes/schedule.route';

import { logger } from '@utils/logger';
import App from './app';

process.on('uncaughtException', (err: Error) => {
	logger.error('UNCAUGHT EXCEPTION!! Shutting down...');
	logger.error(`${err.name}: ${err.message}`);

	process.exit(1);
});

const app = new App([
	new IndexRoute(),
	new PublicRoute(),
	new LoginRoute(),
	new DoctorRoute(),
	new PatientRoute(),
	new AdminRoute(),
	new DashboardRoute(),
	new ScheduleRoute(),
	new HospitalRoute(),
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
