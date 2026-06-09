import { useState } from "react";
import {
  FiPlus,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiX,
} from "react-icons/fi";
import SideModal from "../../components/layout/ui/SideModal";

const approvals = [
  {
    id: 1,
    from: "20 May 2026",
    to: "26 May 2026",
    status: "Pending",
  },
  {
    id: 2,
    from: "13 May 2026",
    to: "19 May 2026",
    status: "Approved",
  },
];

function TimesheetApproval() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Timesheet Approval
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage and send weekly approval requests.
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="h-12 px-5 rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-semibold flex items-center gap-2 shadow-sm"
        >
          <FiPlus />
          New Approval
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Requests
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                2
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
              <FiCalendar className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Pending
              </p>

              <h2 className="text-3xl font-bold text-amber-500 mt-2">
                1
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center">
              <FiClock className="text-amber-500 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Approved
              </p>

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
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">
            Approval History
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  From Date
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  To Date
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
              {approvals.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-5 text-sm font-medium text-slate-700">
                    {item.from}
                  </td>

                  <td className="px-6 py-5 text-sm font-medium text-slate-700">
                    {item.to}
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
                      <button className="h-10 px-4 rounded-xl border border-slate-200 hover:bg-slate-100 transition text-sm font-semibold">
                        View
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
      <SideModal
        open={openModal}
        title="New Approval Request"
        subtitle="Submit weekly timesheet for approval."
        onClose={() => setOpenModal(false)}
      >
        <div>
            {/* BODY */}
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    From Date
                  </label>

                  <input
                    type="date"
                    className="mt-2 w-full h-12 rounded-xl border border-slate-200 px-4 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    To Date
                  </label>

                  <input
                    type="date"
                    className="mt-2 w-full h-12 rounded-xl border border-slate-200 px-4 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Comments
                </label>

                <textarea
                  rows="4"
                  placeholder="Write comments..."
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                />
              </div>

              {/* ACTIONS */}
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
        </SideModal>
    </div>
  );
}

export default TimesheetApproval;