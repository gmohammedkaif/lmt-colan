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
   FiSettings 
} from "react-icons/fi";
import colanlogo from '../../assets/colan-login-logo.png';

const menuItems = [
  { name: "Dashboard",      path: "/dashboard",                    icon: FiHome,        accent: "#2563eb" },
  { name: "Task",           path: "/dashboard/tasks",              icon: FiList,        accent: "#7c3aed" },
  { name: "To-Do",          path: "/dashboard/todo",               icon: FiCheckSquare, accent: "#0891b2" },
  { name: "RFP",            path: "/dashboard/rfp",                icon: FiFileText,    accent: "#d97706" },
  { name: "Project",        path: "/dashboard/projects",           icon: FiFolder,      accent: "#16a34a" },
  { name: "View Timesheet", path: "/dashboard/timesheet",          icon: FiClock,       accent: "#dc2626" },
  { name: "QA",             path: "/dashboard/qa",                 icon: FiShield,      accent: "#9333ea" },
  { name: "Final source List",   path: "/dashboard/final-resource",icon: FiUsers,       accent: "#0284c7" },
  { name: "Settings",   path: "/dashboard/settings",               icon:  FiSettings,       accent: "#808080" },
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
   <aside
  className="ci-sidebar hidden lg:flex"
  style={{
    width: "240px",
    height: "100vh",
    background: "#FFFFFF",
    borderRight: "1px solid #F1F5F9",
    flexDirection: "column",
    flexShrink: 0,
  }}
>
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

    .ci-sidebar * {
      font-family: 'DM Sans', sans-serif;
      box-sizing: border-box;
    }

    .ci-sidebar-scroll {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 0 14px;
    }

    .ci-sidebar-scroll::-webkit-scrollbar {
      width: 6px;
    }

    .ci-sidebar-scroll::-webkit-scrollbar-thumb {
      background: transparent;
      border-radius: 999px;
    }

    .ci-sidebar-scroll:hover::-webkit-scrollbar-thumb {
      background: #E2E8F0;
    }

    /* LOGO */
    .ci-sidebar-logo {
      // height: 80px;
      padding-top : 15px;
    }

    .ci-sidebar-logo img {
      width: 210px;
      height: 34px;
      object-fit: contain;
      flex-shrink: 0;
    }

    .ci-sidebar-brand {
      min-width: 0;
    }

    .ci-sidebar-brand h2 {
      font-size: 13px;
      font-weight: 700;
      color: #0F172A;
      line-height: 1.2;
      letter-spacing: 0.04em;
    }

    .ci-sidebar-brand p {
      font-size: 10px;
      color: #94A3B8;
      margin-top: 2px;
      letter-spacing: 0.08em;
    }

    /* SECTION LABEL */
    .ci-sidebar-label {
      font-size: 10px;
      font-weight: 700;
      color: #94A3B8;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin: 20px 10px 10px;
    }

    /* NAV ITEM */
    .ci-nav-item {
      display: flex;
      align-items: center;
      gap: 12px;

      height: 42px;

      padding: 0 12px;

      border-radius: 12px;

      text-decoration: none;

      color: #64748B;

      font-size: 13px;
      font-weight: 500;

      transition:
        background 0.15s ease,
        color 0.15s ease;
    }

    .ci-nav-item:hover {
      background: #F8FAFC;
      color: #0F172A;
    }

    .ci-nav-item.active {
      background: #EFF6FF;
      color: #1D4ED8;
      font-weight: 600;
    }

    .ci-nav-icon {
      width: 28px;
      height: 28px;

      border-radius: 8px;

      display: flex;
      align-items: center;
      justify-content: center;

      flex-shrink: 0;

      background: #F8FAFC;

      transition: background 0.15s ease;
    }

    .ci-nav-item.active .ci-nav-icon {
      background: rgba(37,99,235,0.12);
    }

    /* PROFILE */
    .ci-sidebar-profile {
      height: 74px;

      border-top: 1px solid #F8FAFC;

      padding: 0 16px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      flex-shrink: 0;
    }

    .ci-profile-left {
      display: flex;
      align-items: center;
      gap: 10px;

      min-width: 0;
    }

    .ci-avatar {
      width: 36px;
      height: 36px;

      border-radius: 10px;

      background: #DBEAFE;

      color: #1D4ED8;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 13px;
      font-weight: 700;

      flex-shrink: 0;
    }

    .ci-profile-info {
      min-width: 0;
    }

    .ci-profile-info h4 {
      font-size: 12px;
      font-weight: 700;
      color: #0F172A;
      line-height: 1.2;

      text-transform: capitalize;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ci-profile-info p {
      font-size: 10px;
      color: #94A3B8;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* LOGOUT BUTTON */
    .ci-logout-btn {
      width: 34px;
      height: 34px;

      border-radius: 10px;

      border: none;

      background: transparent;

      display: flex;
      align-items: center;
      justify-content: center;

      cursor: pointer;

      transition:
        background 0.15s ease,
        color 0.15s ease;
    }

    .ci-logout-btn:hover {
      background: #FEF2F2;
      color: #DC2626;
    }
  `}</style>

  {/* LOGO */}
  <div className="ci-sidebar-logo">
    <img src={colanlogo} alt="logo" />
  </div>

  {/* NAVIGATION */}
  <div className="ci-sidebar-scroll">
    <div className="ci-sidebar-label">
      Navigation
    </div>

    <nav
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/dashboard"}
            className={({ isActive }) =>
              `ci-nav-item${isActive ? " active" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                <span className="ci-nav-icon">
                  <Icon
                    size={15}
                    color={
                      isActive
                        ? item.accent
                        : "#94A3B8"
                    }
                  />
                </span>

                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  </div>

  {/* PROFILE */}
  <div className="ci-sidebar-profile">
    <div className="ci-profile-left">
      <div className="ci-avatar">
        {initials}
      </div>

      <div className="ci-profile-info">
        <h4>{name}</h4>
        <p>{email}</p>
      </div>
    </div>

    <button
      className="ci-logout-btn"
      onClick={handleLogout}
    >
      <FiLogOut
        size={16}
        color="#64748B"
      />
    </button>
  </div>
</aside>
  );
}

export default Sidebar;