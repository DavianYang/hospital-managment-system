import { Router } from 'express';

import { PatientController } from '@controllers/patient.controller';
import { protect } from '@middlwares/auth.middleware';
import { upload } from '@middlwares/image.middleware';
import { resizeUserImage } from '@middlwares/user.middleware';

export class PatientRoute {
	public path = '/patients';
	public router = Router();
	private patientController = new PatientController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.use(protect);

		// TODO: enable patient to see his appointments
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

		this.router
			.route(`${this.path}/me/appointments`)
			.post(this.patientController.createPatientAppointment);
	}
}
