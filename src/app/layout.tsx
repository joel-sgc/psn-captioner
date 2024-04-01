import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MPSHS PSN Captioner",
  description: "pls no ban :(",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <Head>
        <link rel="manifest" href="./manifest.json" />
      </Head>
      <body 
        className={cn(
          "min-h-screen bg-background antialiased",
          inter.className
        )}
      >
        <Provider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </Provider>
      </body>
    </html>
  );
}
