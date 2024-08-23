import express from "express"
import cors from  "cors"
import cookieParser from "cookie-parser"

const app = express()



app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended:true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());




// Route Import


import userRouter from "./route/userRoute.js"

import productAdminRouter from "./route/productAdminRoute.js"
import productRouter from "./route/productRouter.js"


//  route declaration

app.use("/api/v1/users", userRouter)

// product Route for Admin
app.use("/api/v1/admin", productAdminRouter)



// get all product(general)
app.use("/api/v1/product",productRouter)




export {app}