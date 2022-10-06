import { filterObj, QueryString } from '@interfaces/query.interface';
import { UserDocument } from '@interfaces/user.interface';
import { patientModel } from '@models/patient.model';
import {
	deleteOne,
	findAll,
	findOne,
	updateOne,
} from '@services/factory.service';
import { filteredObj } from '@utils/filter-obj';
import { UserService } from './user.service';

export class PatientService {
	private patients = patientModel;

	private userService = new UserService();

	// CREATE
	public async createPatient(body: any) {
		const {
			username,
			email,
			photo,
			phoneNumber,
			age,
			state,
			township,
			gender,
			password,
			passwordConfirm,
		} = body;

		const patientUser = await this.userService.createPatientUser(
			email,
			password,
			passwordConfirm,
		);

		return await this.patients.create({
			username,
			email,
			phoneNumber,
			age,
			state,
			township,
			gender,
			photo,
			user: patientUser._id,
		});
	}

	// FIND ALL
	public async findAllPatients(query: object) {
		return await findAll(this.patients, query as QueryString);
	}

	// FIND ONE
	public async findPatient(id: string) {
		return await findOne(this.patients, id);
	}

	public findPatientByUserId = async (user: UserDocument) => {
		return await this.patients.findOne({ user: user._id });
	};

	// UPDATE
	public async updatePatient(id: string, body: any) {
		const updatedPatient = await updateOne(this.patients, id, body);

		if (body.email || body.password) {
			await this.userService.updateUser(
				updatedPatient.user._id.toString(),
				body,
			);
		}

		return updatedPatient;
	}

	public updateCurrentPatient = async (
		userId: string,
		body: any,
		file?: string,
	) => {
		const filteredPatient = filteredObj(
			body as filterObj,
			'username',
			'phoneNumber',
			'age',
			'state',
			'township',
			'gender',
		);

		if (body.file) filteredPatient.photo = file;

		const updatedAdmin = await this.patients.findOneAndUpdate(
			{ user: userId },
			filteredPatient,
			{
				runValidators: true,
				new: true,
			},
		);

		return updatedAdmin;
	};

	// DELETE
	public deletePatient = async (patientId: string) => {
		return await deleteOne(this.patients, patientId);
	};

	public deleteCurrentPatient = async (patientUser: UserDocument) => {
		return await this.patients.findOneAndUpdate(
			{ user: patientUser },
			{
				active: false,
			},
		);
	};
}
