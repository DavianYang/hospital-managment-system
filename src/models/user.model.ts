import {
	UserBaseDocument,
	UserDocument,
	UserModel,
} from '@interfaces/user.interface';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { model, Query, Schema, Types } from 'mongoose';
import validator from 'validator';

const userSchema = new Schema<UserDocument>({
	email: {
		type: String,
		required: [true, 'Please provide your email'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Please provide a valid email'],
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		minlength: 8,
		select: false,
		private: true,
	},
	passwordConfirm: {
		type: String,
		required: [true, 'Please confirm your password'],
		validate: {
			validator: function (this: UserDocument, el: string): boolean {
				return el == this.password;
			},
			message: 'Password are not the same!!',
		},
	},
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpire: Date,
	active: {
		type: Boolean,
		default: true,
		select: false,
	},
	role: {
		type: Types.ObjectId,
		ref: 'Role',
	},
});

userSchema.pre<UserDocument>(
	'save',
	async function (next: (err?: Error) => void) {
		// Only run this function if password was modified
		if (!this.isModified('password')) return next();

		this.password = await bcrypt.hash(this.password, 12);

		// Delete the passwordConfirm field
		this.passwordConfirm = undefined;
		next();
	},
);

userSchema.pre<UserBaseDocument>(
	'save',
	function (next: (err?: Error) => void) {
		if (!this.isModified('password') || this.isNew) return next();

		this.passwordChangedAt = new Date(Date.now() - 1000);
		next();
	},
);

userSchema.pre<Query<UserDocument, UserDocument>>(
	/^find/,
	function (next: (err?: Error) => void) {
		this.find({ active: { $ne: false } });

		next();
	},
);

userSchema.methods.isPasswordMatch = async function (
	candidatePassword: string,
	userPassword: string,
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (
	this: UserDocument,
	JWTTimeStamp: number,
) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			`${this.passwordChangedAt.getTime() / 1000}`,
			10,
		);

		return JWTTimeStamp < changedTimestamp;
	}

	return false;
};

userSchema.methods.createPasswordResetToken = function (this: UserDocument) {
	const resetToken = crypto.randomBytes(32).toString('hex');

	this.passwordResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	this.passwordResetExpire = new Date(Date.now() + 10 * 60 * 1000); // min * sec * millisec;

	return resetToken;
};

userSchema.statics.isEmailTaken = async function (email: string) {
	return !!(await this.findOne({ email }));
};

export const userModel = model<UserDocument, UserModel>('User', userSchema);
