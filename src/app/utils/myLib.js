"use client";
import Cookies from "js-cookie";
import { verifyToken } from "./authenticate";

export const fetchUserData = async () => {
  const token = Cookies.get("token");
  const user = token ? await verifyToken(token) : null;
  try {
    if (!user?.id) {
      console.error("User not authenticated.");
      return;
    }
    const response = await fetch(`/api/users/${user.id}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error("Failed to fetch user data.");
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
