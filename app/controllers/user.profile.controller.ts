import { UserProfile, IUserProfileDocument } from '../models/user.profile.model';
import { Utils } from './utils';

class UserProfileController {
  /**
   * Get all UserProfile
   * @method GET
   * Response: {[IUserProfileDocument]}
   */

  public static getAllUsersProfile(req, res) {
    UserProfile
    .find()
    .select('-password')
    .exec((err, usersProfile) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      };
      return res.json(usersProfile);
    });
  }

  //////////
  /**
   * Get an User Profile by a given id
   * @method GET
   * @param id
   * Response: {IUserProfileDocument}
   */

  public static getUserProfileById(req, res) {
    Utils.validateId(req, res);
    UserProfile
    .findById(req.params.id)
    .select('-password')
    .exec( (err, userProfile) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      };
      if (!userProfile) {
        return res.status(404).send({ message: 'User Profile not found' });
      }
      return res.send(userProfile);
    });
  }

  

  /**
 * Update a User Profile given name, userName, password, email, phone and/or address
 * @method PUT
 * @param {name: String, userName: String, password: String, email: String, phone: String, address: String}
 * Response: {IUserProfileDocument}
 */
  public static updateUserProfile(req, res) {
    UserProfile.findByIdAndUpdate(req.body.id, req.body, { new: true })
    .select('-password')
    .exec((err, updatedUserProfile) => {
      if (!updatedUserProfile) {
        return res.status(404).send({ message: 'User profile not found' });
      }
      return res.status(200).send(updatedUserProfile);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send(err);
    });;
  }

  /**
  * Remove a User Profile given name, userName and/or email
  * @method DELETE
  * @param {id: guid}
  * Response: {No Content}
  */

  /*public static removeUserProfile(req, res) {
    UserProfile.findByIdAndRemove(req.params.id, err => {
      if (err) return err;
      res.status(204).send();
    });
  }*/


}

export { UserProfileController };