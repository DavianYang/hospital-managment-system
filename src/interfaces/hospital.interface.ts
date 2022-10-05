import { Document, Model, Types } from 'mongoose';
import { DoctorBaseDocument } from './doctor.interface';

interface Location {
	type: Object;
	coordinates: Array<number>;
	address: string;
	description: string;
}

export interface Hospital {
	name: string;
	phoneNumber: string[];
	location: Location;
}

export interface HospitalBaseDocument extends Hospital, Document {}

export interface HospitalDocument extends HospitalBaseDocument {
	doctors: Types.Array<DoctorBaseDocument['_id']>;
}

export type HospitalModel = Model<HospitalDocument>;
