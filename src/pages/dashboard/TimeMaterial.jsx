import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiFilter,
} from "react-icons/fi";
import { useState } from "react";

const projects = [
  {
    id: 1,
    code: "TM-001",
    name: "ERP Portal",
    client: "ABC Pvt Ltd",
    status: "In Progress",
    hours: "120:30",
  },
  {
    id: 2,
    code: "TM-002",
    name: "HRMS System",
    client: "XYZ Solutions",
    status: "Completed",
    hours: "210:15",
  },
  {
    id: 3,
    code: "TM-003",
    name: "E-Commerce Website",
    client: "Tech Corp",
    status: "Hold",
    hours: "75:45",
  },
];

function TimeMaterial() {
  const [statusFilter, setStatusFilter] = useState("All");

  return (
    <>
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Time & Material Management
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Track hourly billing projects and logged employee effort.
          </p>
        </div>

        {/* FILTER BOX */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-5">
            <FiFilter className="text-slate-500" />

            <h2 className="font-bold text-slate-900">
              Filter Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 outline-none"
            >
              <option>All</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Hold</option>
              <option>Cancelled</option>
            </select>

            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold">
              Apply
            </button>

            <button className="border border-slate-200 rounded-xl text-sm font-semibold text-slate-700">
              Reset
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="bg-slate-900 text-white">
                <tr>
                  {[
                    "Project Code",
                    "Project Name",
                    "Client",
                    "Status",
                    "Hours Logged",
                    "Actions",
                  ].map((head) => (
                    <th
                      key={head}
                      className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                              {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-5 font-semibold text-slate-900">
                      {project.code}
                    </td>

                    <td className="px-6 py-5 text-slate-700">
                      {project.name}
                    </td>

                    <td className="px-6 py-5 text-slate-700">
                      {project.client}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          project.status === "Completed"
                            ? "bg-green-100 text-green-600"
                            : project.status === "Hold"
                            ? "bg-orange-100 text-orange-600"
                            : project.status === "Cancelled"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>

                    <td className="px-6 py-5 font-semibold text-slate-900">
                      {project.hours}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex gap-2">
                        <button className="w-9 h-9 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center">
                          <FiEye />
                        </button>

                        <button className="w-9 h-9 rounded-xl bg-green-50 hover:bg-green-100 text-green-600 flex items-center justify-center">
                          <FiEdit2 />
                        </button>

                        <button className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {projects.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-10 text-slate-500"
                    >
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TimeMaterial;