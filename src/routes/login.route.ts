import { AuthController } from '@controllers/auth.controller';
import { DoctorController } from '@controllers/doctor.controller';
import { Router } from 'express';
import { AdminRoute } from './admin.route';
import { DoctorRoute } from './doctor.route';

export class LoginRoute {
	public router = Router();
    private adminRoute = new AdminRoute()
    private doctorRoute = new DoctorRoute()
    private adminPath = this.adminRoute.path;
	private doctorPath = this.doctorRoute.path;
	private doctorController = new DoctorController();
	private authController = new AuthController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
        // Admin
        this.router.post(`${this.adminPath}/login`, this.authController.logIn)
        this.router.post(`${this.adminPath}/logout`, this.authController.logIn)

        // Doctor
		this.router.post(`${this.doctorPath}/register`, this.doctorController.register);
		this.router.post(`${this.doctorPath}/login`, this.authController.logIn);
		this.router.post(`${this.doctorPath}/logout`, this.authController.logOut);
	}
}
