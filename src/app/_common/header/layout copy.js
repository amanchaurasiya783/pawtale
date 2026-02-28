"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm } from "../../redux/blogSlice";
import {
  ShoppingCart,
  Heart,
  RefreshCcw,
  Menu,
  Search,
  User,
} from "lucide-react";
import Link from "next/link";
import { verifyToken } from "../../utils/authenticate";
import Cookies from "js-cookie";

export default function Header() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchTerm = useSelector((state) => state.blog.searchTerm);
  const [loginStatus, setLoginStatus] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef(null);
  const pagesRef = useRef(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const user = verifyToken(token);
      setLoginStatus(!!user);
    } else {
      setLoginStatus(false);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !e.target.closest('button[aria-label="Menu"]')
      ) {
        setIsMenuOpen(false);
      }

      if (
        pagesRef.current &&
        !pagesRef.current.contains(e.target) &&
        !e.target.closest('button:contains("Pages")')
      ) {
        setIsPagesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (href) => {
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  return (
    <header className="w-full border-b">
      {/* Top Bar */}
      <div className="bg-gray-100 text-sm text-gray-600 flex justify-between px-6 py-2">
        <div className="flex gap-4">
          <a href="#">Help</a>
          <a href="#">Support</a>
          <a href="#">Contact</a>
        </div>
        <div className="flex gap-6 items-center">
          <span>
            Call Us: <strong>(+012) 1234 567890</strong>
          </span>
          <select className="bg-transparent text-sm">
            <option>USD</option>
            <option>INR</option>
          </select>
          <select className="bg-transparent text-sm">
            <option>English</option>
            <option>Hindi</option>
          </select>
          <a href="#" className="hover:underline">
            My Dashboard
          </a>
        </div>
      </div>

      {/* Middle Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-orange-600"
        >
          <span className="text-3xl">🐾</span> PetVibe
        </Link>

        {/* Search Bar */}
        <div className="flex flex-1 max-w-2xl mx-6">
          <input
            type="text"
            placeholder="Search Looking For?"
            className="flex-1 p-3 border rounded-l-full outline-none"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
          <select className="border-t border-b px-3 outline-none">
            <option>All Category</option>
            <option>Care Tips</option>
            <option>Products</option>
          </select>
          <button className="bg-orange-500 text-white px-6 rounded-r-full">
            <Search className="inline" size={20} />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">
          <button className="text-gray-600 hover:text-orange-600">
            <RefreshCcw />
          </button>

          <button
            onClick={() => startTransition(() => router.push("/wishlist"))}
            className={`text-gray-600 hover:text-orange-600 relative ${
              isPending ? "opacity-50" : ""
            }`}
            disabled={isPending}
            aria-label="Wishlist"
          >
            <Heart />
          </button>

          <button
            onClick={() => startTransition(() => router.push("/cart"))}
            className={`relative text-gray-600 hover:text-orange-600 ${
              isPending ? "opacity-50" : ""
            }`}
            disabled={isPending}
            aria-label="Shopping Cart"
          >
            <ShoppingCart />
            <span className="absolute -top-2 -right-2 text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded-full">
              0
            </span>
          </button>

          <button
            onClick={() =>
              startTransition(() =>
                router.push(loginStatus ? "/profile" : "/login")
              )
            }
            className={`text-gray-600 hover:text-orange-600 ${
              isPending ? "opacity-50" : ""
            }`}
            disabled={isPending}
            aria-label="Profile"
          >
            <User />
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-orange-500 text-white px-6 py-3 flex items-center justify-between">
        {/* Left - Categories */}
        <button className="flex items-center gap-2 font-medium">
          <Menu /> All Categories
        </button>

        {/* Middle - Links */}
        <ul className="hidden md:flex items-center gap-8 font-medium">
          <li>
            <Link
              href="/"
              className={`hover:underline ${
                isActive("/") ? "font-bold underline" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/store"
              className={`hover:underline ${
                isActive("/store") ? "font-bold underline" : ""
              }`}
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              href="/blogs"
              className={`hover:underline ${
                isActive("/blogs") ? "font-bold underline" : ""
              }`}
            >
              Care Tips
            </Link>
          </li>

          {/* Pages Dropdown */}
          <li className="relative" ref={pagesRef}>
            <button
              onClick={() => setIsPagesOpen(!isPagesOpen)}
              className="hover:underline flex items-center gap-1"
            >
              Pages ▼
            </button>
            {isPagesOpen && (
              <ul className="absolute bg-white text-gray-700 rounded-md mt-2 shadow-md w-40 z-50">
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/about" onClick={() => setIsPagesOpen(false)}>
                    About Us
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/cart" onClick={() => setIsPagesOpen(false)}>
                    Cart Page
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/checkout" onClick={() => setIsPagesOpen(false)}>
                    Checkout
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link
              href="/about"
              className={`hover:underline ${
                isActive("/about") ? "font-bold underline" : ""
              }`}
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          className="md:hidden p-2 rounded-full"
          aria-label="Menu"
        >
          <Menu />
        </button>

        {/* Right - Phone Button */}
        <a
          href="tel:+01234567890"
          className="bg-red-600 px-4 py-2 rounded-lg font-semibold hidden md:block"
        >
          +0123 456 7890
        </a>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute top-full right-0 w-full bg-white md:hidden rounded-b-lg shadow-lg py-2 z-50"
        >
          <nav className="flex flex-col space-y-1">
            <Link
              href="/"
              className={`px-4 py-3 hover:bg-orange-100 transition-colors ${
                isActive("/") ? "text-orange-600 font-medium" : "text-gray-700"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/blogs"
              className={`px-4 py-3 hover:bg-orange-100 transition-colors ${
                isActive("/blogs")
                  ? "text-orange-600 font-medium"
                  : "text-gray-700"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Care Tips
            </Link>
            <Link
              href="/store"
              className={`px-4 py-3 hover:bg-orange-100 transition-colors ${
                isActive("/store")
                  ? "text-orange-600 font-medium"
                  : "text-gray-700"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Store
            </Link>
            <Link
              href="/about"
              className={`px-4 py-3 hover:bg-orange-100 transition-colors ${
                isActive("/about")
                  ? "text-orange-600 font-medium"
                  : "text-gray-700"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/cart"
              className={`px-4 py-3 hover:bg-orange-100 transition-colors ${
                isActive("/cart")
                  ? "text-orange-600 font-medium"
                  : "text-gray-700"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Cart
            </Link>
            <Link
              href={loginStatus ? "/profile" : "/login"}
              className={`px-4 py-3 hover:bg-orange-100 transition-colors ${
                isActive("/profile") || isActive("/login")
                  ? "text-orange-600 font-medium"
                  : "text-gray-700"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {loginStatus ? "Profile" : "Login"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
