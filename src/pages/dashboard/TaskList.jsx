import { FiClock, FiCheckCircle, FiAlertCircle, FiCalendar } from "react-icons/fi";

const tasks = [
  {
    id: 1,
    project: "Timesheet System",
    employee: "Kaif",
    task: "Create dashboard layout",
    priority: "High",
    status: "In Progress",
  },
  {
    id: 2,
    project: "PMS",
    employee: "Ahamed",
    task: "Fix tenant module bugs",
    priority: "Medium",
    status: "Completed",
  },
  {
    id: 3,
    project: "RFP Portal",
    employee: "Farzan",
    task: "Prepare estimation table",
    priority: "High",
    status: "Pending",
  },
];

function TaskList() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Task List</h1>
        <p className="text-sm text-slate-500 mt-1">
          Track assigned project tasks, employee work and timesheet summary.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border shadow-sm">
          <FiClock className="text-blue-600 mb-3" size={22} />
          <p className="text-sm text-slate-500">Total Tasks</p>
          <h2 className="text-2xl font-bold">{tasks.length}</h2>
        </div>

        <div className="bg-white rounded-2xl p-5 border shadow-sm">
          <FiCheckCircle className="text-green-600 mb-3" size={22} />
          <p className="text-sm text-slate-500">Completed</p>
          <h2 className="text-2xl font-bold text-green-600">1</h2>
        </div>

        <div className="bg-white rounded-2xl p-5 border shadow-sm">
          <FiAlertCircle className="text-orange-500 mb-3" size={22} />
          <p className="text-sm text-slate-500">Pending</p>
          <h2 className="text-2xl font-bold text-orange-500">1</h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full min-w-[900px]">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-bold text-slate-500 uppercase">Project</th>
              <th className="px-5 py-4 text-left text-xs font-bold text-slate-500 uppercase">Employee</th>
              <th className="px-5 py-4 text-left text-xs font-bold text-slate-500 uppercase">Task</th>
              <th className="px-5 py-4 text-left text-xs font-bold text-slate-500 uppercase">Priority</th>
              <th className="px-5 py-4 text-left text-xs font-bold text-slate-500 uppercase">Status</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((item) => (
              <tr key={item.id} className="border-b hover:bg-slate-50">
                <td className="px-5 py-4 font-semibold text-slate-900">{item.project}</td>
                <td className="px-5 py-4 text-slate-600">{item.employee}</td>
                <td className="px-5 py-4 text-slate-700">{item.task}</td>
                <td className="px-5 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.priority === "High"
                      ? "bg-red-50 text-red-700"
                      : "bg-orange-50 text-orange-700"
                  }`}>
                    {item.priority}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.status === "Completed"
                      ? "bg-green-50 text-green-700"
                      : item.status === "In Progress"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-orange-50 text-orange-700"
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b">
          <h2 className="font-bold text-slate-900">Your Timesheet Summary</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="p-5 border-b md:border-b-0 md:border-r">
            <p className="text-sm text-slate-500">Today</p>
            <h3 className="font-bold mt-1">00:00 / 10:00 Hrs</h3>
            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold">
              Incomplete
            </span>
          </div>

          <div className="p-5 border-b md:border-b-0 md:border-r">
            <p className="text-sm text-slate-500">Yesterday</p>
            <h3 className="font-bold mt-1">09:30 / 10:00 Hrs</h3>
            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
              Good
            </span>
          </div>

          <div className="p-5">
            <p className="text-sm text-slate-500">This Week</p>
            <h3 className="font-bold mt-1">19:00 / 30:00 Hrs</h3>
            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold">
              Incomplete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskList;