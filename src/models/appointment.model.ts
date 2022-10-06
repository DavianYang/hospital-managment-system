import {
	AppointmentDocument,
	AppointmentModel,
} from '@interfaces/appointment.interface';
import { model, Schema, Types } from 'mongoose';

const appointmentSchema = new Schema<AppointmentDocument>({
	paid: {
		type: Boolean,
		default: false,
	},
	lastCreatedAt: {
		type: Date,
		default: Date.now(),
	},
	lastUpdatedAt: Date,
	doctor: {
		type: Types.ObjectId,
		ref: 'Doctor',
		required: [true, 'An appointment must belong to a doctor'],
	},
	hospital: {
		type: Types.ObjectId,
		ref: 'Hospital',
		required: [true, 'An appointment must belong to a hospital'],
	},
	schedule: {
		type: Types.ObjectId,
		ref: 'Schedule',
		required: [true, 'An appointment must belong to a schedule'],
	},
});

export const appointmentModel = model<AppointmentDocument, AppointmentModel>(
	'Appointment',
	appointmentSchema,
);
