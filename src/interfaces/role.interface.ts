import { Document, Model } from 'mongoose';

export interface Role {
	code: string;
	description: string;
}

export interface RoleBaseDocument extends Role, Document {}

export type RoleDocument = RoleBaseDocument;

export type RoleModel = Model<RoleDocument>;
