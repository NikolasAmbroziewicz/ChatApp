import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

import { useAccountApi } from "@/features/Accounts/AccountApi";

async function refreshToken(old_tokens: JWT) {
  const { getSession } = useAccountApi()

  console.log('refreshToken')

  const res = await getSession({
    accessToken: old_tokens.tokens.accessToken,
    refreshToken: old_tokens.tokens.refreshToken
  })

  if(res.headers['x-access-token']) {
    return {
      ...old_tokens,
      tokens: {
        ...old_tokens.tokens,
        accessToken: res.headers['x-access-token']
      }
    }
  } else {
    return {
      ...old_tokens
    }
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