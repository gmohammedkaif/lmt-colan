import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiCheckSquare,
  FiList,
  FiFolder,
  FiClock,
  FiFileText,
  FiShield,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";
import colanlogo from '../../assets/colonLogo.webp';

const menuItems = [
  { name: "Dashboard",      path: "/dashboard",                    icon: FiHome,        accent: "#2563eb" },
  { name: "Task",           path: "/dashboard/tasks",              icon: FiList,        accent: "#7c3aed" },
  { name: "To-Do",          path: "/dashboard/todo",               icon: FiCheckSquare, accent: "#0891b2" },
  { name: "RFP",            path: "/dashboard/rfp",                icon: FiFileText,    accent: "#d97706" },
  { name: "Project",        path: "/dashboard/projects",           icon: FiFolder,      accent: "#16a34a" },
  { name: "View Timesheet", path: "/dashboard/timesheet",          icon: FiClock,       accent: "#dc2626" },
  { name: "QA",             path: "/dashboard/qa",                 icon: FiShield,      accent: "#9333ea" },
  { name: "Final source List",   path: "/dashboard/final-resource",     icon: FiUsers,       accent: "#0284c7" },
];

function Sidebar() {
  const navigate = useNavigate();
  
  // User data logic (moved from navbar)
  const email = localStorage.getItem("userEmail") || "employee@colan.com";
  const name = email.split("@")[0];
  const initials = name.slice(0, 2).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <aside className="w-[230px] min-h-screen flex flex-col hidden lg:flex" style={{ background: "#ffffff", borderRight: "1px solid #e5e7eb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .colan-sidebar * { font-family: 'Plus Jakarta Sans', sans-serif; }

        .colan-logo-ring {
          position: relative;
          width: 38px; height: 38px;
          border-radius: 12px;
          overflow: hidden;
        }
        .colan-logo-ring img {
          width: 100%; height: 100%;
          object-fit: contain;
        }

        /* Nav item */
        .colan-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border-radius: 10px;
          text-decoration: none;
          color: #64748b;
          font-size: 13px;
          font-weight: 500;
          transition: background 0.15s, color 0.15s;
          position: relative;
          cursor: pointer;
        }
        .colan-nav-item:hover {
          background: #f1f5f9;
          color: #1e293b;
        }
        .colan-nav-item:hover .colan-icon-wrap {
          transform: scale(1.08);
        }
        .colan-nav-item.active {
          background: #eff6ff;
          color: #1d4ed8;
          font-weight: 600;
        }
        .colan-nav-item.active .colan-active-bar {
          opacity: 1;
        }

        .colan-icon-wrap {
          width: 30px; height: 30px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.15s;
          flex-shrink: 0;
        }

        .colan-active-bar {
          position: absolute;
          left: 0; top: 50%;
          transform: translateY(-50%);
          width: 3px; height: 60%;
          border-radius: 0 3px 3px 0;
          background: #2563eb;
          opacity: 0;
          transition: opacity 0.15s;
        }

        .colan-section-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #94a3b8;
          padding: 0 10px;
          margin-bottom: 4px;
          margin-top: 8px;
        }

        .colan-divider {
          height: 1px;
          background: #f1f5f9;
          margin: 8px 0;
        }

        /* ── Profile Card Styles ── */
        .colan-profile-card {
          background: linear-gradient(145deg, #f8fafc, #f1f5f9);
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 14px;
          margin-top: 12px;
          position: relative;
          overflow: hidden;
        }
        .colan-profile-card::before {
          content: '';
          position: absolute;
          top: -20px; right: -20px;
          width: 60px; height: 60px;
          background: radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%);
          border-radius: 50%;
        }

        .colan-avatar {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 13px; font-weight: 700;
          box-shadow: 0 4px 12px rgba(37,99,235,0.25);
          position: relative;
        }

        .colan-status-dot {
          position: absolute;
          bottom: -1px; right: -1px;
          width: 10px; height: 10px;
          background: #10b981;
          border-radius: 50%;
          border: 2px solid #f1f5f9;
        }

        .colan-logout-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          padding: 8px;
          margin-top: 12px;
          borderRadius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #ffffff;
          color: #64748b;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .colan-logout-btn:hover {
          background: #fef2f2;
          border-color: #fecaca;
          color: #ef4444;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.1);
        }
        .colan-logout-btn:hover .logout-icon {
          transform: translateX(-2px);
        }
        .logout-icon {
          transition: transform 0.2s ease;
        }
      `}</style>

      <div className="colan-sidebar flex flex-col h-full px-3 py-5">

        {/* ── Logo (Unchanged) ── */}
        <div className="flex items-center gap-3 px-2 mb-6">
          <div className="colan-logo-ring">
            <img src={colanlogo} alt="Colan Logo" />
          </div>
          <div>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 14, color: "#0f172a", lineHeight: 1.2 }}>
              COLAN
            </p>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 9, color: "#2563eb", letterSpacing: "0.18em" }}>
              INFOTECH
            </p>
          </div>
        </div>

        <div className="colan-divider" />

        {/* ── Navigation (Unchanged) ── */}
        <div className="mt-2 flex-1 overflow-y-auto">
          <p className="colan-section-label">Navigation</p>
          <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/dashboard"}
                  className={({ isActive }) =>
                    `colan-nav-item${isActive ? " active" : ""}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="colan-active-bar" />
                      <span
                        className="colan-icon-wrap"
                        style={{
                          background: isActive
                            ? `${item.accent}18`
                            : "#f8fafc",
                        }}
                      >
                        <Icon
                          size={14}
                          style={{ color: isActive ? item.accent : "#94a3b8" }}
                        />
                      </span>
                      <span>{item.name}</span>
                      {isActive && (
                        <span style={{
                          marginLeft: "auto",
                          width: 6, height: 6,
                          borderRadius: "50%",
                          background: item.accent,
                          flexShrink: 0,
                        }} />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* ══════════ NEW BOTTOM PROFILE SECTION ══════════ */}
        <div className="mt-auto">
          <div className="colan-divider" />
          
          <div className="colan-profile-card">
            <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative", zIndex: 1 }}>
              <div className="colan-avatar">
                {initials}
                <span className="colan-status-dot" />
              </div>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", lineHeight: 1.3, textTransform: "capitalize", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {name}
                </p>
                <p style={{ fontSize: 10.5, color: "#94a3b8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {email}
                </p>
              </div>
            </div>
            
            <button className="colan-logout-btn" onClick={handleLogout}>
              <FiLogOut size={13} className="logout-icon" />
              Sign Out
            </button>
          </div>
        </div>

      </div>
    </aside>
  );
}

export default Sidebar;