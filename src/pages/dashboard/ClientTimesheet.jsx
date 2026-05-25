import { FiPlus } from "react-icons/fi";

function ClientTimesheet() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border shadow-sm p-5">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <select className="px-4 py-3 rounded-xl border text-sm">
            <option>All Projects</option>
          </select>
          <input type="date" className="px-4 py-3 rounded-xl border text-sm" />
          <input type="date" className="px-4 py-3 rounded-xl border text-sm" />
          <select className="px-4 py-3 rounded-xl border text-sm">
            <option>Status</option>
          </select>
          <select className="px-4 py-3 rounded-xl border text-sm">
            <option>Descending</option>
          </select>
          <button className="bg-blue-600 text-white rounded-xl text-sm font-semibold">
            Submit
          </button>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Client Timesheet List
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track client billable timesheet records and approvals.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-semibold">
          <FiPlus /> Add New
        </button>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full min-w-[900px]">
          <thead className="bg-sky-600 text-white">
            <tr>
              {["Date", "Project Code", "Project Name", "Project Mode", "Billable Hours", "Status", "Actions"].map(
                (h) => (
                  <th key={h} className="px-5 py-4 text-left text-sm">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="7" className="text-center py-10 text-slate-500">
                No client timesheet records found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientTimesheet;