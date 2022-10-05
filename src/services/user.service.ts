import {
	ROLE_ADMIN_CODE,
	ROLE_DOCTOR_CODE,
	ROLE_PATIENT_CODE,
} from '@commons/constant.common';
import { filterObj, QueryString } from '@interfaces/query.interface';
import { userModel } from '@models/user.model';
import {
	deleteOne,
	findAll,
	findOne,
	updateOne,
} from '@services/factory.service';
import { ObjectId } from 'mongodb';
import { RoleService } from './role.service';

export class UserService {
	public users = userModel;

	private roleService = new RoleService();

	private filterObj = (obj: filterObj, ...allowedFields: string[]) => {
		const newObj: filterObj = {};

		Object.keys(obj).forEach((el: string) => {
			if (allowedFields.includes(el)) newObj[el] = obj[el];
		});

		return newObj;
	};

	// CREATE
	private createUser = async (
		email: string,
		password: string,
		passwordConfirm: string,
		roleId: ObjectId,
	) => {
		return await this.users.create({
			email: email,
			password: password,
			passwordConfirm: passwordConfirm,
			role: roleId,
		});
	};

	public createAdminUser = async (
		email: string,
		password: string,
		passwordConfirm: string,
	) => {
		const adminRole = await this.roleService.findRoleByCode(ROLE_ADMIN_CODE);

		return await this.createUser(
			email,
			password,
			passwordConfirm,
			adminRole._id,
		);
	};

	public createDoctorUser = async (
		email: string,
		password: string,
		passwordConfirm: string,
	) => {
		const doctorRole = await this.roleService.findRoleByCode(ROLE_DOCTOR_CODE);

		return await this.createUser(
			email,
			password,
			passwordConfirm,
			doctorRole._id,
		);
	};

	public createPatientUser = async (
		email: string,
		password: string,
		passwordConfirm: string,
	) => {
		const patientRole = await this.roleService.findRoleByCode(
			ROLE_PATIENT_CODE,
		);

		return await this.createUser(
			email,
			password,
			passwordConfirm,
			patientRole._id,
		);
	};

	// FIND
	public findAllUsers = async (query: object) => {
		return await findAll(this.users, query as QueryString);
	};

	public findUser = async (id: string) => {
		return await findOne(this.users, id);
	};

	public findUserById = async (id: string) => {
		return await this.users.findOne({ _id: id }).select('+password');
	};

	public findUserByEmail = async (email: string) => {
		return await this.users.findOne({ email }).select('+password');
	};

	public findUserByToken = async (hashToken: string) => {
		return await this.users.findOne({
			passwordResetToken: hashToken,
			passwordResetExpire: { $gt: new Date() },
		});
	};

	// UPDATE
	public updateUser = async (id: string, body: object) => {
		return await updateOne(this.users, id, body);
	};

	public updateCurrentUser = async (id: string, body: object) => {
		const filteredObj = this.filterObj(body as filterObj, 'name', 'email');

		const updatedUser = await this.users.findByIdAndUpdate(id, filteredObj, {
			runValidators: true,
			new: true,
		});

		return updatedUser;
	};

	// DELETE
	public deleteUser = async (id: string) => {
		return await deleteOne(this.users, id);
	};

	public deleteCurrentUser = async (id: string) => {
		return this.users.findByIdAndUpdate(id, {
			active: false,
		});
	};
}
