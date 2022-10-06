import { filterObj, QueryString } from '@interfaces/query.interface';
import { UserDocument } from '@interfaces/user.interface';
import { doctorModel } from '@models/doctor.model';
import {
	deleteOne,
	findAll,
	findOne,
	updateOne
} from '@services/factory.service';
import { filteredObj } from '@utils/filter-obj';
import { UserService } from './user.service';

export class DoctorService {
	private doctors = doctorModel;

	private userService = new UserService();

	// CREATE
	public async createDoctor(doctorBody: any) {
		const doctorUser = await this.userService.createDoctorUser(
			doctorBody.email,
			doctorBody.password,
			doctorBody.passwordConfirm,
		);

		return await this.doctors.create({
			username: doctorBody.username,
			email: doctorBody.email,
			specialization: doctorBody.specialization,
			department: doctorBody.department,
			feesPerSession: doctorBody.feesPerSession,
			phoneNumber: doctorBody.phoneNumber,
			scheduleAvailable: doctorBody.scheduleAvailable,
			photo: doctorBody.photo,
			user: doctorUser._id,
		});
	}

	public async addHospital(hospitalId: string, doctorId: string) {
		await this.doctors.updateOne(
			{ _id: doctorId },
			{ $push: { hospitals: hospitalId } },
		);
	}

	// FIND ALL
	public async findAllDoctors(query: object) {
		return await findAll(this.doctors, query as QueryString);
	}

	// FIND ONE
	public async findDoctor(id: string) {
		return await findOne(this.doctors, id);
	}

	public findDoctorByUserId = async (user: UserDocument) => {
		return await this.doctors.findOne({ user: user._id });
	};

	// UPDATE
	public async updateDoctor(id: string, body: any) {
		const updatedDoctor = await updateOne(this.doctors, id, body);

		if (body.email || body.password) {
			await this.userService.updateUser(
				updatedDoctor.user._id.toString(),
				body,
			);
		}

		return updatedDoctor;
	}

	public updateCurrentDoctor = async (
		userId: string,
		body: any,
		file?: string,
	) => {
		const filteredDoctor = filteredObj(
			body as filterObj,
			'username',
			'photo',
			'phoneNumber',
			'specialization',
			'feesPerSession',
			'scheduleAvailable',
			'department',
		);

		if (file) filteredDoctor.photo = file;

		const updatedAdmin = await this.doctors.findOneAndUpdate(
			{ user: userId },
			filteredDoctor,
			{
				runValidators: true,
				new: true,
			},
		);

		return updatedAdmin;
	};

	// DELETE
	public deleteDoctor = async (doctorId: string) => {
		return await deleteOne(this.doctors, doctorId);
	};

	public deleteCurrentDoctor = async (doctorUser: UserDocument) => {
		return await this.doctors.findOneAndUpdate(
			{ user: doctorUser },
			{
				active: false,
			},
		);
	};
}
