import { ROLE_ADMIN_CODE } from '@commons/constant.common';
import { HospitalController } from '@controllers/hospital.controller';
import { protect, restrictTo } from '@middlwares/auth.middleware';
import { Router } from 'express';

export class HospitalRoute {
	public path = '/hospitals';
	public router = Router();
	public hospitalController = new HospitalController();

	constructor() {
		this.initializeRoutes();
	}
	private initializeRoutes() {
		this.router.use(protect);
		this.router.use(restrictTo(ROLE_ADMIN_CODE));

		this.router
			.route(`${this.path}/`)
			.post(this.hospitalController.createHospital);

		this.router
			.route(`${this.path}/:id`)
			.patch(this.hospitalController.updateHospital)
			.delete(this.hospitalController.deleteHospital);

		this.router
			.route(`${this.path}/:id/doctor`)
			.post(this.hospitalController.addDocotor);
	}
}
