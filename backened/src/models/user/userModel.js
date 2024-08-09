import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"



const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken:{
      type: String
      
    },
    role:{
      type : Number,
      default:0
    },
    avatar: {
      type: String,
    },
      Order:[{
      type: Schema.Types.ObjectId,
      ref: "Product"
    }],
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};


userSchema.plugin(mongooseAggregatePaginate)

export const User = mongoose.model("User", userSchema);
