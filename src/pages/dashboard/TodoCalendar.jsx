import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function TodoCalendar() {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const calendarTodos = [
    { date: "2026-06-04", title: "Sprint Planning", status: "Active" },
    { date: "2026-06-09", title: "Submit Timesheet", status: "Done" },
    { date: "2026-06-18", title: "Client Meeting", status: "Active" },
    { date: "2026-06-24", title: "Project Review", status: "Active" },
  ];

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

  const goPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToday = () => {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  const formatTodoDate = (day) => {
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            To-Do Calendar
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Monthly reminder and task schedule overview.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl p-2 shadow-sm">
          <button
            onClick={goPrevMonth}
            className="cursor-pointer w-11 h-11 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700"
          >
            <FiChevronLeft size={20} />
          </button>

          <h2 className="min-w-[170px] text-center text-lg font-bold text-slate-900">
            {monthName}
          </h2>

          <button
            onClick={goNextMonth}
            className="cursor-pointer w-11 h-11 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* CALENDAR */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {monthName}
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Employee task calendar
            </p>
          </div>

          <button
            onClick={goToday}
            className="cursor-pointer px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
          >
            Today
          </button>
        </div>

        {/* WEEK DAYS */}
        <div className="grid grid-cols-7 gap-3 mb-3">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-bold text-slate-400 uppercase"
            >
              {day}
            </div>
          ))}
        </div>

        {/* DATES */}
        <div className="grid grid-cols-7 gap-3">
          {blankDays.map((_, index) => (
            <div key={`blank-${index}`} className="min-h-[90px]" />
          ))}

          {days.map((day) => {
            const task = calendarTodos.find(
              (item) => item.date === formatTodoDate(day)
            );

            return (
              <div
                key={day}
                className={`min-h-[90px] rounded-2xl border p-3 transition ${
                  task
                    ? "bg-blue-50 border-blue-100"
                    : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-700">
                    {day}
                  </span>

                  {task && (
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  )}
                </div>

                {task && (
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-slate-800 line-clamp-2">
                      {task.title}
                    </p>

                    <span
                      className={`inline-block mt-2 px-2 py-1 rounded-full text-[10px] font-bold ${
                        task.status === "Done"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : "bg-blue-50 text-blue-600 border border-blue-100"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TodoCalendar;