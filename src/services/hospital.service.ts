import { NextFunction } from 'express';

import ApiError from '@exceptions/api.error';
import { Hospital } from '@interfaces/hospital.interface';
import { QueryString } from '@interfaces/query.interface';
import { hospitalModel } from '@models/hospital.model';
import * as strings from '@resources/strings';
import {
	createOne,
	deleteOne,
	findAll,
	findOne,
	updateOne,
} from '@services/factory.service';

import { DoctorService } from './doctor.service';

export class HospitalService {
	private hospitals = hospitalModel;
	private doctorService = new DoctorService();

	// CREATE
	public createHospital = async (hospitalBody: Hospital) =>
		await createOne(this.hospitals, hospitalBody);

	public addDoctor = async (
		hospitalId: string,
		doctorId: string,
		next: NextFunction,
	) => {
		const hospital = await this.findHospital(hospitalId);

		if (hospital.doctors.includes(doctorId)) {
			return next(new ApiError(strings.DOCTOR_ALREADY_EXIST, 404));
		}

		await this.hospitals.updateOne(
			{ _id: hospitalId },
			{ $push: { doctors: doctorId } },
		);

		await this.doctorService.addHospital(hospitalId, doctorId, next);
	};

	// FIND ALL
	public findAllHospitals = async (query: object) =>
		await findAll(this.hospitals, query as QueryString);

	// FIND ONE
	public findHospital = async (id: string) => await findOne(this.hospitals, id);

	// UPDATE
	public updateHospital = async (id: string, body: object) =>
		await updateOne(this.hospitals, id, body);

	// DELETE
	public deleteHospital = async (id: string) =>
		await deleteOne(this.hospitals, id);
}
