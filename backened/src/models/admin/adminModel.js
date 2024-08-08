import mongoose, {Schema} from "mongoose";


const adminSchema = new Schema({
    adminName:{
        type: string,
        required: true,
        unique: true
    },
    password:{
        type: string,
        required: true
    },
    fullName:{
        type: string

    },
    

},
  {timestamps: true}
)
export const admin = mongoose.model("Admin",adminSchema);