import { model, Query, Schema, Types } from 'mongoose';
import validator from 'validator';

import { AdminDocument, AdminModel } from '@interfaces/admin.interface';

const adminSchema = new Schema<AdminDocument>({
	email: {
		type: String,
		required: [true, 'Please provide your email'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Please provide a valid email'],
	},
	photo: {
		type: String,
		default: 'admin.jpg',
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

adminSchema.pre<Query<AdminDocument, AdminDocument>>(
	/^find/,
	function (next: (err?: Error) => void) {
		this.find({ active: { $ne: false } });

		next();
	},
);

export const adminModel = model<AdminDocument, AdminModel>(
	'Admin',
	adminSchema,
);
