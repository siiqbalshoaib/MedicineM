import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/user/productModel.js"
import { ApiResponse } from "../utils/ApiResponse.js";





const addProduct = asyncHandler(async(req,res)=>{

   const {productName, description, price, stock, mfg,  expiry} = req.body

   if([productName,description,price, stock,mfg, expiry].some((field)=>field?.trim() === ""))
    {
       throw new ApiError(400, "All fields are required")
    }

    const existedProduct = await Product.findOne({productName})

    if(existedProduct)
        {
         throw new ApiError(409,"Product with this name already exist")
       }
      //  avatar wala kaam krna baki hai

    // const avatarLocalPath = req.files?.avatar[0]?.path;
    // if(!avatarLocalPath)
    // {
    //     throw new ApiError(400, "Avatar files is required")
    // }

    // const avatar = await  uploadOnCloudinary(avatarLocalPath)


    // if(!avatar)
    // {
    //     throw new ApiError(400, "Avatar files is required")
    // }


const product = await Product.create({
    productName,
    // avatar: avatar.url,
     description,
     price,
     mfg,
     expiry,
     stock
})

const createdProduct = await Product.findById(product._id)

if(!createdProduct){
    throw new ApiError(500,  "Product Added Successfully")
}
return res.status(201).json(
    new ApiResponse(200, createdProduct," Product Created Successfully !")
)
      
    


})




export{
    addProduct,
}