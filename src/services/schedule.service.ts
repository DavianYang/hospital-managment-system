import ApiError from '@exceptions/api.error';
import { QueryString } from '@interfaces/query.interface';
import { scheduleModel } from '@models/schedule.model';
import * as strings from '@resources/strings';
import {
	deleteOne,
	findAll,
	findOne,
	updateOne
} from '@services/factory.service';
import { NextFunction } from 'express';
import moment from 'moment';
import { DoctorService } from './doctor.service';
import { HospitalService } from './hospital.service';

export class ScheduleService {
	private schedules = scheduleModel;
	private doctorService = new DoctorService();
	private hosptialService = new HospitalService();

	// CREATE
	public createSchedule = async (scheduleBody: any, next: NextFunction) => {
		const { date, startTime, endTime, doctorId, hospitalId } = scheduleBody;
		const parsedStartTime = moment(`${date} ${startTime}`, 'MM-DD-YYYY HH:mm');
		const parsedEndTime = moment(`${date} ${endTime}`, 'MM-DD-YYYY HH:mm');

		const overlap = await this.findOverlapSchedule(
			parsedStartTime.valueOf(),
			parsedEndTime.valueOf(),
		);

		if (overlap.length) {
			return next(new ApiError(strings.INVALID_STARTTIME_AND_ENDTIME, 400));
		}

		const doctor = await this.doctorService.findDoctor(doctorId);

		if (!doctor) {
			return next(new ApiError(strings.DOCTOR_WITH_ID_NOT_FOUND, 400));
		}

		const hospital = await this.hosptialService.findHospital(hospitalId);

		if (!hospital) {
			return next(new ApiError(strings.HOSPITAL_WITH_ID_NOT_FOUND, 400));
		}

		if (!hospital.doctors.includes(doctor._id)) {
			return next(
				new ApiError(strings.DOCTOR_WITH_ID_NOT_FOUND_IN_HOSPITAL, 400),
			);
		}

		return await this.schedules.create({
			date,
			startTime: parsedStartTime.valueOf(),
			endTime: parsedEndTime.valueOf(),
			doctor: doctor._id,
			hospital: hospital._id,
		});
	};

	public addAppointment = async (scheduleId: string, appointmentId: string) => {
		return await this.schedules.findOneAndUpdate(
			{ _id: scheduleId },
			{ $push: { appointments: appointmentId } },
			{ returnOriginal: false },
		);
	};

	// FIND ALL
	public findAllSchedules = async (query: object) =>
		await findAll(this.schedules, query as QueryString);

	// FIND ONE
	public findSchedule = async (id: string) => await findOne(this.schedules, id);

	private findOverlapSchedule = async (startDate: number, endDate: number) => {
		return await this.schedules.find({
			$or: [
				{
					startTime: { $lt: endDate },
					endTime: { $gt: startDate },
				},
			],
		});
	};

	// UPDATE
	public updateSchedule = async (id: string, body: any, next: NextFunction) => {
		const schedule = await findOne(this.schedules, id);

		const parsedStartTime =
			body.startTime &&
			moment(
				`${body.date ? body.date : schedule.date} ${body.startTime}`,
				'MM-DD-YYYY HH:mm',
			).valueOf();

		const parsedEndTime =
			body.endTime &&
			moment(
				`${body.date ? body.date : schedule.date} ${body.endTime}`,
				'MM-DD-YYYY HH:mm',
			).valueOf();

		const overlap = await this.findOverlapSchedule(
			parsedStartTime,
			parsedEndTime,
		);

		if (overlap.length) {
			return next(new ApiError(strings.INVALID_STARTTIME_AND_ENDTIME, 400));
		}

		const doctor = await this.doctorService.findDoctor(
			body.doctorId || schedule.doctor._id,
		);

		if (!doctor) {
			return next(new ApiError(strings.DOCTOR_WITH_ID_NOT_FOUND, 400));
		}

		const hospital = await this.hosptialService.findHospital(
			body.hospitalId || schedule.hospital._id,
		);

		if (!hospital) {
			return next(new ApiError(strings.HOSPITAL_WITH_ID_NOT_FOUND, 400));
		}

		if (!hospital.doctors.includes(doctor._id)) {
			return next(
				new ApiError(strings.DOCTOR_WITH_ID_NOT_FOUND_IN_HOSPITAL, 400),
			);
		}

		return await updateOne(this.schedules, id, {
			startTime: parsedStartTime,
			endTime: parsedEndTime,
			date: body.date,
			doctor: body.doctorId,
			hospital: body.hospitalId,
		});
	};

	// DELETE
	public deleteSchedule = async (id: string) =>
		await deleteOne(this.schedules, id);
}
