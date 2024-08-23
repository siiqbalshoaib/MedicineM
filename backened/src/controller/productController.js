
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/user/productModel.js"
import { ApiResponse } from "../utils/ApiResponse.js";








const getAllProduct = asyncHandler(async(req, res)=>{


    
    const {page=1, limit=10, query } = req.query
    const pipeline = [];
   
     
    if (query) {
      pipeline.push({
        
              $search: {
              index: "search-product",
              text: {
                  query: query,
                  path: 
                     ["productName", "category", "description"] 
                  
              }
          
      }
          
      });
    }
    pipeline.push({$match:{inStock: true}})
  
  
  
  
  
  const productAggregate =  Product.aggregate(pipeline)
  
  
  const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10)
  };
  
  const product = await Product.aggregatePaginate(productAggregate, options);
  
  return res
      .status(200)
      .json(new ApiResponse(200, product, "Product fetched successfully"));
  
  })


  export{
    getAllProduct,
  }