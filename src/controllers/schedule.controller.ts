import ApiError from '@exceptions/api.error';
import * as strings from '@resources/strings';
import { ScheduleService } from '@services/schedule.service';
import catchAsync from '@utils/catch-async';
import { NextFunction, Request, Response } from 'express';

export class ScheduleController {
	private scheduleService = new ScheduleService();

	// GET
	public getAllSchedules = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const schedules = await this.scheduleService.findAllSchedules(req.query);

			res.status(200).json({
				status: 'success',
				results: schedules.length,
				data: schedules,
			});
		},
	);

	public getSchedule = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const schedule = await this.scheduleService.findSchedule(req.params.id);

			if (!schedule) {
				return next(new ApiError(strings.SCHEDULE_WITH_ID_NOT_FOUND, 404));
			}

			res.status(200).json({
				status: 'success',
				data: {
					data: schedule,
				},
			});
		},
	);

	// CREATE
	public createSchedule = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const createdSchedule = await this.scheduleService.createSchedule(
				req.body,
				next,
			);

			res.status(200).json({
				status: 'success',
				data: {
					data: createdSchedule,
				},
			});
		},
	);

	// UPDATE
	public updateSchedule = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const updateSchedule = await this.scheduleService.updateSchedule(
				req.params.id,
				req.body,
				next
			);

			if (!updateSchedule) {
				return next(new ApiError(strings.SCHEDULE_WITH_ID_NOT_FOUND, 404));
			}

			res.status(200).json({
				status: 'success',
				data: {
					data: updateSchedule,
				},
			});
		},
	);

	// DELETE
	public deleteSchedule = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			await this.scheduleService.deleteSchedule(req.params.id);

			res.status(204).json({
				status: 'success',
				data: null,
			});
		},
	);
}
