import { Document, Model } from 'mongoose';
import { RoleBaseDocument } from './role.interface';

export interface User {
	email: string;
	password: string;
	passwordConfirm: string | undefined;
}

export interface UserBaseDocument extends User, Document {
	role: string;
	passwordChangedAt: Date;
	passwordResetToken: string;
	passwordResetExpire: Date;
	active: boolean;
	isPasswordMatch(
		candidatePassword: string,
		userPassword: string,
	): Promise<boolean>;
	changedPasswordAfter(JWTTimeStamp: number): boolean;
	createPasswordResetToken(): string;
}

export interface UserDocument extends UserBaseDocument {
	role: RoleBaseDocument['_id'];
}

export interface UserModel extends Model<UserDocument> {
	isEmailTaken(email: string): boolean;
}
