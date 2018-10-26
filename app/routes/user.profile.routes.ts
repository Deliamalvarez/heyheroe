import { Router, Request, Response, NextFunction } from 'express';
import { UserProfileController }  from '../controllers/user.profile.controller';

class UserProfileRouter {
    public router: Router
    constructor() {
        this.router = Router();
    }

    init(){
        this.router.get('/', UserProfileController.getAllUsersProfile);
      /*  this.router.get('/:id', UserProfileController.getServiceById);
        this.router.post('/', UserProfileController.createService);
        this.router.put('/', UserProfileController.updateService);
        this.router.delete('/:id', UserProfileController.removeService); */
    }
}

const userProfileRoutes = new UserProfileRouter();
userProfileRoutes.init();
export default userProfileRoutes.router;