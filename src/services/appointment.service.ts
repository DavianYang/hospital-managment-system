import ApiError from '@exceptions/api.error';
import { QueryString } from '@interfaces/query.interface';
import { appointmentModel } from '@models/appointment.model';
import * as strings from '@resources/strings';
import {
	createOne,
	deleteOne,
	findAll,
	findOne,
	updateOne,
} from '@services/factory.service';
import { NextFunction } from 'express';
import { PatientService } from './patient.service';
import { ScheduleService } from './schedule.service';

export class AppointmentService {
	private appointments = appointmentModel;
	private patientService = new PatientService();
	private scheduleService = new ScheduleService();

	// CREATE
	public createAppointment = async (
		userId: string,
		body: any,
		next: NextFunction,
	) => {
		const { paid, scheduleId } = body;

		const patient = await this.patientService.findPatientByUserId(userId, next);

		if (!patient) {
			return next(new ApiError(strings.PATIENT_WITH_ID_NOT_FOUND, 400));
		}

		if (await this.checkIfAppointmentAlreadyBooked(scheduleId)) {
			return next(new ApiError(strings.APPOINTMENT_ALREADY_SCHEDULED, 400));
		}

		const schedule = await this.scheduleService.findSchedule(scheduleId);

		if (!schedule) {
			return next(new ApiError(strings.SCHEDULE_WITH_ID_NOT_FOUND, 404));
		}

		const createdAppointment = await createOne(this.appointments, {
			paid,
			patient: patient._id,
			schedule: schedule._id,
		});

		return createdAppointment;
	};

	// FIND ALL
	public findAllAppointments = async (query: object) =>
		await findAll(this.appointments, query as QueryString);

	// FIND ONE
	public findAppointment = async (id: string) =>
		await findOne(this.appointments, id);

	public checkIfAppointmentAlreadyBooked = async (scheduleId: string) => {
		return await this.appointments.findOne({ schedule: scheduleId });
	};

	// UPDATE
	public updateAppointment = async (id: string, body: object) =>
		await updateOne(this.appointments, id, body);

	// DELETE
	public deleteAppointment = async (id: string) =>
		await deleteOne(this.appointments, id);
}
