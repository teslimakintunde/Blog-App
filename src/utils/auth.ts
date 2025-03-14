import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { User } from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcryptjs from "bcryptjs";

interface Credentials {
  email: string;
  password: string;
}
const login = async (credentials: Credentials): Promise<User | null> => {
  try {
    console.log("🔎 Checking user:", credentials.email);

    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
      select: { id: true, email: true, password: true }, // Ensure password is fetched
    });

    if (!user) {
      console.warn("❌ User not found:", credentials.email);
      return null;
    }

    console.log("✅ User found:", user.email);

    if (!user.password) {
      console.warn("❌ User has no password stored (probably social login)");
      return null;
    }

    const isPasswordCorrect = await bcryptjs.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) {
      console.warn("❌ Incorrect password for:", credentials.email);
      return null;
    }

    console.log("✅ Login successful:", user.email);
    return user;
  } catch (error) {
    console.error("🚨 Unexpected login error:", error);
    return null;
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<string, unknown>) {
        console.log("Authorize function called with:", credentials);

        if (
          !credentials ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          console.warn("❌ Invalid credentials format");
          return null;
        }

        const user = await login({
          email: credentials.email,
          password: credentials.password,
        });

        console.log("User returned from login:", user);

        if (!user) {
          console.warn("❌ Invalid email or password");
          return null;
        }

        console.log("✅ Authorize successful for:", user.email);
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = String(token.id);
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page (optional)
  },
  secret: process.env.NEXTAUTH_SECRET,
});
