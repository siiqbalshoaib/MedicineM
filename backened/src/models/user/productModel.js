
import mongoose,  {Schema} from "mongoose"

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


const productSchema = new Schema({
   
    
        productName: {
          type: String,
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
            type: String,
            required: true
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
        mfg:{
            type: String
        },
        expiry:{
            type: String
        },
        batchNo:{
            type: String
        },
        
    
      

},
{timeStamp: true}

)

productSchema.plugin(mongooseAggregatePaginate)


export const Product = mongoose.model("Product", productSchema)