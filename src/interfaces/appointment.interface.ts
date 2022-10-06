import { Document, Model } from 'mongoose';
import { DoctorBaseDocument } from './doctor.interface';
import { HospitalBaseDocument } from './hospital.interface';
import { ScheduleBaseDocument } from './schedule.interface';

export interface Appointment {
	paid: Boolean;
	lastCreatedAt: Date;
	lastUpdatedAt: Date;
}

export interface AppointmentBaseDocument extends Appointment, Document {}

export interface AppointmentDocument extends AppointmentBaseDocument {
	doctor: DoctorBaseDocument['_id'];
	hospital: HospitalBaseDocument['_id'];
	schedule: ScheduleBaseDocument['_id'];
}

export type AppointmentModel = Model<AppointmentDocument>;
