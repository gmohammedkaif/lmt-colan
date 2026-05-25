import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiShield, FiClock, FiBarChart2, FiInfo, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import colanLogo from "../assets/colonLogo.webp";
import guy from "../assets/GuyWithLaptop.png";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = { email: "", password: "" };
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
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{ background: "#f0f4ff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');

        /* ── card entrance ── */
        .lc-card { animation: lcSlideUp .55s cubic-bezier(.16,1,.3,1) both; }
        @keyframes lcSlideUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:none; } }

        /* ── right panel stagger ── */
        .lc-r1 { animation: lcFade .5s .1s ease both; }
        .lc-r2 { animation: lcFade .5s .18s ease both; }
        .lc-r3 { animation: lcFade .5s .26s ease both; }
        .lc-r4 { animation: lcFade .5s .34s ease both; }
        .lc-r5 { animation: lcFade .5s .42s ease both; }
        .lc-r6 { animation: lcFade .5s .50s ease both; }
        @keyframes lcFade { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }

        /* ── floating cards on left ── */
        .lc-float1 { animation: lcFloat 4s 0s ease-in-out infinite alternate; }
        .lc-float2 { animation: lcFloat 4s 1.3s ease-in-out infinite alternate; }
        .lc-float3 { animation: lcFloat 4s 2.1s ease-in-out infinite alternate; }
        @keyframes lcFloat { from { transform:translateY(0px); } to { transform:translateY(-8px); } }

        /* ── input focus ring ── */
        .lc-input-wrap { transition: border-color .2s, box-shadow .2s, background .2s; }
        .lc-input-wrap:focus-within {
          border-color: #3b82f6 !important;
          background: #fff !important;
          box-shadow: 0 0 0 3.5px rgba(59,130,246,.12);
        }
        .lc-input-wrap.error { border-color: #f87171 !important; background: #fff5f5 !important; }

        /* ── primary button ── */
        .lc-btn-primary {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          transition: transform .18s, box-shadow .18s;
          box-shadow: 0 4px 18px rgba(37,99,235,.38);
        }
        .lc-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(37,99,235,.46); }
        .lc-btn-primary:active { transform: translateY(0); }

        /* ── google button ── */
        .lc-btn-google { transition: background .15s, box-shadow .15s; }
        .lc-btn-google:hover { background: #f8faff; box-shadow: 0 2px 12px rgba(0,0,0,.08); }

        /* ── feature pills ── */
        .lc-feature { transition: transform .2s ease; }
        .lc-feature:hover { transform: translateY(-2px); }

        /* ── illustration card ── */
        .lc-illus-card { box-shadow: 0 12px 48px rgba(37,99,235,.13); }

        /* ── stat chips ── */
        .lc-stat { backdrop-filter: blur(8px); }

        /* ── spinner ── */
        .lc-spin { animation: spin .7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── subtle dot bg ── */
        .lc-dots {
          background-image: radial-gradient(circle, rgba(37,99,235,.15) 1.2px, transparent 1.2px);
          background-size: 26px 26px;
        }

        /* ── divider ── */
        .lc-divider { display: flex; align-items: center; gap: 12px; }
        .lc-divider::before, .lc-divider::after {
          content: ''; flex: 1; height: 1px; background: #e2e8f0;
        }
      `}</style>

      {/* ════════════ CARD ════════════ */}
      <div
        className="lc-card w-full bg-white overflow-hidden"
        style={{
          maxWidth: 1060,
          borderRadius: 28,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          boxShadow: "0 8px 64px rgba(0,0,0,.09), 0 1px 2px rgba(0,0,0,.04)",
        }}
      >

        {/* ══════ LEFT PANEL ══════ */}
        <div
          className="hidden lg:flex flex-col justify-between relative overflow-hidden"
          style={{ background: "linear-gradient(160deg, #eef4ff 0%, #e8f0fe 60%, #dbeafe 100%)", padding: "44px 44px 40px" }}
        >
          {/* Dot grid bg */}
          <div className="lc-dots absolute inset-0 pointer-events-none" />

          {/* Decorative circle top-right */}
          <div
            className="absolute pointer-events-none"
            style={{ top: -60, right: -60, width: 220, height: 220, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(59,130,246,.18) 0%, transparent 70%)" }}
          />
          <div
            className="absolute pointer-events-none"
            style={{ bottom: 60, left: -40, width: 160, height: 160, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(99,102,241,.13) 0%, transparent 70%)" }}
          />

          {/* ── Top: logo + headline ── */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <img src={colanLogo} alt="Colan Logo" className="w-11 h-11 object-contain" />
              <div>
                <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18, color: "#0f172a", lineHeight: 1.1, fontWeight: 400 }}>
                  Colan Infotech
                </p>
                <p style={{ fontSize: 10, color: "#64748b", letterSpacing: "0.15em", fontWeight: 600, textTransform: "uppercase" }}>
                  Workspace Suite
                </p>
              </div>
            </div>

            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 44, lineHeight: 1.12, color: "#0f172a", marginBottom: 14, fontWeight: 400 }}>
              Welcome<br /><span style={{ fontStyle: "italic", color: "#2563eb" }}>Back!</span>
            </h2>
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.75, maxWidth: 300 }}>
              Sign in to continue to your timesheet and manage your daily productivity.
            </p>

            {/* ── Illustration card ── */}
            <div
              className="lc-illus-card lc-float1 mt-9 relative"
              style={{ background: "#fff", borderRadius: 20, padding: "16px 16px 8px", maxWidth: 360 }}
            >
              {/* Decorative top bar on card */}
              <div style={{ height: 4, borderRadius: 99, background: "linear-gradient(90deg,#2563eb,#60a5fa)", marginBottom: 10 }} />
              <img src={guy} alt="Illustration" className="w-full object-contain" style={{ height: 190 }} />

              {/* Floating stat chip 1 */}
              <div
                className="lc-float2 lc-stat absolute"
                style={{
                  top: 28, right: -18, background: "rgba(255,255,255,0.92)",
                  border: "1px solid #e0eaff", borderRadius: 12, padding: "8px 14px",
                  boxShadow: "0 4px 16px rgba(37,99,235,.13)", display: "flex", alignItems: "center", gap: 8,
                }}
              >
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FiClock style={{ color: "#2563eb", fontSize: 14 }} />
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#0f172a", lineHeight: 1 }}>09:30</p>
                  <p style={{ fontSize: 9, color: "#94a3b8", lineHeight: 1.4 }}>hrs logged</p>
                </div>
              </div>

              {/* Floating stat chip 2 */}
              <div
                className="lc-float3 lc-stat absolute"
                style={{
                  bottom: 36, left: -16, background: "rgba(255,255,255,0.92)",
                  border: "1px solid #e0eaff", borderRadius: 12, padding: "8px 14px",
                  boxShadow: "0 4px 16px rgba(37,99,235,.13)", display: "flex", alignItems: "center", gap: 8,
                }}
              >
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FiBarChart2 style={{ color: "#10b981", fontSize: 14 }} />
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#0f172a", lineHeight: 1 }}>4 Active</p>
                  <p style={{ fontSize: 9, color: "#94a3b8", lineHeight: 1.4 }}>projects</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom: feature row ── */}
          <div className="relative z-10 flex items-center gap-0" style={{ paddingTop: 32 }}>
            {[
              { icon: <FiShield />, title: "Secure", text: "Data Protection", color: "#2563eb", bg: "#eff6ff" },
              { icon: <FiClock />, title: "Track", text: "Daily Progress", color: "#7c3aed", bg: "#f5f3ff" },
              { icon: <FiBarChart2 />, title: "Improve", text: "Productivity", color: "#059669", bg: "#ecfdf5" },
            ].map((f, i) => (
              <div key={f.title} className="lc-feature flex items-center gap-2.5 flex-1">
                {i !== 0 && <div style={{ width: 1, height: 32, background: "#cbd5e1", marginRight: 12 }} />}
                <div style={{ width: 32, height: 32, borderRadius: 9, background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", color: f.color, fontSize: 15 }}>
                  {f.icon}
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{f.title}</p>
                  <p style={{ fontSize: 10, color: "#94a3b8" }}>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════ RIGHT PANEL ══════ */}
        <div className="flex items-center justify-center" style={{ padding: "52px 48px" }}>
          <form onSubmit={handleLogin} className="w-full" style={{ maxWidth: 400 }}>

            {/* Mobile logo */}
            <div className="flex lg:hidden items-center gap-3 mb-8">
              <img src={colanLogo} alt="Colan Logo" className="w-9 h-9 object-contain" />
              <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 17, color: "#0f172a" }}>Colan Infotech</p>
            </div>

            {/* Heading */}
            <div className="lc-r1 mb-7">
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 26, fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>
                Sign in to your account
              </h2>
              <p style={{ fontSize: 13.5, color: "#64748b" }}>Enter your credentials to access your account</p>
            </div>

            {/* Email */}
            <div className="lc-r2 mb-4">
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
                Email
              </label>
              <div
                className={`lc-input-wrap flex items-center gap-3 ${errors.email ? "error" : ""}`}
                style={{ height: 48, border: "1.5px solid #e2e8f0", borderRadius: 12, paddingLeft: 14, paddingRight: 14, background: "#f8faff" }}
              >
                <FiMail style={{ color: "#94a3b8", fontSize: 16, flexShrink: 0 }} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: "" }); }}
                  style={{ flex: 1, background: "transparent", outline: "none", border: "none", fontSize: 13.5, color: "#1e293b" }}
                />
              </div>
              {errors.email && <p style={{ color: "#ef4444", fontSize: 11.5, marginTop: 5, fontWeight: 500 }}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="lc-r3 mb-5">
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
                Password
              </label>
              <div
                className={`lc-input-wrap flex items-center gap-3 ${errors.password ? "error" : ""}`}
                style={{ height: 48, border: "1.5px solid #e2e8f0", borderRadius: 12, paddingLeft: 14, paddingRight: 14, background: "#f8faff" }}
              >
                <FiLock style={{ color: "#94a3b8", fontSize: 16, flexShrink: 0 }} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors({ ...errors, password: "" }); }}
                  style={{ flex: 1, background: "transparent", outline: "none", border: "none", fontSize: 13.5, color: "#1e293b" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ color: "#94a3b8", lineHeight: 0, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  onMouseEnter={e => e.currentTarget.style.color = "#64748b"}
                  onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}
                >
                  {showPassword ? <FiEye size={16} /> : <FiEyeOff size={16} />}
                </button>
              </div>
              {errors.password && <p style={{ color: "#ef4444", fontSize: 11.5, marginTop: 5, fontWeight: 500 }}>{errors.password}</p>}
            </div>

            {/* Remember + Forgot */}
            <div className="lc-r4 flex items-center justify-between" style={{ marginBottom: 22 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#475569", cursor: "pointer" }}>
                <input type="checkbox" style={{ width: 15, height: 15, accentColor: "#2563eb", borderRadius: 4 }} />
                Remember me
              </label>
              <button type="button" style={{ fontSize: 13, fontWeight: 600, color: "#2563eb", background: "none", border: "none", cursor: "pointer" }}>
                Forgot Password?
              </button>
            </div>

            {/* Sign In button */}
            <div className="lc-r5">
              <button
                type="submit"
                className="lc-btn-primary w-full flex items-center justify-center gap-2 text-white font-bold"
                style={{ height: 48, borderRadius: 12, fontSize: 14, border: "none", cursor: "pointer", marginBottom: 16 }}
              >
                {loading
                  ? <span className="lc-spin" style={{ width: 18, height: 18, border: "2.5px solid rgba(255,255,255,.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block" }} />
                  : <><span>Sign In</span><FiArrowRight size={15} /></>
                }
              </button>

             

             

            </div>

            {/* Info box */}
            <div className="lc-r6 mt-6" style={{ background: "#f0f6ff", border: "1px solid #bfdbfe", borderRadius: 14, padding: "14px 16px", display: "flex", gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <FiInfo style={{ color: "#fff", fontSize: 14 }} />
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#1e3a5f", marginBottom: 3 }}>Access Information</p>
                <p style={{ fontSize: 11.5, color: "#475569", lineHeight: 1.6 }}>
                  This portal is only for internal employees. Use your official email credentials. For login access, contact admin.
                </p>
              </div>
            </div>
          </form>
        </div>

      </div>

      {/* Footer note */}
      <p style={{ position: "fixed", bottom: 18, left: 0, right: 0, textAlign: "center", fontSize: 12, color: "#94a3b8" }}>
        © 2026 Colan Infotech. All rights reserved.
      </p>
    </div>
  );
}

export default Login;