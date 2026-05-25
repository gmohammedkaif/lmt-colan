import { FiClock, FiCheckCircle, FiAlertCircle, FiFolder, FiTrendingUp, FiCalendar, FiPlus } from "react-icons/fi";

const stats = [
  { icon: FiClock, label: "Today's Hours", value: "00:00", unit: "hrs", trend: null, color: "#2563eb", bg: "#eff6ff" },
  { icon: FiCheckCircle, label: "Yesterday", value: "09:30", unit: "hrs", trend: "+2%", color: "#059669", bg: "#ecfdf5" },
  { icon: FiAlertCircle, label: "This Week", value: "09:30", unit: "hrs", trend: null, color: "#d97706", bg: "#fffbeb" },
  { icon: FiFolder, label: "Active Projects", value: "04", unit: "projects", trend: null, color: "#7c3aed", bg: "#f5f3ff" },
];

const weekData = [
  { day: "Mon", logged: 9, expected: 10 },
  { day: "Tue", logged: 10, expected: 10 },
  { day: "Wed", logged: 7.5, expected: 10 },
  { day: "Thu", logged: 9, expected: 10 },
  { day: "Fri", logged: 0, expected: 10 },
];

const timesheetRows = [
  { period: "Today", logged: "00:00 Hrs", expected: "10:00 Hrs", status: "Incomplete", statusColor: "orange" },
  { period: "Yesterday", logged: "09:30 Hrs", expected: "10:00 Hrs", status: "Good", statusColor: "green" },
  { period: "This Week", logged: "09:30 Hrs", expected: "50:00 Hrs", status: "Incomplete", statusColor: "orange" },
  { period: "Last Week", logged: "48:00 Hrs", expected: "50:00 Hrs", status: "Good", statusColor: "green" },
];

const statusStyles = {
  green: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  orange: "bg-amber-50 text-amber-700 border border-amber-100",
};

function DashboardHome() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        .fade-in { animation: fadeIn 0.5s ease both; }
        @keyframes fadeIn { from {opacity:0;transform:translateY(12px);} to {opacity:1;transform:none;} }
        .bar-fill { animation: barGrow 0.8s cubic-bezier(.16,1,.3,1) both; transform-origin: bottom; }
        @keyframes barGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
      `}</style>

      {/* Page header */}
      <div className="flex items-start justify-between mb-7 fade-in">
        <div>
          <h2 className="text-[26px] font-bold text-slate-900 mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
            Good morning 👋
          </h2>
          <p className="text-slate-500 text-sm">{today} · Here's your productivity snapshot.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
          <FiPlus size={15} />
          <span className="hidden sm:inline">Log Hours</span>
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 fade-in" style={{ animationDelay: "0.05s" }}>
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: s.bg }}>
                  <Icon size={17} style={{ color: s.color }} />
                </div>
                {s.trend && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <FiTrendingUp size={11} /> {s.trend}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Syne', sans-serif" }}>
                {s.value} <span className="text-sm font-medium text-slate-400">{s.unit}</span>
              </p>
            </div>
          );
        })}
      </div>

      {/* Main content row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Timesheet table — 2 cols */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden fade-in"
          style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div>
              <h3 className="text-[15px] font-bold text-slate-900" style={{ fontFamily: "'Syne', sans-serif" }}>Timesheet Summary</h3>
              <p className="text-xs text-slate-400 mt-0.5">Your logged vs expected hours</p>
            </div>
            <button className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1">
              <FiCalendar size={12} /> View Full
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-6 py-3">Period</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-6 py-3">Logged</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-6 py-3">Expected</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {timesheetRows.map((row, i) => (
                  <tr key={i} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3.5 font-medium text-slate-800">{row.period}</td>
                    <td className="px-6 py-3.5 text-slate-600 font-medium">{row.logged}</td>
                    <td className="px-6 py-3.5 text-slate-400">{row.expected}</td>
                    <td className="px-6 py-3.5">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusStyles[row.statusColor]}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Weekly bar chart */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5 fade-in"
          style={{ animationDelay: "0.15s" }}>
          <div className="mb-5">
            <h3 className="text-[15px] font-bold text-slate-900" style={{ fontFamily: "'Syne', sans-serif" }}>This Week</h3>
            <p className="text-xs text-slate-400 mt-0.5">Daily hours logged</p>
          </div>

          {/* Bars */}
          <div className="flex items-end justify-between gap-2 h-36 mb-3">
            {weekData.map((d, i) => {
              const pct = (d.logged / d.expected) * 100;
              const color = pct >= 90 ? "#2563eb" : pct >= 60 ? "#f59e0b" : "#e2e8f0";
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <span className="text-[10px] text-slate-500 font-medium">{d.logged > 0 ? d.logged : ""}</span>
                  <div className="w-full rounded-t-lg bar-fill relative"
                    style={{
                      height: `${Math.max(pct, 4)}%`,
                      backgroundColor: color,
                      animationDelay: `${0.2 + i * 0.08}s`
                    }} />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between">
            {weekData.map((d) => (
              <span key={d.day} className="flex-1 text-center text-[11px] text-slate-400 font-medium">{d.day}</span>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-5 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Total logged</span>
              <span className="font-bold text-slate-800">35.5 hrs</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: "71%" }} />
            </div>
            <p className="text-[11px] text-slate-400">71% of weekly target (50 hrs)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;