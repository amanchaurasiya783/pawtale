"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyToken } from "@/app/utils/authenticate";
import Cookies from "js-cookie";
import { fetchUserData } from "@/app/utils/myLib";

const AddToCartButton = ({ product }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!product?._id) return;

    const checkCartStatus = async () => {
      try {
        const userData = await fetchUserData();
        console.log("User Data: ", userData);
        console.log("user cart: ", userData?.user.cart);

        setAddedToCart(
          userData?.user.cart?.some((item) => item.products === product._id) ||
            false
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    checkCartStatus();
  }, [product?._id]);

  const redirectToCart = () => {
    router.push("/cart");
  };

  const handleAddToCart = async () => {
    if (!product) return;
    setAddedToCart(true);

    const productToAdd = { products: product._id, quantity: 1 };

    // Update Local Storage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((p) => p.id === productToAdd.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push(productToAdd);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("User not authenticated.");

      const user = await verifyToken(token);
      if (!user?.id) throw new Error("Invalid user token.");

      const response = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type: "addToCart", product: productToAdd }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to add product to cart!");
      }

      console.log("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
    }
  };

  return (
    <button
      onClick={addedToCart ? redirectToCart : handleAddToCart}
      className="bg-orange-500 text-white font-bold text-center w-full px-3 py-2 my-3 rounded-3xl hover:opacity-80"
    >
      {addedToCart ? "Go to Cart" : "Add to Cart"}
    </button>
  );
};

export default AddToCartButton;
