import { DoctorController } from '@controllers/doctor.controller';
import { HospitalController } from '@controllers/hospital.controller';
import { Router } from 'express';
import { DoctorRoute } from './doctor.route';
import { HospitalRoute } from './hospital.route';

export class PublicRoute {
	public router = Router();

	// Doctor
	private doctorRoute = new DoctorRoute();
	private doctorPath = this.doctorRoute.path;
	private doctorController = new DoctorController();

	// Hospital
	private hospitalRoute = new HospitalRoute();
	private hospitalPath = this.hospitalRoute.path;
	private hospitalController = new HospitalController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		// Doctor
		this.router
			.route(`${this.doctorPath}/`)
			.get(this.doctorController.getAllDoctors);

		this.router
			.route(`${this.doctorPath}/:id`)
			.get(this.doctorController.getDoctor);

		// Hospital
		this.router
			.route(`${this.hospitalPath}/`)
			.get(this.hospitalController.getAllHospitals);

		this.router
			.route(`${this.hospitalPath}/:id`)
			.get(this.hospitalController.getHospital);
	}
}
