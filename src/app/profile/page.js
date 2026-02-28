"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { verifyToken } from "@/app/utils/authenticate";
import { PencilIcon, XIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { signOut } from "next-auth/react";

export default function UserProfile() {
  const userRole = useSelector((state) => state.user.userRole);
  const isAdminUser = userRole === "admin" || userRole === "beyonder";
  const [user, setUser] = useState({});
  const [showImagePopup, setShowImagePopup] = useState(false);

  async function handleLogout() {
    Cookies.remove("token");
    localStorage.clear();
    await signOut({ redirect: false });
    window.location.href = "/";
  }

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("token");
      if (token) {
        const user = await verifyToken(token);
        setUser(user);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Image Popup Modal */}
      {showImagePopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-0 flex items-center justify-center z-50 p-4 transition-all duration-300 ease-in-out"
          style={{
            backgroundColor: showImagePopup
              ? "rgba(0,0,0,0.75)"
              : "rgba(0,0,0,0)",
          }}
          onClick={(e) => {
            // Close when clicking on the backdrop (but not children)
            if (e.target === e.currentTarget) {
              setShowImagePopup(false);
            }
          }}
        >
          <div
            className="relative max-w-2xl w-full transform transition-all duration-300 ease-in-out"
            style={{
              opacity: showImagePopup ? 1 : 0,
              transform: showImagePopup ? "scale(1)" : "scale(0.95)",
            }}
          >
            <button
              onClick={() => setShowImagePopup(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <XIcon className="w-8 h-8" />
            </button>
            <img
              src="/Assets/default-avatar.png"
              alt="User Profile Picture"
              className="w-full h-full bg-white max-h-[80vh] object-contain rounded-md"
            />
            <div className="mt-2 text-center text-white">
              <p className="text-lg font-medium">{user.username}</p>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <div className="w-24 h-24 mb-4 relative">
            <Link href={`/profile/${user.id}`}>
              <PencilIcon
                title="edit-profile"
                className="w-7 h-7 absolute right-0 top-0 z-10 p-1 cursor-pointer bg-white rounded-full shadow-md"
              />
            </Link>
            <div
              className="w-full h-full rounded-full overflow-hidden border border-gray-300 cursor-pointer"
              onClick={() => setShowImagePopup(true)}
            >
              <img
                src="/Assets/default-avatar.png" // Replace with user's DP URL
                alt="User Profile Picture"
                className="w-full h-full object-cover hover:opacity-90 transition-opacity"
              />
            </div>
          </div>

          {/* Username */}
          <h1 className="text-2xl font-semibold text-gray-800">
            {user.username}
          </h1>

          {/* Email ID */}
          <p className="text-gray-600 mt-2">{user.email}</p>
        </div>

        <ul>
          <Link href="/wishlist">
            <li className="border-t-2 border-slate-300 py-2 cursor-pointer pl-2 font-medium">
              Wishlist
            </li>
          </Link>
          <Link href="/cart">
            <li className="border-t-2 border-slate-300 py-2 cursor-pointer pl-2 font-medium">
              My Cart
            </li>
          </Link>
          {isAdminUser && (
            <Link href="/myBlogs">
              <li className="border-t-2 border-slate-300 py-2 cursor-pointer pl-2 font-medium">
                My Blogs
              </li>
            </Link>
          )}
          <Link href="/allOrders">
            <li className="border-t-2 border-slate-300 py-2 cursor-pointer pl-2 font-medium">
              My Orders
            </li>
          </Link>
          <Link href="/savedBlogs">
            <li className="border-t-2 border-slate-300 py-2 cursor-pointer pl-2 font-medium">
              Saved Blogs
            </li>
          </Link>
          <li
            onClick={() => handleLogout()}
            className="border-t-2 border-slate-300 py-2 cursor-pointer pl-2 font-medium"
          >
            Log Out
          </li>
        </ul>
      </div>
    </div>
  );
}
