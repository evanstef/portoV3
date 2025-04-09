import { DefaultUser, NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

declare module "next-auth" {
  interface Session {
    user: DefaultUser & { id?: string };
  }
}

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      try {
        // Cek apakah user sudah ada di database
        const existingUser = await db.user.findUnique({
          where: { email: user.email },
        });

        // Jika belum ada, buat user baru
        if (!existingUser) {
          await db.user.create({
            data: {
              email: user.email,
              name: user.name || "GitHub User",
              avatar: user.image || "",
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Error saving user to database:", error);
        return false;
      }
    },
    async session({ session }) {
      // Menambahkan data user dari database ke session
      if (session.user && session.user.email) {
        const userData = await db.user.findUnique({
          where: { email: session.user.email },
        });

        if (userData) {
          session.user.id = userData.id;
          session.user.name = userData.name;
          session.user.image = userData.avatar;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      // Simpan user.id dari database ke token
      if (user) {
        const dbUser = await db.user.findUnique({
          where: { email: user.email as string },
        });
        if (dbUser) {
          token.id = dbUser.id;
        }
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/auth/error", // Error code passed in query string as ?error=
  },
};
