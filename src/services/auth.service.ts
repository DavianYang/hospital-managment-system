import jwt from 'jsonwebtoken';
import ms from 'ms';

import ApiError from '@exceptions/api.error';
import * as strings from '@resources/strings';
import { UserService } from '@services/user.service';
import { NextFunction, Request, Response } from 'express';

import { config } from '../config';

export class AuthService {
	private userService = new UserService();

	public signJWTToken = (id: string) => {
		const token = jwt.sign({ id }, config.authConfig.jwtOptions.secret, {
			expiresIn: config.authConfig.jwtOptions.duration,
		});

		return token;
	};

	public generateJWTToken = (req: Request, res: Response, userId: string) => {
		const token = this.signJWTToken(userId);

		// Save jwt token to cookie and set security and expired date
		res.cookie('jwt', token, {
			expires: this.getExpiryDate(ms(config.authConfig.cookieOption.duration)),
			httpOnly: config.authConfig.cookieOption.httpOnly,
			secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
		});

		return token;
	};

	public logIn = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<any> => {
		const { email, password } = req.body;

		if (!email || !password) {
			return next(new ApiError(strings.PROVIDE_EMAIL_PASSWORD, 400));
		}

		const user = await this.userService.findUserByEmail(email);

		if (!user || !(await user.isPasswordMatch(password, user.password))) {
			return next(new ApiError(strings.INCORRECT_EMAIL_PASSWORD, 401));
		}

		// Remove password which was from query from output
		user.password = undefined;

		const token = this.generateJWTToken(req, res, user._id);

		return {
			user,
			token,
		};
	};

	public logOut = (req: Request, res: Response) => {
		res.cookie('jwt', 'loggedout', {
			expires: this.getExpiryDate(ms(config.authConfig.cookieOption.duration)),
			httpOnly: config.authConfig.cookieOption.httpOnly,
		});
		res.status(204).json({ status: 'success' });
	};

	public getExpiryDate = (timeToExpireInMs: number) => {
		return new Date(Date.now() + timeToExpireInMs);
	};
}
