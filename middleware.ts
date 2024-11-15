import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/home", "/sessions"];
const publicRoutes = [
  "/",
  "/signup",
  "/verify-mfa",
  "/confirm-account",
  "forgot-password",
  "reset-password",
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const accessToken = req.cookies.get("accessToken")?.value;
  console.log(req.cookies, "req.cookies");
  console.log(
    req.cookies.has("accessToken"),
    "request.cookies.has('accessToken')"
  );

  if (isProtectedRoute && !accessToken) {
    const redirectResponse = NextResponse.redirect(new URL("/", req.nextUrl));
    redirectResponse.headers.set("x-middleware-cache", "no-cache");
    return redirectResponse;
  }

  if (isPublicRoute && accessToken) {
    const redirectResponse = NextResponse.redirect(
      new URL("/home", req.nextUrl)
    );
    redirectResponse.headers.set("x-middleware-cache", "no-cache");
    return redirectResponse;
  }

  return NextResponse.next();
}
