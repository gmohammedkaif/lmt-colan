import { useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { FiMenu, FiX, FiChevronLeft } from "react-icons/fi";

const subNavItems = {
  tasks: [
    { name: "List View", path: "/dashboard/tasks" },
    { name: "Calendar View", path: "/dashboard/tasks/calendar" },
  ],
  todo: [
    { name: "List View", path: "/dashboard/todo" },
    { name: "Calendar View", path: "/dashboard/todo/calendar" },
    { name: "Add To-Do", path: "/dashboard/todo/add" },
  ],
  timesheet: [
    { name: "View Timesheet", path: "/dashboard/timesheet" },
    { name: "Timesheet Approval", path: "/dashboard/timesheet/timesheetapproval" },
    { name: "Timesheet Edit Request", path: "/dashboard/timesheet/edit-request" },
    { name: "Client Timesheet List", path: "/dashboard/timesheet/clienttimesheet" },
  ],
  "final-resource": [
    { name: "Final Source List", path: "/dashboard/final-resource" },
    { name: "Add Final Source", path: "/dashboard/final-resource/add" },
  ],
  settings: [
    { name: "Employee basic details", path: "/dashboard/settings" },
    { name: "Qualification", path: "/dashboard/qualification" },
    { name: "Personal", path: "/dashboard/personal" },
    { name: "Address", path: "/dashboard/address" },
    { name: "Account Settings", path: "/dashboard/account-settings" },
  ],
};

const pageTitles = {
  dashboard: { title: "Dashboard", sub: "Welcome back" },
  tasks: { title: "Tasks", sub: "Manage your work" },
  todo: { title: "To-Do", sub: "Your personal checklist" },
  rfp: { title: "RFP", sub: "Requests for proposal" },
  projects: { title: "Projects", sub: "All active projects" },
  timesheet: { title: "Timesheet", sub: "Track your hours" },
  qa: { title: "QA", sub: "Quality assurance" },
  "final-resource": { title: "Resources", sub: "Team & resource directory" },
  settings: { title: "Settings", sub: "Manage employee profile" },
  qualification: { title: "Settings", sub: "Manage employee qualification" },
  personal: { title: "Settings", sub: "Manage personal details" },
  address: { title: "Settings", sub: "Manage address details" },
  "account-settings": { title: "Settings", sub: "Manage account settings" },
};

const settingsRoutes = [
  "settings",
  "qualification",
  "personal",
  "address",
  "account-settings",
];

// Pages where back button should appear (not the root dashboard)
const pagesWithBack = [
  "tasks", "todo", "rfp", "projects", "timesheet", "qa",
  "final-resource", "settings", "qualification", "personal",
  "address", "account-settings",
];

function Topbar({ onMenuOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const segment = location.pathname.split("/")[2] || "dashboard";
  const page = pageTitles[segment] || { title: segment, sub: "" };
  const showBack = pagesWithBack.includes(segment);

  return (
    <div className="ci-topbar">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        .ci-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          height: 58px;
          background: #ffffff;
          border-bottom: 1px solid #f8fafc;
          flex-shrink: 0;
          font-family: 'DM Sans', sans-serif;
        }

        .ci-topbar-left {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .ci-topbar-title {
          font-size: 17px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1;
        }

        .ci-topbar-sub {
          font-size: 12px;
          color: #94a3b8;
          margin-top: 3px;
        }

        .ci-topbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .ci-topbar-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 500;
          color: #64748b;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 4px 12px;
        }

        .ci-topbar-date {
          font-size: 12px;
          color: #94a3b8;
        }

        .ci-hamburger-btn {
          display: none;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          cursor: pointer;
          color: #64748b;
          flex-shrink: 0;
        }

        .ci-back-btn {
          display: none;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 9px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          cursor: pointer;
          color: #64748b;
          flex-shrink: 0;
          transition: background 0.15s, color 0.15s;
        }

        .ci-back-btn:hover {
          background: #eff6ff;
          color: #1d4ed8;
          border-color: #bfdbfe;
        }

        @media (max-width: 1023px) {
          .ci-topbar {
            padding: 0 16px;
          }

          .ci-topbar-date {
            display: none;
          }

          .ci-hamburger-btn {
            display: flex;
          }

          .ci-back-btn {
            display: flex;
          }
        }
      `}</style>

      <div className="ci-topbar-left">
        {/* Hamburger — always shown on mobile */}
        <button
          className="ci-hamburger-btn"
          onClick={onMenuOpen}
          aria-label="Open navigation"
        >
          <FiMenu size={18} />
        </button>

        {/* Back button — shown on inner pages on mobile */}
        {showBack && (
          <button
            className="ci-back-btn"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <FiChevronLeft size={18} />
          </button>
        )}

        <div>
          <div className="ci-topbar-title">{page.title}</div>
          <div className="ci-topbar-sub">{page.sub}</div>
        </div>
      </div>

      <div className="ci-topbar-right">
        <span className="ci-topbar-pill">
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#22c55e",
              display: "inline-block",
            }}
          />
          Internal Portal
        </span>

        <span className="ci-topbar-date">
          {new Date().toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}

function SubNavbar() {
  const location = useLocation();
  const segment = location.pathname.split("/")[2];

  const currentPage = settingsRoutes.includes(segment) ? "settings" : segment;
  const tabs = subNavItems[currentPage];

  if (!tabs) return null;

  return (
    <div className="ci-subnav-wrap">
      <style>{`
        .ci-subnav-wrap {
          padding: 16px 24px 0;
          font-family: 'DM Sans', sans-serif;
        }

        .ci-subnav {
          display: flex;
          align-items: center;
          gap: 2px;
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 10px;
          padding: 4px;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .ci-subnav::-webkit-scrollbar {
          display: none;
        }

        .ci-tab {
          display: inline-flex;
          align-items: center;
          padding: 7px 16px;
          border-radius: 7px;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          text-decoration: none;
          transition: background 0.15s, color 0.15s, box-shadow 0.15s;
          color: #64748b;
        }

        .ci-tab:hover {
          background: #ffffff;
          color: #0f172a;
        }

        .ci-tab.active {
          background: #ffffff;
          color: #0f172a;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.06);
          font-weight: 600;
        }

        @media (max-width: 640px) {
          .ci-subnav-wrap {
            padding: 12px 16px 0;
          }

          .ci-tab {
            padding: 7px 12px;
            font-size: 12px;
          }
        }
      `}</style>

      <div className="ci-subnav">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end
            className={({ isActive }) => `ci-tab${isActive ? " active" : ""}`}
          >
            {tab.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

// Mobile sidebar drawer overlay
function MobileDrawer({ open, onClose }) {
  return (
    <>
      <style>{`
        .ci-mobile-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: rgba(15,23,42,0.45);
          backdrop-filter: blur(2px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .ci-mobile-overlay.open {
          opacity: 1;
          pointer-events: all;
        }
        .ci-mobile-drawer {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 201;
          width: 260px;
          background: #ffffff;
          border-right: 1px solid #f1f5f9;
          transform: translateX(-100%);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
        }
        .ci-mobile-drawer.open {
          transform: translateX(0);
        }
        .ci-mobile-close-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #64748b;
          z-index: 1;
        }
        .ci-mobile-close-btn:hover {
          background: #fee2e2;
          color: #dc2626;
          border-color: #fecaca;
        }
        @media (min-width: 1024px) {
          .ci-mobile-overlay,
          .ci-mobile-drawer {
            display: none !important;
          }
        }
      `}</style>

      {/* Backdrop */}
      <div
        className={`ci-mobile-overlay${open ? " open" : ""}`}
        onClick={onClose}
      />

      {/* Drawer — reuses Sidebar content but inline */}
      <div className={`ci-mobile-drawer${open ? " open" : ""}`}>
        <button className="ci-mobile-close-btn" onClick={onClose} aria-label="Close menu">
          <FiX size={16} />
        </button>
        {/* Render Sidebar inside drawer; it will render its full content */}
        <Sidebar mobileMode onLinkClick={onClose} />
      </div>
    </>
  );
}

function DashboardLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="ci-layout">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .ci-layout {
          height: 100vh;
          overflow: hidden;
          background: #f8fafc;
          display: flex;
          font-family: 'DM Sans', sans-serif;
        }

        .ci-sidebar {
          height: 100vh;
          position: sticky;
          top: 0;
          flex-shrink: 0;
        }

        .ci-main-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100vh;
          min-width: 0;
          overflow: hidden;
        }

        .ci-page-content {
          flex: 1;
          padding: 24px;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: thin;
          scrollbar-color: #CBD5E1 transparent;
        }

        .ci-page-content::-webkit-scrollbar {
          width: 8px;
        }

        .ci-page-content::-webkit-scrollbar-thumb {
          background: #CBD5E1;
          border-radius: 999px;
        }

        .ci-page-content::-webkit-scrollbar-thumb:hover {
          background: #94A3B8;
        }

        .ci-content-container {
          width: 100%;
          max-width: 1480px;
          margin: 0 auto;
        }

        @media (max-width: 640px) {
          .ci-page-content {
            padding: 16px;
          }
        }
      `}</style>

      {/* Desktop sidebar — hidden on mobile via Sidebar's own hidden lg:flex */}
      <Sidebar />

      {/* Mobile drawer */}
      <MobileDrawer open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div className="ci-main-area">
        <Topbar onMenuOpen={() => setMobileNavOpen(true)} />
        <SubNavbar />

        <main className="ci-page-content">
          <div className="ci-content-container">
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default DashboardLayout;
