import mongoose,{Schema} from "mongoose"


const categorySchema = new Schema({
   name: {
    type: string,
    required: true
   }
})


export const Category = mongoose.model("Category", categorySchema);