import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_TEST_KEY_ID)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // ✅ Verified payment
      return NextResponse.json({ success: true });
    } else {
      // ❌ Invalid signature
      return NextResponse.json({ success: false });
    }
  } catch (err) {
    console.error("Verification Error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
