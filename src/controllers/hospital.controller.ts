import ApiError from '@exceptions/api.error';
import * as strings from '@resources/strings';
import { HospitalService } from '@services/hospital.service';
import catchAsync from '@utils/catch-async';
import { NextFunction, Request, Response } from 'express';

export class HospitalController {
	private hospitalService = new HospitalService();

	// GET
	public getAllHospitals = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const hospitals = await this.hospitalService.findAllHospitals(req.query);

			res.status(200).json({
				status: 'success',
				results: hospitals.length,
				data: hospitals,
			});
		},
	);

	public getHospital = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const hospital = await this.hospitalService.findHospital(req.params.id);

			if (!hospital) {
				return next(new ApiError(strings.HOSPITAL_WITH_ID_NOT_FOUND, 404));
			}

			res.status(200).json({
				status: 'success',
				data: {
					data: hospital,
				},
			});
		},
	);

	// CREATE
	public createHospital = catchAsync(async (req: Request, res: Response) => {
		const createdHospital = await this.hospitalService.createHospital(req.body);

		res.status(200).json({
			status: 'success',
			data: {
				data: createdHospital,
			},
		});
	});

	public addDocotor = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			await this.hospitalService.addDoctor(
				req.params.id,
				req.body.doctorId,
				next,
			);

			res.status(200).json({
				status: 'success',
				data: {
					data: null,
				},
			});
		},
	);

	// UPDATE
	public updateHospital = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const updateHospital = await this.hospitalService.updateHospital(
				req.params.id,
				req.body,
			);

			if (!updateHospital) {
				return next(new ApiError(strings.HOSPITAL_WITH_ID_NOT_FOUND, 404));
			}

			res.status(200).json({
				status: 'success',
				data: {
					data: updateHospital,
				},
			});
		},
	);

	// DELETE
	public deleteHospital = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			await this.hospitalService.deleteHospital(req.params.id);

			res.status(204).json({
				status: 'success',
				data: null,
			});
		},
	);
}
