import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // const res = await apiClient(apiAuthorize(credentials));

          return {
            // id: res.data.user.id,
            // user: res.data.user,
            // accessToken: res.data.access,
            // refreshToken: res.data.refresh,
          };
        } catch (e: any) {
          
        }
      },
    }),
  ]
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };