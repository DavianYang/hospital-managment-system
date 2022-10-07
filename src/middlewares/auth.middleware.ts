import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import ApiError from '@exceptions/api.error';
import { DataStoredInToken } from '@interfaces/auth.interface';
import { roleModel } from '@models/role.model';
import { userModel } from '@models/user.model';
import * as strings from '@resources/strings';
import catchAsync from '@utils/catch-async';

export const protect = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		let token;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1];
		}

		if (!token) {
			return next(new ApiError(strings.NOT_LOGGED_IN, 401));
		}

		const decoded = (await jwt.verify(
			token,
			process.env.JWT_SECRET,
		)) as DataStoredInToken;

		// Check if user still exists
		const currentUser = await userModel.findById(decoded.id);

		// Check if user changed password after token was issued
		if (currentUser.changedPasswordAfter(decoded.iat)) {
			return next(new ApiError(strings.PASSWORD_RECENT_CHANGED, 401));
		}

		const currentRole = await roleModel.findById(currentUser.role._id);

		req.user = currentUser;
		req.role = currentRole;
		res.locals.user = currentUser;
		res.locals.role = currentRole;
		next();
	},
);

export const restrictTo = (...roles: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!roles.includes(req.role.code)) {
			return next(new ApiError(strings.DONT_HAVE_PERMISSION, 403));
		}
		next();
	};
};
