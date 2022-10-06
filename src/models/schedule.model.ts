import {
	ScheduleDocument,
	ScheduleModel,
} from '@interfaces/schedule.interface';
import { model, Schema, Types } from 'mongoose';

const scheduleSchema = new Schema<ScheduleDocument>({
	date: {
		type: Date,
		required: [true, 'A schedule must have a date'],
	},
	startTime: {
		type: Number,
		unique: true,
		required: [true, 'A schedule must have a startTime'],
	},
	endTime: {
		type: Number,
		unique: true,
		required: [true, 'A schedule must have a endTime'],
	},
	duration: Number,
	approximatePatients: Number,
	doctor: {
		type: Types.ObjectId,
		ref: 'Doctor',
		required: [true, 'A schedule must belong to a doctor'],
	},
	hospital: {
		type: Types.ObjectId,
		ref: 'Hospital',
		required: [true, 'A schedule must belong to a hospital'],
	},
});

export const scheduleModel = model<ScheduleDocument, ScheduleModel>(
	'Schedule',
	scheduleSchema,
);
