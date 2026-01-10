"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      toast.success("Logged in");
      setLoading(false);
      router.push("/tasks");
    } else {
      const { error } = await res.json();
      toast.error(error || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full max-w-md mx-auto space-y-4 my-16 page-enter page-enter-active">
      <div className="p-8 card">
        <h1 className="h2 mb-1 text-text-primary">Welcome back</h1>
        <p className="p mb-4 text-text-tertiary">
          Log in to manage your tasks.
        </p>
        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-bg-tertiary" />
        </div>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-text-secondary">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium mb-1 text-text-secondary">
                Password <span className="text-red-500">*</span>
              </label>
              <Link
                href="#"
                className="block text-sm mb-1 text-info hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "🙈"}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="btn gradiant cursor-pointer hover:opacity-80 text-white"
            disabled={loading}
          >
            {loading ? "VERIFYING..." : "LOG IN"}
          </button>
        </form>
      </div>

      <div className="flex justify-center gap-1 mt-4 text-sm">
        <span>Don&apos;t have an account?</span>
        <Link
          href="/register"
          className="text-info hover:underline font-medium"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
