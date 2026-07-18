"use client";

export default function OrderPage({
    finalOrderStatus,
    setFinalOrderStatus,
    formData,
    setFormData,
}) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setFinalOrderStatus(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFinalOrderStatus(true);
    };

    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                    Shipping Details
                </p>

                <h2 className="mt-2 text-3xl font-bold text-background">
                    Delivery Address
                </h2>

                <p className="mt-2 text-gray-500">
                    Enter the address where you want your order delivered.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name + Email */}

                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@email.com"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                </div>

                {/* Phone */}

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Mobile Number
                    </label>

                    <input
                        type="tel"
                        name="contact"
                        required
                        value={formData.contact}
                        onChange={handleChange}
                        pattern="[0-9]{10}"
                        maxLength={10}
                        placeholder="9876543210"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                {/* Address */}

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Full Address
                    </label>

                    <textarea
                        rows={4}
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="House No., Street, Area..."
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200 resize-none"
                    />
                </div>

                {/* Landmark */}

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Landmark
                    </label>

                    <input
                        type="text"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                        placeholder="Near..."
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                {/* City State Pincode */}

                <div className="grid gap-5 md:grid-cols-3">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            City
                        </label>

                        <input
                            type="text"
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            State
                        </label>

                        <input
                            type="text"
                            name="state"
                            required
                            value={formData.state}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Pincode
                        </label>

                        <input
                            type="text"
                            name="pincode"
                            required
                            value={formData.pincode}
                            onChange={handleChange}
                            pattern="[0-9]{6}"
                            maxLength={6}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                </div>

                {!finalOrderStatus && (
                    <button
                        type="submit"
                        className="mt-4 w-full rounded-xl bg-background py-4 text-lg font-semibold text-white transition hover:opacity-90"
                    >
                        Continue to Payment →
                    </button>
                )}
            </form>
        </div>
    );
}