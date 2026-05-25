import { FiPlus } from "react-icons/fi";

function TimesheetApproval() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Timesheet Approval</h1>
          <p className="text-sm text-slate-500 mt-1">
            Send approval request for your timesheet period.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-semibold">
          <FiPlus /> New Approval
        </button>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-bold text-slate-500 uppercase">From Date</th>
              <th className="px-5 py-4 text-left text-xs font-bold text-slate-500 uppercase">To Date</th>
              <th className="px-5 py-4 text-left text-xs font-bold text-slate-500 uppercase">Status</th>
              <th className="px-5 py-4 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4" className="text-center py-10 text-slate-500">
                No approval records found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TimesheetApproval;