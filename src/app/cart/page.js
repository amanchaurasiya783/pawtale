"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaTrash, FaHeart, FaShoppingCart } from "react-icons/fa";
import { verifyToken } from "../utils/authenticate";
import Link from "next/link";
import Image from "next/image";
import OrderPage from "../_components/orders/page";
import PaymentOptions from "../_components/paymentoptions/page";
import Skeleton from "react-loading-skeleton";
import Script from "next/script";
import "react-loading-skeleton/dist/skeleton.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [finalOrderStatus, setFinalOrderStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    async function fetchCartData() {
      const token = Cookies.get("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const verifiedUser = await verifyToken(token);
      if (!verifiedUser) {
        setLoading(false);
        return;
      }

      setUser(verifiedUser);

      try {
        const response = await fetch(
          `/api/users/${verifiedUser.id}?populate=cart.products`,
        );
        const data = await response.json();
        const cart = data.user.cart || [];
        setCartItems(cart);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCartData();
  }, []);

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = async (id) => {
    if (!user) return;

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "removeFromCart",
          productId: id,
        }),
      });

      if (!response.ok) throw new Error("Failed to remove item");

      setCartItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.products.price * item.quantity,
    0,
  );

  const handleAddToWishlist = async (productId, id) => {
    const token = Cookies.get("token");
    const user = token ? await verifyToken(token) : null;
    if (!user) return;

    const response = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "addToWishlist", productId }),
    });
    await response.json();
    await removeItem(id);
  };

  // ✅ Razorpay Integration
  const onPaymentSubmit = async () => {
    try {
      // 1️⃣ Create order on backend
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          address: formData,
          products: cartItems,
        }),
      });
      const order = await res.json();

      // 2️⃣ Razorpay checkout options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_TEST_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "PetCare Website",
        description: "Order Payment",
        handler: async function (response) {
          // 3️⃣ Verify payment on backend
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const verify = await verifyRes.json();

          if (verify.success) {
            alert("✅ Payment Successful!");
            // TODO: Redirect to success/thank-you page
          } else {
            alert("❌ Payment Verification Failed");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <h2 className="text-xl font-semibold mb-4 text-gray-800">My Cart</h2>
      {loading ? (
        <p className="w-full text-center">Loading cart...</p>
      ) : (
        <div className="bg-white p-4 my-2 shadow-lg rounded-lg max-w-4xl mx-auto">
          {cartItems.length === 0 ? (
            <p className="text-center text-black">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="border-b pb-3 mb-3">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <Link key={item._id} href={`/store/${item._id}`}>
                    <div className="w-20 h-20 bg-gray-200 rounded overflow-auto">
                      <Image
                        src={item.products.images[0]}
                        alt="Product Image"
                        width={100}
                        height={100}
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <div className="flex-grow">
                    <h3 className="text-sm font-medium text-gray-900">
                      {item.products.name}
                    </h3>
                    <p className="text-lg font-medium text-gray-800">
                      ₹{item.products.price}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between mt-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item._id, -1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() =>
                        handleAddToWishlist(item.products._id, item._id)
                      }
                      className="text-gray-600 flex items-center gap-1"
                    >
                      <FaHeart className="text-red-500" /> Save for later
                    </button>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-gray-600 flex items-center gap-1"
                    >
                      <FaTrash className="text-red-500" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {cartItems.length > 0 && (
            <div className="flex flex-row items-center justify-between p-4 bg-white rounded-lg mt-4 shadow-md">
              <span className="text-xl font-medium text-gray-900">
                Total: ₹{totalAmount}
              </span>
              {!placingOrder && (
                <button
                  onClick={() => setPlacingOrder(true)}
                  className="bg-yellow-500 text-white font-semibold py-2 px-6 rounded shadow-md hover:bg-yellow-600"
                >
                  Place Order
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {placingOrder && (
        <div className="bg-white p-4 my-2 shadow-lg rounded-lg max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Shipping Details
          </h2>
          <OrderPage
            formData={formData}
            setFormData={setFormData}
            finalOrderStatus={finalOrderStatus}
            setFinalOrderStatus={setFinalOrderStatus}
          />
        </div>
      )}

      {finalOrderStatus && (
        <div className="bg-white p-4 my-2 shadow-lg rounded-lg max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Payment Details
          </h2>
          <PaymentOptions onPaymentSubmit={onPaymentSubmit} />
        </div>
      )}
    </div>
  );
}
