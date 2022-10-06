import ApiError from '@exceptions/api.error';
import * as strings from '@resources/strings';
import { AppointmentService } from '@services/appointment.service';
import catchAsync from '@utils/catch-async';
import { NextFunction, Request, Response } from 'express';

export class AppointmentController {
	private appointmentService = new AppointmentService();

	// GET
	public getAllAppointments = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const appointments = await this.appointmentService.findAllAppointments(
				req.query,
			);

			res.status(200).json({
				status: 'success',
				results: appointments.length,
				data: appointments,
			});
		},
	);

	public getAppointment = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const appointment = await this.appointmentService.findAppointment(
				req.params.id,
			);

			if (!appointment) {
				return next(new ApiError(strings.APPOINTMENT_WITH_ID_NOT_FOUND, 404));
			}

			res.status(200).json({
				status: 'success',
				data: {
					data: appointment,
				},
			});
		},
	);

	// CREATE
	public createAppointment = catchAsync(async (req: Request, res: Response) => {
		const createdAppointment = await this.appointmentService.createAppointment(
			req.body,
		);

		res.status(200).json({
			status: 'success',
			data: {
				data: createdAppointment,
			},
		});
	});

	// UPDATE
	public updateAppointment = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const updateAppointment = await this.appointmentService.updateAppointment(
				req.params.id,
				req.body,
			);

			if (!updateAppointment) {
				return next(new ApiError(strings.APPOINTMENT_WITH_ID_NOT_FOUND, 404));
			}

			res.status(200).json({
				status: 'success',
				data: {
					data: updateAppointment,
				},
			});
		},
	);

	// DELETE
	public deleteAppointment = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			await this.appointmentService.deleteAppointment(req.params.id);

			res.status(204).json({
				status: 'success',
				data: null,
			});
		},
	);
}
