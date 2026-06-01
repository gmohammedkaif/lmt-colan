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
  FiBell,
  FiFileText,
  FiUsers,
  FiSearch,
  FiSun,
  FiTrendingUp,
  FiActivity,
  FiClipboard,
} from "react-icons/fi";

import colanLogo from "../assets/colonLogo.webp";

const modules = [
  {
    title: "Dashboard",
    text: "Daily summary, pending work, and productivity overview.",
    icon: FiBarChart2,
    path: "/dashboard",
    accent: "#2563EB",
    bg: "#EFF6FF",
    tag: "Overview",
  },
  {
    title: "Tasks",
    text: "Manage assigned tasks and track work progress.",
    icon: FiList,
    path: "/dashboard/tasks",
    accent: "#7C3AED",
    bg: "#F5F3FF",
    tag: "Work",
  },
  {
    title: "To-Do",
    text: "Organize and manage your personal task list.",
    icon: FiCheckSquare,
    path: "/dashboard/todo",
    accent: "#059669",
    bg: "#ECFDF5",
    tag: "Personal",
  },
  {
    title: "Projects",
    text: "Track project milestones and active progress.",
    icon: FiFolder,
    path: "/dashboard/projects",
    accent: "#D97706",
    bg: "#FFFBEB",
    tag: "Projects",
  },
  {
    title: "Timesheet",
    text: "Submit work logs and monitor tracked hours.",
    icon: FiClock,
    path: "/dashboard/timesheet",
    accent: "#0284C7",
    bg: "#F0F9FF",
    tag: "Tracking",
  },
  {
    title: "Calendar",
    text: "Manage schedules and upcoming deadlines.",
    icon: FiCalendar,
    path: "/dashboard/calendar",
    accent: "#DB2777",
    bg: "#FDF2F8",
    tag: "Schedule",
  },
  {
    title: "QA",
    text: "Track testing cycles and software quality.",
    icon: FiSearch,
    path: "/dashboard/qa",
    accent: "#0891B2",
    bg: "#ECFEFF",
    tag: "Testing",
  },
  {
    title: "RFP Estimation",
    text: "Prepare proposals and resource estimations.",
    icon: FiFileText,
    path: "/dashboard/rfp",
    accent: "#EA580C",
    bg: "#FFF7ED",
    tag: "Proposals",
  },
  {
    title: "Final Resource",
    text: "Manage resource allocation and utilization.",
    icon: FiUsers,
    path: "/dashboard/resources",
    accent: "#4F46E5",
    bg: "#EEF2FF",
    tag: "Team",
  },
];

