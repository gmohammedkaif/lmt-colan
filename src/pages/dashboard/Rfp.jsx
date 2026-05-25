import { useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiFilter,
  FiEye,
  FiEdit,
  FiTrash2,
  FiCalendar,
  FiUser,
  FiBriefcase,
  FiTrendingUp,
} from "react-icons/fi";

const rfpData = [
  {
    id: "RFP-2026-001",
    title: "AI Based Timesheet Automation",
    client: "Colan Infotech",
    department: "Software Development",
    status: "In Review",
    priority: "High",
    budget: "₹8,50,000",
    deadline: "28 May 2026",
    owner: "Project Manager",
  },
  {
    id: "RFP-2026-002",
    title: "Property Management System",
    client: "Real Estate Client",
    department: "Web Application",
    status: "Approved",
    priority: "Medium",
    budget: "₹5,20,000",
    deadline: "02 Jun 2026",
    owner: "Business Analyst",
  },
  {
    id: "RFP-2026-003",
    title: "Healthcare CRM Platform",
    client: "MediCare Group",
    department: "CRM",
    status: "Pending",
    priority: "High",
    budget: "₹12,00,000",
    deadline: "10 Jun 2026",
    owner: "Tech Lead",
  },
];

function RFP() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredRfps = rfpData.filter((rfp) => {
    const matchesSearch =
      rfp.title.toLowerCase().includes(search.toLowerCase()) ||
      rfp.id.toLowerCase().includes(search.toLowerCase()) ||
      rfp.client.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "All" || rfp.status === status;

    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: "Total RFPs", value: rfpData.length, icon: FiBriefcase },
    { label: "Approved", value: 1, icon: FiTrendingUp },
    { label: "In Review", value: 1, icon: FiEye },
    { label: "Pending", value: 1, icon: FiCalendar },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">RFP Management</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage client proposals, estimation, approvals and deadlines.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-sm hover:bg-blue-700 transition">
          <FiPlus />
          Add New RFP
        </button>
      </div>

      {/* Stats Cards */}
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

      {/* Filters */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by RFP title, code or client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
            />
          </div>

          <div className="flex items-center gap-3">
            <FiFilter className="text-slate-400" />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Review</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  RFP Details
                </th>
                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Client
                </th>
                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Department
                </th>
                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Budget
                </th>
                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Deadline
                </th>
                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Status
                </th>
                <th className="text-right px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredRfps.map((rfp) => (
                <tr
                  key={rfp.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900">{rfp.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{rfp.id}</p>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {rfp.client}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {rfp.department}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                    {rfp.budget}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {rfp.deadline}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        rfp.status === "Approved"
                          ? "bg-green-50 text-green-700"
                          : rfp.status === "In Review"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-orange-50 text-orange-700"
                      }`}
                    >
                      {rfp.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100">
                        <FiEye />
                      </button>
                      <button className="w-9 h-9 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-slate-100">
                        <FiEdit />
                      </button>
                      <button className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredRfps.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-slate-500">
                    No RFP records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Insight */}
      <div className="bg-blue-600 text-white rounded-2xl p-5">
        <h3 className="font-bold text-lg">Professional Tip</h3>
        <p className="text-sm text-blue-100 mt-1">
          Track each RFP from client request to estimation, approval, and project
          conversion. This makes the workflow look industry-level.
        </p>
      </div>
    </div>
  );
}

export default RFP;