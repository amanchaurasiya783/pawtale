"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export default function CheckoutPage() {
    const [cart, setCart] = useState<CartItem[]>([
        { id: 1, name: "DuoComfort Sofa Premium", price: 20, quantity: 1, image: "/sofa.png" },
        { id: 2, name: "IronOne Desk", price: 25, quantity: 1, image: "/desk.png" },
    ]);

    const [discount, setDiscount] = useState(10);

    const handleQuantityChange = (id: number, delta: number) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const handleRemove = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 5;
    const total = subtotal + shipping - discount;

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center p-6">
            <div className="max-w-5xl w-full bg-white shadow-lg rounded-2xl grid md:grid-cols-2">

                {/* Left Section - Shipping Info */}
                <div className="p-6 space-y-4">
                    <h2 className="text-2xl font-semibold">Checkout</h2>
                    <div className="space-y-3">
                        <input className="w-full p-3 border rounded-xl" placeholder="Full name *" />
                        <input className="w-full p-3 border rounded-xl" placeholder="Email address *" />
                        <input className="w-full p-3 border rounded-xl" placeholder="Phone number *" />
                        <select className="w-full p-3 border rounded-xl">
                            <option>Country</option>
                            <option>India</option>
                            <option>USA</option>
                        </select>
                        <div className="grid grid-cols-3 gap-3">
                            <input className="p-3 border rounded-xl" placeholder="City" />
                            <input className="p-3 border rounded-xl" placeholder="State" />
                            <input className="p-3 border rounded-xl" placeholder="ZIP Code" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="terms" />
                            <label htmlFor="terms" className="text-sm text-gray-600">
                                I have read and agree to the Terms and Conditions.
                            </label>
                        </div>
                    </div>
                </div>

                {/* Right Section - Cart */}
                <div className="p-6 bg-gray-50 space-y-4 border-l">
                    <h2 className="text-xl font-semibold">Review your cart</h2>

                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm">
                            <div className="flex items-center gap-3">
                                <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg" />
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    className="px-2 py-1 bg-gray-200 rounded-lg"
                                    onClick={() => handleQuantityChange(item.id, -1)}
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    className="px-2 py-1 bg-gray-200 rounded-lg"
                                    onClick={() => handleQuantityChange(item.id, 1)}
                                >
                                    +
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleRemove(item.id)}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Discount */}
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Discount code"
                            className="flex-1 p-2 border rounded-xl"
                        />
                        <button className="px-4 py-2 bg-gray-800 text-white rounded-xl">
                            Apply
                        </button>
                    </div>

                    {/* Totals */}
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-red-500">
                            <span>Discount</span>
                            <span>- ${discount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Pay Now Button */}
                    <button className="w-full bg-blue-600 text-white py-3 rounded-xl mt-3 hover:bg-blue-700 transition">
                        Pay Now
                    </button>

                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                        🔒 Secure Checkout – SSL Encrypted
                    </p>
                </div>
            </div>
        </div>
    );
}
