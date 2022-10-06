import IndexController from '@controllers/index.controller';
import Route from '@interfaces/route.interface';
import { Router } from 'express';

class IndexRoute implements Route {
	public path = '/';
	public router: Router = Router();
	private indexController = new IndexController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`, this.indexController.index);
	}
}

export { IndexRoute };
