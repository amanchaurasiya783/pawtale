"use client";

import { useState } from "react";
import { FaMoneyBillWave, FaCreditCard, FaLock } from "react-icons/fa";

type PaymentOptionsProps = {
    totalAmount?: number;
    onPaymentSubmit: (paymentMethod: string) => void;
};

export default function PaymentOptions({
    totalAmount = 0,
    onPaymentSubmit,
}: PaymentOptionsProps) {
    const [paymentMethod, setPaymentMethod] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!paymentMethod) {
            setError("Please select a payment method");
            return;
        }

        setError("");
        onPaymentSubmit(paymentMethod);
    };

    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                    Payment
                </p>

                <h2 className="mt-2 text-3xl font-bold text-background">
                    Choose Payment Method
                </h2>

                <p className="mt-2 text-gray-500">
                    Your payment is secured with Razorpay.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <label
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border p-5 transition ${paymentMethod === "cod"
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                        }`}
                >
                    <div className="flex items-center gap-4">
                        <FaMoneyBillWave className="text-2xl text-green-600" />

                        <div>
                            <h3 className="font-semibold">Cash on Delivery</h3>
                            <p className="text-sm text-gray-500">
                                Pay when your order arrives.
                            </p>
                        </div>
                    </div>

                    <input
                        type="radio"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                </label>

                <label
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border p-5 transition ${paymentMethod === "online"
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                        }`}
                >
                    <div className="flex items-center gap-4">
                        <FaCreditCard className="text-2xl text-blue-600" />

                        <div>
                            <h3 className="font-semibold">Online Payment</h3>
                            <p className="text-sm text-gray-500">
                                UPI • Cards • Wallets • Net Banking
                            </p>
                        </div>
                    </div>

                    <input
                        type="radio"
                        value="online"
                        checked={paymentMethod === "online"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                </label>

                {error && (
                    <p className="text-sm font-medium text-red-500">{error}</p>
                )}

                <div className="rounded-2xl bg-gray-50 p-5">
                    <div className="mb-2 flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{totalAmount}</span>
                    </div>

                    <div className="mb-2 flex justify-between">
                        <span>Delivery</span>
                        <span className="text-green-600">FREE</span>
                    </div>

                    <div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold">
                        <span>Total</span>
                        <span>₹{totalAmount}</span>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <FaLock />
                    <span>100% Secure Payment powered by Razorpay</span>
                </div>

                <button
                    type="submit"
                    className="w-full rounded-xl bg-background py-4 text-lg font-semibold text-white transition hover:opacity-90"
                >
                    {paymentMethod === "cod"
                        ? "Place Order"
                        : `Proceed to Pay ₹${totalAmount}`}
                </button>
            </form>
        </div>
    );
}