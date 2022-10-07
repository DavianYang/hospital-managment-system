import ApiError from '@exceptions/api.error';
import * as strings from '@resources/strings';
import { AuthService } from '@services/auth.service';
import { DoctorService } from '@services/doctor.service';
import { UserService } from '@services/user.service';
import catchAsync from '@utils/catch-async';
import { NextFunction, Request, Response } from 'express';

export class DoctorController {
	private userService = new UserService();
	private authService = new AuthService();
	private doctorService = new DoctorService();

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
			const doctor = await this.doctorService.createDoctor(req.body);

			const token = this.authService.generateJWTToken(
				req,
				res,
				doctor.user._id,
			);

			res.status(201).json({
				status: 'success',
				token,
				data: {
					doctor,
				},
			});
		},
	);

	// GET
	public getAllDoctors = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const doctors = await this.doctorService.findAllDoctors(req.query);

			res.status(200).json({
				status: 'success',
				results: doctors.length,
				data: doctors,
			});
		},
	);

	public getCurrentDoctor = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const doctorUser = await this.userService.findUserById(req.params.id);

			if (!doctorUser) {
				return next(new ApiError(strings.USER_WITH_ID_NOT_FOUND, 404));
			}

			const doctor = await this.doctorService.findDoctorByUserId(
				doctorUser._id.toString(),
				next,
			);

			if (!doctor) {
				return next(new ApiError(strings.USER_WITH_ID_NOT_FOUND, 404));
			}

			res.status(200).json({
				status: 'success',
				data: {
					data: doctor,
				},
			});
		},
	);

	public getDoctor = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const doctor = await this.doctorService.findDoctor(req.params.id);

			if (!doctor) {
				return next(new ApiError(strings.USER_WITH_ID_NOT_FOUND, 404));
			}

			res.status(200).json({
				status: 'success',
				data: {
					data: doctor,
				},
			});
		},
	);

	// CREATE
	public createDoctor = catchAsync(async (req: Request, res: Response) => {
		const createdDoctor = await this.doctorService.createDoctor(req.body);

		res.status(200).json({
			status: 'success',
			data: {
				data: createdDoctor,
			},
		});
	});

	// UPDATE
	public updateMe = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			if (req.body.password || req.body.passwordConfirm) {
				return next(new ApiError(strings.USER_ROUTE_NOT_FOR_UPDATE, 404));
			}

			const updatedDoctor = await this.doctorService.updateCurrentDoctor(
				req.user.id,
				req.body,
				req.file && req.file.filename,
			);

			res.status(200).json({
				status: 'success',
				data: {
					user: updatedDoctor,
				},
			});
		},
	);

	public updateDoctor = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const updatedDoctor = await this.doctorService.updateDoctor(
				req.params.id,
				req.body,
			);

			if (!updatedDoctor) {
				return next(new ApiError(strings.USER_WITH_ID_NOT_FOUND, 404));
			}

			res.status(200).json({
				status: 'success',
				data: {
					data: updatedDoctor,
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
			await this.doctorService.deleteCurrentDoctor(deactivatedUser);

			res.status(204).json({
				status: 'success',
				data: null,
			});
		},
	);

	public deleteDoctor = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const doctor = await this.doctorService.findDoctor(req.params.id);
			await this.userService.deleteUser(doctor.user._id.toString());
			await this.doctorService.deleteDoctor(req.params.id);

			res.status(204).json({
				status: 'success',
				data: null,
			});
		},
	);
}
