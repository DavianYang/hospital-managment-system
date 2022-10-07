import { DoctorController } from '@controllers/doctor.controller';
import { protect } from '@middlwares/auth.middleware';
import { upload } from '@middlwares/image.middleware';
import { resizeUserImage } from '@middlwares/user.middleware';
import { Router } from 'express';

export class DoctorRoute {
	public path = '/doctors';
	public router = Router();
	public doctorController = new DoctorController();

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

		// TODO: enable current doctor to see his schedules and appointments
		this.router.route(`${this.path}/me/schedules`);
	}
}
