import { filterObj } from '@interfaces/query.interface';

export const filteredObj = (obj: filterObj, ...allowedFields: string[]) => {
	const newObj: filterObj = {};

	Object.keys(obj).forEach((el: string) => {
		if (allowedFields.includes(el)) newObj[el] = obj[el];
	});

	return newObj;
};
