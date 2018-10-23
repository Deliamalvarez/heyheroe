import { Document, Model, model, Schema } from "mongoose";

interface ICategoryDocument extends Document {
    name: String,
    description: String
}
//Model interface
interface ICategoryModel extends ICategoryDocument {
}
// MongoDb schema
const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, { versionKey: false });

const Category: Model<ICategoryModel> = model<ICategoryModel>("category", CategorySchema);
export { Category, ICategoryDocument };