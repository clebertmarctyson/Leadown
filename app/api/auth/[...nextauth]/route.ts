import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient, User } from "@prisma/client/edge";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user = user as User;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
