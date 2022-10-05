import ApiError from '@exceptions/api.error';
import * as strings from '@resources/strings';
import { RoleService } from '@services/role.service';
import catchAsync from '@utils/catch-async';
import { NextFunction, Request, Response } from 'express';

export class RoleController {
	private roleService = new RoleService();

	// GET
	public getAllRoles = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const roles = await this.roleService.findAllRoles(req.query);

			res.status(200).json({
				status: 'success',
				results: roles.length,
				data: roles,
			});
		},
	);

	public getRole = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const role = await this.roleService.findRoleById(req.params.id);

			if (!role) {
				return next(new ApiError(strings.ROLE_WITH_ID_NOT_FOUND, 404));
			}

			res.status(200).json({
				status: 'success',
				data: {
					data: role,
				},
			});
		},
	);

	// CREATE
	public createRole = catchAsync(async (req: Request, res: Response) => {
		const createdRole = await this.roleService.createRole(req.body);

		res.status(200).json({
			status: 'success',
			data: {
				data: createdRole,
			},
		});
	});

	// UPDATE
	public updateRole = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const updateRole = await this.roleService.updateRole(
				req.params.id,
				req.body,
			);

			if (!updateRole) {
				return next(new ApiError(strings.ROLE_WITH_ID_NOT_FOUND, 404));
			}

			res.status(200).json({
				status: 'success',
				data: {
					data: updateRole,
				},
			});
		},
	);

	// DELETE
	public deleteRole = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			await this.roleService.deleteRole(req.params.id);

			res.status(204).json({
				status: 'success',
				data: null,
			});
		},
	);
}
