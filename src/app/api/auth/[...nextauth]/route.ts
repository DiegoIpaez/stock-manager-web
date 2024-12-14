import bcrypt from 'bcryptjs'
import NextAuth, { AuthOptions, DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByFilter } from "@/lib/prisma/repositories/users.repository";
import { CONFIG } from "@/constants";

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string;
  }

  interface JWT {
    id: string;
    name: string;
    email: string;
  }
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Credenciales no proporcionadas");
        }

        const userFound = await getUserByFilter({
          email: credentials.email,
          disabled: false,
          deleted: false,
        });

        if (!userFound) throw new Error("Credenciales invalidas");

        const matchPassword = await bcrypt.compare(
          credentials.password,
          userFound.password
        );

        if (!matchPassword) throw new Error('Credenciales invalidas');

        return {
          id: userFound.id.toString(),
          name: userFound.first_name + " " + userFound.last_name,
          email: userFound.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user?.id;
        token.name = user?.name;
        token.email = user?.email;
      }
      return token;
    },
    async session({ session, token }) {
      const user = { ...session?.user, ...token };
      return { ...session, user };
    },
  },
  pages: {
    signIn: "/",
    error: "/login",
    signOut: "/login",
  },
  secret: CONFIG.NEXTAUTH.SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
