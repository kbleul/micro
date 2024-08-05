import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any, req: any): Promise<any> {
        if (req.body) {
          return { ...JSON.parse(req.body.data) };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("----jwt------>", token, token);

      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      console.log("---------->", session, token);
      session.user = token as any;
      return session;
    },
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);

      if (parsedUrl.searchParams.has("callbackUrl")) {
        return `${baseUrl}${parsedUrl.searchParams.get("callbackUrl")}`;
      }
      if (parsedUrl.origin === baseUrl) {
        return url;
      }

      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
};
