// ===============================
// TODO CALENDAR PAGE
// ===============================

const calendarTodos = [
  { day: 4, title: "Sprint Planning", status: "Active" },
  { day: 9, title: "Submit Timesheet", status: "Done" },
  { day: 18, title: "Client Meeting", status: "Active" },
  { day: 24, title: "Project Review", status: "Active" },
];

function TodoCalendar() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          To-Do Calendar
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Monthly reminder and task schedule overview.
        </p>
      </div>

      {/* CALENDAR */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              May 2026
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Employee task calendar
            </p>
          </div>

          <button className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold">
            Today
          </button>
        </div>

        {/* DAYS */}
        <div className="grid grid-cols-7 gap-3 mb-3">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day) => (
              <div
                key={day}
                className="text-center text-xs font-bold text-slate-400 uppercase"
              >
                {day}
              </div>
            )
          )}
        </div>

        {/* DATES */}
        <div className="grid grid-cols-7 gap-3">
          {days.map((day) => {
            const task = calendarTodos.find(
              (item) => item.day === day
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
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
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