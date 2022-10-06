import { ROLE_ADMIN_CODE } from '@commons/constant.common';
import { RoleController } from '@controllers/role.controller';
import { protect, restrictTo } from '@middlwares/auth.middleware';
import { Router } from 'express';

export class RoleRoute {
	public path = '/roles';
	public router = Router();
	private roleController = new RoleController();

	constructor() {
		this.initializeRoutes();
	}
	private initializeRoutes() {
		this.router.use(protect);
		this.router.use(restrictTo(ROLE_ADMIN_CODE));

		this.router
			.route(`${this.path}/`)
			.get(this.roleController.getAllRoles)
			.post(this.roleController.createRole);

		this.router
			.route(`${this.path}/:id`)
			.get(this.roleController.getRole)
			.patch(this.roleController.updateRole)
			.delete(this.roleController.deleteRole);
	}
}
