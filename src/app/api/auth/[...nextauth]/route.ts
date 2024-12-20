import bcrypt from "bcryptjs";
import { Permission, Role, RolePermission } from "@prisma/client";
import NextAuth, { AuthOptions, DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  getUserByFilter,
  updateUserById,
} from "@/lib/prisma/repositories/users.repository";
import { CONFIG } from "@/constants";

declare module "next-auth" {
  interface RoleWithPermission extends RolePermission {
    permission?: Permission;
  }
  interface RoleUser extends Role {
    roles_permissions?: RoleWithPermission[];
  }
  interface User extends DefaultUser {
    role?: RoleUser | null;
  }

  interface JWT {
    id: string;
    name: string;
    email: string;
    role?: RoleUser | null;
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

        await updateUserById(userFound?.id, { last_login: new Date() });

        const matchPassword = await bcrypt.compare(
          credentials.password,
          userFound?.password
        );

        if (!matchPassword) throw new Error("Credenciales invalidas");

        return {
          id: userFound?.id?.toString(),
          name: userFound?.first_name + " " + userFound?.last_name,
          email: userFound?.email,
          role: userFound?.role,
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
        token.role = user?.role;
      }
      return token;
    },
    async session({ session, token }) {
      const user = { ...session?.user, role: token?.role };
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
