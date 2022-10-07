import ApiError from '@exceptions/api.error';
import {
	ScheduleDocument,
	ScheduleModel
} from '@interfaces/schedule.interface';
import * as strings from '@resources/strings';
import { isNegative } from '@utils/shared.util';
import moment from 'moment';
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
	nPatients: Number,
	durationByHour: Number,
	approxConsultTimeByMinPerPatient: Number,
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

scheduleSchema.pre<ScheduleDocument>(
	'save',
	function (next: (err?: Error) => void) {
		this.durationByHour = Number(
			moment
				.duration(
					moment(this.endTime as number).diff(moment(this.startTime as number)),
				)
				.asHours(),
		);

		if (isNegative(this.durationByHour)) {
			return next(new ApiError(strings.INVALID_STARTTIME_AND_ENDTIME, 400));
		}

		next();
	},
);

export const scheduleModel = model<ScheduleDocument, ScheduleModel>(
	'Schedule',
	scheduleSchema,
);
