import { Document, Model } from 'mongoose';
import { UserBaseDocument } from './user.interface';

export interface Admin {
	email: string;
	photo?: string;
}

export interface AdminBaseDocument extends Admin, Document {
	active: boolean;
}

export interface AdminDocument extends AdminBaseDocument {
	user: UserBaseDocument['_id'];
}

export type AdminModel = Model<AdminDocument>;
