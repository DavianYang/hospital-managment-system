import { Appointment } from '@interfaces/appointment.interface';
import { QueryString } from '@interfaces/query.interface';
import { appointmentModel } from '@models/appointment.model';
import {
	createOne,
	deleteOne,
	findAll,
	findOne,
	updateOne,
} from '@services/factory.service';

export class AppointmentService {
	private appointments = appointmentModel;

	// CREATE
	public createAppointment = async (appointmentBody: Appointment) =>
		await createOne(this.appointments, appointmentBody);

	// FIND ALL
	public findAllAppointments = async (query: object) =>
		await findAll(this.appointments, query as QueryString);

	// FIND ONE
	public findAppointment = async (id: string) =>
		await findOne(this.appointments, id);

	// UPDATE
	public updateAppointment = async (id: string, body: object) =>
		await updateOne(this.appointments, id, body);

	// DELETE
	public deleteAppointment = async (id: string) =>
		await deleteOne(this.appointments, id);
}
