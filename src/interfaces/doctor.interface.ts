import { Document, Model, Types } from 'mongoose';
import { HospitalBaseDocument } from './hospital.interface';
import { UserBaseDocument } from './user.interface';

export interface Doctor {
	username: string;
	email: string;
	phoneNumber: string[];
	specialization: string;
	department: string;
	feesPerSession: number;
	photo?: string;
}

export interface DoctorBaseDocument extends Doctor, Document {
	active: boolean;
}

export interface DoctorDocument extends DoctorBaseDocument {
	user: UserBaseDocument['_id'];
	hospitals?: Types.Array<HospitalBaseDocument['_id']>
}

export type DoctorModel = Model<DoctorDocument>;
