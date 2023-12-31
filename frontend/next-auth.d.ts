import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare  module 'next-auth' {
  interface Session {
    tokens: {
      accessToken: string,
      refreshToken: string,
      expiresIn: number
    },

    user: {
      _id: string,
      email: string,
      name: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    tokens: {
      accessToken: string,
      refreshToken: string,
      expiresIn: number
    },

    user: {
      _id: string,
      email: string,
      name: string
    }
  }
}