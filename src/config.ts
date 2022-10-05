const dotenv = require('dotenv');
import * as strings from '@resources/strings';

dotenv.config({
	path: `.env.${
		process.env.NODE_ENV === 'development'
			? 'dev'
			: process.env.NODE_ENV === 'production'
			? 'prod'
			: 'test'
	}`,
});

const ApiConfig = {
	hostname: process.env.HOSTNAME || 'localhost',
	port: +(process.env.PORT || 8000),
	apiPrefix: 'api',
	apiVersion: 1,
	dataLimit: '10kb',
	cors: {
		origin: process.env.CORS_ORIGIN || ([] as Array<String>),
		credentials: true,
	},
	rateLimit: {
		max: 100, // limit each ip to 100 request per windowMS
		windowMs: 60 * 60 * 1000,
		message: strings.REQUEST_OVERLOAD_TRY_AGAIN_IN_AN_HOUR,
	},
};

const AuthConfig = {
	superadminCredentials: {
		username: 'superadmin',
		emailAddress: 'superadmin@gmail.com',
		password: 'superadmin',
	},
	jwtOptions: {
		secret: process.env.JWT_SECRET,
		duration: process.env.JWT_EXPIRE_IN,
	},
	cookieOption: {
		duration: '1y',
		httpOnly: true,
	},
};

const EmailConfig = {
	service: process.env.EMAIL_SERVICE,
	username: process.env.EMAIL_USERNAME,
	password: process.env.EMAIL_PASSWORD,
	host: process.env.EMAIL_HOST,
	port: process.env.EMAIL_PORT,
	fromEmail: 'kothantyarzarhein@gmail.com',
	fromUser: 'Thant Yar Zar Hein',
};

export const config = {
	// Environment
	environ: process.env.NODE_ENV || 'development',
	// API Config
	apiConfig: ApiConfig,
	// Database Config
	dbConfig: {
		uri: process.env.DATABASE_URL || '',
	},
	// Auth Config
	authConfig: AuthConfig,
	// Email Config
	emailConfig: EmailConfig,
};
