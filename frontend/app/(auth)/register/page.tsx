"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { successToast } from "@/lib/toast";
import { register } from "@/lib/auth";

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState({
    firstName: "",
    lastName: "",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const fullName = `${name.firstName} ${name.lastName}`;
    await register(email, password, fullName);
    successToast("Account created");
    setLoading(false);
    router.push("/tasks");
  };

  return (
    <div className="w-full h-full max-w-md mx-auto space-y-4 my-16 page-enter page-enter-active">
      <div className="p-8 card">
        <h1 className="h2 mb-1 text-text-primary">Create account</h1>
        <p className="p mb-4 text-text-tertiary">
          Start managing tasks in minutes.
        </p>
        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-bg-tertiary" />
        </div>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-text-secondary">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name.firstName}
                onChange={(e) =>
                  setName({ ...name, firstName: e.target.value })
                }
                className="input"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-text-secondary">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name.lastName}
                onChange={(e) => setName({ ...name, lastName: e.target.value })}
                className="input"
              />
            </div>
          </div>

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
            <label className="block text-sm font-medium mb-1 text-text-secondary">
              Password <span className="text-red-500">*</span>
            </label>
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
            {loading ? "REGISTERING..." : "SIGN UP"}
          </button>
        </form>
      </div>

      <div className="flex justify-center gap-1 mt-4 text-sm">
        <span>Already have an account?</span>
        <Link href="/login" className="text-info hover:underline font-medium">
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
