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
        console.log(image);
        if (image && image !== '' && image.toString().indexOf(Settings.imgFormat) !== 0){
            res.status(400).send({message: 'Invalid image format. Check documentation'});
        }
        let processImage: Buffer = image ? Buffer.from(image.split(",")[1],'base64') : null;
        Utils.uploadImg(processImage).then((imageId) => {
            const newUserRequest = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
                email: req.body.email,
                phone: req.body.phone,
                ci:  req.body.ci,
                address: req.body.address,
                imageId: imageId
            }
            UserProfile.create(newUserRequest, (err, newUserProfile) => {
                if (err) {
                  console.log(err);
                  return res.status(500).send(err);
                }
                  // add token to response
                  const token = jwt.sign({ id: newUserProfile._id }, Settings.secret, { expiresIn: '72h' });
                  // prepare user profile to response
                  newUserProfile = newUserProfile.toObject();
                  delete newUserProfile.password;
                  return res.status(201).send({user: newUserProfile, token: token});
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
