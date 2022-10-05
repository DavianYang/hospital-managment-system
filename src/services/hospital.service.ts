import { Hospital } from '@interfaces/hospital.interface';
import { QueryString } from '@interfaces/query.interface';
import { hospitalModel } from '@models/hospital.model';
import {
	createOne,
	deleteOne,
	findAll,
	findOne,
	updateOne,
} from '@services/factory.service';

export class HospitalService {
	public hospitals = hospitalModel;

	// CREATE
	public createHospital = async (hospitalBody: Hospital) =>
		await createOne(this.hospitals, hospitalBody);

	// FIND ALL
	public findAllHospitals = async (query: object) =>
		await findAll(this.hospitals, query as QueryString);

	// FIND ONE
	public findHospital = async (id: string) => await findOne(this.hospitals, id);

	// UPDATE
	public updateHospital = async (id: string, body: object) =>
		await updateOne(this.hospitals, id, body);

	// DELETE
	public deleteHospital = async (id: string) =>
		await deleteOne(this.hospitals, id);
}
