import { Document, Model } from 'mongoose';
import { UserBaseDocument } from './user.interface';

enum Gender {
	male = 'Male',
	female = 'Female',
}

export interface Patient {
	username: string;
	email: string;
	phoneNumber: string[];
	photo?: string;
	age: number;
	state: string;
	township: string;
	gender: Gender;
	remark: string;
}

export interface PatientBaseDocument extends Patient, Document {
	active: boolean;
}

export interface PatientDocument extends PatientBaseDocument {
	user: UserBaseDocument['_id'];
}

export type PatientModel = Model<PatientDocument>;
