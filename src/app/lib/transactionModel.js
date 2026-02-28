import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        priceAtPurchase: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    finalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
        "Return Requested",
        "Returned",
      ],
      default: "Pending",
    },
    timestamps: {
      orderedAt: { type: Date, default: Date.now },
      processingAt: { type: Date },
      shippedAt: { type: Date },
      outForDeliveryAt: { type: Date },
      deliveredAt: { type: Date },
      cancelledAt: { type: Date },
      returnRequestedAt: { type: Date },
      returnedAt: { type: Date },
      refundedAt: { type: Date },
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    billingAddress: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    cancellation: {
      isCancelled: { type: Boolean, default: false },
      reason: { type: String },
    },
    returnRequest: {
      isRequested: { type: Boolean, default: false },
      reason: { type: String },
      status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
      },
    },
    refund: {
      isRefunded: { type: Boolean, default: false },
      amount: { type: Number, default: 0 },
      status: {
        type: String,
        enum: ["Pending", "Processing", "Completed", "Rejected"],
        default: "Pending",
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Transactions =
  mongoose.models.Transactions ||
  mongoose.model("Transactions", transactionSchema);

export default Transactions;
