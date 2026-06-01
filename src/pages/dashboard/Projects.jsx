import { useMemo, useState } from "react";
import {
  FiFolder, FiUsers, FiClock, FiPlus, FiTrendingUp,
  FiSearch, FiGrid, FiList, FiCalendar, FiChevronDown,
  FiMoreVertical, FiEye, FiEdit, FiTrash2, FiFolder as FiFolderIcon,
} from "react-icons/fi";

const initialProjects = [
  {
    id: 1,
    name: "Client Portal",
    client: "Acme Corp",
    team: 4,
    progress: 72,
    status: "Active",
    due: "15 Jun 2026",
    hours: "142 hrs",
    desc: "Full-stack web application with real-time dashboards and reporting.",
  },
  {
    id: 2,
    name: "Internal Tools",
    client: "Colan HQ",
    team: 2,
    progress: 45,
    status: "Active",
    due: "30 Jun 2026",
    hours: "68 hrs",
    desc: "Employee productivity tools including timesheet and HR systems.",
  },
  {
    id: 3,
    name: "E-Commerce Redesign",
    client: "RetailMax",
    team: 5,
    progress: 90,
    status: "Review",
    due: "28 May 2026",
    hours: "215 hrs",
    desc: "Complete UI overhaul with new checkout flow and mobile-first design.",
  },
  {
    id: 4,
    name: "DevOps Pipeline",
    client: "TechStart",
    team: 2,
    progress: 30,
    status: "Paused",
    due: "10 Jul 2026",
    hours: "40 hrs",
    desc: "CI/CD setup, Docker containerization, and infrastructure automation.",
  },
];

const STATUS_STYLES = {
  Active:    "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Review:    "bg-blue-50 text-blue-700 border border-blue-200",
  Completed: "bg-slate-100 text-slate-600 border border-slate-200",
  Paused:    "bg-amber-50 text-amber-700 border border-amber-200",
};

// Per-project accent colors for the card left border & icon
const PROJECT_ACCENTS = [
  { border: "border-l-blue-500",   iconBg: "bg-blue-50",   iconText: "text-blue-600"   },
  { border: "border-l-violet-500", iconBg: "bg-violet-50", iconText: "text-violet-600" },
  { border: "border-l-teal-500",   iconBg: "bg-teal-50",   iconText: "text-teal-600"   },
  { border: "border-l-orange-500", iconBg: "bg-orange-50", iconText: "text-orange-600" },
];

function progressColor(p) {
  if (p >= 80) return "bg-emerald-500";
  if (p >= 50) return "bg-blue-500";
  return "bg-amber-500";
}

