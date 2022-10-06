import { ROLE_ADMIN_CODE } from '@commons/constant.common';
import { ScheduleController } from '@controllers/schedule.controller';
import { protect, restrictTo } from '@middlwares/auth.middleware';
import { Router } from 'express';

export class ScheduleRoute {
	public path = '/schedules';
	public router = Router();
	public scheduleController = new ScheduleController();

	constructor() {
		this.initializeRoutes();
	}
	private initializeRoutes() {
		this.router.use(protect);
		this.router.use(restrictTo(ROLE_ADMIN_CODE));

		this.router
			.route(`${this.path}/`)
			.post(this.scheduleController.createSchedule);

		this.router
			.route(`${this.path}/:id`)
			.patch(this.scheduleController.updateSchedule)
			.delete(this.scheduleController.deleteSchedule);
	}
}
