import { UserProfile, IUserProfileDocument } from '../models/user.profile.model';
import { Settings } from '../settings/conf';
import { Utils } from './utils';
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
        const image = req.body.profileImage;
        let processImage: Promise<any> | Promise<void> = image ? 
            Utils.uploadImg(Buffer.from(image.split(",")[1],'base64')) :
            Promise.resolve();
        Promise.all([processImage]).then(([img]) => {
            const newUserRequest = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.bdoy.password,
                email: req.body.email,
                phone: req.body.phone,
                ci:  req.body.ci,
                address: req.body.address,
                imageId: img ? img : Settings.defaultIds.image 
            }
            UserProfile.create(newUserRequest, (err, newUserProfile) => {
                if (err) {
                  console.log(err);
                  return res.status(500).send(err);
                }
                  newUserProfile = newUserProfile.toObject();
                  delete newUserProfile.password;
                  return res.status(201).send(newUserProfile);
              })
  
        })
        .catch(err => console.log(err));
        
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
