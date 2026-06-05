import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiFolder,
  FiUsers,
  FiClock,
  FiPlus,
  FiMoreVertical,
  FiTrendingUp,
  FiSearch,
  FiX,
} from "react-icons/fi";

const STORAGE_KEY = "cipl_projects";

const initialProjects = [
  {
    id: 1,
    name: "Client Portal",
    client: "Acme Corp",
    team: 4,
    progress: 72,
    status: "Active",
    due: "2026-06-15",
    hours: "142 hrs",
    type: "Web Application",
    desc: "Full-stack web application with real-time dashboards and reporting.",
  },
  {
    id: 2,
    name: "Internal Tools",
    client: "Colan HQ",
    team: 2,
    progress: 45,
    status: "Active",
    due: "2026-06-30",
    hours: "68 hrs",
    type: "Web Application",
    desc: "Employee productivity tools including timesheet and HR systems.",
  },
  {
    id: 3,
    name: "E-Commerce Redesign",
    client: "RetailMax",
    team: 5,
    progress: 90,
    status: "Review",
    due: "2026-05-28",
    hours: "215 hrs",
    type: "E-Commerce",
    desc: "Complete UI overhaul with new checkout flow and mobile-first design.",
  },
  {
    id: 4,
    name: "DevOps Pipeline",
    client: "TechStart",
    team: 2,
    progress: 30,
    status: "Active",
    due: "2026-07-10",
    hours: "40 hrs",
    type: "Web Application",
    desc: "CI/CD setup, Docker containerization, and infrastructure automation.",
  },
];

const statusStyle = {
  Active: "bg-blue-50 text-blue-700 border border-blue-100",
  Review: "bg-amber-50 text-amber-700 border border-amber-100",
  Completed: "bg-emerald-50 text-emerald-700 border border-emerald-100",
};

