import { useMemo, useState } from "react";
import {
  FiSearch,
  FiEye,
  FiCheckCircle,
  FiAlertTriangle,
  FiClock,
  FiUserCheck,
  FiFileText,
  FiPlus,
  FiChevronDown,
} from "react-icons/fi";

const qaProjects = [
  {
    id: "QA-001",
    project: "Timesheet Management System",
    tester: "Ahamed",
    status: "Active",
    priority: "High",
    totalBugs: 24,
    openBugs: 7,
    fixedBugs: 17,
    testCases: 120,
    passRate: 86,
    report: "Sprint 4 QA Report",
  },
  {
    id: "QA-002",
    project: "Property Management System",
    tester: "Kaif",
    status: "Active",
    priority: "Medium",
    totalBugs: 16,
    openBugs: 3,
    fixedBugs: 13,
    testCases: 95,
    passRate: 91,
    report: "Regression Report",
  },
  {
    id: "QA-003",
    project: "RFP Portal Upgrade",
    tester: "Farzan",
    status: "In Testing",
    priority: "High",
    totalBugs: 31,
    openBugs: 12,
    fixedBugs: 19,
    testCases: 150,
    passRate: 78,
    report: "UAT Report",
  },
];

const STATUS_STYLES = {
  Active:       "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "In Testing": "bg-blue-50 text-blue-700 border border-blue-200",
  Completed:    "bg-slate-100 text-slate-600 border border-slate-200",
};

const PRIORITY_STYLES = {
  High:   "text-red-600",
  Medium: "text-amber-600",
  Low:    "text-green-600",
};

const PRIORITY_DOT = {
  High:   "bg-red-500",
  Medium: "bg-amber-500",
  Low:    "bg-green-500",
};

// Tester avatar color pairs  [bg, text]
const AVATAR_COLORS = [
  ["bg-blue-100", "text-blue-700"],
  ["bg-purple-100", "text-purple-700"],
  ["bg-teal-100", "text-teal-700"],
  ["bg-orange-100", "text-orange-700"],
];

function passRateColor(rate) {
  if (rate >= 90) return "bg-emerald-500";
  if (rate >= 75) return "bg-blue-500";
  return "bg-amber-500";
}

function QA() {
  const [search, setSearch]     = useState("");
  const [status, setStatus]     = useState("");
  const [priority, setPriority] = useState("");

  const filtered = useMemo(() => {
    const kw = search.toLowerCase();
    return qaProjects.filter((item) => {
      const matchSearch =
        !kw ||
        item.project.toLowerCase().includes(kw) ||
        item.tester.toLowerCase().includes(kw) ||
        item.id.toLowerCase().includes(kw);
      const matchStatus   = !status   || item.status   === status;
      const matchPriority = !priority || item.priority === priority;
      return matchSearch && matchStatus && matchPriority;
    });
  }, [search, status, priority]);

  const totalBugs = qaProjects.reduce((s, i) => s + i.totalBugs, 0);
  const fixedBugs = qaProjects.reduce((s, i) => s + i.fixedBugs, 0);
  const openBugs  = qaProjects.reduce((s, i) => s + i.openBugs,  0);

  const stats = [
    { label: "QA Projects", value: qaProjects.length, icon: FiUserCheck,      iconBg: "bg-slate-100 text-slate-600" },
    { label: "Total Bugs",  value: totalBugs,          icon: FiAlertTriangle,  iconBg: "bg-red-100 text-red-600"    },
    { label: "Fixed Bugs",  value: fixedBugs,          icon: FiCheckCircle,    iconBg: "bg-emerald-100 text-emerald-600" },
    { label: "Open Bugs",   value: openBugs,           icon: FiClock,          iconBg: "bg-amber-100 text-amber-600" },
  ];

  const hasFilter = search || status || priority;
  const resetFilters = () => { setSearch(""); setStatus(""); setPriority(""); };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-5">

        {/* ── Page Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">
              Quality Assurance
            </p>
            <h1 className="text-xl font-semibold text-gray-900">QA Project Management</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Track testers, bug counts, test cases and pass rates
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-800 transition-colors">
            <FiPlus size={15} />
            Add QA Project
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
        <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center flex-wrap">
          <p className="text-sm font-medium text-gray-700 flex-shrink-0">QA Project List</p>

          {/* Search */}
          <div className="relative flex-1 min-w-[180px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search project, tester or QA code…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* Status */}
          <div className="relative sm:w-40">
            <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 py-2 pl-3 pr-8 text-sm text-gray-700 outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition"
            >
              <option value="">All Status</option>
              <option>Active</option>
              <option>In Testing</option>
              <option>Completed</option>
            </select>
          </div>

          {/* Priority */}
          <div className="relative sm:w-36">
            <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 py-2 pl-3 pr-8 text-sm text-gray-700 outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition"
            >
              <option value="">All Priority</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          {hasFilter && (
            <button
              onClick={resetFilters}
              className="text-xs font-medium text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition whitespace-nowrap"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* ── Table ── */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Project", "QA Tester", "Bugs", "Test Cases", "Pass Rate", "Priority", "Status", "Report"].map((h) => (
                    <th
                      key={h}
                      className={`px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 ${
                        h === "Report" ? "text-right" : "text-left"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {filtered.map((item, idx) => {
                  const [avatarBg, avatarText] = AVATAR_COLORS[idx % AVATAR_COLORS.length];
                  const initials = item.tester.slice(0, 2).toUpperCase();

                  return (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">

                      {/* Project */}
                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-900">{item.project}</p>
                        <p className="mt-0.5 text-xs text-gray-400">{item.id}</p>
                      </td>

                      {/* Tester */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-semibold flex-shrink-0 ${avatarBg} ${avatarText}`}>
                            {initials}
                          </div>
                          <span className="text-gray-700 font-medium">{item.tester}</span>
                        </div>
                      </td>

                      {/* Bugs */}
                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-900">{item.totalBugs} total</p>
                        <p className="mt-0.5 text-xs text-gray-400">
                          <span className="text-amber-600">{item.openBugs} open</span>
                          {" · "}
                          <span className="text-emerald-600">{item.fixedBugs} fixed</span>
                        </p>
                      </td>

                      {/* Test Cases */}
                      <td className="px-5 py-4 font-medium text-gray-900">
                        {item.testCases}
                      </td>

                      {/* Pass Rate */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="h-1.5 w-20 rounded-full bg-gray-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${passRateColor(item.passRate)}`}
                              style={{ width: `${item.passRate}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-700">{item.passRate}%</span>
                        </div>
                      </td>

                      {/* Priority */}
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${PRIORITY_STYLES[item.priority]}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${PRIORITY_DOT[item.priority]}`} />
                          {item.priority}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[item.status] || "bg-gray-100 text-gray-600 border border-gray-200"}`}>
                          {item.status}
                        </span>
                      </td>

                      {/* Report actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            title="View"
                            className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
                          >
                            <FiEye size={14} />
                          </button>
                          <button
                            title="Report"
                            className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                          >
                            <FiFileText size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-16 text-center">
                      <div className="mx-auto flex max-w-xs flex-col items-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                          <FiFileText size={22} className="text-gray-400" />
                        </div>
                        <p className="font-medium text-gray-700">No QA records found</p>
                        <p className="mt-1 text-xs text-gray-400">
                          Try adjusting your search or filters.
                        </p>
                        {hasFilter && (
                          <button onClick={resetFilters} className="mt-3 text-xs font-medium text-blue-600 hover:underline">
                            Clear filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default QA;