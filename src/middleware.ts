import { pagesOptions } from "@/app/api/auth/[...nextauth]/pages-options";
import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Role } from "./constants/role.enum";
export default withAuth(
  function middleware(req: NextRequestWithAuth) {

    if (
      (req.nextauth.token?.roles?.length &&
        req.nextauth.token?.roles.length < 1) ||
      !req.nextauth.token?.roles?.map((item) => item.name).includes(Role.ADMIN)
    ) {
      return NextResponse.rewrite(new URL("/access-denied", req.url));
    }
  },

  {
    pages: {
      ...pagesOptions,
    },

    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);

export const config = {
  // restricted routes that need authentication
  matcher: ["/", "/home"],
};
