import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

import { useAccountApi } from "@/features/Accounts/hooks/useAccountApi";

async function refreshToken(session: JWT) {
  const { getSession } = useAccountApi()
  
  const res = await getSession({
    accessToken: session.tokens.accessToken,
    refreshToken: session.tokens.refreshToken
  })
  
  if (res.status === 200) {
    if (res.headers['x-access-token']) {
      return {
        ...session,
        tokens: {
          refreshToken: session.tokens.refreshToken,
          accessToken: res.headers['x-access-token'],
          expiresIn: Number(res.headers['x-access-time-token'])
        }
      }
    } else {
      return {
        ...session
      }
    }
  } else {
    return null
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/accounts/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const { signInUser } = useAccountApi()

          const res = await signInUser({
            email: String(credentials?.email),
            password: String(credentials?.password)
          })
  
          return res;
        } catch(e: any) {
          throw new Error(e.response.data.message)
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return {...token, ...user};
      
      if (new Date().getTime() < token.tokens.expiresIn) return token

      return await refreshToken(token) as JWT
    },
    session({ token, session}) {
      session.user = token.user
      session.tokens = token.tokens

      return session
    }
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };