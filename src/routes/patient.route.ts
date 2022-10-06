import { ROLE_ADMIN_CODE } from '@commons/constant.common';
import { PatientController } from '@controllers/patient.controller';
import { protect, restrictTo } from '@middlwares/auth.middleware';
import { upload } from '@middlwares/image.middleware';
import { resizeUserImage } from '@middlwares/user.middleware';
import { Router } from 'express';

export class PatientRoute {
	public path = '/patients';
	public router = Router();
	private patientController = new PatientController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.use(protect);

		this.router
			.route(`${this.path}/me`)
			.get(this.patientController.getMe)
			.get(this.patientController.getCurrentPatient)
			.patch(
				upload.single('photo'),
				resizeUserImage,
				this.patientController.updateMe,
			)
			.delete(this.patientController.deleteMe);

		// TODO: enable patient to see his appointments

		this.router.use(restrictTo(ROLE_ADMIN_CODE));

		this.router
			.route(`${this.path}/`)
			.get(this.patientController.getAllPatients)
			.post(this.patientController.createPatient);

		this.router
			.route(`${this.path}/:id`)
			.get(this.patientController.getPatient)
			.patch(this.patientController.updatePatient)
			.delete(this.patientController.deletePatient);
	}
}
