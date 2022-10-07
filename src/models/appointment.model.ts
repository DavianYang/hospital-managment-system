import {
	AppointmentDocument,
	AppointmentModel
} from '@interfaces/appointment.interface';
import { model, Model, Schema, Types } from 'mongoose';
import { scheduleModel } from './schedule.model';

const appointmentSchema = new Schema<AppointmentDocument>({
	token: Number,
	approxCountDownTime: Number,
	paid: {
		type: Boolean,
		default: false,
	},
	lastCreatedAt: {
		type: Date,
		default: Date.now(),
	},
	lastUpdatedAt: Date,
	schedule: {
		type: Types.ObjectId,
		ref: 'Schedule',
		required: [true, 'An appointment must belong to a schedule'],
	},
	patient: {
		type: Types.ObjectId,
		ref: 'Patient',
		required: [true, 'An appointment must belong to a patient'],
	},
});

appointmentSchema.pre<AppointmentDocument>(
	'save',
	async function (this: AppointmentDocument) {
		const stats = await (this.constructor as AppointmentModel).calcApprox(
			this.schedule,
		);

		const schedule = await scheduleModel.findById(this.schedule);

		const nPatients = stats.length > 0 && stats[0].nPatients + 1;
		this.token = nPatients || 1;

		await scheduleModel.findByIdAndUpdate(schedule._id, {
			nPatients: nPatients || 1,
			approxConsultTimeByMinPerPatient:
				stats.length > 0 &&
				Math.round((schedule.durationByHour * 60) / nPatients),
		});
	},
);

appointmentSchema.statics.calcApprox = async function (
	this: Model<AppointmentDocument>,
	scheduleId: string,
) {
	return await this.aggregate([
		{ $match: { schedule: scheduleId } },
		{
			$group: {
				_id: 'schedule',
				nPatients: { $sum: 1 },
			},
		},
	]);
};

export const appointmentModel = model<AppointmentDocument, AppointmentModel>(
	'Appointment',
	appointmentSchema,
);
