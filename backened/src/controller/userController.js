import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/user/userModel.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"



const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}


const registerUser = asyncHandler(async(req,res)=>{
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res



    const {fullName, email, username, password, address, phoneNo} = req.body
    //  console.log("email", email);
    
    if(
        [fullName, email, username, password, address, phoneNo].some((field) => field?.trim() === "")
    )
    {
        throw new ApiError(400, "All fields are required");
    }



const existedUser = await User.findOne({
    $or:[
        {username}, {email},{phoneNo}

       ]
})

if(existedUser)
    {
    throw new ApiError(409, "User with this email or username already exist")

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

    const user = await User.create({
        fullName,
       // avatar: avatar.url,
        email,
        password,
        phoneNo,
        username: username.toLowerCase(),
        address
    })

    const createdUser = await User.findById(user._id).select(" -password -refreshToken")

    if(!createdUser){
        throw new ApiError(500,  "Something went wrong while registering User")
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser," User registered Successfully")
    )

}
)
    

export {
    registerUser,
}