import { Document, Model } from 'mongoose';
import { DoctorBaseDocument } from './doctor.interface';
import { HospitalBaseDocument } from './hospital.interface';

export interface Schedule {
	date: Date;
	startTime: Number;
	endTime: Number;
}

export interface ScheduleBaseDocument extends Schedule, Document {
	duration: Number;
	approximatePatients: Number;
}

export interface ScheduleDocument extends ScheduleBaseDocument {
	doctor: DoctorBaseDocument['_id'];
	hospital: HospitalBaseDocument['_id'];
}

export type ScheduleModel = Model<ScheduleDocument>;
