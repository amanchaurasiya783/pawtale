"use client";

import Link from "next/link";
import {
    FaCheckCircle,
    FaBoxOpen,
    FaShippingFast,
    FaHome,
    FaClipboardList,
    FaMapMarkerAlt,
} from "react-icons/fa";

export default function OrderSuccess() {
    const order = {
        id: "PV-458291",
        delivery: "18 - 20 July",
        total: 200,
        shipping: {
            name: "Aman Chaurasiya",
            address: "Raj Nagar Extension",
            city: "Ghaziabad",
            state: "Uttar Pradesh",
            pincode: "201009",
        },
        items: [
            {
                name: "Dog Belt",
                quantity: 1,
                price: 200,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">

            <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

                {/* LEFT */}

                <div className="lg:col-span-2 space-y-6">

                    <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

                        <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-5" />

                        <h1 className="text-4xl font-semibold text-[#143C7D]">
                            Order Confirmed
                        </h1>

                        <p className="mt-3 text-gray-600">
                            Thank you for shopping with PetVibe.
                        </p>

                        <p className="mt-2">
                            Your order has been placed successfully.
                        </p>

                        <div className="mt-8 flex justify-center gap-10">

                            <div>
                                <p className="text-gray-500 text-sm">
                                    Order ID
                                </p>

                                <p className="font-semibold text-lg">
                                    {order.id}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">
                                    Delivery
                                </p>

                                <p className="font-semibold text-lg">
                                    {order.delivery}
                                </p>
                            </div>

                        </div>

                        <div className="flex justify-center gap-4 mt-10">

                            <Link
                                href="/store"
                                className="bg-[#143C7D] text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition"
                            >
                                Continue Shopping
                            </Link>

                            <Link
                                href="/allorders"
                                className="border border-[#143C7D] text-[#143C7D] px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
                            >
                                My Orders
                            </Link>

                        </div>

                    </div>

                    {/* Timeline */}

                    <div className="bg-white rounded-2xl shadow-lg p-8">

                        <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2">

                            <FaShippingFast />

                            Order Progress

                        </h2>

                        <div className="grid grid-cols-5 text-center">

                            {[
                                "Placed",
                                "Confirmed",
                                "Packed",
                                "Shipped",
                                "Delivered",
                            ].map((step, index) => (

                                <div key={step}>

                                    <div
                                        className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center
                                        ${index === 0
                                                ? "bg-green-500 text-white"
                                                : "bg-gray-200"
                                            }`}
                                    >
                                        {index === 0 ? "✓" : index + 1}
                                    </div>

                                    <p className="mt-3 font-medium">
                                        {step}
                                    </p>
                                    <p className="font-normal text-xs">
                                        22-Sept-2026 <br />by 11:00 PM
                                    </p>

                                </div>

                            ))}
                        </div>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="space-y-6">

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <h2 className="font-semibold text-xl mb-5 flex items-center gap-2">

                            <FaMapMarkerAlt />

                            Shipping Address

                        </h2>

                        <p className="font-semibold">
                            {order.shipping.name}
                        </p>

                        <p>{order.shipping.address}</p>

                        <p>
                            {order.shipping.city}
                        </p>

                        <p>
                            {order.shipping.state}
                        </p>

                        <p>{order.shipping.pincode}</p>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <h2 className="font-semibold text-xl mb-5 flex items-center gap-2">

                            <FaClipboardList />

                            Order Summary

                        </h2>

                        {order.items.map((item) => (

                            <div
                                key={item.name}
                                className="flex justify-between mb-4"
                            >
                                <p>
                                    {item.name} × {item.quantity}
                                </p>

                                <p>
                                    ₹{item.price}
                                </p>

                            </div>

                        ))}

                        <hr className="my-4" />

                        <div className="flex justify-between">

                            <span>Subtotal</span>

                            <span>₹{order.total}</span>

                        </div>

                        <div className="flex justify-between mt-2">

                            <span>Shipping</span>

                            <span className="text-green-600">
                                FREE
                            </span>

                        </div>

                        <hr className="my-4" />

                        <div className="flex justify-between text-xl font-semibold text-[#143C7D]">

                            <span>Total</span>

                            <span>₹{order.total}</span>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}