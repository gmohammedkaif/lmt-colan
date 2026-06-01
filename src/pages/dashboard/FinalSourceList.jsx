import { useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiEye,
  FiDownload,
  FiFileText,
  FiGitBranch,
  FiUploadCloud,
  FiClock,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";

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
    description:
      "Production-ready repository with frontend and backend modules.",
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
    description:
      "Source package uploaded for client review and deployment validation.",
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
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);

  const filteredSources = sources.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.projectCode.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    {
      title: "Total Sources",
      value: "2",
      icon: FiGitBranch,
      color: "blue",
    },
    {
      title: "Active",
      value: "1",
      icon: FiCheckCircle,
      color: "green",
    },
    {
      title: "Under Review",
      value: "1",
      icon: FiClock,
      color: "orange",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Final Source
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage final project source files, versions and delivery records.
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-sm"
        >
          <FiPlus />
          Add Final Source
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    {item.title}
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
                      : "bg-orange-50 text-orange-600"
                  }`}
                >
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search by project title or project code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
          />
        </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-5 py-4 text-xs font-bold uppercase text-slate-500">
                  Project
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold uppercase text-slate-500">
                  Source Type
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold uppercase text-slate-500">
                  Upload On
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold uppercase text-slate-500">
                  Upload By
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold uppercase text-slate-500">
                  Version
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold uppercase text-slate-500">
                  Status
                </th>

                <th className="text-right px-5 py-4 text-xs font-bold uppercase text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredSources.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >
                  {/* Project */}
                  <td className="px-5 py-5">
                    <p className="font-semibold text-slate-900">
                      {item.title}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      {item.projectCode}
                    </p>
                  </td>

                  {/* Source Type */}
                  <td className="px-5 py-5 text-sm text-slate-700">
                    {item.sourceType}
                  </td>

                  {/* Upload On */}
                  <td className="px-5 py-5 text-sm text-slate-700">
                    {item.uploadedOn}
                  </td>

                  {/* Upload By */}
                  <td className="px-5 py-5 text-sm text-slate-700">
                    {item.uploadedBy}
                  </td>

                  {/* Version */}
                  <td className="px-5 py-5">
                    <span className="font-semibold text-slate-900">
                      {item.version}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        item.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : "bg-orange-50 text-orange-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedSource(item)}
                        className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition"
                      >
                        <FiEye />
                      </button>

                      <button className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition">
                        <FiDownload />
                      </button>

                      <button className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition">
                        <FiFileText />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredSources.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-12 text-slate-500"
                  >
                    No source records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* View Modal */}
      {selectedSource && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xl h-screen bg-white shadow-2xl overflow-y-auto">
            <div className="flex items-start justify-between p-6 border-b border-slate-100">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Final Source Details
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  View uploaded source and release information.
                </p>
              </div>

              <button
                onClick={() => setSelectedSource(null)}
                className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center"
              >
                <FiX />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <p className="text-sm text-slate-500">
                  Project Name
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  {selectedSource.title}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-sm text-slate-500">
                    Project Code
                  </p>

                  <h4 className="font-bold text-slate-900 mt-1">
                    {selectedSource.projectCode}
                  </h4>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-sm text-slate-500">
                    Version
                  </p>

                  <h4 className="font-bold text-slate-900 mt-1">
                    {selectedSource.version}
                  </h4>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-sm text-slate-500">
                    Uploaded By
                  </p>

                  <h4 className="font-bold text-slate-900 mt-1">
                    {selectedSource.uploadedBy}
                  </h4>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-sm text-slate-500">
                    Upload Date
                  </p>

                  <h4 className="font-bold text-slate-900 mt-1">
                    {selectedSource.uploadedOn}
                  </h4>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                <p className="text-sm text-blue-600 font-semibold">
                  Source Description
                </p>

                <p className="text-sm text-blue-900 mt-2 leading-7">
                  {selectedSource.description}
                </p>
              </div>

              <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-4">
                <div>
                  <p className="text-sm text-slate-500">
                    Current Status
                  </p>

                  <h4 className="font-bold text-slate-900 mt-1">
                    {selectedSource.status}
                  </h4>
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold
                  ${
                    selectedSource.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {selectedSource.status}
                </span>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-slate-100 p-5 flex justify-end gap-3">
              <button
                onClick={() => setSelectedSource(null)}
                className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50"
              >
                Close
              </button>

              <button className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">
                Download Source
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xl h-screen bg-white shadow-2xl overflow-y-auto">
            <div className="flex items-start justify-between p-6 border-b border-slate-100">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Add Final Source
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Upload and manage final delivery source files.
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
                  Project Title
                </label>

                <input
                  type="text"
                  placeholder="Enter project title"
                  className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Project Code
                </label>

                <input
                  type="text"
                  placeholder="PRJ-2026-001"
                  className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Source Type
                  </label>

                  <select className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-100">
                    <option>Git Repository</option>
                    <option>Zip File</option>
                    <option>Drive Link</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Version
                  </label>

                  <input
                    type="text"
                    placeholder="v1.0"
                    className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Upload Source
                </label>

                <div className="mt-2 border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-blue-400 transition">
                  <FiUploadCloud
                    className="mx-auto text-slate-400 mb-3"
                    size={34}
                  />

                  <p className="text-sm text-slate-600">
                    Click to upload source file
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    ZIP, RAR or repository link
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  rows={5}
                  placeholder="Enter source delivery notes..."
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
                Save Source
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FinalSourceList;