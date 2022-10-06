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
	phoneNumber: [{ type: String }],
	specialization: {
		type: String,
		required: [true, 'A doctor must have a specialization!'],
	},
	department: {
		type: String,
		required: [true, 'A doctor must have a department!'],
	},
	feesPerSession: {
		type: Number,
		required: [true, 'A doctor must have a feesPerSession!'],
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
	hospitals: [
		{
			type: Types.ObjectId,
			ref: 'Hospital',
		},
	],
	schedules: [
		{
			type: Types.ObjectId,
			ref: 'Schedule',
		},
	],
});

doctorSchema.index({ hospitals: 1 }, { unique: true });

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
