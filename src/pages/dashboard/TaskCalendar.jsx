import { useState, useEffect } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiX,
  FiClock,
  FiBell,
  FiCheck,
  FiCalendar,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";

const STORAGE_KEY = "cipl_todos";
const TOAST_KEY = "cipl_todo_toast";

const TIMES = [
  "12:00 am",
  "01:00 am",
  "02:00 am",
  "03:00 am",
  "04:00 am",
  "05:00 am",
  "06:00 am",
  "07:00 am",
  "08:00 am",
  "09:00 am",
  "10:00 am",
  "11:00 am",
  "12:00 pm",
  "01:00 pm",
  "02:00 pm",
  "03:00 pm",
  "04:00 pm",
  "05:00 pm",
  "06:00 pm",
  "07:00 pm",
  "08:00 pm",
  "09:00 pm",
  "10:00 pm",
  "11:00 pm",
];

function TodoCalendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [],
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    description: "",
    time: "12:00 am",
    notification: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const msg = sessionStorage.getItem(TOAST_KEY);
    if (msg) {
      setToast(msg);
      sessionStorage.removeItem(TOAST_KEY);
      setTimeout(() => setToast(""), 3000);
    }
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const totalDays = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const blankDays = Array.from({ length: firstDay });
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  const goPrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const goNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () =>
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));

  const formatDate = (day) => {
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  };

  const getTodosForDate = (day) => {
    const d = formatDate(day);
    return todos.filter(
      (t) =>
        t.date === d ||
        (t.type === "Repeat" && t.startDate <= d && t.completionDate >= d),
    );
  };

  const isToday = (day) => {
    return (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    );
  };

  const openModal = (day) => {
    const d = formatDate(day);
    setSelectedDate(d);
    setForm({ description: "", time: "12:00 am", notification: "" });
    setErrors({});
    setTouched({});
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((p) => ({ ...p, [name]: "" }));
    setTouched((p) => ({ ...p, [name]: true }));
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ne = {};
    if (!form.description.trim()) ne.description = "Description required";
    else if (form.description.trim().length < 3)
      ne.description = "At least 3 characters";
    if (!form.notification) ne.notification = "Select notification";

    const nt = { description: true, notification: true };
    setTouched((p) => ({ ...p, ...nt }));
    setErrors(ne);
    if (Object.keys(ne).length) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newTodo = {
        id: Date.now(),
        type: "No Repeat",
        description: form.description.trim(),
        status: "Pending",
        time: form.time,
        notification: form.notification,
        date: selectedDate,
        startDate: "",
        completionDate: "",
        createdAt: new Date().toISOString(),
      };
      const updated = [...todos, newTodo];
      setTodos(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setIsSubmitting(false);
      closeModal();
      setToast("To-Do added successfully");
      setTimeout(() => setToast(""), 3000);
    }, 400);
  };

  const formatDisplay = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-24 right-8 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-semibold animate-[slideDown_0.3s_ease-out] flex items-center gap-2">
          <FiCheck size={16} /> {toast}
        </div>
      )}

      {/* HEADER */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            To-Do Calendar
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Click any date to add a task
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl p-2 shadow-sm">
          <button
            onClick={goPrevMonth}
            className="cursor-pointer w-11 h-11 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition"
          >
            <FiChevronLeft size={20} />
          </button>
          <h2 className="min-w-[170px] text-center text-lg font-bold text-slate-900">
            {monthName}
          </h2>
          <button
            onClick={goNextMonth}
            className="cursor-pointer w-11 h-11 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* CALENDAR */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <FiCalendar size={18} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{monthName}</h2>
              <p className="text-xs text-slate-400">
                {todos.length} total tasks
              </p>
            </div>
          </div>
          <button
            onClick={goToday}
            className="cursor-pointer px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-indigo-200"
          >
            Today
          </button>
        </div>

        {/* WEEK DAYS */}
        <div className="grid grid-cols-7 gap-px bg-slate-100 mx-6 rounded-xl overflow-hidden">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="bg-slate-50 text-center text-[11px] font-bold text-slate-400 uppercase py-2.5"
            >
              {day}
            </div>
          ))}
        </div>

        {/* DATES */}
        <div className="p-6 pt-4">
          <div className="grid grid-cols-7 gap-2">
            {blankDays.map((_, i) => (
              <div key={`b-${i}`} className="min-h-[100px]" />
            ))}

            {days.map((day) => {
              const dayTodos = getTodosForDate(day);
              const active = isToday(day);
              const modalDate = formatDate(day);

              return (
                <div
                  key={day}
                  onClick={() => openModal(day)}
                  className={`relative min-h-[100px] rounded-xl border-2 p-2.5 cursor-pointer transition-all duration-200 group ${
                    active
                      ? "border-indigo-400 bg-indigo-50/50 shadow-sm shadow-indigo-100"
                      : dayTodos.length > 0
                        ? "border-indigo-200 bg-indigo-50/30 hover:border-indigo-300 hover:bg-indigo-50/50"
                        : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-sm font-bold leading-none ${
                        active ? "text-indigo-600" : "text-slate-600"
                      }`}
                    >
                      {day}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-5 h-5 rounded-md bg-indigo-100 flex items-center justify-center">
                        <FiPlus size={10} className="text-indigo-600" />
                      </div>
                    </div>
                  </div>

                  {dayTodos.length > 0 && (
                    <div className="space-y-1 mt-1.5">
                      {dayTodos.slice(0, 2).map((todo) => (
                        <div
                          key={todo.id}
                          className={`px-1.5 py-1 rounded-md text-[10px] font-semibold truncate leading-tight ${
                            todo.status === "Completed"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-indigo-100 text-indigo-700"
                          }`}
                        >
                          {todo.description}
                        </div>
                      ))}
                      {dayTodos.length > 2 && (
                        <p className="text-[10px] font-semibold text-slate-400 pl-1">
                          +{dayTodos.length - 2} more
                        </p>
                      )}
                    </div>
                  )}

                  {active && (
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-indigo-500 border-2 border-white" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── QUICK-ADD MODAL ─── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative bg-white rounded-2xl shadow-2xl shadow-slate-900/20 w-full max-w-md overflow-hidden animate-[modalIn_0.3s_ease-out]">
            {/* Accent bar */}
            <div className="h-1 bg-gradient-to-r from-indigo-400 via-indigo-500 to-violet-500" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <FiCalendar size={15} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Add for {selectedDate ? formatDisplay(selectedDate) : ""}
                  </h3>
                  <p className="text-xs text-slate-400">Quick task entry</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all"
              >
                <FiX size={15} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  onBlur={() =>
                    setTouched((p) => ({ ...p, description: true }))
                  }
                  rows={3}
                  placeholder="What needs to be done?"
                  className={`w-full px-4 py-2.5 text-sm font-medium rounded-xl border-2 outline-none transition-all duration-200 resize-none placeholder:text-slate-400 ${
                    errors.description && touched.description
                      ? "border-red-300 bg-red-50/40 focus:ring-4 focus:ring-red-100 focus:border-red-400"
                      : "border-slate-200 bg-white hover:border-slate-300 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400"
                  }`}
                />
                {errors.description && touched.description && (
                  <p className="flex items-center gap-1 text-xs font-medium text-red-500 mt-1">
                    <FiAlertCircle size={11} />
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Time */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 tracking-wide uppercase flex items-center gap-1.5">
                  <FiClock size={11} /> Time
                </label>
                <div className="relative">
                  <select
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full cursor-pointer appearance-none px-4 py-2.5 text-sm font-medium rounded-xl border-2 border-slate-200 bg-white outline-none hover:border-slate-300 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-200 pr-10"
                  >
                    {TIMES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <FiChevronRight
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none rotate-90"
                  />
                </div>
              </div>

              {/* Notification */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 tracking-wide uppercase flex items-center gap-1.5">
                  <FiBell size={11} /> Notification
                </label>
                <div className="flex gap-2">
                  {["Yes", "No"].map((item) => (
                    <label
                      key={item}
                      className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        form.notification === item
                          ? item === "Yes"
                            ? "border-emerald-400 bg-emerald-50 shadow-sm"
                            : "border-slate-400 bg-slate-50 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="notification"
                        value={item}
                        checked={form.notification === item}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          form.notification === item
                            ? item === "Yes"
                              ? "border-emerald-500"
                              : "border-slate-500"
                            : "border-slate-300"
                        }`}
                      >
                        {form.notification === item && (
                          <div
                            className={`w-2 h-2 rounded-full ${item === "Yes" ? "bg-emerald-500" : "bg-slate-500"}`}
                          />
                        )}
                      </div>
                      <span
                        className={`text-xs font-semibold ${form.notification === item ? (item === "Yes" ? "text-emerald-700" : "text-slate-700") : "text-slate-500"}`}
                      >
                        {item === "Yes" ? "Notify" : "Silent"}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.notification && touched.notification && (
                  <p className="flex items-center gap-1 text-xs font-medium text-red-500 mt-1">
                    <FiAlertCircle size={11} />
                    {errors.notification}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-sm font-semibold transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-sm font-bold shadow-lg shadow-indigo-200 transition-all duration-200 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <FiLoader size={14} className="animate-spin" /> Adding...
                    </>
                  ) : (
                    <>
                      <FiPlus size={14} /> Add Task
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default TodoCalendar;
