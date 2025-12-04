"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EyeIcon, EyeCloseIcon } from "@/icons";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Checkbox from "@/components/form/input/Checkbox";
import Label from "@/components/form/Label";
import { toast } from "sonner";

export default function SignInSplit() {
  const PRIMARY_COLOR = "#173E67";

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      toast.error("Email atau password salah!");
        setLoading(false);
        return;
    }

     toast.success("Login berhasil!");
      setLoading(false);

       setTimeout(() => {
        
      }, 1200);

    const session = await fetch("/api/auth/session").then((r) => r.json());
    const role = session?.user?.role;

    if (role === "admin") router.push("/admin");
    else if (role === "tu") router.push("/staff");
    else if (role === "calon_siswa") router.push("/user");
    else router.push("/");

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* LEFT PANEL */}
        <div className="w-full lg:w-1/2 p-8">
          <div className="flex flex-col items-center mb-6">
            <img
              src="/images/LogoInstansi/logotb.png"
              alt="Logo"
              className="w-20 drop-shadow-xl"
            />
            <h1 className="mt-3 text-2xl font-bold" style={{ color: PRIMARY_COLOR }}>
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm text-center">Sign in to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <Label className="text-sm" style={{ color: PRIMARY_COLOR}}>
                Email
              </Label>
              <Input
                placeholder="info@gmail.com"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-100 placeholder-gray-400"
                style={{ color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}
              />
            </div>

            {/* Password */}
            <div>
              <Label className="text-sm" style={{ color: PRIMARY_COLOR }}>
                Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-100 placeholder-gray-400"
                  style={{ color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeIcon className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                  ) : (
                    <EyeCloseIcon className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                  )}
                </span>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Checkbox checked={isChecked} onChange={setIsChecked} />
                <span style={{ color: PRIMARY_COLOR }}>Keep me logged in</span>
              </div>
              <Link href="/reset-password" className="underline" style={{ color: PRIMARY_COLOR }}>
                Forgot password?
              </Link>
            </div>

            {/* Button */}
            <Button
              type="submit"
              className="w-full text-white"
              size="sm"
              disabled={loading}
              style={{
                backgroundColor: PRIMARY_COLOR,
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm" style={{ color: PRIMARY_COLOR }}>
            Don’t have an account?{" "}
            <Link href="/signup" className="underline font-medium" style={{ color: PRIMARY_COLOR }}>
              Sign Up
            </Link>
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div
          className="hidden lg:flex lg:w-1/2 items-center justify-center bg-cover bg-center relative"
          style={{ backgroundImage: "url('/images/dokumentasi/lorong.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative z-10 text-center text-white p-6">
            <p className="mt-4 font-semibold text-lg">
              Kamu kembali lagi, Calon Peserta Didik Baru!
            </p>
            <p className="text-sm mt-1">Yuk wujudkan mimpi dan masa depanmu bersama kami.</p>

            <Link
              href="/register"
              className="inline-block mt-4 px-6 py-2 bg-white font-medium rounded-lg hover:bg-gray-50 transition"
              style={{ color: PRIMARY_COLOR }}
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
