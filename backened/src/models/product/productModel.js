import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    productName: {
      type: string,
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0.01, // Enforce a minimum positive price
    },
    //   category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category', // Reference the Category model (optional)
    //   },
    images: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      min: 0, // Enforce non-negative stock
    },
    manufactured:{
        type: string
    },
    expiry:{
        type: string
    },
    batchNo:{
        type: string
    }

  },


  { timestamps: true }
);

export const product = mongoose.model("Product", productSchema);
