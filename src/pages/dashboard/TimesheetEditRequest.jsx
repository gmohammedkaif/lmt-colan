import { useState } from "react";
import {
  FiPlus,
  FiClock,
  FiAlertCircle,
  FiCheckCircle,
  FiEye,
  FiX,
} from "react-icons/fi";

const requests = [
  {
    id: 1,
    interval: "Last 15 Days",
    validUpto: "3 Days",
    status: "Pending",
  },
  {
    id: 2,
    interval: "Last 7 Days",
    validUpto: "Approved",
    status: "Approved",
  },
];

function TimesheetEditRequest() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Edit Request
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Request permission to edit locked timesheets.
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="h-12 px-5 rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-semibold flex items-center gap-2 shadow-sm"
        >
          <FiPlus />
          New Request
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Requests</p>
              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                2
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
              <FiClock className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Pending</p>
              <h2 className="text-3xl font-bold text-amber-500 mt-2">
                1
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center">
              <FiAlertCircle className="text-amber-500 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Approved</p>
              <h2 className="text-3xl font-bold text-emerald-600 mt-2">
                1
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
              <FiCheckCircle className="text-emerald-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">
            Request History
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  Interval
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  Valid Upto
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {requests.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-5 text-sm font-medium text-slate-700">
                    {item.interval}
                  </td>

                  <td className="px-6 py-5 text-sm font-medium text-slate-700">
                    {item.validUpto}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Approved"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end">
                      <button className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition">
                        <FiEye className="text-slate-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden">
            
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  New Edit Request
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Submit timesheet edit permission request.
                </p>
              </div>

              <button
                onClick={() => setOpenModal(false)}
                className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center"
              >
                <FiX className="text-slate-500 text-lg" />
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 space-y-5">
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Select Interval
                </label>

                <select className="mt-2 w-full h-12 rounded-xl border border-slate-200 px-4 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500">
                  <option>Last 7 Days</option>
                  <option>Last 15 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Reason
                </label>

                <textarea
                  rows="4"
                  placeholder="Write reason..."
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setOpenModal(false)}
                  className="h-12 px-5 rounded-xl border border-slate-200 hover:bg-slate-100 text-sm font-semibold"
                >
                  Cancel
                </button>

                <button className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-semibold">
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimesheetEditRequest;