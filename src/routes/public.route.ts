import { DoctorController } from '@controllers/doctor.controller';
import { Router } from 'express';
import { DoctorRoute } from './doctor.route';

export class PublicRoute {
	public router = Router();
    private doctorRoute = new DoctorRoute()
	private doctorPath = this.doctorRoute.path;
	private doctorController = new DoctorController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
        // Doctor
        this.router
        .route(`${this.doctorPath}/`)
        .get(this.doctorController.getAllDoctors)

        this.router
        .route(`${this.doctorPath}/:id`)
        .get(this.doctorController.getDoctor)
	}
}
