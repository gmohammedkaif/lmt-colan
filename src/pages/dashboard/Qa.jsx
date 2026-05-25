import { useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiEye,
  
  FiCheckCircle,
  FiAlertTriangle,
  FiClock,
  FiUserCheck,
  FiBarChart2,
  FiFileText,
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
    passRate: "86%",
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
    passRate: "91%",
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
    passRate: "78%",
    report: "UAT Report",
  },
];

function QA() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");

  const filteredProjects = qaProjects.filter((item) => {
    const matchesSearch =
      item.project.toLowerCase().includes(search.toLowerCase()) ||
      item.tester.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "All" || item.status === status;
    const matchesPriority = priority === "All" || item.priority === priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = [
    { label: "QA Projects", value: qaProjects.length, icon: FiUserCheck },
    { label: "Total Bugs", value: 71, icon: FiCheckCircle },
    { label: "Fixed Bugs", value: 49, icon: FiCheckCircle },
    { label: "Open Bugs", value: 22, icon: FiAlertTriangle },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">QA Management</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track QA projects, testers, bugs, test cases, priority and reports.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-sm hover:bg-blue-700 transition">
          + Add QA Project
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1">
                    {item.value}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="relative lg:col-span-2">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search project, tester or QA code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option>All</option>
            <option>Active</option>
            <option>In Testing</option>
            <option>Completed</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Project
                </th>
                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  QA Tester
                </th>
                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Bugs
                </th>
                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Test Cases
                </th>
                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Pass Rate
                </th>
                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Priority
                </th>
                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Status
                </th>
                <th className="text-right px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Report
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProjects.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900">
                      {item.project}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{item.id}</p>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {item.tester}
                  </td>

                  <td className="px-5 py-4">
                    <div className="text-sm">
                      <p className="font-semibold text-slate-900">
                        {item.totalBugs} Total
                      </p>
                      <p className="text-xs text-slate-500">
                        {item.openBugs} open / {item.fixedBugs} fixed
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                    {item.testCases}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <FiBarChart2 className="text-blue-600" />
                      <span className="text-sm font-semibold text-slate-900">
                        {item.passRate}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.priority === "High"
                          ? "bg-red-50 text-red-700"
                          : item.priority === "Medium"
                          ? "bg-orange-50 text-orange-700"
                          : "bg-green-50 text-green-700"
                      }`}
                    >
                      {item.priority}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                      {item.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100">
                        <FiEye />
                      </button>
                      <button className="w-9 h-9 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-slate-100">
                        <FiFileText />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-10 text-slate-500">
                    No QA records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-600 text-white rounded-2xl p-5">
        <h3 className="font-bold text-lg">QA Workflow</h3>
        <p className="text-sm text-blue-100 mt-1">
          Project assigned → QA tester starts testing → bugs are reported →
          developer fixes → retesting completed → final QA report generated.
        </p>
      </div>
    </div>
  );
}

export default QA;