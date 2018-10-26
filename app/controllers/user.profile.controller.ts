import { UserProfile, IUserProfileDocument } from '../models/user.profile.model';
import { CategoryController } from './category.controller';

class UserProfileController{
  /**
   * Get all UserProfile
   * @method GET
   * Response: {[IUserProfileDocument]}
   */

  public static getAllUsersProfile(req, res) {
    UserProfile.find((err, usersProfile) => {
        if (err) return res.status(500).send(err);
        return res.json(usersProfile);
      });
  }

}

export { UserProfileController };