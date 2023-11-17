"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface IAuthProvider {
  children: ReactNode;
}

const AuthProvider = ({ children }: IAuthProvider) => {
  return <SessionProvider refetchInterval={5 * 60}>{children}</SessionProvider>;
};

export default AuthProvider;
