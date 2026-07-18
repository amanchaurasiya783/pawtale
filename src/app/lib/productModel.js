import mongoose from "mongoose";
import commentSchema from "./commentSchema";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: function () {
        return this.status === "published";
      },
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      sparse: true,
      required: function () {
        return this.status === "published";
      },
    },

    description: {
      type: String,
      required: function () {
        return this.status === "published";
      },
    },

    brand: {
      type: String,
      trim: true,
    },

    skuID: {
      type: String,
      unique: true,
      trim: true,
      sparse: true,
      required: function () {
        return this.status === "published";
      },
    },

    price: {
      type: Number,
      min: 0,
      required: function () {
        return this.status === "published";
      },
    },

    mrp: {
      type: Number,
      min: 0,
      required: function () {
        return this.status === "published";
      },
      validate: {
        validator: function (value) {
          if (this.status !== "published") return true;
          return value >= this.price;
        },
        message: "MRP must be greater than or equal to Price.",
      },
    },

    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      default: "percentage",
    },

    discountValue: {
      type: Number,
      default: 0,
      min: 0,
    },

    thumbnail: {
      type: String,
      required: function () {
        return this.status === "published";
      },
    },

    images: {
      type: [String],
      default: [],
      validate: {
        validator: function (value) {
          if (this.status !== "published") return true;
          return value.length > 0;
        },
        message: "At least one image is required.",
      },
    },

    category: {
      type: [String],
      default: [],
      required: function () {
        return this.status === "published";
      },
    },

    tags: {
      type: [String],
      default: [],
    },

    quantity: {
      type: Number,
      default: 0,
      min: 0,
      required: function () {
        return this.status === "published";
      },
    },

    stockStatus: {
      type: String,
      enum: ["In Stock", "Out of Stock", "Pre Order"],
      default: "In Stock",
    },

    lowStockThreshold: {
      type: Number,
      default: 5,
    },

    soldCount: {
      type: Number,
      default: 0,
    },

    specifications: [
      {
        key: String,
        value: String,
      },
    ],

    weight: {
      type: Number,
      min: 0,
    },

    dimensions: {
      length: {
        type: Number,
        min: 0,
      },
      width: {
        type: Number,
        min: 0,
      },
      height: {
        type: Number,
        min: 0,
      },
    },

    warranty: {
      type: String,
      default: "No Warranty",
    },

    returnDays: {
      type: Number,
      default: 7,
      min: 0,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },

        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },

        comment: String,
      },
    ],

    comments: [commentSchema],

    views: {
      type: Number,
      default: 0,
    },

    wishlistCount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Products =
  mongoose.models.Products || mongoose.model("Products", productSchema);

export default Products;
