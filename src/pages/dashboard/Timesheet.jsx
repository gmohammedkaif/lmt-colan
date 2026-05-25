import { FiEye, FiEdit2, FiTrash2, FiDownload, FiPlus } from "react-icons/fi";

const entries = [
  {
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
    date: "19/05/2026",
    project: "No Project",
    module: "General",
    task: "Dashboard layout update",
    start: "10:30 AM",
    end: "08:00 PM",
    hours: "09:30",
    status: "Non Billable",
  },
];

function Timesheet() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-emerald-500 text-white p-6 shadow-sm">
          <p className="text-sm font-semibold opacity-80">PROJECT TYPE</p>
          <h2 className="text-2xl font-bold mt-2">Fixed Price</h2>
        </div>

        <div className="rounded-2xl bg-orange-400 text-white p-6 shadow-sm">
          <p className="text-sm font-semibold opacity-80">PROJECT TYPE</p>
          <h2 className="text-2xl font-bold mt-2">Time & Material</h2>
        </div>

        <div className="rounded-2xl bg-red-400 text-white p-6 shadow-sm">
          <p className="text-sm font-semibold opacity-80">PROJECT TYPE</p>
          <h2 className="text-2xl font-bold mt-2">Retainer</h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm p-5">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <select className="px-4 py-3 rounded-xl border text-sm">
            <option>All Projects</option>
          </select>
          <input type="date" className="px-4 py-3 rounded-xl border text-sm" />
          <input type="date" className="px-4 py-3 rounded-xl border text-sm" />
          <select className="px-4 py-3 rounded-xl border text-sm">
            <option>All</option>
          </select>
          <select className="px-4 py-3 rounded-xl border text-sm">
            <option>Descending</option>
          </select>
          <button className="bg-blue-600 text-white rounded-xl text-sm font-semibold">
            Submit
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Thursday, 21 May 2026
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Billable: <b>00:00</b> &nbsp; Non Billable: <b>19:00</b> &nbsp; Total:{" "}
            <b>19:00</b>
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-semibold">
            <FiPlus /> No Project
          </button>
          <button className="flex items-center gap-2 bg-white border px-5 py-3 rounded-xl text-sm font-semibold">
            <FiDownload /> Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-slate-800 text-white">
            <tr>
              {["Date", "Project", "Module", "Task", "Start", "End", "Hours", "Status", "Actions"].map(
                (h) => (
                  <th key={h} className="px-5 py-4 text-left text-sm">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {entries.map((item, index) => (
              <tr key={index} className="border-b hover:bg-slate-50">
                <td className="px-5 py-4 text-sm">{item.date}</td>
                <td className="px-5 py-4 text-sm">{item.project}</td>
                <td className="px-5 py-4 text-sm">{item.module}</td>
                <td className="px-5 py-4 text-sm">{item.task}</td>
                <td className="px-5 py-4 text-sm">{item.start}</td>
                <td className="px-5 py-4 text-sm">{item.end}</td>
                <td className="px-5 py-4 text-sm font-bold">{item.hours}</td>
                <td className="px-5 py-4">
                  <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold">
                    {item.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-blue-50 text-blue-600"><FiEye /></button>
                    <button className="p-2 rounded-lg bg-green-50 text-green-600"><FiEdit2 /></button>
                    <button className="p-2 rounded-lg bg-red-50 text-red-600"><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Timesheet;