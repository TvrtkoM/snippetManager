import AppProvider from "@/components/AppProvider";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthBar from "@/components/AuthBar";
import Navigation from "@/components/Navigation";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snippet Manager"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={" " + inter.className}>
        <AppProvider>
          <AuthBar />
          <Navigation />
          <div className="container mx-auto pt-4">{children}</div>
        </AppProvider>
      </body>
    </html>
  );
}
