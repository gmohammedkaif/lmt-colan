import { useState } from "react";
import { FiSearch, FiPlus, FiEye, FiDownload, FiFileText } from "react-icons/fi";
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

function FinalSourceList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredSources = sources.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.projectCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Final Source</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage final project source files, versions and delivery records.
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard/final-resource/add")}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700"
        >
          <FiPlus />
          Add Final Source
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <p className="text-sm text-slate-500">Total Sources</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">2</h2>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <p className="text-sm text-slate-500">Active</p>
          <h2 className="text-2xl font-bold text-green-600 mt-1">1</h2>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <p className="text-sm text-slate-500">Under Review</p>
          <h2 className="text-2xl font-bold text-orange-500 mt-1">1</h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by project title or project code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">Project</th>
                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">Source Type</th>
                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">Upload On</th>
                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">Upload By</th>
                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">Version</th>
                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                <th className="text-right px-5 py-4 text-xs font-bold text-slate-500 uppercase">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredSources.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.projectCode}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-700">{item.sourceType}</td>
                  <td className="px-5 py-4 text-sm text-slate-700">{item.uploadedOn}</td>
                  <td className="px-5 py-4 text-sm text-slate-700">{item.uploadedBy}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-900">{item.version}</td>
                  <td className="px-5 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === "Active"
                        ? "bg-green-50 text-green-700"
                        : "bg-orange-50 text-orange-700"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <FiEye />
                      </button>
                      <button className="w-9 h-9 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                        <FiDownload />
                      </button>
                      <button className="w-9 h-9 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center">
                        <FiFileText />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FinalSourceList;