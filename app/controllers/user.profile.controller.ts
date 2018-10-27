import { UserProfile, IUserProfileDocument } from '../models/user.profile.model';

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
      if (err) return res.status(500).send(err);
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
    if (!req.params.id) {
      return res.status(400).send({
        message: 'An id must be provided'
      });
    }

    UserProfile
    .findById(req.params.id)
    .select('-password')
    .exec( (err, userProfile) => {
      if (err) return res.status(500).send(err);
      if (!userProfile) {
        return res.status(404).send({ message: 'User Profile not found' });
      }
      return res.send(userProfile);
    });
  }

  /**
  * Create an User Profile given at least name, userName, password and email
  * @method POST
  * @param {name: String, userName: String, password: String, email: String}
  * Response: {IUserProfileDocument}
  */
  public static createUserProfile(req, res) {
    UserProfile.create(req.body, (err, newUserProfile) => {
      if (err) return res.status(500).send(err);
      newUserProfile = newUserProfile.toObject();
      delete newUserProfile.password;
      return res.status(201).send(newUserProfile);
    });

  }

  /**
 * Update a User Profile given name, userName, password, email, phone and/or address
 * @method PUT
 * @param {name: String, userName: String, password: String, email: String, phone: String, address: String}
 * Response: {IUserProfileDocument}
 */
  public static updateCategory(req, res) {
    UserProfile.findByIdAndUpdate(req.body.id, req.body, { new: true }, (err, updatedUserProfile) => {
      debugger;
      if (err) return res.status(500).send(err);
      if (!updatedUserProfile) {
        return res.status(404).send({ message: 'User profile not found' });
      }
      return res.status(200).send(updatedUserProfile);
    });
  }

  /**
  * Remove a User Profile given name, userName and/or email
  * @method DELETE
  * @param {id: guid}
  * Response: {No Content}
  */

  /*public static removeUserProfile(req, res) {
    UserProfile.findByIdAndRemove(req.params.id, err => {
      if (err) return res.status(500).send(err);
      res.status(204).send();
    });
  }*/


}

export { UserProfileController };