import { Outlet, NavLink, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
// import FinalSourceList from "../../pages/dashboard/FinalSourceList";

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
    { name: "Timesheet Approval", path: "/dashboard/timesheet/approval" },
    { name: "Timesheet Edit Request", path: "/dashboard/timesheet/edit-request" },
    { name: "Client Timesheet Approval", path: "/dashboard/timesheet/ClientTimesheet" },
  ],
  "final-resource": [
    { name: "Final Source List", path: "/dashboard/final-resource" },
    { name: "Add Final Source", path: "/dashboard/final-resource/add" },
  ],
};
function SubNavbar() {
  const location = useLocation();

  const currentPage = location.pathname.split("/")[2];
  const tabs = subNavItems[currentPage];

  if (!tabs) return null;

  return (
    <div className="bg-white border-b border-slate-200 px-6 flex items-stretch gap-0.5">
  {tabs.map((tab) => (
    <NavLink
      key={tab.path}
      to={tab.path}
      end
      className={({ isActive }) =>
        `group relative flex items-center gap-2 px-[18px] py-[13px] text-[13px] font-medium
         transition-colors duration-150 border-b-0 select-none
         ${isActive ? "text-blue-700 font-semibold" : "text-slate-500 hover:text-slate-800"}`
      }
    >
      {({ isActive }) => (
        <>
          {/* Icon pill */}
          {/* <span className={`w-[26px] h-[26px] rounded-[7px] flex items-center justify-center text-sm transition-all
            ${isActive ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-400 group-hover:bg-slate-100"}`}>
            <tab.icon size={14} />
          </span> */}

          {/* Label */}
          <span className="whitespace-nowrap">{tab.name}</span>

          {/* Count badge */}
          {/* {tab.count && (
            <span className={`inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full text-[10px] font-bold px-1.5 transition-all
              ${isActive ? "bg-blue-600 text-white" : "bg-indigo-100 text-indigo-700"}`}>
              {tab.count}
            </span>
          )} */}

          {/* Active underline bar */}
          <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2.5px] rounded-t-sm bg-blue-600
            transition-all duration-200
            ${isActive ? "w-[calc(100%-20px)]" : "w-0"}`} />
        </>
      )}
    </NavLink>
  ))}
</div>
  );
}

function DashboardLayout() {
  return (
    <div
      className="min-h-screen bg-[#f7f8fc] flex"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* <Navbar /> */}

        <SubNavbar />

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default DashboardLayout;