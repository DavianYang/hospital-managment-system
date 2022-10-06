import ApiError from '@exceptions/api.error';
import * as strings from '@resources/strings';
import { AdminService } from '@services/admin.service';
import { UserService } from '@services/user.service';
import catchAsync from '@utils/catch-async';
import { NextFunction, Request, Response } from 'express';

export class AdminController {
	private userService = new UserService();
	private adminService = new AdminService();

	public getMe = (req: Request, res: Response, next: NextFunction) => {
		req.params.id = req.user.id;
		next();
	};

	// GET
	public getAllAdmins = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const admins = await this.adminService.findAllAdmins(req.query);

			res.status(200).json({
				status: 'success',
				results: admins.length,
				data: admins,
			});
		},
	);

	public getCurrentAdmin = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const adminUser = await this.userService.findUserById(req.params.id);

			if (!adminUser) {
				return next(new ApiError(strings.USER_WITH_ID_NOT_FOUND, 404));
			}

			const admin = await this.adminService.findAdminByUserId(adminUser);

			if (!admin) {
				return next(new ApiError(strings.USER_WITH_ID_NOT_FOUND, 404));
			}

			res.status(200).json({
				status: 'success',
				data: {
					data: admin,
				},
			});
		},
	);

	public getAdmin = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const admin = await this.adminService.findAdmin(req.params.id);

			if (!admin) {
				return next(new ApiError(strings.USER_WITH_ID_NOT_FOUND, 404));
			}

			res.status(200).json({
				status: 'success',
				data: {
					data: admin,
				},
			});
		},
	);

	// CREATE
	public createAdmin = catchAsync(async (req: Request, res: Response) => {
		const createdAdmin = await this.adminService.createAdmin(req.body);

		res.status(200).json({
			status: 'success',
			data: {
				data: createdAdmin,
			},
		});
	});

	// UPDATE
	public updateMe = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			if (req.body.password || req.body.passwordConfirm) {
				return next(new ApiError(strings.USER_ROUTE_NOT_FOR_UPDATE, 404));
			}

			const updatedAdmin = await this.adminService.updateCurrentAdmin(
				req.user.id,
				req.body,
				req.file && req.file.filename,
			);

			res.status(200).json({
				status: 'success',
				data: {
					user: updatedAdmin,
				},
			});
		},
	);

	public updateAdmin = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const updatedAdmin = await this.adminService.updateAdmin(
				req.params.id,
				req.body,
			);

			if (!updatedAdmin) {
				return next(new ApiError(strings.USER_WITH_ID_NOT_FOUND, 404));
			}

			res.status(200).json({
				status: 'success',
				data: {
					data: updatedAdmin,
				},
			});
		},
	);

	// DELETE
	public deleteMe = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const deactivatedUser = await this.userService.deleteCurrentUser(
				req.user.id,
			);
			await this.adminService.deleteCurrentAdmin(deactivatedUser);

			res.status(204).json({
				status: 'success',
				data: null,
			});
		},
	);

	public deleteAdmin = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const admin = await this.adminService.findAdmin(req.params.id);
			await this.userService.deleteUser(admin.user._id.toString());
			await this.adminService.deleteAdmin(req.params.id);

			res.status(204).json({
				status: 'success',
				data: null,
			});
		},
	);
}
