import {
	HospitalDocument,
	HospitalModel
} from '@interfaces/hospital.interface';
import { model, Schema, Types } from 'mongoose';

const hospitalSchema = new Schema<HospitalDocument>({
	name: {
		type: String,
		unique: true,
		required: [true, 'A doctor must have a username!'],
	},
	phoneNumber: [{ type: String }],
	location: {
		type: {
			type: String,
			default: 'Point',
			enum: ['Point'],
		},
		coordinates: [Number],
		address: String,
		description: String,
	},
	doctors: [
		{
			type: Types.ObjectId,
			ref: 'Doctor',
		},
	],
});

export const hospitalModel = model<HospitalDocument, HospitalModel>(
	'Hospital',
	hospitalSchema,
);
