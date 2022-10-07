import { Request } from 'express';
import multer from 'multer';

import ApiError from '@exceptions/api.error';
import { FileFilterCallback } from '@interfaces/image.interface';

const multerStorage = multer.memoryStorage();

const multerFiler = (
	req: Request,
	file: Express.Multer.File,
	callback: FileFilterCallback,
) => {
	if (file.mimetype.startsWith('image')) {
		callback(null, true);
	} else {
		callback(
			new ApiError('Not an image! Please upload only images', 400),
			false,
		);
	}
};

export const upload = multer({
	storage: multerStorage,
	fileFilter: multerFiler,
});
