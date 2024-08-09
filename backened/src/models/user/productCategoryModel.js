import mongoose,{Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


const categorySchema = new Schema({
   name: {
    type: string,
    required: true
   },
   
})

categorySchema.plugin(mongooseAggregatePaginate)
export const Category = mongoose.model("Category", categorySchema);