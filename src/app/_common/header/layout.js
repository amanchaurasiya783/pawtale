"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm } from "../../redux/blogSlice";
import {
  SearchIcon,
  HeartIcon,
  UserIcon,
  MenuIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { verifyToken } from "../../utils/authenticate";
import Cookies from "js-cookie";

const Header = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchTerm = useSelector((state) => state.blog.searchTerm);
  const [loginStatus, setLoginStatus] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
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
    <header className="sticky top-0 z-50 bg-background backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 py-1 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-foreground">PetVibe</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-14">
          <Link
            href="/"
            className={`transition-colors font-medium ${
              isActive("/")
                ? "text-foreground opacity-50  "
                : "text-foreground hover:text-opacity-50"
            }`}
          >
            Home
          </Link>
          <Link
            href="/blogs"
            className={`transition-colors font-medium ${
              isActive("/blogs")
                ? "text-foreground opacity-50"
                : "text-foreground hover:text-opacity-50"
            }`}
          >
            Care Tips
          </Link>
          <Link
            href="/store"
            className={`transition-colors font-medium ${
              isActive("/store")
                ? "text-foreground opacity-50  "
                : "text-foreground hover:text-opacity-50"
            }`}
          >
            Store
          </Link>
          <Link
            href="/about"
            className={`transition-colors font-medium ${
              isActive("/about")
                ? "text-foreground opacity-50  "
                : "text-foreground hover:text-opacity-50"
            }`}
          >
            About Us
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden sm:block">
            <div className="relative">
              <input
                type="text"
                className="w-40 md:w-56 px-4 py-1 rounded-full bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200 text-background placeholder:text-muted-background"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              />
              <SearchIcon className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="sm:hidden p-2 rounded-full hover:bg-accent"
          >
            <SearchIcon className="h-6 w-6 text-foreground" />
          </button>

          {/* Mobile Search Input */}
          {searchOpen && (
            <div className="absolute top-16 left-0 right-0 px-4 sm:hidden">
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-full bg-opacity-50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                />
                <SearchIcon className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => startTransition(() => router.push("/cart"))}
              className={`p-2 rounded-full hover:bg-accent relative ${
                isPending ? "opacity-50" : ""
              } ${isActive("/cart") ? "text-foreground opacity-50" : ""}`}
              disabled={isPending}
              aria-label="Shopping Cart"
            >
              <ShoppingCartIcon className="h-6 w-6 text-foreground" />
            </button>

            <button
              onClick={() => startTransition(() => router.push("/wishlist"))}
              className={`p-2 rounded-full hover:bg-accent relative ${
                isPending ? "opacity-50" : ""
              } ${isActive("/wishlist") ? "text-foreground opacity-50" : ""}`}
              disabled={isPending}
              aria-label="Wishlist"
            >
              <HeartIcon className="h-6 w-6 text-foreground" />
            </button>

            <button
              onClick={() =>
                startTransition(() =>
                  router.push(loginStatus ? "/profile" : "/login"),
                )
              }
              className={`p-2 rounded-full hover:bg-accent ${
                isPending ? "opacity-50" : ""
              } ${
                isActive("/profile") || isActive("/login")
                  ? "text-foreground opacity-50"
                  : ""
              }`}
              disabled={isPending}
              aria-label="Profile"
            >
              <UserIcon className="h-6 w-6 text-foreground" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="lg:hidden p-2 rounded-full hover:bg-accent"
              aria-label="Menu"
            >
              <MenuIcon className="h-6 w-6 text-foreground" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute top-16 right-4 lg:hidden w-56 bg-background rounded-lg shadow-lg py-2 z-50 transform origin-top-right transition-all duration-200 ease-in-out"
          >
            <nav className="flex flex-col space-y-1">
              <Link
                href="/"
                className={`px-4 py-3 hover:bg-accent transition-colors ${
                  isActive("/")
                    ? "text-foreground opacity-50  font-medium"
                    : "text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/blogs"
                className={`px-4 py-3 hover:bg-accent transition-colors ${
                  isActive("/blogs")
                    ? "text-foreground opacity-50  font-medium"
                    : "text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Care Tips
              </Link>
              <Link
                href="/store"
                className={`px-4 py-3 hover:bg-accent transition-colors ${
                  isActive("/store")
                    ? "text-foreground opacity-50  font-medium"
                    : "text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Store
              </Link>
              <Link
                href="/about"
                className={`px-4 py-3 hover:bg-accent transition-colors ${
                  isActive("/about")
                    ? "text-foreground opacity-50  font-medium"
                    : "text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
