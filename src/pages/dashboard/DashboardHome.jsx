import {
  FiClock,
  FiFolder,
  FiCheckCircle,
  FiAlertCircle,
  FiPlus,
  FiArrowRight,
  
} from "react-icons/fi";

const stats = [
  {
    title: "Today's Hours",
    value: "08:45",
    sub: "Target 10 hrs",
    icon: <FiClock />,
    color: "blue",
  },
  {
    title: "Active Projects",
    value: "04",
    sub: "2 nearing deadline",
    icon: <FiFolder />,
    color: "violet",
  },
  {
    title: "Completed Tasks",
    value: "12",
    sub: "5 completed today",
    icon: <FiCheckCircle />,
    color: "emerald",
  },
  {
    title: "Pending Approvals",
    value: "03",
    sub: "Awaiting manager",
    icon: <FiAlertCircle />,
    color: "amber",
  },
];

const tasks = [
  {
    title: "Update Timesheet UI",
    project: "ERP Portal",
    status: "In Progress",
  },
  {
    title: "QA Bug Verification",
    project: "RFP System",
    status: "Pending",
  },
  {
    title: "Dashboard API Integration",
    project: "Client Portal",
    status: "Completed",
  },
];

const activities = [
  "Timesheet submitted successfully",
  "New task assigned by manager",
  "Client approval received",
  "QA report uploaded",
];

const projectProgress = [
  {
    name: "ERP Portal",
    progress: 82,
  },
  {
    name: "Timesheet System",
    progress: 64,
  },
  {
    name: "RFP Module",
    progress: 91,
  },
];

function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, Kaif  
          </h1>

          <p className="text-slate-500 mt-1">
            Manage projects, tasks, approvals and productivity.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-5 py-3 rounded-2xl border border-slate-200 bg-white text-sm font-semibold hover:bg-slate-50 transition">
            Export Report
          </button>

          <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition">
            <FiPlus />
            Log Hours
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center
                ${
                  item.color === "blue"
                    ? "bg-blue-50 text-blue-600"
                    : item.color === "violet"
                    ? "bg-violet-50 text-violet-600"
                    : item.color === "emerald"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                {item.icon}
              </div>

              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                +2.4%
              </span>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mt-5">
              {item.value}
            </h2>

            <p className="text-sm font-medium text-slate-700 mt-1">
              {item.title}
            </p>

            <p className="text-xs text-slate-400 mt-1">
              {item.sub}
            </p>
          </div>
        ))}
      </div>

      {/* TASKS + ACTIVITY */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* TASKS */}
        <div className="xl:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Today's Tasks
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Your assigned work items.
              </p>
            </div>

            <button className="text-blue-600 text-sm font-semibold flex items-center gap-1">
              View All
              <FiArrowRight />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="p-5 flex items-center justify-between hover:bg-slate-50 transition"
              >
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {task.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {task.project}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    task.status === "Completed"
                      ? "bg-emerald-50 text-emerald-700"
                      : task.status === "Pending"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVITY */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Recent Activity
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Latest updates from workspace.
          </p>

          <div className="space-y-5 mt-6">
            {activities.map((item, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-600"></div>

                <div>
                  <p className="text-sm text-slate-700 font-medium">
                    {item}
                  </p>

                  <span className="text-xs text-slate-400">
                    Just now
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TIMESHEET + PROJECTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* TIMESHEET */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Weekly Timesheet
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Productivity overview.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-blue-600">
              36.5h
            </h3>
          </div>

          <div className="space-y-5">
            {[
              { day: "Mon", hrs: 9 },
              { day: "Tue", hrs: 10 },
              { day: "Wed", hrs: 7.5 },
              { day: "Thu", hrs: 9 },
              { day: "Fri", hrs: 5 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-700">
                    {item.day}
                  </span>

                  <span className="text-slate-500">
                    {item.hrs} hrs
                  </span>
                </div>

                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: `${item.hrs * 10}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PROJECT PROGRESS */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Project Progress
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Current project completion status.
          </p>

          <div className="space-y-6 mt-6">
            {projectProgress.map((project, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-700">
                    {project.name}
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {project.progress}%
                  </span>
                </div>

                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full
                    ${
                      project.progress > 80
                        ? "bg-emerald-500"
                        : project.progress > 60
                        ? "bg-blue-600"
                        : "bg-amber-500"
                    }`}
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;