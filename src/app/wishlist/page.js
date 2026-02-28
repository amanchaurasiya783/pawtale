"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { verifyToken } from "../utils/authenticate";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function WishlistComponent() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token = Cookies.get("token");

  const fetchWishlistProducts = () => {
    return verifyToken(token)
      .then((user) => fetch(`/api/users/${user.id}?populate=wishlist`))
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error("Error fetching wishlist: ", error);
        return { user: { wishlist: [] } }; // Return empty array on error
      });
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const user = await verifyToken(token);
      setWishlistItems((prev) => prev.filter((item) => item._id !== productId));

      const response = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "removeFromWishlist", productId }),
      });

      if (!response.ok) throw new Error("Failed to remove from wishlist!");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const handleAddToCart = async (item) => {
    try {
      const user = await verifyToken(token);
      if (!user?.id) throw new Error("Invalid user token.");

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProduct = cart.find((product) => product.id === item._id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({
          id: item._id,
          name: item.name,
          image: item.images[0],
          price: item.price,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "addToCart",
          product: { products: item._id, quantity: 1 },
        }),
      });

      await handleRemoveFromWishlist(item._id);
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  useEffect(() => {
    let isMounted = true;

    fetchWishlistProducts()
      .then((data) => {
        if (isMounted) setWishlistItems(data.user.wishlist || []);
      })
      .catch(console.error)
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  // Skeleton components
  const DesktopSkeletonRow = () => (
    <tr className="border-b">
      {[...Array(6)].map((_, i) => (
        <td key={i} className="p-4">
          <Skeleton height={20} />
        </td>
      ))}
    </tr>
  );

  const MobileSkeletonCard = () => (
    <div className="bg-white p-4 rounded-lg shadow space-y-2">
      <Skeleton height={96} />
      <Skeleton count={3} />
      <Skeleton height={32} />
    </div>
  );

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Your Wishlist</h2>

      {/* Desktop Table Layout */}
      <div className="hidden lg:block overflow-x-auto">
        {loading ? (
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-blue-400 text-white">
                {[...Array(6)].map((_, i) => (
                  <th key={i} className="p-4">
                    <Skeleton height={24} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(3)].map((_, i) => (
                <DesktopSkeletonRow key={i} />
              ))}
            </tbody>
          </table>
        ) : wishlistItems.length === 0 ? (
          <p
            className="m-auto w-full text-center cursor-pointer hover:opacity-85"
            onClick={() => router.push("/store")}
          >
            Add items to wishlist
          </p>
        ) : (
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-blue-400 text-white">
                <th className="p-4 text-left font-medium">Product Name</th>
                <th className="p-4 text-left font-medium">Unit Price</th>
                <th className="p-4 text-left font-medium">Date Added</th>
                <th className="p-4 text-left font-medium">Stock Status</th>
                {/* <th className="p-4 text-left font-medium"></th> */}
                <th className="p-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="p-4 flex items-center gap-4">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span>{item.name}</span>
                  </td>
                  <td className="p-4">${item.price.toFixed(2)}</td>
                  <td className="p-4">
                    {new Date(item.updatedAt).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className="text-green-600">✔</span>{" "}
                    {item.quantity ? "Available" : "Out of Stock"}
                  </td>
                  <td className="p-4 flex gap-4">
                    <ShoppingCartIcon
                      onClick={() => handleAddToCart(item)}
                      width={30}
                      height={30}
                      className="cursor-pointer hover:opacity-80"
                    />
                    <button
                      onClick={() => handleRemoveFromWishlist(item._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden space-y-4">
        {loading ? (
          [...Array(3)].map((_, i) => <MobileSkeletonCard key={i} />)
        ) : wishlistItems.length === 0 ? (
          <p
            className="m-auto w-full text-center cursor-pointer hover:opacity-85"
            onClick={() => router.push("/store")}
          >
            Add items to wishlist
          </p>
        ) : (
          wishlistItems.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-start">
                <div className="flex-grow">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    ${item.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(item.updatedAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600">
                    {item.quantity ? "Available" : "Out Of Stock"}
                  </p>
                  <button
                    onClick={() => handleRemoveFromWishlist(item._id)}
                    className="bg-red-500 text-white w-full py-2 rounded mt-3 hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
