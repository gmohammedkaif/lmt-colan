function TaskCalendar() {
  const taskEvents = [
    {
      day: 4,
      title: "Dashboard Layout",
      project: "Timesheet",
    },
    {
      day: 9,
      title: "API Integration",
      project: "PMS",
    },
    {
      day: 18,
      title: "QA Testing",
      project: "RFP Portal",
    },
    {
      day: 24,
      title: "Client Review",
      project: "ERP",
    },
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Task Calendar
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          View assigned project tasks by calendar date.
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
              Monthly task overview
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
            const task = taskEvents.find(
              (item) => item.day === day
            );

            return (
              <div
                key={day}
                className={`min-h-[95px] rounded-2xl border p-3 transition ${
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
                    <p className="text-xs font-semibold text-slate-800 leading-tight line-clamp-2">
                      {task.title}
                    </p>

                    <span className="inline-block mt-2 text-[10px] font-bold text-blue-600">
                      {task.project}
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

export default TaskCalendar;