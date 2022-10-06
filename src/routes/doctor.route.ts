import { ROLE_ADMIN_CODE } from '@commons/constant.common';
import { AuthController } from '@controllers/auth.controller';
import { DoctorController } from '@controllers/doctor.controller';
import { protect, restrictTo } from '@middlwares/auth.middleware';
import { upload } from '@middlwares/image.middleware';
import { resizeUserImage } from '@middlwares/user.middleware';
import { Router } from 'express';

export class DoctorRoute {
	public path = '/doctors';
	public router = Router();
	public doctorController = new DoctorController();
	public authController = new AuthController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.use(protect);

		this.router
			.route(`${this.path}/me`)
			.get(this.doctorController.getMe)
			.get(this.doctorController.getCurrentDoctor)
			.patch(
				upload.single('photo'),
				resizeUserImage,
				this.doctorController.updateMe,
			)
			.delete(this.doctorController.deleteMe);

		this.router
			.route(`${this.path}/me/schedule`)
			.post(this.doctorController.createAvailableSchedule);

		this.router.use(restrictTo(ROLE_ADMIN_CODE));

		this.router.route(`${this.path}/`).post(this.doctorController.createDoctor);

		this.router
			.route(`${this.path}/schedules`)
			.get(this.doctorController.getAllDoctorSchedules);

		this.router
			.route(`${this.path}/:id`)
			.patch(this.doctorController.updateDoctor)
			.delete(this.doctorController.deleteDoctor);
	}
}
