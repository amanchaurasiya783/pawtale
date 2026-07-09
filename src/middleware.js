import { NextResponse } from "next/server";
import { verifyToken } from "./app/utils/authenticate";

// Protected routes: require any logged-in user
const protectedRoutes = [
  "/wishlist",
  "/cart",
  "/savedblogs",
  "/allorders",
  "/profile",
  "/logout",
];

// Admin-only routes
const adminRoutes = [
  "/dashboard",
  "/blogs/add-blog",
  "/blogs/[blog]/edit-blog",
  "/myblogs",
];

// Public routes accessible only when NOT logged in
const publicRoutes = ["/login"];

// Match paths including dynamic ones like [id]
function matchPath(pathname, routes) {
  return routes.some((route) => {
    const pattern = route.replace(/\[.*?\]/g, "[^/]+");
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(pathname);
  });
}

// Force lowercase URLs
function enforceLowercaseURL(req) {
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return null;
  }
  if (pathname !== pathname.toLowerCase()) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 308);
  }
  return null;
}

export async function middleware(request) {
  const lowercaseRedirect = enforceLowercaseURL(request);
  if (lowercaseRedirect) return lowercaseRedirect;

  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("token")?.value;
  const method = request.method;
  const methodTypes = ["POST", "PUT", "PATCH", "DELETE"];

  let decodedToken = null;
  let userRole = null;

  try {
    if (authToken) {
      decodedToken = await verifyToken(authToken);
      userRole = decodedToken?.role;
    }

    const isProtected = matchPath(pathname, protectedRoutes);
    const isAdminOnly = matchPath(pathname, adminRoutes);
    const isPublic = matchPath(pathname, publicRoutes);

    // Deny access to protected routes if not logged in
    if (isProtected && !decodedToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Deny access to admin routes if not admin
    if (isAdminOnly && userRole !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Redirect logged-in users away from public routes like /login
    if (isPublic && decodedToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Add user ID and role headers for authorized API actions
    if (
      methodTypes.includes(method) &&
      decodedToken &&
      pathname.startsWith("/api")
    ) {
      const response = NextResponse.next();
      response.headers.set("x-user-id", decodedToken.id);
      response.headers.set("x-user-role", userRole);
      return response;
    }

    // Attach user ID for general protected/admin page access
    if (decodedToken && (isProtected || isAdminOnly)) {
      const response = NextResponse.next();
      response.headers.set("x-user-id", decodedToken.id);
      return response;
    }

    // Allow all other requests
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|images|api/public).*)"],
};