function Projects() {
  const [projects]  = useState(initialProjects);
  const [view, setView]     = useState("grid");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const filtered = useMemo(() => {
    const kw = search.toLowerCase();
    return projects.filter((p) => {
      const matchSearch =
        !kw ||
        p.name.toLowerCase().includes(kw) ||
        p.client.toLowerCase().includes(kw) ||
        p.desc.toLowerCase().includes(kw);
      const matchStatus = !status || p.status === status;
      return matchSearch && matchStatus;
    });
  }, [projects, search, status]);

  const stats = [
    { label: "Total Projects", value: projects.length,                                    icon: FiFolder,    iconBg: "bg-slate-100 text-slate-600"       },
    { label: "Active",         value: projects.filter((p) => p.status === "Active").length, icon: FiTrendingUp, iconBg: "bg-emerald-100 text-emerald-600" },
    { label: "In Review",      value: projects.filter((p) => p.status === "Review").length, icon: FiClock,      iconBg: "bg-blue-100 text-blue-600"       },
    { label: "Team Members",   value: projects.reduce((t, p) => t + p.team, 0),            icon: FiUsers,      iconBg: "bg-violet-100 text-violet-600"   },
  ];

  const hasFilter = search || status;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-5">

        {/* ── Page Header ── */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">
              Project Workspace
            </p>
            <h1 className="text-xl font-semibold text-gray-900">Projects Management</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage active projects, team allocation, progress and deadlines
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-800 transition-colors">
            <FiPlus size={15} />
            New Project
          </button>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          {stats.map(({ label, value, icon: Icon, iconBg }) => (
            <div key={label} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`}>
                <Icon size={18} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900 leading-none">{value}</p>
                <p className="text-xs text-gray-500 mt-1">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Toolbar ── */}
        <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center">
          <p className="text-sm font-medium text-gray-700 flex-shrink-0">Project List</p>

          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search by name, client or description…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* Status filter */}
          <div className="relative sm:w-44">
            <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 py-2 pl-3 pr-8 text-sm text-gray-700 outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition"
            >
              <option value="">All Status</option>
              <option>Active</option>
              <option>Review</option>
              <option>Completed</option>
              <option>Paused</option>
            </select>
          </div>

          {hasFilter && (
            <button
              onClick={() => { setSearch(""); setStatus(""); }}
              className="text-xs font-medium text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition whitespace-nowrap"
            >
              Clear filters
            </button>
          )}

          {/* View toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 flex-shrink-0">
            <button
              onClick={() => setView("grid")}
              className={`h-7 w-7 flex items-center justify-center rounded-md transition ${
                view === "grid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <FiGrid size={14} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`h-7 w-7 flex items-center justify-center rounded-md transition ${
                view === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <FiList size={14} />
            </button>
          </div>
        </div>

        {/* ── Grid View ── */}
        {view === "grid" && filtered.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filtered.map((project, idx) => {
              const accent = PROJECT_ACCENTS[idx % PROJECT_ACCENTS.length];
              return (
                <div
                  key={project.id}
                  className={`bg-white border border-gray-100 border-l-4 ${accent.border} rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow`}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${accent.iconBg} ${accent.iconText}`}>
                        <FiFolder size={18} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight">{project.name}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{project.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[project.status]}`}>
                        {project.status}
                      </span>
                      <button className="h-7 w-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition">
                        <FiMoreVertical size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-500 leading-5 mb-4 line-clamp-2">{project.desc}</p>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-gray-400">Progress</span>
                      <span className="text-xs font-semibold text-gray-700">{project.progress}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${progressColor(project.progress)}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer Meta */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5 text-xs text-gray-500">
                        <FiUsers size={12} className="text-gray-400" />
                        {project.team} members
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-gray-500">
                        <FiClock size={12} className="text-gray-400" />
                        {project.hours}
                      </span>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FiCalendar size={12} className="text-gray-400" />
                      {project.due}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── List View ── */}
        {view === "list" && filtered.length > 0 && (
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {["Project", "Client", "Team", "Hours", "Progress", "Status", "Due Date", "Actions"].map((h) => (
                      <th
                        key={h}
                        className={`px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 ${
                          h === "Actions" ? "text-right" : "text-left"
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((project, idx) => {
                    const accent = PROJECT_ACCENTS[idx % PROJECT_ACCENTS.length];
                    return (
                      <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${accent.iconBg} ${accent.iconText}`}>
                              <FiFolder size={14} />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{project.name}</p>
                              <p className="text-xs text-gray-400 mt-0.5 max-w-[200px] truncate">{project.desc}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-600">{project.client}</td>
                        <td className="px-5 py-4 text-gray-600">
                          <span className="flex items-center gap-1.5">
                            <FiUsers size={13} className="text-gray-400" />
                            {project.team}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-medium text-gray-900">{project.hours}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className="h-1.5 w-20 rounded-full bg-gray-100 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${progressColor(project.progress)}`}
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-gray-600">{project.progress}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[project.status]}`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="flex items-center gap-1.5 text-gray-500 text-xs">
                            <FiCalendar size={12} className="text-gray-400" />
                            {project.due}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-1.5">
                            <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors">
                              <FiEye size={13} />
                            </button>
                            <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
                              <FiEdit size={13} />
                            </button>
                            <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors">
                              <FiTrash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Empty State ── */}
        {filtered.length === 0 && (
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm px-6 py-16 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
              <FiFolder size={22} className="text-gray-400" />
            </div>
            <p className="font-medium text-gray-700">No projects found</p>
            <p className="mt-1 text-xs text-gray-400">Try adjusting your search or status filter.</p>
            {hasFilter && (
              <button
                onClick={() => { setSearch(""); setStatus(""); }}
                className="mt-3 text-xs font-medium text-blue-600 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default Projects;