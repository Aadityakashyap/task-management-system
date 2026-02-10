import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Management System",
  description: "A full-stack Task Management System built with Next.js (TypeScript), Tailwind CSS, and Prisma ORM. It provides secure authentication, responsive UI/UX, and complete task CRUD functionality with filtering, search, and pagination.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh`}
      >
        <Providers>
          <Navbar />
          <main className="mx-auto px-3 sm:px-6 lg:px-8 py-6 max-w-7xl min-h-screen">
            {children}
            <ToastContainer
              position="top-right"
              autoClose={3000}
            />
          </main>
          <span className="fixed bottom-20 right-4 p-2">
            <ThemeToggle />
          </span>
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
