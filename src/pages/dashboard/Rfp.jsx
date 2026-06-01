import { useMemo, useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiFilter,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiCalendar,
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
    budget: "₹8,50,000",
    deadline: "28 May 2026",
  },
  {
    id: "RFP-2026-002",
    title: "Property Management System",
    client: "Real Estate Client",
    department: "Web Application",
    status: "Approved",
    budget: "₹5,20,000",
    deadline: "02 Jun 2026",
  },
  {
    id: "RFP-2026-003",
    title: "Healthcare CRM Platform",
    client: "MediCare Group",
    department: "CRM",
    status: "Pending",
    budget: "₹12,00,000",
    deadline: "10 Jun 2026",
  },
];

function RFP() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [openModal, setOpenModal] = useState(false);

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
    {
      label: "Total RFPs",
      value: rfpData.length,
      icon: FiBriefcase,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Approved",
      value: 1,
      icon: FiTrendingUp,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      label: "In Review",
      value: 1,
      icon: FiEye,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
    {
      label: "Pending",
      value: 1,
      icon: FiCalendar,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  const clearFilters = () => { setSearch(""); setStatus(""); };
  const hasFilter = search || status;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-[30px] font-bold tracking-[-0.03em] text-slate-900">
            RFP Management
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Manage client proposals, approvals and project estimations.
          </p>
        </div>

        <button className="h-11 px-5 rounded-xl bg-blue-600 text-white text-sm font-semibold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm" onClick={() => setOpenModal(true)}>
  
          <FiPlus size={16} />
          Add New RFP
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className={`bg-white border border-slate-100 rounded-2xl px-5 py-5 shadow-sm hover:border-slate-200 transition-all ${
                index === 0 ? "ring-1 ring-blue-50" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">{item.label}</p>

                  <h2 className="text-[34px] leading-none font-bold text-slate-900 mt-3">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.iconBg}`}
                >
                  <Icon className={item.iconColor} size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>

      {/* Filters */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search by title, code, client or department…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 bg-white">
              <FiFilter size={16} />
            </div>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-12 min-w-[110px] px-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            >
              <option value="">All Status</option>
              <option>Pending</option>
              <option>In Review</option>
              <option>Approved</option>
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

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {[
                  "RFP Details",
                  "Client",
                  "Department",
                  "Budget",
                  "Deadline",
                  "Status",
                  "Action",
                ].map((head) => (
                  <th
                    key={head}
                    className={`px-5 py-4 text-[11px] font-bold uppercase tracking-[0.05em] text-slate-500 ${
                      head === "Action" ? "text-right" : "text-left"
                    }`}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredRfps.map((rfp) => (
                <tr
                  key={rfp.id}
                  className="border-b border-slate-100 hover:bg-slate-50/70 transition-all"
                >
                  <td className="px-5 py-5">
                    <p className="font-semibold text-[15px] text-slate-900">
                      {rfp.title}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">{rfp.id}</p>
                  </td>

                  <td className="px-5 py-5 text-sm text-slate-700">
                    {rfp.client}
                  </td>

                  <td className="px-5 py-5 text-sm text-slate-700">
                    {rfp.department}
                  </td>

                  <td className="px-5 py-5 text-sm font-semibold text-slate-900">
                    {rfp.budget}
                  </td>

                  <td className="px-5 py-5 text-sm text-slate-700">
                    {rfp.deadline}
                  </td>

                  <td className="px-5 py-5">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        rfp.status === "Approved"
                          ? "bg-emerald-50 text-emerald-700"
                          : rfp.status === "In Review"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-orange-50 text-orange-700"
                      }`}
                    >
                      {rfp.status}
                    </span>
                  </td>

                  <td className="px-5 py-5">
                    <div className="flex justify-end items-center gap-1">
                      <button className="w-9 h-9 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center">
                        <FiEye size={16} />
                      </button>

                      <button className="w-9 h-9 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all flex items-center justify-center">
                        <FiEdit2 size={15} />
                      </button>

                      <button className="w-9 h-9 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all flex items-center justify-center">
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredRfps.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="py-16 text-center text-sm text-slate-500"
                  >
                    No RFP records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {openModal && (
  <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-[2px]">
    <div className="w-full max-w-[520px] h-screen bg-white shadow-2xl flex flex-col animate-slideIn">

      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Create New RFP
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Add proposal details and workflow information.
          </p>
        </div>

        <button
          onClick={() => setOpenModal(false)}
          className="w-9 h-9 rounded-lg hover:bg-slate-100 text-slate-500 flex items-center justify-center"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">
            Basic Information
          </h3>

          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">
              RFP Title
            </label>

            <input
              type="text"
              placeholder="Enter project title"
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">
              Client Name
            </label>

            <input
              type="text"
              placeholder="Enter client/company name"
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">
              Department
            </label>

            <select className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none text-sm">
              <option>Software Development</option>
              <option>CRM</option>
              <option>Web Application</option>
            </select>
          </div>
        </div>

        {/* Business Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">
            Business Details
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-2">
                Budget
              </label>

              <input
                type="text"
                placeholder="₹0.00"
                className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 block mb-2">
                Deadline
              </label>

              <input
                type="date"
                className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-2">
                Priority
              </label>

              <select className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none text-sm">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 block mb-2">
                Status
              </label>

              <select className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none text-sm">
                <option>Pending</option>
                <option>In Review</option>
                <option>Approved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-2">
            Project Requirements
          </label>

          <textarea
            rows={5}
            placeholder="Write project scope and proposal details..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none text-sm resize-none"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-white">
        <p className="text-xs text-slate-400">
          All changes are securely managed.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpenModal(false)}
            className="h-11 px-5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button className="h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold">
            Create RFP
          </button>
        </div>
      </div>
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
}

export default RFP;