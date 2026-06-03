import { useState } from "react";
import {
  FiSearch,
  FiEye,
  FiCheckCircle,
  FiAlertTriangle,
  FiUserCheck,
  FiFileText,
  FiCalendar,
  FiX,
} from "react-icons/fi";

const qaProjects = [
  {
    id: "QA-001",
    project: "Timesheet Management System",
    tester: "Ahamed",
    status: "Active",
    priority: "High",
    bugStatus: "Open",
    totalBugs: 24,
    openBugs: 7,
    fixedBugs: 17,
    progress: 78,
    deadline: "28 May 2026",
    report: "Sprint 4 QA Report",
  },
  {
    id: "QA-002",
    project: "Property Management System",
    tester: "Kaif",
    status: "Completed",
    priority: "Medium",
    bugStatus: "Fixed",
    totalBugs: 16,
    openBugs: 3,
    fixedBugs: 13,
    progress: 91,
    deadline: "10 Jun 2026",
    report: "Regression Report",
  },
  {
    id: "QA-003",
    project: "RFP Portal Upgrade",
    tester: "Farzan",
    status: "In Testing",
    priority: "High",
    bugStatus: "In Progress",
    totalBugs: 31,
    openBugs: 12,
    fixedBugs: 19,
    progress: 65,
    deadline: "15 Jun 2026",
    report: "UAT Report",
  },
];

function QA() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");

  const [selectedProject, setSelectedProject] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const filteredProjects = qaProjects.filter((item) => {
    const matchesSearch =
      item.project.toLowerCase().includes(search.toLowerCase()) ||
      item.tester.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || item.status === status;

    const matchesPriority =
      priority === "All" || item.priority === priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = [
    {
      label: "QA Projects",
      value: qaProjects.length,
      icon: FiUserCheck,
      color: "blue",
    },
    {
      label: "Total Bugs",
      value: 71,
      icon: FiAlertTriangle,
      color: "orange",
    },
    {
      label: "Fixed Bugs",
      value: 49,
      icon: FiCheckCircle,
      color: "green",
    },
    {
      label: "Open Bugs",
      value: 22,
      icon: FiAlertTriangle,
      color: "red",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            QA Management
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage testing workflow, bug tracking and QA reports.
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-sm"
        >
          + Add QA Project
        </button>
      </div>

      {/* Stats */}
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
                  <p className="text-sm text-slate-500">
                    {item.label}
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center
                  ${
                    item.color === "blue"
                      ? "bg-blue-50 text-blue-600"
                      : item.color === "green"
                      ? "bg-green-50 text-green-600"
                      : item.color === "orange"
                      ? "bg-orange-50 text-orange-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="relative lg:col-span-2">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search project, tester or QA code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-3 rounded-2xl border border-slate-200 text-sm outline-none focus:ring-4 focus:ring-blue-100"
          >
            <option>All</option>
            <option>Active</option>
            <option>In Testing</option>
            <option>Completed</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-4 py-3 rounded-2xl border border-slate-200 text-sm outline-none focus:ring-4 focus:ring-blue-100"
          >
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-5 py-4 text-xs font-bold uppercase text-slate-500">
                  Project
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold uppercase text-slate-500">
                  Tester
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold uppercase text-slate-500">
                  Bugs
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold uppercase text-slate-500">
                  Progress
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold uppercase text-slate-500">
                  Priority
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold uppercase text-slate-500">
                  Bug Status
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold uppercase text-slate-500">
                  Deadline
                </th>

                <th className="text-right px-5 py-4 text-xs font-bold uppercase text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProjects.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >
                  {/* Project */}
                  <td className="px-5 py-5">
                    <p className="font-semibold text-slate-900">
                      {item.project}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      {item.id}
                    </p>
                  </td>

                  {/* Tester */}
                  <td className="px-5 py-5 text-sm text-slate-700">
                    {item.tester}
                  </td>

                  {/* Bugs */}
                  <td className="px-5 py-5">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {item.totalBugs} Total
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        {item.openBugs} open / {item.fixedBugs} fixed
                      </p>
                    </div>
                  </td>

                  {/* Progress */}
                  <td className="px-5 py-5 min-w-[220px]">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">
                        Testing
                      </span>

                      <span className="font-semibold text-slate-900">
                        {item.progress}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${item.progress}%`,
                        }}
                      />
                    </div>
                  </td>

                  {/* Priority */}
                  <td className="px-5 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
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

                  {/* Bug Status */}
                  <td className="px-5 py-5">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                      {item.bugStatus}
                    </span>
                  </td>

                  {/* Deadline */}
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <FiCalendar />
                      {item.deadline}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedProject(item)}
                        className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition"
                      >
                        <FiEye />
                      </button>

                      <button className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition">
                        <FiFileText />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProjects.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-12 text-slate-500"
                  >
                    No QA records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xl h-screen bg-white shadow-2xl overflow-y-auto">
            <div className="flex items-start justify-between p-6 border-b border-slate-100">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  QA Details
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Full testing and bug information.
                </p>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center"
              >
                <FiX />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <p className="text-sm text-slate-500">
                  Project Name
                </p>

                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {selectedProject.project}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-sm text-slate-500">
                    QA Tester
                  </p>

                  <h4 className="font-bold text-slate-900 mt-1">
                    {selectedProject.tester}
                  </h4>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-sm text-slate-500">
                    Deadline
                  </p>

                  <h4 className="font-bold text-slate-900 mt-1">
                    {selectedProject.deadline}
                  </h4>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-sm text-slate-500">
                    Total Bugs
                  </p>

                  <h4 className="font-bold text-slate-900 mt-1">
                    {selectedProject.totalBugs}
                  </h4>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-sm text-slate-500">
                    Progress
                  </p>

                  <h4 className="font-bold text-slate-900 mt-1">
                    {selectedProject.progress}%
                  </h4>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-600">
                    Testing Progress
                  </span>

                  <span className="text-sm font-bold text-slate-900">
                    {selectedProject.progress}%
                  </span>
                </div>

                <div className="w-full h-3 rounded-full bg-slate-100">
                  <div
                    className="h-3 rounded-full bg-blue-600"
                    style={{
                      width: `${selectedProject.progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                <h4 className="font-bold text-blue-900">
                  QA Report
                </h4>

                <p className="text-sm text-blue-700 mt-2">
                  {selectedProject.report}
                </p>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-slate-100 p-5 flex justify-end gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50"
              >
                Close
              </button>

              <button className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add QA Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xl h-screen bg-white shadow-2xl overflow-y-auto">
            <div className="flex items-start justify-between p-6 border-b border-slate-100">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Create QA Project
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Add testing workflow and QA information.
                </p>
              </div>

              <button
                onClick={() => setOpenModal(false)}
                className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center"
              >
                <FiX />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Project Name
                </label>

                <input
                  type="text"
                  placeholder="Enter project name"
                  className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  QA Tester
                </label>

                <input
                  type="text"
                  placeholder="Enter tester name"
                  className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Priority
                  </label>

                  <select className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-100">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Status
                  </label>

                  <select className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-100">
                    <option>Active</option>
                    <option>In Testing</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Total Test Cases
                  </label>

                  <input
                    type="number"
                    placeholder="120"
                    className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Deadline
                  </label>

                  <input
                    type="date"
                    className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  QA Notes
                </label>

                <textarea
                  rows={5}
                  placeholder="Enter testing notes..."
                  className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 outline-none resize-none focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-slate-100 p-5 flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50"
              >
                Cancel
              </button>

              <button className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">
                Create QA Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QA;