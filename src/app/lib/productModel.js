import mongoose from "mongoose";
import commentSchema from "./commentSchema";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    skuID: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    discount: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    category: {
      type: [String],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    ratings: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "Users",
        },
        rating: {
          type: Number,
          min: 0,
          max: 5,
        },
        comment: String,
      },
    ],
    comments: [commentSchema],
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

const Products =
  mongoose.models.Products || mongoose.model("Products", productSchema);

export default Products;
