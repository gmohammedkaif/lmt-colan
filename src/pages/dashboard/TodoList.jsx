import { useEffect, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiTrash2,
  FiCheckCircle,
} from "react-icons/fi";
import ConfirmModal from "../../utils/ConfirmModal";
import { useToast, Toast } from "../../utils/Toast";

const STORAGE_KEY = "cipl_todos";
const TOAST_KEY = "cipl_todo_toast";

function TodoList() {
  const [mode, setMode] = useState("day");
  const [pendingDelete, setPendingDelete] = useState(null);

  const loadTodos = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  const [todos, setTodos] = useState(loadTodos);

  const today = new Date();

  const displayDate = today.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const { toast, showToast } = useToast();

  useEffect(() => {
    const message = sessionStorage.getItem(TOAST_KEY);

    if (message) {
      showToast(message, "success");
      sessionStorage.removeItem(TOAST_KEY);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      console.warn("Failed to save todos");
    }
  }, [todos]);

  const confirmDeleteTodo = () => {
    if (!pendingDelete) return;
    setTodos((prev) => prev.filter((item) => item.id !== pendingDelete));
    setPendingDelete(null);
    showToast("To-Do deleted successfully", "delete");
  };

  const toggleStatus = (id) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Completed" ? "Pending" : "Completed",
            }
          : item,
      ),
    );

    showToast("Status updated successfully", "success");
  };
  return (
    <div className="space-y-6 relative">
      <Toast toast={toast} onClose={() => {}} />

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
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-5 py-4 text-center text-sky-700 font-semibold">
                  Description
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
                  colSpan="3"
                  className="px-5 py-4 text-center font-bold text-slate-900"
                >
                  {displayDate}
                </td>
              </tr>

              {todos.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="px-5 py-6 text-center text-sm text-slate-600"
                  >
                    No To-Do Found
                  </td>
                </tr>
              ) : (
                todos.map((todo) => (
                  <tr
                    key={todo.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="px-5 py-4 text-center text-slate-700 font-medium">
                      <div>{todo.description}</div>

                      <div className="mt-1 text-xs text-slate-400">
                        {todo.type} • {todo.time} • Notification:{" "}
                        {todo.notification}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span
                        className={`inline-block min-w-[100px] px-4 py-1.5 rounded-lg text-xs font-bold border ${
                          todo.status === "Completed"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : "bg-blue-50 text-blue-600 border-blue-100"
                        }`}
                      >
                        {todo.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => toggleStatus(todo.id)}
                          className="cursor-pointer w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 flex items-center justify-center"
                          title="Change Status"
                        >
                          <FiCheckCircle size={17} />
                        </button>

                        <button
                          onClick={() => setPendingDelete(todo.id)}
                          className="cursor-pointer w-9 h-9 rounded-lg bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 flex items-center justify-center"
                          title="Delete"
                        >
                          <FiTrash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        open={!!pendingDelete}
        title="Delete To-Do"
        message="Are you sure you want to delete this to-do? This action cannot be undone."
        onConfirm={confirmDeleteTodo}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}

export default TodoList;
