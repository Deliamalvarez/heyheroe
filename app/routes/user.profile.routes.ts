import { Router, Request, Response, NextFunction } from 'express';
import { UserProfileController } from '../controllers/user.profile.controller';

class UserProfileRouter {
  public router: Router
  constructor() {
    this.router = Router();
  }

  init() {
    this.router.get('/', UserProfileController.getAllUsersProfile);
    this.router.get('/:id', UserProfileController.getUserProfileById);
    this.router.post('/', UserProfileController.createUserProfile);
    this.router.put('/', UserProfileController.updateCategory);
    //this.router.delete('/:id', UserProfileController.removeUserProfile);
  }
}

const userProfileRoutes = new UserProfileRouter();
userProfileRoutes.init();
export default userProfileRoutes.router;