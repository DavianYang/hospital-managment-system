import { Router } from 'express';

import { ROLE_ADMIN_CODE } from '@commons/constant.common';
import { DoctorController } from '@controllers/doctor.controller';
import { PatientController } from '@controllers/patient.controller';
import { restrictTo } from '@middlwares/auth.middleware';

import { DoctorRoute } from './doctor.route';
import { PatientRoute } from './patient.route';

export class DashboardRoute {
	public router = Router();

	// Doctor
	private doctorRoute = new DoctorRoute();
	private doctorPath = this.doctorRoute.path;
	private doctorController = new DoctorController();

	// Patient
	private patientRoute = new PatientRoute();
	private patientPath = this.patientRoute.path;
	private patientController = new PatientController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		// Doctor
		this.router.use(restrictTo(ROLE_ADMIN_CODE));

		this.router
			.route(`${this.doctorPath}/`)
			.post(this.doctorController.createDoctor);

		this.router
			.route(`${this.doctorPath}/:id`)
			.get(this.doctorController.getDoctor)
			.patch(this.doctorController.updateDoctor)
			.delete(this.doctorController.deleteDoctor);

		this.router
			.route(`${this.patientPath}/`)
			.get(this.patientController.getAllPatients)
			.post(this.patientController.createPatient);

		this.router
			.route(`${this.patientPath}/:id`)
			.get(this.patientController.getPatient)
			.patch(this.patientController.updatePatient)
			.delete(this.patientController.deletePatient);
	}
}
