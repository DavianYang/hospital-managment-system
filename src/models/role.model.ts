import { model, Schema } from 'mongoose';

import { RoleDocument, RoleModel } from '@interfaces/role.interface';

const roleSchema = new Schema<RoleDocument>({
	code: {
		type: String,
		unique: true,
		required: [true, 'Please provide code for your role'],
	},
	description: {
		type: String,
		trim: true,
	},
});

export const roleModel = model<RoleDocument, RoleModel>('Role', roleSchema);
