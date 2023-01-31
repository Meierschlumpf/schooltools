import { Role } from "@acme/db";
import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";

export const withRoleCheck =
  (roles: Role[], next: GetServerSideProps): GetServerSideProps =>
  async (context) => {
    const jwt = await getToken(context);
    const user = await prisma?.user.findFirst({
      where: {
        id: jwt?.sub,
      },
    });

    if (roles.includes(user?.role ?? "User")) {
      return next(context);
    }

    return {
      notFound: true,
    };
  };
