import { filterObj, QueryString } from '@interfaces/query.interface';
import { UserDocument } from '@interfaces/user.interface';
import { adminModel } from '@models/admin.model';
import {
	deleteOne,
	findAll,
	findOne,
	updateOne
} from '@services/factory.service';
import { filteredObj } from '@utils/filter-obj';
import { UserService } from './user.service';

export class AdminService {
	private admins = adminModel;

	private userService = new UserService();

	// CREATE
	public createAdmin = async (body: any) => {
		const { email, password, passwordConfirm, photo } = body;
		const adminUser = await this.userService.createAdminUser(
			email,
			password,
			passwordConfirm,
		);

		return await this.admins.create({
			email,
			photo,
			user: adminUser._id,
		});
	};

	// FIND
	public findAllAdmins = async (query: object) => {
		return await findAll(this.admins, query as QueryString);
	};

	public findAdmin = async (id: string) => {
		return await findOne(this.admins, id);
	};

	public findAdminByEmail = async (email: string) => {
		return await this.admins.findOne({ email });
	};

	public findAdminByUserId = async (userId: string) => {
		return await this.admins.findOne({ user: userId });
	};

	// UPDATE
	public updateAdmin = async (id: string, body: any) => {
		const updatedAdmin = await updateOne(this.admins, id, body);
		if (body.email || body.password) {
			await this.userService.updateUser(updatedAdmin.user._id.toString(), body);
		}
		return updatedAdmin;
	};

	public updateCurrentAdmin = async (
		userId: string,
		body: any,
		file?: string,
	) => {
		const filteredAdmin = filteredObj(body as filterObj, 'photo');

		if (file) filteredAdmin.photo = file;

		const updatedAdmin = await this.admins.findOneAndUpdate(
			{ user: userId },
			filteredAdmin,
			{
				runValidators: true,
				new: true,
			},
		);

		return updatedAdmin;
	};

	// DELETE
	public deleteAdmin = async (adminId: string) => {
		return await deleteOne(this.admins, adminId);
	};

	public deleteCurrentAdmin = async (adminUser: UserDocument) => {
		return await this.admins.findOneAndUpdate(
			{ user: adminUser },
			{
				active: false,
			},
		);
	};
}
