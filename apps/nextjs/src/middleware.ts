import { withAuth } from "next-auth/middleware";

// Provide a middleware if required in the future
export default withAuth(() => undefined);

export const config = {
  matcher: ["/((?!api|static|favicon.ico|_next|login).*)"],
  pages: {
    signIn: "/login",
  },
};
