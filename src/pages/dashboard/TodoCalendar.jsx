const calendarTodos = [
  { date: "21", title: "Sprint planning", status: "Active" },
  { date: "22", title: "Submit timesheet", status: "Done" },
  { date: "24", title: "Project review", status: "Active" },
];

function TodoCalendar() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">To-Do Calendar</h1>
        <p className="text-sm text-slate-500 mt-1">
          View your reminders and tasks by calendar date.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">May 2026</h2>
            <p className="text-xs text-slate-400 mt-1">Monthly task overview</p>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-slate-100 text-sm font-semibold text-slate-600">
              Prev
            </button>
            <button className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold">
              Today
            </button>
            <button className="px-4 py-2 rounded-xl bg-slate-100 text-sm font-semibold text-slate-600">
              Next
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-bold text-slate-400 uppercase"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => {
            const task = calendarTodos.find(
              (item) => item.date === String(day)
            );

            return (
              <div
                key={day}
                className={`min-h-[78px] rounded-xl border p-2 transition
                ${
                  task
                    ? "bg-blue-50 border-blue-100"
                    : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">
                    {day}
                  </span>

                  {task && (
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  )}
                </div>

                {task && (
                  <div className="mt-3">
                    <p className="text-[11px] font-semibold text-slate-800 leading-tight line-clamp-2">
                      {task.title}
                    </p>
                    <span
                      className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        task.status === "Done"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
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