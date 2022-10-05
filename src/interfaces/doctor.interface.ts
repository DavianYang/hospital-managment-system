import { Document, Model } from 'mongoose';
import { UserBaseDocument } from './user.interface';

export interface Schedule {
	time: string;
	isBooked: Boolean;
}

export interface Doctor {
	username: string;
	email: string;
	phoneNumber: string[];
	specialization: string;
	feesPerSession: number;
	photo?: string;
	scheduleAvailable: Schedule[];
}

export interface DoctorBaseDocument extends Doctor, Document {
	active: boolean;
}

export interface DoctorDocument extends DoctorBaseDocument {
	user: UserBaseDocument['_id'];
}

export type DoctorModel = Model<DoctorDocument>;
