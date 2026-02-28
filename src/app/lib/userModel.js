import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  role: {
    type: String,
    enum: ["user", "beyonder", "admin"],
    default: "user",
  },
  status: {
    type: String,
    enum: ["active", "inactive", "banned", "blipped"],
    default: "active",
  },
  profilePicture: {
    type: String,
  },
  likedBlogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blogs",
    },
  ],
  savedBlogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blogs",
    },
  ],
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
  cart: [
    {
      products: {
        // Changed from "products" to "product" for clarity
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products", // Fixed typo "Prodcuts" → "Products"
        // required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transactions",
    },
  ],
  createdAt: {
    // Changed from "CreatedAt" to "createdAt" (camelCase)
    type: Date,
    default: Date.now,
  },
});

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

export default Users;
