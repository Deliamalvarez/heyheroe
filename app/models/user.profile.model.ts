import { Document, Model, model, Schema } from "mongoose";

interface IUserProfileDocument extends Document {
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  phone: String,
  ci:  String,
  address: String
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
  }
}, { versionKey: false });

const UserProfile: Model<IUserProfile> = model<IUserProfile>("userprofile", UserProfileSchema);
export { UserProfile, IUserProfileDocument };