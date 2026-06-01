import {
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiCalendar,
  FiSearch,
  FiPlus,
  FiX,
} from "react-icons/fi";
import { useState } from "react";

const tasks = [
  {
    id: 1,
    project: "Timesheet System",
    employee: "Kaif",
    task: "Create dashboard layout",
    priority: "High",
    status: "In Progress",
    deadline: "28 May 2026",
  },
  {
    id: 2,
    project: "PMS",
    employee: "Ahamed",
    task: "Fix tenant module bugs",
    priority: "Medium",
    status: "Completed",
    deadline: "30 May 2026",
  },
  {
    id: 3,
    project: "RFP Portal",
    employee: "Farzan",
    task: "Prepare estimation table",
    priority: "High",
    status: "Pending",
    deadline: "02 Jun 2026",
  },
];

function TaskList() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const filteredTasks = tasks.filter((item) => {
    const matchFilter =
      filter === "All" ? true : item.status === filter;

    const matchSearch =
      item.project.toLowerCase().includes(search.toLowerCase()) ||
      item.task.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  return (
    <>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Task Management
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Track employee work, assigned tasks and project progress.
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm"
          >
            <FiPlus />
            Add Task
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <FiClock className="text-blue-600 mb-3" size={22} />

            <p className="text-sm text-slate-500">Total Tasks</p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              {tasks.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <FiCheckCircle
              className="text-green-600 mb-3"
              size={22}
            />

            <p className="text-sm text-slate-500">Completed</p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              1
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <FiAlertCircle
              className="text-orange-500 mb-3"
              size={22}
            />

            <p className="text-sm text-slate-500">Pending</p>

            <h2 className="text-3xl font-bold text-orange-500 mt-2">
              1
            </h2>
          </div>
        </div>

        {/* FILTER */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* SEARCH */}
            <div className="relative w-full lg:max-w-md">
              <FiSearch className="absolute top-4 left-4 text-slate-400" />

              <input
                type="text"
                placeholder="Search task or project..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* FILTER BUTTONS */}
            <div className="flex gap-3 flex-wrap">
              {[
                "All",
                "In Progress",
                "Completed",
                "Pending",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
                    filter === item
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* TASK TABLE */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">
                    Project
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">
                    Employee
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">
                    Task
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">
                    Priority
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">
                    Deadline
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredTasks.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-900">
                        {item.project}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {item.employee}
                    </td>

                    <td className="px-6 py-5 text-slate-700">
                      {item.task}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.priority === "High"
                            ? "bg-red-100 text-red-600"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {item.priority}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === "Completed"
                            ? "bg-green-100 text-green-600"
                            : item.status === "In Progress"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <FiCalendar size={14} />
                        {item.deadline}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ADD TASK MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xl h-screen bg-white shadow-2xl overflow-y-auto">
            {/* HEADER */}
            <div className="flex items-start justify-between p-6 border-b border-slate-100">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Create New Task
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Add employee task and project work details.
                </p>
              </div>

              <button
                onClick={() => setOpenModal(false)}
                className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center"
              >
                <FiX className="text-slate-500" size={20} />
              </button>
            </div>

            {/* FORM */}
            <div className="p-6 space-y-5">
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Project
                </label>

                <select className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none">
                  <option>Select Project</option>
                  <option>Timesheet System</option>
                  <option>PMS</option>
                  <option>RFP Portal</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Employee
                </label>

                <select className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none">
                  <option>Select Employee</option>
                  <option>Kaif</option>
                  <option>Ahamed</option>
                  <option>Farzan</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Task Title
                </label>

                <input
                  type="text"
                  placeholder="Enter task title"
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Description
                </label>

                <textarea
                  rows="5"
                  placeholder="Write task details..."
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Priority
                  </label>

                  <select className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Deadline
                  </label>

                  <input
                    type="date"
                    className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Status
                </label>

                <select className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none">
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
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
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskList;