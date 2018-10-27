import { Document, Model, model, Schema } from "mongoose";

interface IUserProfileDocument extends Document {
  name: String,
  description: String,
  category: Schema.Types.ObjectId
}
//Model interface
interface IUserProfile extends IUserProfileDocument {
}
// MongoDb schema
const UserProfileSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  userName: {
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
  }
}, { versionKey: false });

const UserProfile: Model<IUserProfile> = model<IUserProfile>("UserProfile", UserProfileSchema);
export { UserProfile, IUserProfileDocument };