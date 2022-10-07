import {
	ROLE_ADMIN_CODE,
	ROLE_ADMIN_DESCRIPTION,
	ROLE_DOCTOR_CODE,
	ROLE_DOCTOR_DESCRIPTION,
	ROLE_PATIENT_CODE,
	ROLE_PATIENT_DESCRIPTION,
} from '@commons/constant.common';
import { adminModel } from '@models/admin.model';
import { roleModel } from '@models/role.model';
import { userModel } from '@models/user.model';

import { config } from '../config';
import { logger } from './logger';

const roles = [
	{
		_id: '5c8a1d5b0190b214360dc057',
		code: ROLE_ADMIN_CODE,
		description: ROLE_ADMIN_DESCRIPTION,
	},
	{
		_id: '5c8a1dfa2f8fb814b56fa181',
		code: ROLE_DOCTOR_CODE,
		description: ROLE_DOCTOR_DESCRIPTION,
	},
	{
		_id: '5c8a1e1a2f8fb814b56fa182',
		code: ROLE_PATIENT_CODE,
		description: ROLE_PATIENT_DESCRIPTION,
	},
];

const users = [
	{
		_id: '5c8a1ec62f8fb814b56fa183',
		name: config.authConfig.superadminCredentials.username,
		email: config.authConfig.superadminCredentials.emailAddress,
		password: config.authConfig.superadminCredentials.password,
		active: true,
		role: '5c8a1d5b0190b214360dc057',
	},
];

const admins = [
	{
		_id: '5c8a1ec62czjefb456464fa183',
		email: config.authConfig.superadminCredentials.emailAddress,
		user: '5c8a1ec62f8fb814b56fa183',
	},
];

export const importInitData = async () => {
	try {
		if (!(await roleModel.findOne({ code: roles[0].code }))) {
			await roleModel.create(roles);
		}

		if (!(await userModel.findOne({ email: users[0].email }))) {
			await userModel.create(users, { validateBeforeSave: false });
		}

		if (!(await adminModel.findOne({ email: users[0].email }))) {
			await adminModel.create(admins, { validateBeforeSave: false });
		}

		logger.info(`Init Data has successfully loaded`);
	} catch (error) {
		logger.error(error);
	}
};
