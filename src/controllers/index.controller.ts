import { NextFunction, Request, Response } from 'express';

import * as strings from '@resources/strings';
import catchAsync from '@utils/catch-async';

class IndexController {
	public index = catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			res.status(200).json({
				data: strings.WELCOME_TO_HOSPITAL_MANAGEMENT,
			});
		},
	);
}

export default IndexController;
