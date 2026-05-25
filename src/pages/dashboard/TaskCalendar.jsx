const taskEvents = [
  { date: "21", title: "Dashboard layout", project: "Timesheet" },
  { date: "22", title: "API integration", project: "PMS" },
  { date: "24", title: "QA testing", project: "RFP Portal" },
];

function TaskCalendar() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Task Calendar</h1>
        <p className="text-sm text-slate-500 mt-1">
          View assigned project tasks by date.
        </p>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm p-5">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-bold text-slate-900">May 2026</h2>

          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-slate-100 text-sm font-semibold">Prev</button>
            <button className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold">Today</button>
            <button className="px-4 py-2 rounded-xl bg-slate-100 text-sm font-semibold">Next</button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => {
            const task = taskEvents.find((item) => item.date === String(day));

            return (
              <div
                key={day}
                className={`min-h-[78px] rounded-xl border p-2 ${
                  task ? "bg-blue-50 border-blue-100" : "bg-slate-50 border-slate-100"
                }`}
              >
                <span className="text-xs font-bold text-slate-700">{day}</span>

                {task && (
                  <div className="mt-3">
                    <p className="text-[11px] font-semibold text-slate-800 leading-tight">
                      {task.title}
                    </p>
                    <span className="text-[10px] text-blue-600 font-bold">
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