function Modules() {
  const navigate = useNavigate();

  const email =
    localStorage.getItem("userEmail") || "employee@colan.com";

  const name = email.split("@")[0];
  const initials = name.slice(0, 2).toUpperCase();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const [hovered, setHovered] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div
      className="min-h-screen bg-[#F8FAFC]"
      style={{
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* GLOBAL STYLES */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

          .module-card {
            transition:
              transform 0.2s ease,
              border-color 0.2s ease,
              box-shadow 0.2s ease;
          }

          .module-card:hover {
            transform: translateY(-2px);
            border-color: #CBD5E1;
            box-shadow: 0 10px 24px rgba(15,23,42,0.06);
          }

          .fade-in {
            animation: fadeIn 0.45s ease both;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: none;
            }
          }

          .nav-btn:hover {
            background: #F1F5F9;
          }

          .logout-btn:hover {
            background: #FEF2F2;
          }
        `}
      </style>

      {/* HEADER */}
     <header
  style={{
    position: "sticky",
    top: 0,
    zIndex: 50,
    background: "#FFFFFF",
    borderBottom: "1px solid #F1F5F9",
  }}
>
  <div
    style={{
      maxWidth: "1440px",
      margin: "0 auto",
      height: "68px",
      padding: "0 36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    {/* LEFT SECTION */}
    <div className="flex items-center">
      {/* LOGO */}
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            border: "1px solid #EDF2F7",
            background: "#FFFFFF",
          }}
        >
          <img
            src={colanLogo}
            alt="logo"
            className="w-7 h-7 object-contain"
          />
        </div>

        <div>
          <h2
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#0F172A",
              lineHeight: 1.15,
              letterSpacing: "0.04em",
            }}
          >
            COLAN INFOTECH
          </h2>

          <p
            style={{
              fontSize: "10px",
              color: "#94A3B8",
              fontWeight: 500,
              letterSpacing: "0.08em",
            }}
          >
            Timesheet Workspace
          </p>
        </div>
      </div>

      {/* DIVIDER */}
      <div
        style={{
          width: "1px",
          height: "24px",
          background: "#EDF2F7",
          marginLeft: "28px",
          marginRight: "28px",
        }}
      />

      {/* DATE */}
      <div className="flex items-center gap-2">
        <FiSun
          size={13}
          style={{
            color: "#F59E0B",
          }}
        />

        <p
          style={{
            fontSize: "12px",
            color: "#64748B",
            fontWeight: 500,
          }}
        >
          {today}
        </p>
      </div>
    </div>

    {/* RIGHT SECTION */}
    <div className="flex items-center gap-4">
      {/* NOTIFICATION */}
      <button
        className="nav-btn transition-colors"
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "10px",
          border: "none",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <FiBell
          size={17}
          style={{
            color: "#64748B",
          }}
        />
      </button>

      {/* DIVIDER */}
      <div
        style={{
          width: "1px",
          height: "22px",
          background: "#EDF2F7",
        }}
      />

      {/* USER PROFILE */}
      <div className="flex items-center gap-3">
        {/* AVATAR */}
        <div
          className="flex items-center justify-center"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "12px",
            background: "#DBEAFE",
            color: "#1D4ED8",
            fontSize: "13px",
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {initials}
        </div>

        {/* USER INFO */}
        <div className="hidden sm:block">
          <h4
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#0F172A",
              lineHeight: 1.2,
              textTransform: "capitalize",
              marginBottom: "2px",
            }}
          >
            {name}
          </h4>

          <p
            style={{
              fontSize: "9px",
              color: "#94A3B8",
              fontWeight: 500,
              opacity: 0.8,
            }}
          >
            {email}
          </p>
        </div>
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="logout-btn transition-all"
        style={{
          height: "38px",
          padding: "0 16px",
          borderRadius: "10px",
          border: "1px solid #FEE2E2",
          background: "#FFFFFF",
          color: "#DC2626",
          display: "flex",
          alignItems: "center",
          gap: "7px",
          fontSize: "13px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        <FiLogOut size={14} />
        Logout
      </button>
    </div>
  </div>
</header>

      {/* HERO */}
     
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
      Select a section to continue your daily workflow and manage productivity efficiently.
    </p>
  </div>
</div>

      {/* MODULE GRID */}
      <main
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "32px 28px 40px",
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {modules.map((mod, i) => {
            const Icon = mod.icon;

            return (
              <button
                key={mod.title}
                onClick={() => navigate(mod.path)}
                onMouseEnter={() => setHovered(mod.title)}
                onMouseLeave={() => setHovered(null)}
                className="module-card fade-in group bg-white relative overflow-hidden text-left"
                style={{
                  borderRadius: "16px",
                  border: "1px solid #E2E8F0",
                  padding: "20px",
                  animationDelay: `${i * 0.04}s`,
                }}
              >
                {/* LEFT ACCENT */}
                <div
                  className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full transition-all duration-200"
                  style={{
                    background:
                      hovered === mod.title
                        ? mod.accent
                        : "transparent",
                  }}
                />

                {/* TOP */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    style={{
                      background: mod.bg,
                      color: mod.accent,
                      fontSize: "10px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      padding: "6px 10px",
                      borderRadius: "999px",
                    }}
                  >
                    {mod.tag}
                  </span>

                  <FiArrowRight
                    size={16}
                    className="transition-all duration-200 group-hover:translate-x-1"
                    style={{
                      color:
                        hovered === mod.title
                          ? mod.accent
                          : "#CBD5E1",
                    }}
                  />
                </div>

                {/* ICON */}
                <div
                  className="flex items-center justify-center mb-5"
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    background: mod.bg,
                  }}
                >
                  <Icon
                    size={22}
                    style={{
                      color: mod.accent,
                    }}
                  />
                </div>

                {/* TITLE */}
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#0F172A",
                    marginBottom: "8px",
                  }}
                >
                  {mod.title}
                </h3>

                {/* DESC */}
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.75,
                    color: "#64748B",
                  }}
                >
                  {mod.text}
                </p>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Modules;