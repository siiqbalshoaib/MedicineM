import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/user/productModel.js"
import { ApiResponse } from "../utils/ApiResponse.js";

//import mongoose, {isValidObjectId} from "mongoose"






const addProduct = asyncHandler(async(req,res)=>{

   const {productName, description, price, stock, mfg, category,  expiry} = req.body

   if([productName,description,price, stock,mfg, expiry, category].some((field)=>field?.trim() === ""))
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
     stock,
     category
     
     
})

const createdProduct = await Product.findById(product._id)

if(!createdProduct){
    throw new ApiError(500,  "Product Not Added ")
}
return res.status(201).json(
    new ApiResponse(200, createdProduct," Product Created Successfully !")
)
      
    


});


const updateProduct = asyncHandler(async(req, res)=>{
  
    const {productName,  price, stock  } = req.body

    if(!productName || !price || !stock  ){
        throw new ApiError(400, "All fields are required");
    }
    const findProduct = await Product.findById(req.params._id);
        if(!findProduct)
            {
                throw new ApiError(404, "Product not found")

            }

    const product = await Product.findByIdAndUpdate(
         req.params._id,
        {
            $set:{
                productName,
                price,
                stock
            }
        },
        {new: true}
    )

    return res
          .status(200)
          .json(new ApiResponse(200, product, "Product updated Successfully !!"))

});



// router.put("/updatenote/:id",fetchuser,async(req,res)=>{
//     const {title,description,tag} = req.body;
//     //Create a new note object to update 
//     const newNote = {};
//     if(title){newNote.title = title};
//     if(description){newNote.description = description};
//     if(tag){newNote.tag = tag};
  
//     //find the note to be update and update it
//     let note = await Notes.findById(req.params.id);
//     if(!note){return res.status(404).send("Not found")}
  
//     if(note.user.toString()!== req.user.id){
//       return res.status(401).send(" Access Denied")
//     }
//    note= await Notes.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true})
//     res.json({note});
//   })




export{
    
    addProduct,
    updateProduct,
}