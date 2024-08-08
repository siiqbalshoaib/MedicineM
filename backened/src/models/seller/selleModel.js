import mongoose, {Schema} from "mongoose"
const sellerSchema = new Schema({});



export const Seller = mongoose.model("Seller", sellerSchema);