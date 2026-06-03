import { Outlet, NavLink, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const subNavItems = {
  tasks: [
    { name: "List View",     path: "/dashboard/tasks" },
    { name: "Calendar View", path: "/dashboard/tasks/calendar" },
  ],
  todo: [
    { name: "List View",     path: "/dashboard/todo" },
    { name: "Calendar View", path: "/dashboard/todo/calendar" },
    { name: "Add To-Do",     path: "/dashboard/todo/add" },
  ],
  timesheet: [
    { name: "View Timesheet",     path: "/dashboard/timesheet" },
    { name: "Timesheet Approval", path: "/dashboard/timesheet/timesheetapproval" },
    { name: "Edit Request",       path: "/dashboard/timesheet/edit-request" },
    { name: "Client Approval",    path: "/dashboard/timesheet/clienttimesheet" },
  ],
  "final-resource": [
    { name: "Resource List", path: "/dashboard/final-resource" },
    { name: "Add Resource",  path: "/dashboard/final-resource/add" },
  ],
  settings : [
    {name : "Employee basic details", path : "/dashboard/settings"},
    {name : "Qualification", path : "/dashboard/qualification"},
    {name : "Personal", path : "/dashboard/personal"},
    {name : "Address", path : "/dashboard/address"},
    {name : "Account Settings", path : "/dashboard/account-settings"},
  ]
};

/* Page titles map — shown in the topbar */
const pageTitles = {
  dashboard:        { title: "Dashboard",  sub: "Welcome back" },
  tasks:            { title: "Tasks",      sub: "Manage your work" },
  todo:             { title: "To-Do",      sub: "Your personal checklist" },
  rfp:              { title: "RFP",        sub: "Requests for proposal" },
  projects:         { title: "Projects",   sub: "All active projects" },
  timesheet:        { title: "Timesheet",  sub: "Track your hours" },
  qa:               { title: "QA",         sub: "Quality assurance" },
  "final-resource": { title: "Resources",  sub: "Team & resource directory" },
};

function Topbar() {
  const location = useLocation();
  const segment  = location.pathname.split("/")[2] || "dashboard";
  const page     = pageTitles[segment] || { title: segment, sub: "" };

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
        .ci-topbar-left {}
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
      `}</style>

      <div className="ci-topbar-left">
        <div className="ci-topbar-title">{page.title}</div>
        <div className="ci-topbar-sub">{page.sub}</div>
      </div>

      <div className="ci-topbar-right">
        <span className="ci-topbar-pill">
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
          Internal Portal
        </span>
        <span className="ci-topbar-date">
          {new Date().toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
        </span>
      </div>
    </div>
  );
}

function SubNavbar() {
  const location   = useLocation();
  const currentPage = location.pathname.split("/")[2];
  const tabs        = subNavItems[currentPage];

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
        .ci-subnav::-webkit-scrollbar { display: none; }

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

function DashboardLayout() {
  return (
    <div className="ci-layout">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

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
      `}</style>

      <Sidebar />

      <div className="ci-main-area">
        <Topbar />
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