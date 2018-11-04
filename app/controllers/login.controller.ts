import { UserProfile, IUserProfileDocument } from '../models/user.profile.model';
import { Settings } from '../settings/conf';
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

class LoginController {

    /**
  * Create an User Profile given at least name, userName, password and email
  * @method POST
  * @param {name: String, userName: String, password: String, email: String}
  * Response: {IUserProfileDocument}
  */
    public static signup(req, res) {
        UserProfile.create(req.body, (err, newUserProfile) => {
              if (err) {
                console.log(err);
                return res.status(500).send(err);
              }
                newUserProfile = newUserProfile.toObject();
                delete newUserProfile.password;
                return res.status(201).send(newUserProfile);
            })

    }

    public static signin(req, res) {
        UserProfile.findOne({ email: req.body.email }, (err, userInfo) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            } else {
                console.log(Settings.secret);
                if (bcryptjs.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({ id: userInfo._id }, Settings.secret, { expiresIn: '72h' });
                    res.json({ status: "success", message: "user found!!!", data: { token: token } });
                } else {
                    res.status(404).json({ status: "error", message: "Invalid email/password!!!", data: null });
                }
            }
        });
    }
}
export { LoginController };
