import { AuthService } from '@services/auth.service';
import catchAsync from '@utils/catch-async';
import { NextFunction, Request, Response } from 'express';
import ms from 'ms';
import { config } from '../config';

export class AuthController {
	private authService = new AuthService();

	public logIn = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const result = await this.authService.logIn(req, res, next);

			res.status(201).json({
				status: 'success',
				token: result.token,
				data: {
					user: result.user,
				},
			});
		},
	);

	public logOut = (req: Request, res: Response) => {
		res.cookie('jwt', 'loggedout', {
			expires: this.authService.getExpiryDate(
				ms(config.authConfig.cookieOption.duration),
			),
			httpOnly: config.authConfig.cookieOption.httpOnly,
		});
		res.status(204).json({ status: 'success' });
	};
}
