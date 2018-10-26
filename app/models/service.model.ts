import { Document, Model, model, Schema } from "mongoose";

interface IServiceDocument extends Document {
    name: String,
    description: String,
    category: Schema.Types.ObjectId
}
//Model interface
interface IServiceModel extends IServiceDocument {
}
// MongoDb schema
const ServiceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    }
}, { versionKey: false });

const Service: Model<IServiceModel> = model<IServiceModel>("Service", ServiceSchema);
export { Service, IServiceDocument };