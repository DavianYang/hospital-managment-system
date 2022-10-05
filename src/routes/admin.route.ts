import { AdminController } from '@controllers/admin.controller';
import { AuthController } from '@controllers/auth.controller';
import { protect, restrictTo } from '@middlwares/auth.middleware';
import { upload } from '@middlwares/image.middleware';
import { resizeUserImage } from '@middlwares/user.middleware';
import { ROLE_ADMIN_CODE } from 'common/constant.common';
import { Router } from 'express';

export class AdminRoute {
	public path = '/admins';
	public router = Router();
	public adminController = new AdminController();
	public authController = new AuthController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.use(protect);

		this.router
			.route(`${this.path}/me`)
			.get(this.adminController.getMe)
			.get(this.adminController.getCurrentAdmin)
			.patch(
				upload.single('photo'),
				resizeUserImage,
				this.adminController.updateMe,
			)
			.delete(this.adminController.deleteMe);

		this.router.use(restrictTo(ROLE_ADMIN_CODE));

		this.router
			.route(`${this.path}/`)
			.get(this.adminController.getAllAdmins)
			.post(this.adminController.createAdmin);

		this.router
			.route(`${this.path}/:id`)
			.get(this.adminController.getAdmin)
			.patch(this.adminController.updateAdmin)
			.delete(this.adminController.deleteAdmin);
	}
}
