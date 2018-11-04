import { Document, Model, model, Schema } from "mongoose";
import  * as bcryptjs  from "bcryptjs";

const saltRounds = 10;

interface IUserProfileDocument extends Document {
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  phone: String,
  ci:  String,
  address: String,
  imageId: Schema.Types.ObjectId
}
//Model interface
interface IUserProfile extends IUserProfileDocument {
}
// MongoDb schema
const UserProfileSchema = new Schema({
  firstName: {
      type: String,
      required: true
  },
  lastName: {
    type: String,
    required: true
},
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: false
  },
  address: {
      type: String,
      required: false
  },
  ci: {
      type: String,
      required: false
  },
  imageId: {
    type: Schema.Types.ObjectId,
    ref: 'image'
}
}, { versionKey: false });

UserProfileSchema.pre('save', async function(next){
  const hash =  bcryptjs.hashSync(this.password, saltRounds);
  //Replace the plain text password with the hash and then store it
  this.password = hash;
  //Indicates we're done and moves on to the next middleware
  next();
});

//We'll use this later on to make sure that the user trying to log in has the correct credentials
UserProfileSchema.methods.isValidPassword = async function(password){
  const user = this;
  //Hashes the password sent by the user for login and checks if the hashed password stored in the 
  //database matches the one sent. Returns true if it does else false.
  const compare = bcryptjs.compareSync(password, user.password);
  return compare;
}


const UserProfile: Model<IUserProfile> = model<IUserProfile>("userprofile", UserProfileSchema);
export { UserProfile, IUserProfileDocument };