import mongoose,  {Schema} from "mongoose"

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


const productOrderSchema = new Schema({


})


export const Order = mongoose.model("Order", productOrderSchema)