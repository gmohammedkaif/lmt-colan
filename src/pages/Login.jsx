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

import colanLogo from "../assets/colonLogo.webp";
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

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

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
className="min-h-screen flex items-center justify-center px-5 py-10 "
      style={{
        background:
          "linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)",
        fontFamily: "Inter, sans-serif",
        transform: "translateY(-20px)"
      }}
    >
      {/* MAIN CONTAINER */}
     <div
  className="w-full overflow-hidden bg-white"
  style={{
    maxWidth: "1080px",
    borderRadius: "20px",
    border: "1px solid #D7E0EA",
    boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
    transform: "translateY(-20px)",
  }}
>
        <div className="grid lg:grid-cols-[47%_53%]">
          {/* LEFT SECTION */}
          <div
            className="hidden lg:flex flex-col justify-between"
            style={{
              background: "#F8FAFC",
              padding: "40px",
              borderRight: "1px solid #EDF2F7",
            }}
          >
            <div>
              {/* LOGO */}
              <div className="flex items-center gap-3 mb-12">
                <img
                  src={colanLogo}
                  alt="logo"
                  className="w-11 h-11 object-contain"
                />

                <div>
                  <h2
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#0F172A",
                      lineHeight: 1.2,
                    }}
                  >
                    Colan Infotech
                  </h2>

                  <p
                    style={{
                      fontSize: "11px",
                      color: "#64748B",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    Workspace Suite
                  </p>
                </div>
              </div>

              {/* CONTENT */}
              <div className="mb-8">
                <h1
                  style={{
                    fontSize: "36px",
                    fontWeight: 700,
                    lineHeight: 1.15,
                    letterSpacing: "-0.03em",
                    color: "#0F172A",
                    marginBottom: "16px",
                  }}
                >
                  Welcome back
                </h1>

                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.8,
                    color: "#475569",
                    maxWidth: "360px",
                  }}
                >
                  Access your workspace, manage timesheets, and
                  track employee productivity securely from one place.
                </p>
              </div>

              {/* ILLUSTRATION CARD */}
              <div
                style={{
                  borderRadius: "18px",
                  border: "1px solid #D7E0EA",
                  background: "#FFFFFF",
                  padding: "22px",
                }}
              >
                {/* TOP LINE */}
                <div
                  style={{
                    width: "110px",
                    height: "4px",
                    borderRadius: "999px",
                    background: "#1D4ED8",
                    marginBottom: "18px",
                  }}
                />

                <img
                  src={guy}
                  alt="illustration"
                  className="w-full object-contain"
                  style={{
                    height: "240px",
                  }}
                />
              </div>
            </div>

            {/* BOTTOM INFO */}
            <div
              className="flex items-center gap-8"
              style={{
                marginTop: "30px",
              }}
            >
              {[
                "Secure Access",
                "Daily Tracking",
                "Team Productivity",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2"
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#1D4ED8",
                    }}
                  />

                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#475569",
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center justify-center px-6 py-10 lg:px-14">
            <form
              onSubmit={handleLogin}
              className="w-full"
              style={{
                maxWidth: "440px",
              }}
            >
              {/* MOBILE LOGO */}
              <div className="flex lg:hidden items-center gap-3 mb-10">
                <img
                  src={colanLogo}
                  alt="logo"
                  className="w-10 h-10 object-contain"
                />

                <div>
                  <h2
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#0F172A",
                    }}
                  >
                    Colan Infotech
                  </h2>

                  <p
                    style={{
                      fontSize: "11px",
                      color: "#64748B",
                    }}
                  >
                    Workspace Suite
                  </p>
                </div>
              </div>

              {/* HEADER */}
              <div className="mb-8">
                <h1
                  style={{
                    fontSize: "32px",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    color: "#0F172A",
                    marginBottom: "10px",
                  }}
                >
                  Sign in
                </h1>

                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.7,
                    color: "#64748B",
                  }}
                >
                  Enter your credentials to access your workspace account.
                </p>
              </div>

              {/* EMAIL */}
              <div className="mb-5">
                <label className="block text-[12px] font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                  Email
                </label>

                <div
                  className={`group flex items-center gap-3 h-[52px] px-4 bg-white transition-all ${
                    errors.email ? "border-red-400" : ""
                  }`}
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #CBD5E1",
                  }}
                >
                  <FiMail
                    size={16}
                    className="text-slate-400 group-focus-within:text-blue-700 transition-colors"
                  />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors({
                        ...errors,
                        email: "",
                      });
                    }}
                    className="flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"
                  />
                </div>

                {errors.email && (
                  <p className="text-[12px] text-red-500 mt-2">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div className="mb-6">
                <label className="block text-[12px] font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                  Password
                </label>

                <div
                  className={`group flex items-center gap-3 h-[52px] px-4 bg-white transition-all ${
                    errors.password ? "border-red-400" : ""
                  }`}
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #CBD5E1",
                  }}
                >
                  <FiLock
                    size={16}
                    className="text-slate-400 group-focus-within:text-blue-700 transition-colors"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors({
                        ...errors,
                        password: "",
                      });
                    }}
                    className="flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <FiEye size={16} />
                    ) : (
                      <FiEyeOff size={16} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-[12px] text-red-500 mt-2">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* OPTIONS */}
              <div className="flex items-center justify-between mb-7">
                <label className="flex items-center gap-2 text-[13px] text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    style={{
                      accentColor: "#1D4ED8",
                    }}
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  className="text-[13px] font-medium text-slate-600 hover:text-blue-700 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 text-white transition-all"
                style={{
                  height: "52px",
                  borderRadius: "12px",
                  background: "#1D4ED8",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {loading ? (
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      border:
                        "2px solid rgba(255,255,255,0.35)",
                      borderTopColor: "#FFFFFF",
                      borderRadius: "50%",
                      animation:
                        "spin .7s linear infinite",
                    }}
                  />
                ) : (
                  <>
                    Sign In
                    <FiArrowRight size={16} />
                  </>
                )}
              </button>

              {/* INFO BOX */}
              <div
                className="flex gap-3 mt-7"
                style={{
                  borderRadius: "14px",
                  border: "1px solid #D7E0EA",
                  background: "#F8FAFC",
                  padding: "16px",
                }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "#EFF6FF",
                  }}
                >
                  <FiInfo
                    size={16}
                    style={{
                      color: "#1D4ED8",
                    }}
                  />
                </div>

                <div>
                  <h4
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#0F172A",
                      marginBottom: "4px",
                    }}
                  >
                    Access Information
                  </h4>

                  <p
                    style={{
                      fontSize: "12px",
                      lineHeight: 1.7,
                      color: "#64748B",
                    }}
                  >
                    This portal is intended for internal employees.
                    Use your official credentials to access your
                    workspace securely.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <p
        style={{
          position: "fixed",
          bottom: "24px",
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: "12px",
          color: "#CBD5E1",
          opacity: 0.9,
        }}
      >
        © 2026 Colan Infotech. All rights reserved.
      </p>

      {/* GLOBAL STYLES */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          input:focus {
            outline: none;
          }

          input::placeholder {
            color: #CBD5E1;
          }

          .group:focus-within {
            border-color: #1D4ED8 !important;
            box-shadow: 0 0 0 4px rgba(29,78,216,0.10);
          }

          button[type="submit"]:hover {
            background: #1E40AF !important;
          }
        `}
      </style>
    </div>
  );
}

export default Login;