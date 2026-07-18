"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaTrash, FaHeart, FaShoppingCart } from "react-icons/fa";
import { verifyToken } from "../utils/authenticate";
import Link from "next/link";
import Image from "next/image";
import OrderPage from "../_components/orders";
import PaymentOptions from "../_components/paymentoptions";
import Skeleton from "react-loading-skeleton";
import Script from "next/script";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";

export default function Cart() {
  const router = useRouter();
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
  const onPaymentSubmit = async (paymentMethod) => {
    try {
      // Cash on Delivery
      if (paymentMethod === "cod") {
        // TODO: Save COD order in DB

        // alert("Order placed successfully!");

        router.push("/orders/success");
        return;
      }

      // Online Payment (Razorpay)
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount,
          address: formData,
          products: cartItems,
        }),
      });

      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_TEST_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,

        name: "PetVibe",
        description: "Order Payment",

        image: "/favicon.ico",

        handler: async function (response) {
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...response,
              address: formData,
              products: cartItems,
            }),
          });

          const verify = await verifyRes.json();

          if (verify.success) {
            // alert("Payment Successful!");

            router.push("/orders/success");
          } else {
            alert("Payment Verification Failed");
          }
        },

        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
        },

        notes: {
          address: formData.address,
        },

        theme: {
          color: "#0F3460", // Your brand blue
        },

        modal: {
          ondismiss: function () {
            console.log("Payment popup closed");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
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
              <div
                key={item._id}
                className="mb-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col gap-5 md:flex-row">
                  {/* Product Image */}
                  <Link href={`/store/${item.products._id}`}>
                    <div className="relative h-36 w-36 overflow-hidden rounded-xl border bg-gray-50">
                      <Image
                        src={item.products.images?.[0]}
                        alt={item.products.name}
                        fill
                        className="object-cover hover:scale-105 transition"
                      />
                    </div>
                  </Link>

                  {/* Product Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {item.products.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Premium Quality Pet Product
                      </p>

                      <div className="mt-4 flex items-center gap-3">
                        <span className="text-2xl font-bold text-blue-900">
                          ₹{item.products.price}
                        </span>

                        <span className="text-gray-400 line-through">
                          ₹{Math.round(item.products.price * 1.35)}
                        </span>

                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                          25% OFF
                        </span>
                      </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      {/* Quantity */}
                      <div className="flex w-fit items-center rounded-xl border bg-gray-50">
                        <button
                          onClick={() => updateQuantity(item._id, -1)}
                          className="px-4 py-2 text-lg hover:bg-gray-100"
                        >
                          −
                        </button>

                        <span className="min-w-[45px] text-center font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQuantity(item._id, 1)}
                          className="px-4 py-2 text-lg hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            handleAddToWishlist(item.products._id, item._id)
                          }
                          className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-red-50"
                        >
                          <FaHeart className="text-red-500" />
                          Wishlist
                        </button>

                        <button
                          onClick={() => removeItem(item._id)}
                          className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                          <FaTrash />
                          Remove
                        </button>
                      </div>
                    </div>
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
          <PaymentOptions
            totalAmount={totalAmount}
            onPaymentSubmit={onPaymentSubmit}
          />
        </div>
      )}
    </div>
  );
}
