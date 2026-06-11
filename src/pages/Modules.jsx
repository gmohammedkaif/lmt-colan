import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  FiClock, FiCheckSquare, FiList, FiFolder, FiCalendar,
  FiBarChart2, FiLogOut, FiArrowRight, FiBell, FiFileText,
  FiUsers, FiSearch, FiSun, FiSettings,
} from "react-icons/fi";
import colanLogo from "../assets/colonLogo.webp";

const modules = [
  {
    title: "Dashboard", subtitle: "Business Overview",
    text: "View daily summaries, pending work, and your full productivity overview at a glance.",
    icon: FiBarChart2, path: "/dashboard",
    accent: "#2563EB", iconBg: "#EFF6FF", iconColor: "#2563EB",
  },
  {
    title: "Tasks", subtitle: "Task Tracking System",
    text: "Create, assign and manage daily tasks with progress tracking and team coordination.",
    icon: FiList, path: "/dashboard/tasks",
    accent: "#EA580C", iconBg: "#FFF7ED", iconColor: "#EA580C",
  },
  {
    title: "To-Do", subtitle: "Personal Task Board",
    text: "Organize and manage your personal task list with priorities, reminders, and completion tracking.",
    icon: FiCheckSquare, path: "/dashboard/todo",
    accent: "#059669", iconBg: "#ECFDF5", iconColor: "#059669",
  },
  {
    title: "RFP Estimation", subtitle: "Proposal & Costing",
    text: "Prepare accurate project estimations, proposals and resource planning for client requirements.",
    icon: FiFileText, path: "/dashboard/rfp",
    accent: "#DC2626", iconBg: "#FEF2F2", iconColor: "#DC2626",
  },
  {
    title: "Projects", subtitle: "Project Management",
    text: "Monitor ongoing projects, manage workflows and collaborate with teams in one workspace.",
    icon: FiFolder, path: "/dashboard/projects",
    accent: "#0891B2", iconBg: "#ECFEFF", iconColor: "#0891B2",
  },
  {
    title: "Timesheet", subtitle: "Work Hour Management",
    text: "Log working hours, manage employee timesheets and track productivity effectively.",
    icon: FiClock, path: "/dashboard/timesheet",
    accent: "#0284C7", iconBg: "#F0F9FF", iconColor: "#0284C7",
  },
  {
    title: "Quality Assurance", subtitle: "Testing & Validation",
    text: "Ensure software quality through systematic testing, issue tracking and compliance validation.",
    icon: FiSearch, path: "/dashboard/qa",
    accent: "#7C3AED", iconBg: "#F5F3FF", iconColor: "#7C3AED",
  },
  {
    title: "Final Resource", subtitle: "Source & Delivery Hub",
    text: "Centralize, manage and track all finalized project sources and delivery files efficiently.",
    icon: FiUsers, path: "/dashboard/final-resource",
    accent: "#4F46E5", iconBg: "#EEF2FF", iconColor: "#4F46E5",
  },
  {
    title: "Settings", subtitle: "Account & Preferences",
    text: "Manage your account settings, notification preferences and security options.",
    icon: FiSettings, path: "/dashboard/settings",
    accent: "#DB2777", iconBg: "#FDF2F8", iconColor: "#DB2777",
  },
];

