import { Document, Model } from 'mongoose';
import { DoctorDocument } from './doctor.interface';

export interface Hospital {
	name: string;
	phoneNumber: string[];
}

export interface HospitalBaseDocument extends Hospital, Document {}

export interface HospitalDocument extends HospitalBaseDocument {
	doctor: DoctorDocument['_id'];
}

export type HospitalModel = Model<HospitalDocument>;
