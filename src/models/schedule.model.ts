import {
	ScheduleDocument,
	ScheduleModel,
} from '@interfaces/schedule.interface';
import { model, Schema, Types } from 'mongoose';

const scheduleSchema = new Schema<ScheduleDocument>({
	startTime: {
		type: Date,
		unique: true,
		required: [true, 'A schedule must have a startTime'],
	},
	endTime: {
		type: Date,
		unique: true,
		required: [true, 'A schedule must have a endTime'],
	},
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
