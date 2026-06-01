import { FiPlus, FiFilter, FiEye } from "react-icons/fi";

const records = [
  {
    id: 1,
    date: "26 May 2026",
    code: "ERP-001",
    project: "ERP Portal",
    mode: "Fixed Price",
    hours: "09:30",
    status: "Approved",
  },
  {
    id: 2,
    date: "25 May 2026",
    code: "QA-002",
    project: "QA Dashboard",
    mode: "Retainer",
    hours: "08:00",
    status: "Pending",
  },
];

function ClientTimesheet() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Client Approval
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Track client billable timesheet approvals.
          </p>
        </div>

        <button className="h-12 px-5 rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-semibold flex items-center gap-2 shadow-sm">
          <FiPlus />
          Add New
        </button>
      </div>

      {/* FILTER */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-5">
          <FiFilter className="text-slate-500" />

          <h2 className="text-lg font-bold text-slate-900">
            Filter Records
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <select className="h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none">
            <option>All Projects</option>
          </select>

          <input
            type="date"
            className="h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none"
          />

          <input
            type="date"
            className="h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none"
          />

          <select className="h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none">
            <option>All Status</option>
          </select>

          <button className="h-12 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-semibold">
            Apply Filter
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">
            Client Timesheet List
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead className="bg-slate-50">
              <tr>
                {[
                  "Date",
                  "Project Code",
                  "Project Name",
                  "Project Mode",
                  "Billable Hours",
                  "Status",
                  "Actions",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {records.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-5 text-sm text-slate-700">
                    {item.date}
                  </td>

                  <td className="px-6 py-5 text-sm font-semibold text-slate-800">
                    {item.code}
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-700">
                    {item.project}
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-700">
                    {item.mode}
                  </td>

                  <td className="px-6 py-5 text-sm font-bold text-slate-900">
                    {item.hours}
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
                    <button className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition">
                      <FiEye className="text-slate-700" />
                    </button>
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

export default ClientTimesheet;