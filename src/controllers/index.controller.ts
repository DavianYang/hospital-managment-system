import { NextFunction, Request, Response } from 'express';
import catchAsync from '@utils/catch-async';

class IndexController {
	public index = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			res.sendStatus(200);
		},
	);
}

export default IndexController;
