import mongoose from "mongoose";
import commentSchema from "./commentSchema";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    content1: {
      type: String,
      required: true,
    },
    content2: {
      type: String,
      required: true,
    },
    category: [
      {
        type: String,
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    images: {
      type: [String],
      validate: {
        validator: (images) => images.length >= 2,
        message: "A blog can have only 2 images",
      },
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

const Blogs = mongoose.models.Blogs || mongoose.model("Blogs", blogSchema);

export default Blogs;
