"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import { successToast } from "@/lib/toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      successToast("Logout Success.");
      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border-primary bg-bg-primary shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="block">
            <Image
              src="/logo.svg"
              alt="TMS Logo"
              width="40"
              height="40"
              className="h-10 w-auto"
            />
          </Link>
          <Link
            href="/"
            className="text-sm md:text-lg font-semibold text-text-primary"
          >
            Task Management System
          </Link>
        </div>

        {pathname !== "/login" && pathname !== "/register" ? (
          <>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link
                href="/tasks"
                className={`${
                  pathname === "/tasks"
                    ? "btn btn-outline"
                    : "hover:text-primary-accent-hover"
                }`}
              >
                My Tasks
              </Link>
              <Link
                href="/create"
                className={`${
                  pathname === "/create"
                    ? "btn btn-outline"
                    : "hover:text-primary-accent-hover"
                }`}
              >
                Create Task
              </Link>
            </nav>

            <div className="hidden md:block">
              <button
                className="btn-logout flex h-10 w-full items-center justify-center gap-2"
                onClick={handleLogout}
                disabled={pathname === "/login" || pathname === "/register"}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/login"
              className={`${
                pathname === "/login"
                  ? "btn btn-outline"
                  : "hover:text-primary-accent-hover"
              }`}
            >
              Log In
            </Link>

            <Link
              href="/register"
              className={`${
                pathname === "/register"
                  ? "btn btn-outline"
                  : "hover:text-primary-accent-hover"
              }`}
            >
              Sign Up
            </Link>
          </nav>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex justify-between items-center rounded-xl px-4 py-2 text-sm font-medium transition ease-out duration-200 btn-outline"
        >
          {!open ? "☰" : "✕"}
        </button>
      </div>

      {open && (
        <ul className="nav-list w-[90%] md:hidden px-3 py-3 space-y-2">
          {pathname !== "/login" && pathname !== "/register" ? (
            <>
              <li>
                <Link
                  href="/tasks"
                  className={`block btn w-full ${
                    pathname === "/tasks" ? "btn-outline" : ""
                  }`}
                >
                  My Tasks
                </Link>
              </li>
              <li>
                <Link
                  href="/create"
                  className={`block btn w-full ${
                    pathname === "/create" ? "btn-outline" : ""
                  }`}
                >
                  Create Task
                </Link>
              </li>

              <li>
                <button 
                  className="btn-logout w-full"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className={`block btn w-full ${
                    pathname === "/login" ? "btn-outline" : ""
                  }`}
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className={`block btn w-full ${
                    pathname === "/register" ? "btn-outline" : ""
                  }`}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
