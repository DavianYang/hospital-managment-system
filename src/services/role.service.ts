import { QueryString } from '@interfaces/query.interface';
import { Role } from '@interfaces/role.interface';
import { roleModel } from '@models/role.model';
import {
	createOne,
	deleteOne,
	findAll,
	findOne,
	updateOne,
} from '@services/factory.service';

export class RoleService {
	public roles = roleModel;

	// CREATE
	public createRole = async (roleBody: Role) =>
		await createOne(this.roles, roleBody);

	// FIND ALL
	public findAllRoles = async (query: object) =>
		await findAll(this.roles, query as QueryString);

	// FIND ONE
	public findRoleById = async (id: string) => await findOne(this.roles, id);

	public findRoleByCode = async (code: string) =>
		await this.roles.findOne({ code });
	// UPDATE
	public updateRole = async (id: string, body: object) =>
		await updateOne(this.roles, id, body);

	// DELETE
	public deleteRole = async (id: string) => await deleteOne(this.roles, id);
}
