import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiInfo,
} from "react-icons/fi";

import colanLogo from "../assets/colan-login-logo.png";
import guy from "../assets/GuyWithLaptop.png";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();

    const newErrors = {
      email: "",
      password: "",
    };

    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (newErrors.email || newErrors.password) return;

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      navigate("/modules");
    }, 900);
  };

  return (
    <div
      className="relative h-screen overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{
        background: "linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        className="w-full overflow-hidden bg-white"
        style={{
          maxWidth: "1060px",
          borderRadius: "20px",
          border: "1px solid #D7E0EA",
          boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[47%_53%]">
          {/* LEFT SECTION */}
          <div
            className="hidden lg:flex flex-col justify-between"
            style={{
              background: "#F8FAFC",
              padding: "32px",
              borderRight: "1px solid #EDF2F7",
            }}
          >
            <div>
              <div className="mb-7">
                <img
                  src={colanLogo}
                  alt="Colan Infotech"
                  className="w-[190px] object-contain"
                />
              </div>

              <div className="mb-5">
                <h1 className="mb-3 text-[32px] font-bold leading-tight tracking-[-0.03em] text-slate-950">
                  Welcome back
                </h1>

                <p className="max-w-[360px] text-[14px] leading-7 text-slate-600">
                  Access your workspace, manage timesheets, and track employee
                  productivity securely from one place.
                </p>
              </div>

              <div className="rounded-[18px] border border-[#D7E0EA] bg-white p-5">
                <div className="mb-4 h-1 w-[110px] rounded-full bg-blue-700" />

                <img
                  src={guy}
                  alt="illustration"
                  className="h-[210px] w-full object-contain"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3">
              {["Secure Access", "Daily Tracking", "Team Productivity"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-700" />
                    <p className="text-[13px] font-medium text-slate-600">
                      {item}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center justify-center px-6 py-7 lg:px-12">
            <form onSubmit={handleLogin} className="w-full max-w-[430px]">
              <div className="mb-7 flex lg:hidden">
                <img
                  src={colanLogo}
                  alt="Colan Infotech"
                  className="w-[180px] object-contain"
                />
              </div>

              <div className="mb-6">
                <h1 className="mb-2 text-[30px] font-bold tracking-[-0.03em] text-slate-950">
                  Sign in
                </h1>

                <p className="text-sm leading-7 text-slate-500">
                  Enter your credentials to access your workspace account.
                </p>
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-[12px] font-semibold uppercase tracking-wide text-slate-700">
                  Email
                </label>

                <div
                  className={`group flex h-[48px] items-center gap-3 rounded-xl border px-4 bg-white transition-all ${
                    errors.email ? "border-red-400" : "border-slate-300"
                  }`}
                >
                  <FiMail size={16} className="text-slate-400" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors({ ...errors, email: "" });
                    }}
                    className="flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-300"
                  />
                </div>

                {errors.email && (
                  <p className="mt-2 text-[12px] text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label className="mb-2 block text-[12px] font-semibold uppercase tracking-wide text-slate-700">
                  Password
                </label>

                <div
                  className={`group flex h-[48px] items-center gap-3 rounded-xl border px-4 bg-white transition-all ${
                    errors.password ? "border-red-400" : "border-slate-300"
                  }`}
                >
                  <FiLock size={16} className="text-slate-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors({ ...errors, password: "" });
                    }}
                    className="flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-300"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <FiEye size={16} /> : <FiEyeOff size={16} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-2 text-[12px] text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="mb-5 flex items-center justify-between gap-3">
                <label className="flex cursor-pointer items-center gap-2 text-[13px] text-slate-600">
                  <input type="checkbox" className="h-4 w-4 accent-blue-700" />
                  Remember me
                </label>

                <button
                  type="button"
                  className="cursor-pointer text-[13px] font-medium text-slate-600 hover:text-blue-700"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-700 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:opacity-70"
              >
                {loading ? (
                  <div className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-white/40 border-t-white" />
                ) : (
                  <>
                    Sign In
                    <FiArrowRight size={16} />
                  </>
                )}
              </button>

              <div className="mt-5 flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <FiInfo size={16} />
                </div>

                <div>
                  <h4 className="mb-1 text-[13px] font-bold text-slate-950">
                    Access Information
                  </h4>

                  <p className="text-[12px] leading-6 text-slate-500">
                    This portal is intended for internal employees. Use your
                    official credentials to access your workspace securely.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <p className="absolute bottom-3 left-0 right-0 text-center text-[12px] text-slate-300">
        © 2026 Colan Infotech. All rights reserved.
      </p>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

          .group:focus-within {
            border-color: #1D4ED8 !important;
            box-shadow: 0 0 0 4px rgba(29,78,216,0.10);
          }
        `}
      </style>
    </div>
  );
}

export default Login;