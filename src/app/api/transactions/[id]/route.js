import connectToDatabase from "@/app/lib/mongodb";
import Transactions from "@/app/lib/transactionModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

//GET Transaction By ID
export async function GET(req, { params }) {
  const { id } = params;
  if (!id)
    return NextResponse.json(
      { message: "Transaction ID Missing!" },
      { status: 204 }
    );

  await connectToDatabase();

  const transaction = await Transactions.findById(id);
  if (!transaction)
    return NextResponse.json(
      { message: "No Transaction Found!" },
      { status: 404 }
    );
  return NextResponse.json({ message: "Success!", transaction });
}

// UPDATE Transaction By ID
export async function PATCH(req) {
  try {
    await connectToDatabase();

    const { transactionId, paymentStatus } = await req.json();

    const transaction = await Transactions.findById(transactionId);
    if (!transaction) {
      return NextResponse.json(
        { success: false, error: "Transaction not found" },
        { status: 404 }
      );
    }

    transaction.paymentStatus = paymentStatus;
    transaction.transactionStatus =
      paymentStatus === "Completed" ? "Completed" : "Pending";

    await transaction.save();

    return NextResponse.json({ success: true, transaction });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
