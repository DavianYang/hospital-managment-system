import { Document, Model } from 'mongoose';
import { PatientBaseDocument } from './patient.interface';
import { ScheduleBaseDocument } from './schedule.interface';

export interface Appointment {
	paid: Boolean;
	token: Number;
	approxConsultTime: Number;
	approxCountDownTime: Number;
	lastCreatedAt: Date;
	lastUpdatedAt: Date;
}

export interface AppointmentBaseDocument extends Appointment, Document {}

export interface AppointmentDocument extends AppointmentBaseDocument {
	patient: PatientBaseDocument['_id'];
	schedule: ScheduleBaseDocument['_id'];
}

export interface AppointmentModel extends Model<AppointmentDocument> {
	calcApprox(scheduleId: string): Promise<any>;
}
