import { Router, Request, Response, NextFunction } from 'express';
import { ServiceController } from '../controllers/service.controller';

class ServiceRouter {
    public router: Router
    constructor() {
        this.router = Router();
    }

    init() {
        this.router.get('/', ServiceController.getAllServices);
        this.router.get('/:id', ServiceController.getServiceById);
        this.router.post('/', ServiceController.createService);
        this.router.put('/', ServiceController.updateService);
        this.router.delete('/:id', ServiceController.removeService);
    }
}

const serviceRoutes = new ServiceRouter();
serviceRoutes.init();
export default serviceRoutes.router;