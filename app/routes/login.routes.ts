import { Router, Request, Response, NextFunction } from 'express';
import { LoginController } from '../controllers/login.controller';

class LoginRouter {
    public router: Router
    constructor() {
        this.router = Router();
    }

    init() {
        this.router.post('/auth', LoginController.signin);
        this.router.post('/signup', LoginController.signup);
    }
}

const LoginRoutes = new LoginRouter();
LoginRoutes.init();
export default LoginRoutes.router;