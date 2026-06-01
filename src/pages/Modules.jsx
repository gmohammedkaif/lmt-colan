import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FiClock,
  FiCheckSquare,
  FiList,
  FiFolder,
  FiCalendar,
  FiBarChart2,
  FiLogOut,
  FiArrowRight,
  FiUser,
  FiSearch,
  FiSun,
  FiBell,
  FiFileText,
  FiUsers, // New icons added
} from "react-icons/fi";
import colanLogo from "../assets/colonLogo.webp";

const modules = [
  {
    title: "Dashboard",
    text: "Daily summary, pending work, and productivity overview at a glance.",
    icon: FiBarChart2,
    path: "/dashboard",
    accent: "#2563eb",
    bg: "#eff6ff",
    tag: "Overview",
  },
  {
    title: "Tasks",
    text: "Manage assigned tasks, track progress, and meet deadlines on time.",
    icon: FiList,
    path: "/dashboard/tasks",
    accent: "#7c3aed",
    bg: "#f5f3ff",
    tag: "Work",
  },
  {
    title: "To-Do",
    text: "Create and check off your personal daily to-do items effortlessly.",
    icon: FiCheckSquare,
    path: "/dashboard/todo",
    accent: "#059669",
    bg: "#ecfdf5",
    tag: "Personal",
  },
  {
    title: "Projects",
    text: "View project details, assigned milestones, and active progress reports.",
    icon: FiFolder,
    path: "/dashboard/projects",
    accent: "#d97706",
    bg: "#fffbeb",
    tag: "Projects",
  },
  {
    title: "Timesheet",
    text: "Submit daily work logs, view tracked hours, and monitor approvals.",
    icon: FiClock,
    path: "/dashboard/timesheet",
    accent: "#0284c7",
    bg: "#f0f9ff",
    tag: "Tracking",
  },
  {
    title: "Calendar",
    text: "Plan your schedule, check upcoming deadlines, and manage your time.",
    icon: FiCalendar,
    path: "/dashboard/tasks",
    accent: "#db2777",
    bg: "#fdf2f8",
    tag: "Schedule",
  },
  // ── New Modules ──
  {
    title: "QA",
    text: "Track testing cycles, report bugs, and ensure software quality standards.",
    icon: FiSearch,
    path: "/dashboard/qa",
    accent: "#0891b2",
    bg: "#ecfeff",
    tag: "Testing",
  },
  {
    title: "RFP Estimation",
    text: "Prepare proposals, estimate resource requirements, and manage RFPs.",
    icon: FiFileText,
    path: "/dashboard/rfp",
    accent: "#ea580c",
    bg: "#fff7ed",
    tag: "Proposals",
  },
  {
    title: "Final Resource",
    text: "Allocate final resources, manage team capacity, and track utilization.",
    icon: FiUsers,
    path: "/dashboard/final-resource",
    accent: "#4f46e5",
    bg: "#eef2ff",
    tag: "Team",
  },
];

