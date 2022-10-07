import { PatientDocument, PatientModel } from '@interfaces/patient.interface';
import { model, Schema, Types } from 'mongoose';
import validator from 'validator';

const patientSchema = new Schema<PatientDocument>({
	username: {
		type: String,
		required: [true, 'Pleae provid your name.'],
	},
	email: {
		type: String,
		required: [true, 'A patient must have a email!'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Please provide a valid email.'],
	},
	photo: {
		type: String,
		default: 'patient.jpg',
	},
	phoneNumber: [{ type: String }],
	age: {
		type: Number,
		required: [true, 'Pleae provide your age.'],
	},
	state: {
		type: String,
		required: [true, 'Pleae provide a state you currently living in.'],
	},
	township: {
		type: String,
		required: [true, 'Pleae provide a township you currently living in.'],
	},
	gender: {
		type: String,
		enum: ['Male', 'Female'],
		required: [true, 'Pleae provide your gender.'],
	},
	active: {
		type: Boolean,
		default: true,
		select: false,
	},
	user: {
		type: Types.ObjectId,
		ref: 'User',
	},
});

export const patientModel = model<PatientDocument, PatientModel>(
	'Patient',
	patientSchema,
);
