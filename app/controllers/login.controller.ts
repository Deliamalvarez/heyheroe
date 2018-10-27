import { UserProfile, IUserProfileDocument } from '../models/user.profile.model';
import passport = require('passport');
import jwt = require('passport-jwt');

class Login {
    public static login(req, res) {
        passport.authenticate('login', async (err, user, info) => {
            try {
                if (err || !user) {
                    res.send({ message: err.msg });
                }
                req.login(user, { session: false }, async (error) => {
                    if (error) return res.send({ message: error.msg });
                    //We don't want to store the sensitive information such as the
                    //user password in the token so we pick only the email and id
                    const body = { _id: user._id, email: user.email };
                    //Sign the JWT token and populate the payload with the user email and id
                    const token = jwt.sign({ user: body }, 'top_secret');
                    //Send back the token to the user
                    return res.json({ token });
                });
            } catch (error) {
                return res.send({ message: error.message });
            }
        }
}
}