// greeting based on time
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function Modules() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail") || "employee@colan.com";
  const [hovered, setHovered] = useState(null);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const initials = name.slice(0, 2).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div
      className="min-h-screen bg-[#f7f8fc]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');
        .module-card { transition: transform 0.25s cubic-bezier(.16,1,.3,1), box-shadow 0.25s ease; }
        .module-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.10); }
        .fade-in { animation: fadeIn 0.6s ease both; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
        .stagger-1 { animation-delay: 0.05s; } .stagger-2 { animation-delay: 0.1s; }
        .stagger-3 { animation-delay: 0.15s; } .stagger-4 { animation-delay: 0.2s; }
        .stagger-5 { animation-delay: 0.25s; } .stagger-6 { animation-delay: 0.3s; }
        .stagger-7 { animation-delay: 0.35s; } .stagger-8 { animation-delay: 0.4s; }
        .stagger-9 { animation-delay: 0.45s; }

        /* ── navbar ── */
        .nav-bar {
          position: sticky; top: 0; z-index: 50;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }

         /* nav pill buttons */
        .nav-pill {
          display: flex; align-items: center; justify-content: center;
          border-radius: 10px; transition: background .15s, color .15s;
          cursor: pointer; border: none; background: transparent;
        }
        .nav-pill:hover { background: #f1f5f9; }
 
        /* logout btn */
        .logout-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 14px; border-radius: 10px;
          border: 1.5px solid #fee2e2; background: #fff5f5;
          color: #ef4444; font-size: 13px; font-weight: 600;
          cursor: pointer; transition: background .15s, border-color .15s;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .logout-btn:hover { background: #fee2e2; border-color: #fca5a5; }
      `}</style>

      {/* Header */}
      <header className="nav-bar pg-fade">
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 28px",
            height: 66,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left: Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "#fff",
                border: "1.5px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
              }}
            >
              <img
                src={colanLogo}
                alt="Colan Logo"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#0f172a",
                  lineHeight: 1.2,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: "0.01em",
                }}
              >
                COLAN INFOTECH
              </p>
              <p
                style={{
                  fontSize: 10,
                  color: "#94a3b8",
                  letterSpacing: "0.08em",
                  fontWeight: 500,
                }}
              >
                Timesheet Workspace
              </p>
            </div>

            {/* Divider */}
            <div
              style={{
                width: 1,
                height: 28,
                background: "#e2e8f0",
                margin: "0 10px",
              }}
            />

            {/* Date pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11.5,
                color: "#64748b",
                fontWeight: 500,
              }}
            >
              <FiSun size={13} style={{ color: "#f59e0b" }} />
              {today}
            </div>
          </div>

          {/* Right: actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Search */}
            <div className="search-wrap" style={{ display: "none" }}>
              {/* hidden on this bar, shown in hero */}
            </div>

            {/* Notification bell */}
            <button
              className="nav-pill"
              style={{ width: 38, height: 38, position: "relative" }}
              aria-label="Notifications"
            >
              <FiBell size={17} style={{ color: "#64748b" }} />
              <span className="notif-dot" />
            </button>

            {/* Divider */}
            <div style={{ width: 1, height: 22, background: "#e2e8f0" }} />

            {/* User chip */}
            <div className="user-chip">
              <div className="user-avatar">{initials}</div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#0f172a",
                    lineHeight: 1.2,
                    textTransform: "capitalize",
                  }}
                >
                  {name}
                </span>
                <span
                  className="hover:"
                  style={{
                    fontSize: 10,
                    color: "rgb(45 100 230)",
                    backgroundColor: "#94a3b8",
                    border: "2px solid rgb(45 100 230)",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  {email}
                </span>
              </div>
            </div>

            {/* Logout */}
            <button className="logout-btn" onClick={handleLogout}>
              <FiLogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Hero strip - Light Theme */}
      <div className="relative overflow-hidden border-b border-slate-100 bg-[#f7f9ff] px-8 py-12">
        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #64748b 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Glow Effects */}
        <div className="absolute top-[-120px] right-[-80px] w-[320px] h-[320px] bg-blue-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-[-120px] left-[20%] w-[240px] h-[240px] bg-indigo-100 rounded-full blur-3xl opacity-30" />

        {/* Wave SVG */}
        <div className="absolute top-0 right-0 w-[45%] h-full opacity-60 pointer-events-none">
          <svg
            viewBox="0 0 600 300"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 150C80 80 140 220 220 150C300 80 360 220 440 150C520 80 560 180 600 120"
              stroke="#c7d2fe"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M0 190C90 120 160 250 240 180C320 110 390 240 470 170C540 110 580 210 600 170"
              stroke="#dbeafe"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Floating Icons */}
        <div className="absolute right-20 top-10 hidden lg:flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center rotate-[-6deg]">
            <span className="text-2xl">📊</span>
          </div>

          <div className="w-12 h-12 rounded-xl bg-white shadow-md border border-slate-100 flex items-center justify-center translate-y-10">
            <span className="text-xl">✅</span>
          </div>

          <div className="w-12 h-12 rounded-xl bg-white shadow-md border border-slate-100 flex items-center justify-center -translate-y-4">
            <span className="text-xl">📅</span>
          </div>

          <div className="w-12 h-12 rounded-xl bg-white shadow-md border border-slate-100 flex items-center justify-center translate-y-16">
            <span className="text-xl">📁</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative max-w-6xl mx-auto z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-700">
              Workspace
            </span>
          </div>

          <h2
            className="text-4xl font-bold text-slate-900 leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Choose your module
          </h2>

          <p className="text-slate-500 text-base mt-3 max-w-md leading-relaxed">
            Select a section to continue your daily workflow and manage
            productivity efficiently.
          </p>
        </div>
      </div>

      {/* Module grid */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {modules.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <button
                key={mod.title}
                onClick={() => navigate(mod.path)}
                onMouseEnter={() => setHovered(mod.title)}
                onMouseLeave={() => setHovered(null)}
                className={`module-card fade-in stagger-${i + 1} group bg-white rounded-2xl p-6 text-left border border-slate-100 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500/40`}
              >
                {/* Accent line on left */}
                <div
                  className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      hovered === mod.title ? mod.accent : "transparent",
                  }}
                />

                {/* Tag */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: mod.bg, color: mod.accent }}
                  >
                    {mod.tag}
                  </span>
                  <FiArrowRight
                    size={16}
                    className="transition-all duration-300 group-hover:translate-x-1"
                    style={{
                      color: hovered === mod.title ? mod.accent : "#cbd5e1",
                    }}
                  />
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: mod.bg }}
                >
                  <Icon size={22} style={{ color: mod.accent }} />
                </div>

                {/* Text */}
                <h3
                  className="text-[17px] font-bold text-slate-900 mb-1.5"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {mod.title}
                </h3>
                <p className="text-sm text-slate-500 leading-6">{mod.text}</p>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Modules;
