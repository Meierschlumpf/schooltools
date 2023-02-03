import { withAuth } from "next-auth/middleware";

// Provide a middleware if required in the future
export default withAuth(() => undefined, {
  secret: process.env.NEXTAUTH_SECRET ?? "unknown",
});

export const config = {
  matcher: ["/((?!api|static|favicon.ico|login).*)"],
  pages: {
    signIn: "/login",
  },
};
