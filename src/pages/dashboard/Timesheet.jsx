import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiDownload,
  FiPlus,
  FiClock,
  FiFilter,
  FiX,
  FiBriefcase,
  FiRefreshCcw,

} from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideModal from "../../components/layout/ui/SideModal";

const entries = [
  {
    id: 1,
    date: "20/05/2026",
    project: "No Project",
    module: "General",
    task: "Working on LMT Timesheet UI",
    start: "10:30 AM",
    end: "08:00 PM",
    hours: "09:30",
    status: "Non Billable",
  },
  {
    id: 2,
    date: "19/05/2026",
    project: "ERP Portal",
    module: "Dashboard",
    task: "Dashboard layout update",
    start: "10:30 AM",
    end: "08:00 PM",
    hours: "09:30",
    status: "Billable",
  },
];

function Timesheet() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Timesheet Management
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Track working hours, project activity and employee productivity.
          </p>
        </div>

        {/* TOP CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
  {/* FIXED PRICE */}
<div
  onClick={() => navigate("/dashboard/fixed-price")}
  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-5 border border-slate-700/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
>    
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          Project Type
        </p>

        <h2 className="text-2xl font-bold text-white mt-2">
          Fixed Price
        </h2>
      </div>

      <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
        <FiBriefcase className="text-white text-lg" />
      </div>
    </div>

    <p className="text-sm leading-6 text-slate-300 mt-4">
      Standard fixed-cost project tracking.
    </p>

    <div className="flex items-center justify-between mt-5">
      <span className="text-xs text-slate-400">
        Enterprise Workflow
      </span>

      <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-[11px] font-semibold">
        Active
      </span>
    </div>
  </div>

  {/* TIME & MATERIAL */}
  <div onClick={() => navigate("/dashboard/time-material")} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-800 to-blue-700 p-5 border border-indigo-700/60 shadow-sm hover:shadow-lg transition-all duration-300">

    <div className="flex items-start justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-200/70">
          Project Type
        </p>

        <h2 className="text-2xl font-bold text-white mt-2">
          Time & Material
        </h2>
      </div>

      <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
        <FiClock className="text-white text-lg" />
      </div>
    </div>

    <p className="text-sm leading-6 text-blue-100/90 mt-4">
      Flexible hourly billing workflow.
    </p>

    <div className="flex items-center justify-between mt-5">
      <span className="text-xs text-blue-100/70">
        Productivity Tracking
      </span>

      <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold">
        Running
      </span>
    </div>
  </div>

  {/* RETAINER */}
  <div onClick={() => navigate("/dashboard/retainer")} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-800 to-fuchsia-700 p-5 border border-violet-700/60 shadow-sm hover:shadow-lg transition-all duration-300">

    <div className="flex items-start justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-200/70">
          Project Type
        </p>

        <h2 className="text-2xl font-bold text-white mt-2">
          Retainer
        </h2>
      </div>

      <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
        <FiRefreshCcw className="text-white text-lg" />
      </div>
    </div>

    <p className="text-sm leading-6 text-violet-100/90 mt-4">
      Monthly recurring client engagement.
    </p>

    <div className="flex items-center justify-between mt-5">
      <span className="text-xs text-violet-100/70">
        Long-Term Contract
      </span>

      <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold">
        Stable
      </span>
    </div>
  </div>
</div>
        {/* FILTER */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-5">
            <FiFilter className="text-slate-500" />

            <h2 className="font-bold text-slate-900">
              Filter Timesheet
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <select className="px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none">
              <option>All Projects</option>
            </select>

            <input
              type="date"
              className="px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none"
            />

            <input
              type="date"
              className="px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none"
            />

            <select className="px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none">
              <option>All Status</option>
            </select>

            <select className="px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none">
              <option>Newest First</option>
            </select>

            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold">
              Apply
            </button>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Tuesday, 26 May 2026
            </h2>

            <div className="flex flex-wrap gap-5 mt-3 text-sm">
              <p className="text-slate-600">
                Billable:
                <span className="font-bold text-slate-900 ml-1">
                  09:30 Hrs
                </span>
              </p>

              <p className="text-slate-600">
                Non Billable:
                <span className="font-bold text-slate-900 ml-1">
                  09:30 Hrs
                </span>
              </p>

              <p className="text-slate-600">
                Total:
                <span className="font-bold text-blue-600 ml-1">
                  19:00 Hrs
                </span>
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm font-semibold"
            >
              <FiPlus />
              Add Timesheet
            </button>

            <button className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-xl text-sm font-semibold text-slate-700">
              <FiDownload />
              Export
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-slate-900 text-white">
                <tr>
                  {[
                    "Date",
                    "Project",
                    "Module",
                    "Task",
                    "Start",
                    "End",
                    "Hours",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {entries.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-5 text-sm text-slate-700">
                      {item.date}
                    </td>

                    <td className="px-6 py-5 font-semibold text-slate-900">
                      {item.project}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-700">
                      {item.module}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-700">
                      {item.task}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-700">
                      {item.start}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-700">
                      {item.end}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <FiClock size={14} />
                        {item.hours}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === "Billable"
                            ? "bg-green-100 text-green-600"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {item.status}
                      </span>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ADD TIMESHEET MODAL */}
      <SideModal
        open={openModal}
        title="Add New Timesheet"
        subtitle="Add project work hours and employee activity."
        onClose={() => setOpenModal(false)}
        width="640px"
      >
        <div>
            {/* FORM */}
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Project
                  </label>

                  <select className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none">
                    <option>Select Project</option>
                    <option>No Project</option>
                    <option>ERP Portal</option>
                    <option>Timesheet System</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Module
                  </label>

                  <select className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none">
                    <option>Select Module</option>
                    <option>General</option>
                    <option>Dashboard</option>
                    <option>UI</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Task Description
                </label>

                <textarea
                  rows="5"
                  placeholder="Write work details..."
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Date
                  </label>

                  <input
                    type="date"
                    className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Start Time
                  </label>

                  <input
                    type="time"
                    className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    End Time
                  </label>

                  <input
                    type="time"
                    className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Hours Worked
                  </label>

                  <input
                    type="text"
                    placeholder="09:30"
                    className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Work Type
                  </label>

                  <select className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none">
                    <option>Billable</option>
                    <option>Non Billable</option>
                  </select>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="sticky bottom-0 bg-white border-t border-slate-100 p-5 flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700"
              >
                Cancel
              </button>

              <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold">
                Save Timesheet
              </button>
            </div>
          </div>
        </SideModal>
    </>
  );
}

export default Timesheet;