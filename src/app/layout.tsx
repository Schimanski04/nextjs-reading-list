import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reading List App",
  description: "A user-friendly application to manage and track your reading list. Add books, mark them as read, and never lose track of your reading progress.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/books.svg" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster richColors closeButton position="bottom-left" />
      </body>
    </html>
  )
}
