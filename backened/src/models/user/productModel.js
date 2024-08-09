
import mongoose,  {Schema} from "mongoose"

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


const productSchema = new Schema({
   
    
        productName: {
          type: string,
          required: true,
        },
    
        description: {
          type: String,
          required: true,
          trim: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0.01, // Enforce a minimum positive price
        },
          category: {
            type: Schema.Types.ObjectId,
            ref: "Category", // Reference the Category model (optional)
          },
        images: {
          type: String,
          trim: true,
        },
        stock: {
          type: Number,
          min: 0, // Enforce non-negative stock
        },
        inStock:{
          type: Boolean,
          default: true
        },
        manufactured:{
            type: string
        },
        expiry:{
            type: string
        },
        batchNo:{
            type: string
        },
        
    
      

},
{timeStamp: true}

)

productSchema.plugin(mongooseAggregatePaginate)


export const Order = mongoose.model("Product", productSchema)