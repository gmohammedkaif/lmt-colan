// ===============================
// TODO LIST PAGE
// ===============================

import { useState } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiStar,
  FiTrash2,
  FiSearch,
  FiPlus,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const todos = [
  {
    id: 1,
    text: "Review pull request from frontend team",
    status: "Active",
    priority: "High",
    date: "Today",
    starred: true,
  },
  {
    id: 2,
    text: "Schedule sprint planning meeting",
    status: "Active",
    priority: "Medium",
    date: "Tomorrow",
    starred: true,
  },
  {
    id: 3,
    text: "Update project documentation",
    status: "Active",
    priority: "Low",
    date: "26 May 2026",
    starred: false,
  },
  {
    id: 4,
    text: "Send timesheet approval to manager",
    status: "Done",
    priority: "Medium",
    date: "Completed",
    starred: false,
  },
];

function TodoList() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      filter === "All" ? true : todo.status === filter;

    const matchesSearch = todo.text
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            To-Do Management
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage reminders, personal tasks and daily work checklist.
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard/todo/add")}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm"
        >
          <FiPlus />
          Add To-Do
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <p className="text-sm text-slate-500">Total Tasks</p>

          <h2 className="text-3xl font-bold text-slate-900 mt-2">
            {todos.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <p className="text-sm text-slate-500">Active Tasks</p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            3
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <p className="text-sm text-slate-500">Completed</p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
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
              placeholder="Search todo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* FILTER BUTTONS */}
          <div className="flex gap-3">
            {["All", "Active", "Done"].map((item) => (
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

      {/* TODO LIST */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between px-6 py-5 border-b border-slate-100 hover:bg-slate-50 transition"
          >
            <div className="flex items-start gap-4">
              <FiCheckCircle
                size={22}
                className={
                  todo.status === "Done"
                    ? "text-green-600 mt-1"
                    : "text-slate-300 mt-1"
                }
              />

              <div>
                <h3
                  className={`font-semibold ${
                    todo.status === "Done"
                      ? "line-through text-slate-400"
                      : "text-slate-800"
                  }`}
                >
                  {todo.text}
                </h3>

                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <FiClock size={12} />
                    {todo.date}
                  </span>

                  <span
                    className={`px-2 py-1 rounded-full text-[11px] font-semibold ${
                      todo.priority === "High"
                        ? "bg-red-100 text-red-600"
                        : todo.priority === "Medium"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {todo.priority}
                  </span>

                  <span
                    className={`px-2 py-1 rounded-full text-[11px] font-semibold ${
                      todo.status === "Done"
                        ? "bg-green-100 text-green-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {todo.status}
                  </span>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-4">
              <button>
                <FiStar
                  size={18}
                  className={
                    todo.starred
                      ? "text-yellow-500"
                      : "text-slate-300"
                  }
                />
              </button>

              <button>
                <FiTrash2
                  size={18}
                  className="text-red-400 hover:text-red-500"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;