"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import { verifyToken } from "@/app/utils/authenticate";

export default function OrderPage({
    finalOrderStatus,
    setFinalOrderStatus,
    formData,
    setFormData,
}) {
    const router = useRouter();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFinalOrderStatus(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFinalOrderStatus(true);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Checkout</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        className="border p-2 rounded w-full"
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        className="border p-2 rounded w-full"
                        onChange={handleChange}
                    />
                </div>
                <input
                    type="tel"
                    name="contact"
                    placeholder="Contact Number"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    className="border p-2 rounded w-full"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Full Address"
                    required
                    className="border p-2 rounded w-full"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="landmark"
                    placeholder="Landmark (Optional)"
                    className="border p-2 rounded w-full"
                    onChange={handleChange}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        required
                        className="border p-2 rounded w-full"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        required
                        className="border p-2 rounded w-full"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="pincode"
                        placeholder="Pin Code"
                        required
                        pattern="[0-9]{6}"
                        maxLength={6}
                        className="border p-2 rounded w-full"
                        onChange={handleChange}
                    />
                </div>
                {!finalOrderStatus && (
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded w-full font-semibold hover:bg-blue-600 transition"
                    >
                        Place Order
                    </button>
                )}
            </form>
        </div>
    );
}
