import connectToDatabase from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Transactions from "@/app/lib/transactionModel";
import Users from "@/app/lib/userModel";
import Products from "@/app/lib/productModel";

export async function POST(req) {
  try {
    const user = await req.headers.get("x-user-id");
    await connectToDatabase();
    const userCart = await Users.findById(user)
      .select("cart")
      .populate({
        path: "cart.products",
        model: Products,
      })
      .lean();

    const stringifyCart = JSON.stringify(userCart, null, 2);
    let products = JSON.parse(stringifyCart).cart;

    const formattedProducts = products.map((item) => ({
      product: item.products._id,
      quantity: item.quantity,
      priceAtPurchase: item.products.price,
    }));

    const { shippingAddress, paymentMethod } = await req.json();

    if (
      !user ||
      !formattedProducts ||
      formattedProducts.length === 0 ||
      !shippingAddress ||
      !paymentMethod
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    let totalAmount = products.reduce(
      (acc, item) => acc + item.products.price * item.quantity,
      0
    );
    let discount = 0;
    let tax = 0;
    let finalAmount = totalAmount - discount + tax;

    const newTransaction = await Transactions.create({
      user,
      products: formattedProducts,
      totalAmount,
      discount,
      tax,
      finalAmount,
      shippingAddress: JSON.stringify(shippingAddress),
      billingAddress: JSON.stringify(shippingAddress),
      paymentMethod,
    });

    if (!newTransaction) {
      return NextResponse.json(
        { success: false, message: "Error creating transaction" },
        { status: 500 }
      );
    }

    // Update product quantity
    const bullkOperation = formattedProducts.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity } },
      },
    }));

    await Products.bulkWrite(bullkOperation);

    // Clear user cart
    await Users.findByIdAndUpdate(user, { cart: [] }).exec();

    return NextResponse.json(
      { success: true, transaction: newTransaction },
      { status: 201 }
    );
  } catch (error) {
    console.error("Transaction creation error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectToDatabase();

    const orders = await Transactions.find({ isDeleted: false })
      .populate("user", "name email")
      .populate("products.product", "name price");

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
