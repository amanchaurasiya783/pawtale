"use client";

import { useState } from "react";

export default function CheckoutButton() {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);

        // Step 1: Create order on backend
        const res = await fetch(`/api/razorpay/order`, { method: "POST" });
        const data = await res.json();

        // Step 2: Setup Razorpay options
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Public Key
            amount: 50000,
            currency: "INR",
            name: "FurAura Petcare",
            description: "Petcare Order Payment",
            order_id: data.orderId,
            handler: async function (response: any) {
                // Step 3: Verify payment on backend
                const verifyRes = await fetch(`/api/razorpay/verify`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(response),
                });

                const verifyData = await verifyRes.json();
                if (verifyData.success) {
                    alert("✅ Payment Verified Successfully!");
                } else {
                    alert("❌ Payment Verification Failed!");
                }
            },
            prefill: {
                name: "John Doe",
                email: "johndoe@example.com",
                contact: "9999999999",
            },
            theme: { color: "#F37254" },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        setLoading(false);
    };

    return (
        <button
            onClick={handlePayment}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
            {loading ? "Processing..." : "Pay with Razorpay"}
        </button>
    );
}