function Projects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [openModal, setOpenModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    client: "",
    type: "Web Application",
    due: "",
    status: "Active",
    team: "",
    desc: "",
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.client.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === "All" ? true : p.status === status;

      return matchSearch && matchStatus;
    });
  }, [projects, search, status]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateProject = () => {
    if (!form.name || !form.client || !form.due || !form.team || !form.desc) {
      alert("Please fill all required fields");
      return;
    }

    const newProject = {
      id: Date.now(),
      name: form.name,
      client: form.client,
      team: Number(form.team),
      progress: 0,
      status: form.status,
      due: form.due,
      hours: "0 hrs",
      type: form.type,
      desc: form.desc,
    };

    setProjects((prev) => [...prev, newProject]);

    setForm({
      name: "",
      client: "",
      type: "Web Application",
      due: "",
      status: "Active",
      team: "",
      desc: "",
    });

    setOpenModal(false);
  };

  return (
    <div className="pb-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700&display=swap');

        .fade-in { animation: fadeIn 0.35s ease both; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: none; }
        }

        .project-card {
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
        }

        .project-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 40px rgba(15, 23, 42, 0.08);
          border-color: #dbeafe;
        }

        .drawer { animation: slideDrawer .28s cubic-bezier(.16,1,.3,1); }
        @keyframes slideDrawer {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #dbe3ef;
          border-radius: 20px;
        }
      `}</style>

      <div className="flex items-start justify-between mb-7 fade-in">
        <div>
          <h2
            className="text-[28px] font-bold text-slate-900 mb-2"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Projects
          </h2>

          <p className="text-[15px] text-slate-500">
            Overview of all active and ongoing projects.
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center gap-2 transition-all shadow-sm"
        >
          <FiPlus size={15} />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 fade-in">
        {[
          {
            label: "Total Projects",
            val: projects.length,
            icon: FiFolder,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Active",
            val: projects.filter((p) => p.status === "Active").length,
            icon: FiTrendingUp,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "In Review",
            val: projects.filter((p) => p.status === "Review").length,
            icon: FiClock,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
          {
            label: "Team Members",
            val: projects.reduce((a, p) => a + Number(p.team || 0), 0),
            icon: FiUsers,
            color: "text-violet-600",
            bg: "bg-violet-50",
          },
        ].map((s) => {
          const Icon = s.icon;

          return (
            <div
              key={s.label}
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)]"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${s.bg}`}
              >
                <Icon size={17} className={s.color} />
              </div>

              <p className="text-sm text-slate-500">{s.label}</p>

              <h3 className="text-[30px] font-bold text-slate-900 leading-none mt-2">
                {s.val}
              </h3>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 shadow-[0_2px_10px_rgba(15,23,42,0.04)] fade-in">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />

            <input
              type="text"
              placeholder="Search projects by name or client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 min-w-[160px]"
          >
            <option>All</option>
            <option>Active</option>
            <option>Review</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="project-card bg-white border border-slate-200 rounded-2xl p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] fade-in"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
                  <FiFolder size={18} className="text-slate-700" />
                </div>

                <div>
                  <h3 className="text-[18px] font-semibold text-slate-900">
                    {p.name}
                  </h3>

                  <p className="text-sm text-slate-500 mt-0.5">{p.client}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                    statusStyle[p.status]
                  }`}
                >
                  {p.status}
                </span>

                <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all">
                  <FiMoreVertical size={15} />
                </button>
              </div>
            </div>

            <p className="text-sm leading-6 text-slate-500 mb-5">{p.desc}</p>

            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500">
                  Progress
                </span>

                <span className="text-xs font-bold text-slate-700">
                  {p.progress}%
                </span>
              </div>

              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-600/90"
                  style={{ width: `${p.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <FiUsers size={12} />
                  {p.team} members
                </div>

                <div className="flex items-center gap-1">
                  <FiClock size={12} />
                  {p.hours}
                </div>
              </div>

              <button
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                onClick={() => navigate(`/dashboard/projects/${p.id}`)}
              >
                View Project →
              </button>
            </div>
          </div>
        ))}
      </div>

      {openModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/30 backdrop-blur-sm">
          <div className="absolute inset-y-0 right-0 w-full max-w-[520px] bg-white shadow-2xl drawer flex flex-col">
            <div className="px-6 py-6 border-b border-slate-100 flex items-start justify-between">
              <div>
                <h3 className="text-[28px] font-bold text-slate-900">
                  Create Project
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Add project details and assign workflow information.
                </p>
              </div>

              <button
                onClick={() => setOpenModal(false)}
                className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 flex items-center justify-center transition-all"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />

                <span className="text-xs font-medium text-slate-600">
                  New project draft
                </span>
              </div>

              <span className="text-xs text-slate-400">Auto saved</span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scroll px-6 py-6">
              <div className="pb-4 mb-6 border-b border-slate-100">
                <h4 className="text-sm font-semibold text-slate-900">
                  Basic Information
                </h4>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">
                    Project Title
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter project title"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">
                    Client Name
                  </label>

                  <input
                    name="client"
                    value={form.client}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter client/company name"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">
                    Project Type
                  </label>

                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-sm"
                  >
                    <option>Web Application</option>
                    <option>Mobile App</option>
                    <option>CRM</option>
                    <option>E-Commerce</option>
                  </select>
                </div>
              </div>

              <div className="pb-4 mb-6 border-b border-slate-100 mt-8">
                <h4 className="text-sm font-semibold text-slate-900">
                  Project Details
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">
                    Deadline
                  </label>

                  <input
                    name="due"
                    value={form.due}
                    onChange={handleChange}
                    type="date"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-sm"
                  >
                    <option>Active</option>
                    <option>Review</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <label className="text-sm font-medium text-slate-700 block mb-2">
                  Team Members
                </label>

                <input
                  name="team"
                  value={form.team}
                  onChange={handleChange}
                  type="number"
                  placeholder="Example: 4"
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 block mb-2">
                  Project Description
                </label>

                <textarea
                  name="desc"
                  value={form.desc}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write project scope and description..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm resize-none"
                />
              </div>
            </div>

            <div className="px-6 py-5 border-t border-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                All changes are securely managed.
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setOpenModal(false)}
                  className="h-11 px-5 rounded-lg border border-slate-200 hover:bg-slate-50 text-sm font-medium text-slate-600 transition-all"
                >
                  Cancel
                </button>

                <button
                  onClick={handleCreateProject}
                  className="h-11 px-5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all shadow-sm"
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;