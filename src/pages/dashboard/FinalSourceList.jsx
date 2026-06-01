import { useMemo, useState } from "react";
import {
  FiSearch, FiPlus, FiEye, FiDownload, FiFileText,
  FiFolder, FiCheckCircle, FiClock, FiUploadCloud, FiChevronDown,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const sources = [
  {
    id: "FS-001",
    projectCode: "PRJ-2026-001",
    title: "Timesheet Management System",
    sourceType: "Git Repository",
    uploadedBy: "Kaif",
    uploadedOn: "21 May 2026",
    version: "v1.0",
    status: "Active",
  },
  {
    id: "FS-002",
    projectCode: "PRJ-2026-002",
    title: "Property Management System",
    sourceType: "Zip File",
    uploadedBy: "Admin",
    uploadedOn: "18 May 2026",
    version: "v2.1",
    status: "Review",
  },
];

const STATUS_STYLES = {
  Active:   "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Review:   "bg-amber-50 text-amber-700 border border-amber-200",
  Archived: "bg-slate-100 text-slate-600 border border-slate-200",
};

const SOURCE_TYPE_ICON = {
  "Git Repository": "bg-slate-100 text-slate-700",
  "Zip File":       "bg-blue-50 text-blue-700",
  "Drive Link":     "bg-green-50 text-green-700",
  "Document Link":  "bg-violet-50 text-violet-700",
};

function FinalSourceList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    const kw = search.toLowerCase();
    return sources.filter((item) => {
      const matchSearch =
        !kw ||
        item.title.toLowerCase().includes(kw) ||
        item.projectCode.toLowerCase().includes(kw) ||
        item.uploadedBy.toLowerCase().includes(kw);
      const matchStatus = !statusFilter || item.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  const stats = [
    { label: "Total Sources", value: sources.length,                                        icon: FiFolder,      iconBg: "bg-slate-100 text-slate-600"       },
    { label: "Active",        value: sources.filter((s) => s.status === "Active").length,   icon: FiCheckCircle, iconBg: "bg-emerald-100 text-emerald-600"   },
    { label: "Under Review",  value: sources.filter((s) => s.status === "Review").length,   icon: FiClock,       iconBg: "bg-amber-100 text-amber-600"       },
    { label: "Total Uploads", value: 12,                                                     icon: FiUploadCloud, iconBg: "bg-violet-100 text-violet-600"     },
  ];

  const hasFilter = search || statusFilter;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-5">

        {/* ── Page Header ── */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">
              Delivery Management
            </p>
            <h1 className="text-xl font-semibold text-gray-900">Final Source Management</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage final project source files, versions and delivery tracking
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard/final-resource/add")}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-800 transition-colors"
          >
            <FiPlus size={15} />
            Add Final Source
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
          <p className="text-sm font-medium text-gray-700 flex-shrink-0">Source List</p>

          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search by project title, code or uploaded by…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          <div className="relative sm:w-44">
            <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 py-2 pl-3 pr-8 text-sm text-gray-700 outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition"
            >
              <option value="">All Status</option>
              <option>Active</option>
              <option>Review</option>
              <option>Archived</option>
            </select>
          </div>

          {hasFilter && (
            <button
              onClick={() => { setSearch(""); setStatusFilter(""); }}
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
                  {["Project", "Source Type", "Uploaded On", "Uploaded By", "Version", "Status", "Actions"].map((h) => (
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
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">

                    {/* Project */}
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="mt-0.5 text-xs text-gray-400">{item.projectCode}</p>
                    </td>

                    {/* Source Type */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium ${SOURCE_TYPE_ICON[item.sourceType] || "bg-gray-100 text-gray-600"}`}>
                        <FiFolder size={12} />
                        {item.sourceType}
                      </span>
                    </td>

                    {/* Uploaded On */}
                    <td className="px-5 py-4 text-gray-500 text-xs">{item.uploadedOn}</td>

                    {/* Uploaded By */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                          {item.uploadedBy.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-gray-700 font-medium text-sm">{item.uploadedBy}</span>
                      </div>
                    </td>

                    {/* Version */}
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-md bg-violet-50 border border-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700">
                        {item.version}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[item.status] || "bg-gray-100 text-gray-600 border border-gray-200"}`}>
                        {item.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <button title="View" className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors">
                          <FiEye size={14} />
                        </button>
                        <button title="Download" className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors">
                          <FiDownload size={14} />
                        </button>
                        <button title="Report" className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
                          <FiFileText size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <div className="mx-auto flex max-w-xs flex-col items-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                          <FiFolder size={22} className="text-gray-400" />
                        </div>
                        <p className="font-medium text-gray-700">No sources found</p>
                        <p className="mt-1 text-xs text-gray-400">Try adjusting your search or filter.</p>
                        {hasFilter && (
                          <button onClick={() => { setSearch(""); setStatusFilter(""); }} className="mt-3 text-xs font-medium text-blue-600 hover:underline">
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

export default FinalSourceList;