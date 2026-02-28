import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
    },
    comment: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const commentSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
    },
    comment: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    replies: [replySchema],
  },
  { timestamps: true }
);

export default commentSchema;
