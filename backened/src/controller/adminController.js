import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/user/productModel.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import {Category} from "../models/user/productCategoryModel.js"
//import mongoose, {isValidObjectId} from "mongoose"
//import { pipeline } from "stream";





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


const getAllProduct = asyncHandler(async(req, res) =>{

   const { page=1, limit=20,  query, sortBy, sortType} = req.query

   const pipeline = [];
   
    // for using Full Text based search u need to create a search index in mongoDB atlas
    // you can include field mapppings in search index eg.title, description, as well
    // Field mappings specify which fields within your documents should be indexed for text search.
    // this helps in seraching only in title, desc providing faster search results
    // here the name of search index is 'search-videos'


    if(query)
    {
        pipeline.push({
            $search:{
                index: "search-product",
                text:{
                    query: query,
                    Path: ["productName","description"]
                }
            }
        })
    }
    
   

  // fetch product only that are set inStock as true
  pipeline.push({ $match: { inStock: true } });


     //sortBy can be views, createdAt, duration
    //sortType can be ascending(-1) or descending(1)
    if (sortBy && sortType) {
        pipeline.push({
            $sort: {
                [sortBy]: sortType === "asc" ? 1 : -1
            }
        });
    } else {
        pipeline.push({ $sort: { createdAt: -1 } });
    }

    pipeline.push({
        $lookup:{
            from:"Category",
            localField: "category",
            foreignField: "_id",
            as: "productCategory",
            pipeline:[
              {
                $project:{
                    name: 1
                }
              }
            ]
        }
        
    },
    {
        $unwind : "$productCategory"
    }
)






const productAggregate = Product.aggregate(pipeline);

const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 20)
};

const product = await Product.aggregatePaginate(productAggregate, options);

return res
          .status(200)
          .json(new ApiResponse(200, product, "Product Fetched Successfully"))





        
});

export{
    addProduct,
    getAllProduct,
}