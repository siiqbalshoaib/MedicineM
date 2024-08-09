import mongoose, {Schema} from "mongoose"


const orderSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type: Number
    }

})

export const  Order = mongoose.model("Order",orderSchema)