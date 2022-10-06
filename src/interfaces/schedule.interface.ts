import { Document, Model } from 'mongoose';
import { DoctorBaseDocument } from './doctor.interface';
import { HospitalBaseDocument } from './hospital.interface';

export interface Schedule {
	startTime: Date;
	endTime: Date;
}

export interface ScheduleBaseDocument extends Schedule, Document {}

export interface ScheduleDocument extends ScheduleBaseDocument {
	doctor: DoctorBaseDocument['_id'];
	hospital: HospitalBaseDocument['_id'];
}

export type ScheduleModel = Model<ScheduleDocument>;