function Modules() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail") || "employee@colan.com";
  const rawName = email.split("@")[0];
  const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase();
  const initials = rawName.slice(0, 2).toUpperCase();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return modules;
    return modules.filter((m) =>
      m.title.toLowerCase().includes(q) ||
      m.subtitle.toLowerCase().includes(q) ||
      m.text.toLowerCase().includes(q)
    );
  }, [query]);

  const handleOpenModule = (mod) => {
    navigate(mod.path);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F0F4FF", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── HEADER ── */
        .hdr {
          position: sticky; top: 0; z-index: 100;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid #E8EDF5;
          box-shadow: 0 1px 4px rgba(15,23,42,0.05);
        }
        .hdr-inner {
          max-width: 1400px; margin: 0 auto;
          height: 64px;
          padding: 0 32px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px;
        }

        /* Left logo area */
        .hdr-left {
          display: flex; align-items: center;
          gap: 0; min-width: 0; flex-shrink: 1;
        }
        .hdr-logo-wrap {
          display: flex; align-items: center; gap: 10px; flex-shrink: 0;
        }
        .hdr-brand-text { display: block; }
        .hdr-divider {
          width: 1px; height: 22px; background: #E8EDF5;
          margin: 0 16px; flex-shrink: 0;
        }
        .hdr-date {
          display: flex; align-items: center; gap: 6px; white-space: nowrap;
        }

        /* Right actions */
        .hdr-right {
          display: flex; align-items: center;
          gap: 10px; flex-shrink: 0;
        }
        .hdr-user {
          display: flex; align-items: center; gap: 9px;
        }
        .hdr-user-text { display: block; }

        /* Notification button */
        .notif-btn {
          position: relative;
          width: 38px; height: 38px; border-radius: 10px;
          border: 1px solid #E8EDF5; background: transparent;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.16s ease; flex-shrink: 0;
        }
        .notif-btn:hover { background: #F1F5FF; border-color: #C7D2FE; }

        /* Avatar */
        .avatar {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, #2563EB 0%, #4F46E5 100%);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700; color: #fff;
          flex-shrink: 0;
          box-shadow: 0 3px 10px rgba(37,99,235,0.28);
        }

        /* Logout */
        .logout-btn {
          height: 36px; padding: 0 14px; border-radius: 9px;
          border: 1px solid #FECACA; background: #FFF5F5; color: #DC2626;
          display: flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 600; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.16s; white-space: nowrap; flex-shrink: 0;
        }
        .logout-btn:hover { background: #FEE2E2; border-color: #FCA5A5; }
        .logout-text { display: inline; }

        /* ── HERO ── */
        .hero {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #EEF2FF 0%, #E8F0FE 45%, #EAF9FF 100%);
          border-bottom: 1px solid #DDE5F6;
          padding: 40px 32px 44px;
        }
        .hero-wave {
          position: absolute; top: 0; right: 0;
          width: 55%; height: 100%;
          pointer-events: none; z-index: 0;
        }
        .glow-1 {
          position: absolute; top: -80px; right: 5%;
          width: 320px; height: 320px; border-radius: 50%;
          background: radial-gradient(circle, rgba(196,210,255,0.5) 0%, transparent 68%);
          pointer-events: none;
        }
        .glow-2 {
          position: absolute; bottom: -60px; left: 28%;
          width: 220px; height: 220px; border-radius: 50%;
          background: radial-gradient(circle, rgba(147,234,252,0.28) 0%, transparent 65%);
          pointer-events: none;
        }
        .float-card {
          background: #fff; border: 1.5px solid #E8EDF5; border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 6px 20px rgba(15,23,42,0.09); position: absolute;
        }
        .ws-pill {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 5px 14px; border-radius: 100px;
          background: rgba(255,255,255,0.75); border: 1px solid #C7D2FE;
          font-size: 11px; font-weight: 700; color: #2563EB;
          letter-spacing: 0.09em; text-transform: uppercase; margin-bottom: 16px;
        }
        .ws-pill-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #2563EB;
          animation: pDot 2s ease infinite;
        }
        @keyframes pDot { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

        /* ── CARDS ── */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .mod-card {
          background: #ffffff; border-radius: 16px; border: 1px solid #E4E9F4;
          padding: 22px 24px 20px; cursor: pointer; text-align: left; width: 100%;
          display: flex; flex-direction: column;
          box-shadow: 0 1px 3px rgba(15,23,42,0.04);
          transition: transform 0.22s cubic-bezier(0.34,1.35,0.64,1),
            box-shadow 0.22s ease, border-color 0.22s ease;
          opacity: 0; transform: translateY(16px);
          animation: cardIn 0.45s cubic-bezier(0.34,1.2,0.64,1) forwards;
        }
        @keyframes cardIn { to { opacity: 1; transform: translateY(0); } }
        .mod-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 32px -4px rgba(15,23,42,0.11), 0 4px 10px -2px rgba(15,23,42,0.06);
          border-color: #C7D2FE;
        }
        .card-icon {
          width: 46px; height: 46px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          transition: transform 0.22s cubic-bezier(0.34,1.4,0.64,1);
        }
        .mod-card:hover .card-icon { transform: scale(1.08) rotate(-3deg); }
        .card-divider {
          height: 1px; background: #F1F5F9; margin-bottom: 14px;
          transition: background 0.2s;
        }
        .mod-card:hover .card-divider { background: #DBEAFE; }
        .open-label {
          font-size: 13px; font-weight: 700;
          display: flex; align-items: center; gap: 6px;
          transition: gap 0.18s ease;
        }
        .mod-card:hover .open-label { gap: 10px; }
        .open-arrow { transition: transform 0.2s cubic-bezier(0.34,1.4,0.64,1); }
        .mod-card:hover .open-arrow { transform: translateX(4px); }

        /* ── RESPONSIVE BREAKPOINTS ── */

        /* Tablet: ≤ 900px */
        @media (max-width: 900px) {
          .hdr-inner { padding: 0 20px; height: 60px; }
          .hdr-divider { margin: 0 12px; }
          .cards-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .hero { padding: 28px 20px 36px; }
          .hero-wave { width: 45%; }
          .float-card { display: none; } /* hide floaters on tablet */
        }

        /* Mobile: ≤ 600px */
        @media (max-width: 600px) {
          /* Header: tighter, avatar-only user, icon-only logout */
          .hdr-inner { padding: 0 14px; height: 56px; gap: 8px; }
          .hdr-brand-text { display: none; }       /* hide "COLAN INFOTECH" text */
          .hdr-divider { display: none; }           /* hide divider */
          .hdr-date { display: none; }              /* hide date */
          .hdr-user-text { display: none; }         /* hide name + email */
          .logout-text { display: none; }           /* hide "Logout" word */
          .logout-btn {
            width: 36px; height: 36px; padding: 0;
            justify-content: center; border-radius: 10px;
          }
          .notif-btn { width: 34px; height: 34px; }
          .hdr-right { gap: 6px; }

          /* Hero */
          .hero { padding: 22px 16px 28px; }
          .hero-wave { display: none; }
          .glow-1, .glow-2 { display: none; }

          /* Cards: single column */
          .cards-grid { grid-template-columns: 1fr; gap: 12px; }
        }

        /* Extra small: ≤ 380px */
        @media (max-width: 380px) {
          .hdr-inner { padding: 0 10px; }
          .avatar { width: 32px; height: 32px; font-size: 11px; border-radius: 8px; }
        }
      `}</style>

      {/* ─── HEADER ─── */}
      <header className="hdr">
        <div className="hdr-inner">

          {/* LEFT: Logo + divider + date */}
          <div className="hdr-left">
            <div className="hdr-logo-wrap">
              <img src={colanLogo} alt="Colan Infotech logo" style={{ width: 34, height: 34, objectFit: "contain" }} />
              <div className="hdr-brand-text">
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", lineHeight: 1.2, letterSpacing: "0.02em" }}>
                  COLAN INFOTECH
                </div>
                <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500 }}>
                  Timesheet Workspace
                </div>
              </div>
            </div>

            <div className="hdr-divider" />

            <div className="hdr-date">
              <FiSun size={13} style={{ color: "#F59E0B" }} />
              <span style={{ fontSize: 13, color: "#64748B", fontWeight: 500 }}>{today}</span>
            </div>
          </div>

          {/* RIGHT: bell + user + logout */}
          <div className="hdr-right">
            <button className="notif-btn" aria-label="Notifications">
              <FiBell size={16} style={{ color: "#64748B" }} />
            </button>

            <div className="hdr-user">
              <div className="avatar">{initials}</div>
              <div className="hdr-user-text">
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", textTransform: "capitalize", lineHeight: 1.2 }}>
                  {displayName}
                </div>
                <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500 }}>{email}</div>
              </div>
            </div>

            <button className="logout-btn" onClick={handleLogout} aria-label="Logout">
              <FiLogOut size={13} />
              <span className="logout-text">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <div className="hero">
        <div className="glow-1" />
        <div className="glow-2" />

        {/* Wave SVG */}
        <div className="hero-wave">
          <svg viewBox="0 0 700 300" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%" }}>
            <path d="M0 160 C80 100 150 210 240 155 C330 100 390 200 480 148 C550 108 610 170 700 130"
              stroke="#C7D2FE" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M0 195 C90 140 170 230 260 180 C350 130 420 220 510 168 C575 128 630 185 700 155"
              stroke="#BAE6FD" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.7" />
            <path d="M0 230 C100 180 190 255 280 210 C370 165 450 240 540 195 C600 165 650 205 700 185"
              stroke="#DDD6FE" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
          </svg>
        </div>

        {/* Floating emoji cards — hidden on mobile/tablet via CSS */}
        <div className="float-card" style={{ width: 58, height: 58, top: 28, right: 340, fontSize: 26, transform: "rotate(-5deg)" }}>📊</div>
        <div className="float-card" style={{ width: 50, height: 50, top: 70, right: 255, fontSize: 22, transform: "rotate(4deg)" }}>✅</div>
        <div className="float-card" style={{ width: 50, height: 50, top: 18, right: 185, fontSize: 22, transform: "rotate(-3deg)" }}>📅</div>
        <div className="float-card" style={{ width: 50, height: 50, top: 75, right: 110, fontSize: 22, transform: "rotate(6deg)" }}>📁</div>

        {/* Content */}
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div className="ws-pill">
            <div className="ws-pill-dot" />
            Workspace
          </div>

          <h1 style={{
            fontSize: "clamp(22px, 4vw, 42px)",
            fontWeight: 800, color: "#111827",
            lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 10,
          }}>
            Choose your module
          </h1>

          <p style={{
            fontSize: "clamp(13px, 2vw, 15px)",
            color: "#64748B", fontWeight: 400,
            lineHeight: 1.65, maxWidth: 560, marginBottom: 12,
          }}>
            Select a section to continue your daily workflow and manage productivity efficiently.
          </p>

          {/* Search */}
          <div style={{ marginTop: 8, maxWidth: 520 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1, position: "relative" }}>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search modules, e.g. 'timesheet'"
                  aria-label="Search modules"
                  style={{
                    width: "100%", padding: "10px 12px",
                    borderRadius: 10, border: "1px solid #E6EEF8",
                    background: "#fff",
                    boxShadow: "inset 0 1px 0 rgba(15,23,42,0.02)",
                    fontSize: 14, color: "#0F172A",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                />
              </div>
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="logout-btn"
                  aria-label="Clear search"
                  style={{ height: 40 }}
                >
                  <span className="logout-text">Clear</span>
                  <span style={{ display: "none" }} className="logout-text-hidden">✕</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── GRID ─── */}
      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 16px 56px" }}>
        <div
          className="cards-grid"
          style={{ padding: "0 clamp(0px, 2vw, 12px)" }}
          role="list"
          aria-label="Available modules"
        >
          {filtered.length === 0 && (
            <div style={{ gridColumn: "1/-1", padding: 28, background: "#fff", borderRadius: 12, border: "1px solid #E6EEF8" }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>No modules found</div>
              <div style={{ color: "#64748B" }}>Try a different search term or clear the filter.</div>
            </div>
          )}

          {filtered.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <button
                key={mod.title}
                className="mod-card"
                onClick={() => handleOpenModule(mod)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleOpenModule(mod); }
                }}
                style={{ animationDelay: `${i * 0.055}s` }}
                role="listitem"
                aria-label={`Open ${mod.title} module`}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <div className="card-icon" style={{ background: mod.iconBg }} aria-hidden="true">
                    <Icon size={20} style={{ color: mod.iconColor }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", lineHeight: 1.25, marginBottom: 2 }}>
                      {mod.title}
                    </div>
                    <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500, lineHeight: 1.4 }}>
                      {mod.subtitle}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: 13.5, color: "#64748B", lineHeight: 1.7, fontWeight: 400, flex: 1, marginBottom: 16 }}>
                  {mod.text}
                </p>

                <div className="card-divider" />

                <div className="open-label" style={{ color: mod.accent }}>
                  <span>Open Module</span>
                  <span className="open-arrow"><FiArrowRight size={14} /></span>
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Modules;