import { Document, Model, model, Schema } from "mongoose";

interface IImageDocument extends Document {
    content: Buffer
}
//Model interface
interface IImageModel extends IImageDocument {
}
// MongoDb schema
const ImageSchema = new Schema({
  content: {
        type: Buffer,
        required: true
    }
}, { versionKey: false });

const Image: Model<IImageModel> = model<IImageModel>("image", ImageSchema);
export { Image, IImageDocument };