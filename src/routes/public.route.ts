import { Router } from 'express';

import { DoctorController } from '@controllers/doctor.controller';
import { HospitalController } from '@controllers/hospital.controller';
import { ScheduleController } from '@controllers/schedule.controller';

import { DoctorRoute } from './doctor.route';
import { HospitalRoute } from './hospital.route';
import { ScheduleRoute } from './schedule.route';

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

	// Schedule
	private scheduleRoute = new ScheduleRoute();
	private schedulePath = this.scheduleRoute.path;
	private scheduleController = new ScheduleController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		// Doctor
		this.router
			.route(`${this.doctorPath}/`)
			.get(this.doctorController.getAllDoctors);

		// Hospital
		this.router
			.route(`${this.hospitalPath}/`)
			.get(this.hospitalController.getAllHospitals);

		this.router
			.route(`${this.hospitalPath}/:id`)
			.get(this.hospitalController.getHospital);

		// Schedule
		this.router
			.route(`${this.schedulePath}/`)
			.get(this.scheduleController.getAllSchedules);

		this.router
			.route(`${this.schedulePath}/:id`)
			.get(this.scheduleController.getSchedule);
	}
}
