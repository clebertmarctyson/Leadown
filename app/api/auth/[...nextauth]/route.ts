import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
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
        session = { ...session, user: { ...session.user, ...user } };
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
