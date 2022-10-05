import { DoctorDocument, DoctorModel } from '@interfaces/doctor.interface';
import { model, Query, Schema, Types } from 'mongoose';
import validator from 'validator';

const doctorSchema = new Schema<DoctorDocument>({
	username: {
		type: String,
		required: [true, 'A doctor must have a username!'],
	},
	email: {
		type: String,
		required: [true, 'A doctor must have a email!'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Please provide a valid email'],
	},
	photo: {
		type: String,
		default: 'doctor.jpg',
	},
	phoneNumber: [
		{
			type: String,
		},
	],
	specialization: {
		type: String,
		required: [true, 'A doctor must have a specialization!'],
	},
	feesPerSession: {
		type: Number,
		required: [true, 'A doctor must have a feesPerSession!'],
	},
	scheduleAvailable: [
		{ time: Date, isBooked: { type: Boolean, default: false } },
	],
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
doctorSchema.pre<Query<DoctorDocument, DoctorDocument>>(
	/^find/,
	function (next: (err?: Error) => void) {
		this.find({ active: { $ne: false } });

		next();
	},
);

export const doctorModel = model<DoctorDocument, DoctorModel>(
	'Doctor',
	doctorSchema,
);
