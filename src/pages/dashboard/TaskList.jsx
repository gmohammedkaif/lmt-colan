import { useEffect, useMemo, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiX,
} from "react-icons/fi";

const STORAGE_KEY = "cipl_tasks";

function TaskList() {
  const [mode, setMode] = useState("day");
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [form, setForm] = useState({
    project: "",
    employee: "",
    task: "",
    priority: "Normal",
    status: "Pending",
  });

  const today = new Date();

  const displayDate = today.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const summary = useMemo(() => {
    return {
      todayWorked: "00:00 Hrs",
      todayTotal: "10:00 Hrs",
      yesterdayWorked: "09:30 Hrs",
      yesterdayTotal: "10:00 Hrs",
      weekWorked: "28:30 Hrs",
      weekTotal: "30:00 Hrs",
    };
  }, []);

  const handleCreateTask = (e) => {
    e.preventDefault();

    if (!form.project || !form.employee || !form.task) {
      alert("Please fill all required fields");
      return;
    }

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...form,
      },
    ]);

    setForm({
      project: "",
      employee: "",
      task: "",
      priority: "Normal",
      status: "Pending",
    });

    setOpenModal(false);
  };

  const deleteTask = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmDelete) {
      setTasks((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* CONTROLS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button className="cursor-pointer flex items-center gap-1 px-4 py-2 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 text-sm font-bold hover:bg-sky-100">
              <FiChevronLeft />
              PREV
            </button>

            <button className="cursor-pointer flex items-center gap-1 px-4 py-2 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 text-sm font-bold hover:bg-sky-100">
              NEXT
              <FiChevronRight />
            </button>

            <button className="cursor-pointer px-4 py-2 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 text-sm font-bold hover:bg-sky-100">
              CURRENT
            </button>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex rounded-lg overflow-hidden border border-sky-200">
              {["day", "week", "month"].map((item) => (
                <button
                  key={item}
                  onClick={() => setMode(item)}
                  className={`cursor-pointer px-4 py-2 text-sm font-bold capitalize transition ${
                    mode === item
                      ? "bg-sky-500 text-white"
                      : "bg-sky-50 text-sky-700 hover:bg-sky-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={() => setOpenModal(true)}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
            >
              <FiPlus />
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* TASK TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-5 py-4 text-center text-sky-700 font-semibold">
                  Project
                </th>
                <th className="px-5 py-4 text-center text-sky-700 font-semibold">
                  Employee
                </th>
                <th className="px-5 py-4 text-center text-sky-700 font-semibold">
                  Task
                </th>
                <th className="px-5 py-4 text-center text-sky-700 font-semibold">
                  Priority
                </th>
                <th className="px-5 py-4 text-center text-sky-700 font-semibold">
                  Status
                </th>
                <th className="px-5 py-4 text-center text-sky-700 font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-slate-200">
                <td
                  colSpan="6"
                  className="px-5 py-4 text-center font-bold text-slate-900"
                >
                  {displayDate}
                </td>
              </tr>

              {tasks.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-6 text-center text-sm text-slate-600"
                  >
                    No Task Found
                  </td>
                </tr>
              ) : (
                tasks.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="px-5 py-4 text-center font-semibold text-slate-800">
                      {item.project}
                    </td>

                    <td className="px-5 py-4 text-center text-slate-600">
                      {item.employee}
                    </td>

                    <td className="px-5 py-4 text-center text-slate-700">
                      {item.task}
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                        {item.priority}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-xs font-bold">
                        {item.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => deleteTask(item.id)}
                        className="cursor-pointer px-4 py-2 rounded-lg bg-rose-50 text-rose-600 border border-rose-100 text-xs font-bold hover:bg-rose-100"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* TIMESHEET SUMMARY */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-200">
                <th className="px-6 py-4 text-left text-sky-700 font-semibold">
                  Your Timesheet Summary
                </th>
                <th className="px-6 py-4 text-center text-sky-700 font-semibold">
                  Hours Status
                </th>
                <th className="px-6 py-4 text-center text-sky-700 font-semibold">
                  Report
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-slate-200">
                <td className="px-6 py-5">
                  Today{" "}
                  <span className="text-slate-500 ml-2">(04/06/2026)</span>
                </td>

                <td className="px-6 py-5 text-center">
                  {summary.todayWorked}
                  <span className="text-slate-500 mx-2">Out Of</span>
                  {summary.todayTotal}
                </td>

                <td className="px-6 py-5 text-center">
                  <span className="inline-block min-w-[130px] px-5 py-2 rounded-lg bg-rose-50 text-rose-600 border border-rose-100 text-sm font-bold">
                    Incomplete
                  </span>
                </td>
              </tr>

              <tr className="border-b border-slate-200">
                <td className="px-6 py-5">
                  Yesterday{" "}
                  <span className="text-slate-500 ml-2">(03/06/2026)</span>
                </td>

                <td className="px-6 py-5 text-center">
                  {summary.yesterdayWorked}
                  <span className="text-slate-500 mx-2">Out Of</span>
                  {summary.yesterdayTotal}
                </td>

                <td className="px-6 py-5 text-center">
                  <span className="inline-block min-w-[130px] px-5 py-2 rounded-lg bg-sky-50 text-sky-700 border border-sky-100 text-sm font-bold">
                    Good
                  </span>
                </td>
              </tr>

              <tr>
                <td className="px-6 py-5">
                  This Week{" "}
                  <span className="text-slate-500 ml-2">
                    (01 2026 - 05 June 2026)
                  </span>
                </td>

                <td className="px-6 py-5 text-center">
                  {summary.weekWorked}
                  <span className="text-slate-500 mx-2">Out Of</span>
                  {summary.weekTotal}
                </td>

                <td className="px-6 py-5 text-center">
                  <span className="inline-block min-w-[130px] px-5 py-2 rounded-lg bg-sky-50 text-sky-700 border border-sky-100 text-sm font-bold">
                    Good
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD TASK MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <form
            onSubmit={handleCreateTask}
            className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Create Task
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Task data will be saved in localStorage.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="cursor-pointer w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center"
              >
                <FiX />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <input
                value={form.project}
                onChange={(e) =>
                  setForm({ ...form, project: e.target.value })
                }
                placeholder="Project"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-100"
              />

              <input
                value={form.employee}
                onChange={(e) =>
                  setForm({ ...form, employee: e.target.value })
                }
                placeholder="Employee"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-100"
              />

              <input
                value={form.task}
                onChange={(e) => setForm({ ...form, task: e.target.value })}
                placeholder="Task"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-100"
              />

              <select
                value={form.priority}
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value })
                }
                className="cursor-pointer w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option>Low</option>
                <option>Normal</option>
                <option>High</option>
              </select>

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
                className="cursor-pointer w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            <div className="p-5 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="cursor-pointer px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button className="cursor-pointer px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">
                Save Task
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default TaskList;