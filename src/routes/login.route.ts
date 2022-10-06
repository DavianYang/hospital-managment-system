import { AuthController } from '@controllers/auth.controller';
import { DoctorController } from '@controllers/doctor.controller';
import { PatientController } from '@controllers/patient.controller';
import { Router } from 'express';
import { AdminRoute } from './admin.route';
import { DoctorRoute } from './doctor.route';
import { PatientRoute } from './patient.route';

export class LoginRoute {
	public router = Router();
	// Admin
	private adminRoute = new AdminRoute();
	private adminPath = this.adminRoute.path;
	private authController = new AuthController();

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
		// Admin
		this.router.post(`${this.adminPath}/login`, this.authController.logIn);
		this.router.post(`${this.adminPath}/logout`, this.authController.logIn);

		// Doctor
		this.router.post(
			`${this.doctorPath}/register`,
			this.doctorController.register,
		);
		this.router.post(`${this.doctorPath}/login`, this.authController.logIn);
		this.router.post(`${this.doctorPath}/logout`, this.authController.logOut);

		// Patient
		this.router.post(
			`${this.patientPath}/register`,
			this.patientController.register,
		);
		this.router.post(`${this.patientPath}/login`, this.authController.logIn);
		this.router.post(`${this.patientPath}/logout`, this.authController.logOut);
	}
}
