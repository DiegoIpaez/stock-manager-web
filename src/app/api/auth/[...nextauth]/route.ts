import bcrypt from 'bcryptjs';
import NextAuth, { AuthOptions, DefaultUser, SessionOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
  getUserByFilter,
  updateUserById,
} from '@/lib/prisma/repositories/users.repository';
import { CONFIG } from '@/constants';
import { RoleUser, UserWithRole } from '@/types';

declare module 'next-auth' {
  interface User extends DefaultUser {
    role?: RoleUser | null;
  }

  interface JWT {
    id: string;
    name: string;
    email: string;
    role?: RoleUser | null;
  }

  interface Session extends SessionOptions {
    user: UserWithRole;
  }
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password', placeholder: '*****' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Credenciales no proporcionadas');
        }

        const userFound = await getUserByFilter({
          email: credentials.email,
          disabled: false,
          deleted: false,
        });

        if (!userFound) throw new Error('Credenciales invalidas');

        await updateUserById(userFound?.id, { last_login: new Date() });

        const matchPassword = await bcrypt.compare(
          credentials.password,
          userFound?.password
        );

        if (!matchPassword) throw new Error('Credenciales invalidas');
        const { password, ...loggedUser } = userFound;

        return {
          ...loggedUser,
          id: userFound?.id?.toString(),
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token = { ...token, ...user };
      return token;
    },
    async session({ session, token }) {
      const user = { ...session?.user, ...token };
      return { ...session, user };
    },
  },
  pages: {
    signIn: '/',
    error: '/login',
    signOut: '/login',
  },
  secret: CONFIG.NEXTAUTH.SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
