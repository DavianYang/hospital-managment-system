import { NextFunction, Request, Response } from 'express';

import ApiError from '@exceptions/api.error';
import * as strings from '@resources/strings';
import { AppointmentService } from '@services/appointment.service';
import { AuthService } from '@services/auth.service';
import { PatientService } from '@services/patient.service';
import { UserService } from '@services/user.service';
import catchAsync from '@utils/catch-async';

export class PatientController {
	private userService = new UserService();
	private authService = new AuthService();
	private patientService = new PatientService();
	private appointmentService = new AppointmentService();

	public getMe = (req: Request, res: Response, next: NextFunction) => {
		req.params.id = req.user.id;
		next();
	};

	// Register
	public register = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			// If given email is already registered
			if (await this.userService.isEmailTaken(req.body.email)) {
				return next(new ApiError(strings.EMAIL_ALREADY_TAKEN, 400));
			}
			const patient = await this.patientService.createPatient(req.body);

			const token = this.authService.generateJWTToken(
				req,
				res,
				patient.user._id,
			);

			res.status(201).json({
				status: 'success',
				token,
				data: {
					patient,
				},
			});
		},
	);

	// GET
	public getAllPatients = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const patients = await this.patientService.findAllPatients(req.query);

			res.status(200).json({
				status: 'success',
				results: patients.length,
				data: patients,
			});
		},
	);

	public getCurrentPatient = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const patientUser = await this.userService.findUserById(req.params.id);

			if (!patientUser) {
				return next(new ApiError(strings.USER_WITH_ID_NOT_FOUND, 404));
			}

			const patient = await this.patientService.findPatientByUserId(
				patientUser._id,
				next,
			);

			if (!patient) {
				return next(new ApiError(strings.USER_WITH_ID_NOT_FOUND, 404));
			}

			res.status(200).json({
				status: 'success',
				data: {
					data: patient,
				},
			});
		},
	);

	public getPatient = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const Patient = await this.patientService.findPatient(req.params.id);

			if (!Patient) {
				return next(new ApiError(strings.USER_WITH_ID_NOT_FOUND, 404));
			}

			res.status(200).json({
				status: 'success',
				data: {
					data: Patient,
				},
			});
		},
	);

	// CREATE
	public createPatient = catchAsync(async (req: Request, res: Response) => {
		const createdPatient = await this.patientService.createPatient(req.body);

		res.status(200).json({
			status: 'success',
			data: {
				data: createdPatient,
			},
		});
	});

	public createPatientAppointment = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const createdPatient = await this.appointmentService.createAppointment(
				req.user.id,
				req.body,
				next,
			);

			res.status(200).json({
				status: 'success',
				data: {
					data: createdPatient,
				},
			});
		},
	);

	// UPDATE
	public updateMe = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			if (req.body.password || req.body.passwordConfirm) {
				return next(new ApiError(strings.USER_ROUTE_NOT_FOR_UPDATE, 404));
			}

			const updatedPatient = await this.patientService.updateCurrentPatient(
				req.user.id,
				req.body,
				req.file && req.file.filename,
			);

			res.status(200).json({
				status: 'success',
				data: {
					user: updatedPatient,
				},
			});
		},
	);

	public updatePatient = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const updatedPatient = await this.patientService.updatePatient(
				req.params.id,
				req.body,
			);

			if (!updatedPatient) {
				return next(new ApiError(strings.USER_WITH_ID_NOT_FOUND, 404));
			}

			res.status(200).json({
				status: 'success',
				data: {
					data: updatedPatient,
				},
			});
		},
	);

	// DELETE
	public deleteMe = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const deactivatedUser = await this.userService.deleteCurrentUser(
				req.user.id,
			);
			await this.patientService.deleteCurrentPatient(deactivatedUser);

			res.status(204).json({
				status: 'success',
				data: null,
			});
		},
	);

	public deletePatient = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const patient = await this.patientService.findPatient(req.params.id);
			await this.userService.deleteUser(patient.user._id.toString());
			await this.patientService.deletePatient(req.params.id);

			res.status(204).json({
				status: 'success',
				data: null,
			});
		},
	);
}
