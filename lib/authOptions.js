import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma"; // asigură-te că e corectă calea
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) {
          throw new Error("invalid-username");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("invalid-password");
        }

        // Include id-ul userului pentru JWT
        return {
          id: user.id,
          name: user.username,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt", // folosim token-uri JWT
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // adaugă id-ul în token
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id; // pune id-ul în session.user
      }
      return session;
    },
  },

  pages: {
    signIn: "/login", // redirect către login dacă nu e autentificat
  },

  secret: process.env.NEXTAUTH_SECRET,
};
