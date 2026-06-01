import { useMemo, useState } from "react";
import {
  FiSearch, FiPlus, FiEye, FiEdit, FiTrash2,
  FiCalendar, FiBriefcase, FiTrendingUp, FiClock,
  FiCheckCircle, FiFileText, FiChevronDown,
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

const STATUS_STYLES = {
  Approved:  "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "In Review": "bg-blue-50 text-blue-700 border border-blue-200",
  Pending:   "bg-amber-50 text-amber-700 border border-amber-200",
  Rejected:  "bg-red-50 text-red-700 border border-red-200",
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

function RFP() {
  const [search, setSearch]   = useState("");
  const [status, setStatus]   = useState("");

  const filteredRfps = useMemo(() => {
    const kw = search.toLowerCase();
    return rfpData.filter((r) => {
      const matchSearch =
        !kw ||
        r.title.toLowerCase().includes(kw) ||
        r.id.toLowerCase().includes(kw) ||
        r.client.toLowerCase().includes(kw) ||
        r.department.toLowerCase().includes(kw);
      const matchStatus = !status || r.status === status;
      return matchSearch && matchStatus;
    });
  }, [search, status]);

  const stats = [
    { label: "Total RFPs",  value: rfpData.length,                                          icon: FiBriefcase,   iconBg: "bg-slate-100 text-slate-600" },
    { label: "Approved",    value: rfpData.filter((r) => r.status === "Approved").length,   icon: FiCheckCircle, iconBg: "bg-emerald-100 text-emerald-600" },
    { label: "In Review",   value: rfpData.filter((r) => r.status === "In Review").length,  icon: FiTrendingUp,  iconBg: "bg-blue-100 text-blue-600" },
    { label: "Pending",     value: rfpData.filter((r) => r.status === "Pending").length,    icon: FiClock,       iconBg: "bg-amber-100 text-amber-600" },
  ];

  const clearFilters = () => { setSearch(""); setStatus(""); };
  const hasFilter = search || status;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-5">

        {/* ── Page Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">
              Estimation Module
            </p>
            <h1 className="text-xl font-semibold text-gray-900">RFP Management</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Track proposals, departments, estimation status and deadlines
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-800 transition-colors">
            <FiPlus size={15} />
            Add New RFP
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
          <p className="text-sm font-medium text-gray-700 flex-shrink-0">RFP List</p>

          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search by title, code, client or department…"
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
              <option>Pending</option>
              <option>In Review</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>

          {hasFilter && (
            <button
              onClick={clearFilters}
              className="text-xs font-medium text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition whitespace-nowrap"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* ── Table ── */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["RFP Details", "Client", "Department", "Budget", "Deadline", "Priority", "Status", "Actions"].map((h, i) => (
                    <th
                      key={h}
                      className={`px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 ${i === 7 ? "text-right" : "text-left"}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {filteredRfps.map((rfp) => (
                  <tr key={rfp.id} className="hover:bg-slate-50 transition-colors">

                    {/* RFP Details */}
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-900">{rfp.title}</p>
                      <p className="mt-0.5 text-xs text-gray-400">{rfp.id} · {rfp.owner}</p>
                    </td>

                    {/* Client */}
                    <td className="px-5 py-4 text-gray-700">{rfp.client}</td>

                    {/* Department */}
                    <td className="px-5 py-4 text-gray-500">{rfp.department}</td>

                    {/* Budget */}
                    <td className="px-5 py-4 font-medium text-gray-900">{rfp.budget}</td>

                    {/* Deadline */}
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 text-gray-500">
                        <FiCalendar size={13} className="text-gray-400" />
                        {rfp.deadline}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${PRIORITY_STYLES[rfp.priority]}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${PRIORITY_DOT[rfp.priority]}`} />
                        {rfp.priority}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[rfp.status] || "bg-gray-100 text-gray-600 border border-gray-200"}`}>
                        {rfp.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors">
                          <FiEye size={14} />
                        </button>
                        <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
                          <FiEdit size={14} />
                        </button>
                        <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors">
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredRfps.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-16 text-center">
                      <div className="mx-auto flex max-w-xs flex-col items-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                          <FiFileText size={22} className="text-gray-400" />
                        </div>
                        <p className="font-medium text-gray-700">No RFP records found</p>
                        <p className="mt-1 text-xs text-gray-400">
                          Try adjusting your search or status filter.
                        </p>
                        {hasFilter && (
                          <button onClick={clearFilters} className="mt-3 text-xs font-medium text-blue-600 hover:underline">
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

export default RFP;