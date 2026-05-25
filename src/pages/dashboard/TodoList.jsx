import { useState } from "react";
import { FiCheckCircle, FiClock, FiStar, FiTrash2 } from "react-icons/fi";

const todos = [
  { id: 1, text: "Review pull request from team", status: "Active", starred: true },
  { id: 2, text: "Schedule sprint planning meeting", status: "Active", starred: true },
  { id: 3, text: "Update project documentation", status: "Active", starred: false },
  { id: 4, text: "Send timesheet approval to manager", status: "Done", starred: false },
];

function TodoList() {
  const [filter, setFilter] = useState("All");

  const filteredTodos =
    filter === "All" ? todos : todos.filter((todo) => todo.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">To-Do List</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your daily reminders and personal task checklist.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border shadow-sm">
          <p className="text-sm text-slate-500">Total Tasks</p>
          <h2 className="text-2xl font-bold">{todos.length}</h2>
        </div>
        <div className="bg-white rounded-2xl p-5 border shadow-sm">
          <p className="text-sm text-slate-500">Active</p>
          <h2 className="text-2xl font-bold text-blue-600">3</h2>
        </div>
        <div className="bg-white rounded-2xl p-5 border shadow-sm">
          <p className="text-sm text-slate-500">Completed</p>
          <h2 className="text-2xl font-bold text-green-600">1</h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm p-5">
        <div className="flex gap-3 mb-5">
          {["All", "Active", "Done"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold ${
                filter === item
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <FiCheckCircle
                  className={
                    todo.status === "Done" ? "text-green-600" : "text-slate-300"
                  }
                  size={20}
                />
                <p
                  className={`font-medium ${
                    todo.status === "Done"
                      ? "line-through text-slate-400"
                      : "text-slate-800"
                  }`}
                >
                  {todo.text}
                </p>
              </div>

              <div className="flex gap-3">
                <FiStar
                  className={todo.starred ? "text-yellow-500" : "text-slate-300"}
                />
                <FiTrash2 className="text-red-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoList;