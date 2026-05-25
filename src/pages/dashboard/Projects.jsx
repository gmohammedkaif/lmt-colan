import { useState } from "react";
import { FiFolder, FiUsers, FiClock, FiPlus, FiMoreVertical, FiTrendingUp } from "react-icons/fi";

const initialProjects = [
  {
    id: 1, name: "Client Portal", client: "Acme Corp", team: 4, progress: 72,
    status: "Active", due: "2026-06-15", color: "#2563eb", bg: "#eff6ff",
    hours: "142 hrs", desc: "Full-stack web application with real-time dashboards and reporting.",
  },
  {
    id: 2, name: "Internal Tools", client: "Colan HQ", team: 2, progress: 45,
    status: "Active", due: "2026-06-30", color: "#7c3aed", bg: "#f5f3ff",
    hours: "68 hrs", desc: "Employee productivity tools including timesheet and HR systems.",
  },
  {
    id: 3, name: "E-Commerce Redesign", client: "RetailMax", team: 5, progress: 90,
    status: "Review", due: "2026-05-28", color: "#059669", bg: "#ecfdf5",
    hours: "215 hrs", desc: "Complete UI overhaul with new checkout flow and mobile-first design.",
  },
  {
    id: 4, name: "DevOps Pipeline", client: "TechStart", team: 2, progress: 30,
    status: "Active", due: "2026-07-10", color: "#d97706", bg: "#fffbeb",
    hours: "40 hrs", desc: "CI/CD setup, Docker containerization, and infrastructure automation.",
  },
];

const statusStyle = {
  Active: "bg-blue-50 text-blue-700 border border-blue-100",
  Review: "bg-amber-50 text-amber-700 border border-amber-100",
  Completed: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  Paused: "bg-slate-100 text-slate-600",
};

function Projects() {
  const [projects] = useState(initialProjects);
  const [view, setView] = useState("grid");

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700&display=swap');
        .fade-in { animation: fadeIn 0.4s ease both; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px);} to { opacity:1; transform:none;} }
        .project-card { transition: transform 0.22s cubic-bezier(.16,1,.3,1), box-shadow 0.22s ease; }
        .project-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.08); }
        .stagger-1{animation-delay:.04s} .stagger-2{animation-delay:.08s} .stagger-3{animation-delay:.12s} .stagger-4{animation-delay:.16s}
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between mb-7 fade-in">
        <div>
          <h2 className="text-[24px] font-bold text-slate-900 mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>Projects</h2>
          <p className="text-sm text-slate-500">Overview of all active and ongoing projects</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Grid/List toggle */}
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            {[["grid", "⊞"], ["list", "☰"]].map(([v, icon]) => (
              <button key={v} onClick={() => setView(v)}
                className={`w-8 h-8 rounded-lg text-sm transition-all ${view === v ? "bg-white shadow-sm text-slate-800" : "text-slate-400 hover:text-slate-600"}`}>
                {icon}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
            <FiPlus size={15} /> New Project
          </button>
        </div>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 fade-in" style={{ animationDelay: "0.05s" }}>
        {[
          { label: "Total Projects", val: projects.length, icon: FiFolder, color: "#2563eb", bg: "#eff6ff" },
          { label: "Active", val: projects.filter(p => p.status === "Active").length, icon: FiTrendingUp, color: "#059669", bg: "#ecfdf5" },
          { label: "In Review", val: projects.filter(p => p.status === "Review").length, icon: FiClock, color: "#d97706", bg: "#fffbeb" },
          { label: "Team Members", val: projects.reduce((a, p) => a + p.team, 0), icon: FiUsers, color: "#7c3aed", bg: "#f5f3ff" },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
                <Icon size={15} style={{ color: s.color }} />
              </div>
              <p className="text-xs text-slate-500">{s.label}</p>
              <p className="text-xl font-bold text-slate-900 mt-0.5" style={{ fontFamily: "'Syne', sans-serif" }}>{s.val}</p>
            </div>
          );
        })}
      </div>

      {/* Grid view */}
      {view === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <div key={p.id}
              className={`project-card fade-in stagger-${i + 1} bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] relative overflow-hidden`}>
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: p.color }} />

              <div className="flex items-start justify-between mb-4 mt-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: p.bg }}>
                    <FiFolder size={18} style={{ color: p.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-[15px]" style={{ fontFamily: "'Syne', sans-serif" }}>{p.name}</h3>
                    <p className="text-xs text-slate-400">{p.client}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusStyle[p.status]}`}>{p.status}</span>
                  <button className="text-slate-300 hover:text-slate-600 transition-colors"><FiMoreVertical size={15} /></button>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-5 mb-4">{p.desc}</p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-slate-500">Progress</span>
                  <span className="text-xs font-bold text-slate-800">{p.progress}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${p.progress}%`, background: p.color }} />
                </div>
              </div>

              {/* Footer meta */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1"><FiUsers size={12} /> {p.team} members</div>
                <div className="flex items-center gap-1"><FiClock size={12} /> {p.hours}</div>
                <div className="flex items-center gap-1">Due {p.due}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List view */}
      {view === "list" && (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden fade-in">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {["Project", "Client", "Team", "Hours", "Progress", "Status", "Due"].map(h => (
                  <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => (
                <tr key={p.id} className={`border-t border-slate-50 hover:bg-slate-50/50 transition-colors fade-in stagger-${i + 1}`}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
                      <span className="font-semibold text-slate-800">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 text-xs">{p.client}</td>
                  <td className="px-5 py-3.5 text-slate-500 text-xs">{p.team} people</td>
                  <td className="px-5 py-3.5 text-slate-600 font-medium">{p.hours}</td>
                  <td className="px-5 py-3.5 w-32">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: p.color }} />
                      </div>
                      <span className="text-[11px] font-bold text-slate-700 w-8">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusStyle[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-400 text-xs">{p.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Projects;