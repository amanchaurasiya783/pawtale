"use client";
import { useState } from "react";

export default function PaymentOptions({ onPaymentSubmit }) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method";
    }
    if (paymentMethod === "card") {
      if (!/^[0-9]{16}$/.test(cardDetails.cardNumber)) {
        newErrors.cardNumber = "Invalid card number (16 digits required)";
      }
      if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(cardDetails.expiryDate)) {
        newErrors.expiryDate = "Invalid expiry date (MM/YY format)";
      }
      if (!/^[0-9]{3,4}$/.test(cardDetails.cvv)) {
        newErrors.cvv = "Invalid CVV (3-4 digits required)";
      }
      if (!cardDetails.cardHolder.trim()) {
        newErrors.cardHolder = "Cardholder name is required";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onPaymentSubmit(paymentMethod, cardDetails);
    }
  };

  return (
    <div className="bg-white p-4 my-2 shadow-lg rounded-lg max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Payment Options
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Select Payment Method</label>
          <select
            className="border p-2 rounded w-full"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Choose a payment method</option>
            <option value="cod">Cash on Delivery</option>
            <option value="card">Credit/Debit Card</option>
            <option value="upi">UPI</option>
            <option value="netbanking">Net Banking</option>
          </select>
          {errors.paymentMethod && (
            <p className="text-red-500 text-sm">{errors.paymentMethod}</p>
          )}
        </div>

        {paymentMethod === "card" && (
          <div className="space-y-3">
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              maxLength="16"
              className="border p-2 rounded w-full"
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cardNumber: e.target.value })
              }
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm">{errors.cardNumber}</p>
            )}

            <input
              type="text"
              name="expiryDate"
              placeholder="Expiry (MM/YY)"
              className="border p-2 rounded w-full"
              onChange={(e) =>
                setCardDetails({ ...cardDetails, expiryDate: e.target.value })
              }
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-sm">{errors.expiryDate}</p>
            )}

            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              maxLength="4"
              className="border p-2 rounded w-full"
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cvv: e.target.value })
              }
            />
            {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}

            <input
              type="text"
              name="cardHolder"
              placeholder="Cardholder Name"
              className="border p-2 rounded w-full"
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cardHolder: e.target.value })
              }
            />
            {errors.cardHolder && (
              <p className="text-red-500 text-sm">{errors.cardHolder}</p>
            )}
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full font-semibold hover:bg-blue-600 transition"
        >
          Confirm Payment
        </button>
      </form>
    </div>
  );
}
