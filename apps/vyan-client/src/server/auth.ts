import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  DefaultUser,
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";

import { env } from "~/env";
import { db } from "./db";
import { ReceiptText } from "lucide-react";
import Email from "next-auth/providers/email";
import { compare } from "bcrypt";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, user }) => {
      console.log("session check callback", session, user);
      const userAuth = await db.user.findFirst({
        where: {
          email: {
            equals: session.user.email as string,
            mode: "insensitive",
          },
        },
      });
      if (session.user && userAuth) {
        session.user.id = userAuth.id;
      }
      return session;
    },
  },

  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      id: "CrendentialsVyanClient",
      name: "CrendentialsVyanClient",
      credentials: {
        email: {
          label: "Email*",
          type: "email",
          placeholder: "Enter your email id",
        },
        password: {
          label: "Password*",
          type: "password",
          placeholder: "Enter your password",
        },
      },

      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const user = await db.user.findFirst({
          select: {
            id: true,
            email: true,
            phoneNumber: true,
            passwordHash: true,
            name:true,
          },
          where: {
            email: credentials.email,
          },
        });

        console.log("login request", user, credentials.email);

        if (!user) {
          return null;
        }
        if (!user.passwordHash) {
          return null;
        }

        const isValid = await compare(credentials.password, user.passwordHash);
        if (!isValid) {
          return null;
        }
        console.log("user find", user);
        return {
          id: user.id,
          name:user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
        };
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
