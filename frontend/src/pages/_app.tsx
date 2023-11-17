import "@mantine/core/styles.css";

import type { AppProps } from 'next/app'

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import AuthProvider from "@/features/Auth/Providers/AuthProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <MantineProvider defaultColorScheme="light">
        <Component {...pageProps} />
      </MantineProvider>
    </AuthProvider>
  
  )
}
