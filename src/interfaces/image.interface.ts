import ApiError from '@exceptions/api.error';

export interface FileFilterCallback {
	(error: ApiError | Error): void;
	(error: ApiError | null, acceptFile: boolean): void;
}
