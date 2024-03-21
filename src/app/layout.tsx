import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { PropsWithChildren } from "react";

type Props = Readonly<PropsWithChildren>;

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Workshop App",
  description: "No thrills workshop management app",
};

export default function RootLayout(props: Props) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className={"min-h-screen bg-background antialiased font-sans"}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {props.children}
        </ThemeProvider>
      </body>
    </html>
  );
}
