import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import express from 'express';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import xss from 'xss-clean';

import AppError from '@exceptions/api.error';
import Route from '@interfaces/route.interface';
import { errorConverter, errorHandler } from '@middlwares/error.middleware';
import { importInitData } from '@utils/import-init-data';
import { logger, stream } from '@utils/logger';

import { config } from './config';

class App {
	public app: express.Application;

	constructor(routes: Array<Route>) {
		this.app = express();

		this.connectToDatabase();
		this.initializeMiddlewares();
		this.initializeRoutes(routes);
		this.initializeErrorHandling();
	}

	public listen() {
		return this.app.listen(config.apiConfig.port, () => {
			logger.info(`=================================`);
			logger.info(`======= ENV: ${config.environ} =======`);
			logger.info(
				`🚀 App listening on the port http${
					config.environ === 'production' ? 's' : ''
				}://${config.apiConfig.hostname}:${config.apiConfig.port}/`,
			);
			logger.info(`=================================`);
		});
	}

	public getServer() {
		return this.app;
	}

	private async connectToDatabase() {
		mongoose.set('debug', !!(config.environ === 'development'));
		mongoose.connect(config.dbConfig.uri);
		await importInitData();
	}

	public initializeMiddlewares() {
		const limiter = rateLimit(config.apiConfig.rateLimit);

		if (config.environ === 'production') {
			this.app.enable('trust proxy');
			this.app.use(morgan('combined', { stream }));
			this.app.use(cors(config.apiConfig.cors as CorsOptions));
			this.app.use(config.apiConfig.apiPrefix, limiter);
		} else {
			this.app.use(morgan('dev', { stream }));
			this.app.use(cors({ origin: true, credentials: true }));
		}

		// Set security for HTTP headers
		this.app.use(helmet());

		// Body, parser, reading data from req.body
		this.app.use(express.json({ limit: config.apiConfig.dataLimit }));
		this.app.use(
			express.urlencoded({ extended: true, limit: config.apiConfig.dataLimit }),
		);
		this.app.use(cookieParser());

		// Data sanitization against NoSQL query injection
		this.app.use(ExpressMongoSanitize());

		// Data sanitization against XSS
		this.app.use(xss());

		// Compress send API
		this.app.use(compression());
	}

	private initializeRoutes(routes: Route[]) {
		routes.forEach((route) => {
			this.app.use(
				`/${config.apiConfig.apiPrefix}/v${config.apiConfig.apiVersion}/`,
				route.router,
			);
		});
	}

	private initializeErrorHandling() {
		this.app.all('*', (req, res, next) => {
			next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
		});
		this.app.use(errorConverter);
		this.app.use(errorHandler);
	}
}

export default App;
