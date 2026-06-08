import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiFolder,
  FiUsers,
  FiClock,
  FiPlus,
  FiTrendingUp,
  FiSearch,
  FiX,
  FiEdit2,
  FiTrash2,
  FiAlertTriangle,
} from "react-icons/fi";

const STORAGE_KEY = "cipl_projects";

const emptyForm = {
  name: "",
  client: "",
  type: "Web Application",
  due: "",
  status: "Active",
  team: "",
  progress: "",
  hours: "",
  desc: "",
};

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
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialProjects;
    } catch {
      return initialProjects;
    }
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [openModal, setOpenModal] = useState(false);
  const [deleteProject, setDeleteProject] = useState(null);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(emptyForm);

  const isEditMode = editId !== null;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const text = `${p.name} ${p.client} ${p.type}`.toLowerCase();
      const matchSearch = text.includes(search.toLowerCase());
      const matchStatus = status === "All" || p.status === status;
      return matchSearch && matchStatus;
    });
  }, [projects, search, status]);

  const stats = useMemo(() => {
    return [
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
    ];
  }, [projects]);

  const openCreateModal = () => {
    setEditId(null);
    setForm(emptyForm);
    setErrors({});
    setOpenModal(true);
  };

  const openEditModal = (project) => {
    setEditId(project.id);
    setForm({
      name: project.name || "",
      client: project.client || "",
      type: project.type || "Web Application",
      due: project.due || "",
      status: project.status || "Active",
      team: project.team || "",
      progress: project.progress || "",
      hours: project.hours?.replace(" hrs", "") || "",
      desc: project.desc || "",
    });
    setErrors({});
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setEditId(null);
    setForm(emptyForm);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Project title is required";
    if (!form.client.trim()) newErrors.client = "Client name is required";
    if (!form.due) newErrors.due = "Deadline is required";
    if (!form.team) newErrors.team = "Team members count is required";
    if (!form.desc.trim()) newErrors.desc = "Project description is required";

    if (form.team && Number(form.team) < 1) {
      newErrors.team = "Team members should be at least 1";
    }

    if (form.progress && (Number(form.progress) < 0 || Number(form.progress) > 100)) {
      newErrors.progress = "Progress must be between 0 and 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProject = () => {
    if (!validateForm()) return;

    const projectPayload = {
      name: form.name.trim(),
      client: form.client.trim(),
      team: Number(form.team),
      progress: Number(form.progress || 0),
      status: form.status,
      due: form.due,
      hours: `${Number(form.hours || 0)} hrs`,
      type: form.type,
      desc: form.desc.trim(),
    };

    if (isEditMode) {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === editId ? { ...project, ...projectPayload } : project
        )
      );
    } else {
      setProjects((prev) => [
        {
          id: Date.now(),
          ...projectPayload,
        },
        ...prev,
      ]);
    }

    closeModal();
  };

  const confirmDelete = () => {
    if (!deleteProject) return;

    setProjects((prev) => prev.filter((project) => project.id !== deleteProject.id));
    setDeleteProject(null);
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

      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between fade-in">
        <div>
          <h2
            className="mb-2 text-[28px] font-bold text-slate-900"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Projects
          </h2>

          <p className="text-[15px] text-slate-500">
            Manage all projects with local storage add, edit and delete.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700"
        >
          <FiPlus size={15} />
          New Project
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 fade-in">
        {stats.map((s) => {
          const Icon = s.icon;

          return (
            <div
              key={s.label}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)]"
            >
              <div
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}
              >
                <Icon size={17} className={s.color} />
              </div>

              <p className="text-sm text-slate-500">{s.label}</p>

              <h3 className="mt-2 text-[30px] font-bold leading-none text-slate-900">
                {s.val}
              </h3>
            </div>
          );
        })}
      </div>

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] fade-in">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />

            <input
              type="text"
              placeholder="Search projects by name, client or type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-12 min-w-[160px] rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          >
            <option>All</option>
            <option>Active</option>
            <option>Review</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
            <FiFolder className="text-slate-400" size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No projects found</h3>
          <p className="mt-2 text-sm text-slate-500">
            Try changing your search or create a new project.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="project-card rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] fade-in"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                    <FiFolder size={18} className="text-slate-700" />
                  </div>

                  <div>
                    <h3 className="text-[18px] font-semibold text-slate-900">
                      {p.name}
                    </h3>

                    <p className="mt-0.5 text-sm text-slate-500">
                      {p.client} • {p.type}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    statusStyle[p.status]
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <p className="mb-5 min-h-[48px] text-sm leading-6 text-slate-500">
                {p.desc}
              </p>

              <div className="mb-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    Progress
                  </span>

                  <span className="text-xs font-bold text-slate-700">
                    {p.progress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600/90"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <FiUsers size={12} />
                    {p.team} members
                  </div>

                  <div className="flex items-center gap-1">
                    <FiClock size={12} />
                    {p.hours}
                  </div>

                  <div className="flex items-center gap-1">
                    Due: {p.due}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/dashboard/projects/${p.id}`)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                  >
                    View
                  </button>

                  <button
                    onClick={() => openEditModal(p)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:bg-slate-50 hover:text-blue-600"
                    title="Edit"
                  >
                    <FiEdit2 size={15} />
                  </button>

                  <button
                    onClick={() => setDeleteProject(p)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:border-red-100 hover:bg-red-50 hover:text-red-600"
                    title="Delete"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {openModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/30 backdrop-blur-sm">
          <div className="drawer absolute inset-y-0 right-0 flex w-full max-w-[540px] flex-col bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-6">
              <div>
                <h3 className="text-[26px] font-bold text-slate-900">
                  {isEditMode ? "Edit Project" : "Create Project"}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {isEditMode
                    ? "Update project details and save changes."
                    : "Add project details and assign workflow information."}
                </p>
              </div>

              <button
                onClick={closeModal}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-all hover:bg-slate-50"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />

                <span className="text-xs font-medium text-slate-600">
                  {isEditMode ? "Editing existing project" : "New project draft"}
                </span>
              </div>

              <span className="text-xs text-slate-400">Local storage</span>
            </div>

            <div className="custom-scroll flex-1 overflow-y-auto px-6 py-6">
              <SectionTitle title="Basic Information" />

              <div className="space-y-5">
                <InputField
                  label="Project Title"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="Enter project title"
                />

                <InputField
                  label="Client Name"
                  name="client"
                  value={form.client}
                  onChange={handleChange}
                  error={errors.client}
                  placeholder="Enter client/company name"
                />

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Project Type
                  </label>

                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option>Web Application</option>
                    <option>Mobile App</option>
                    <option>CRM</option>
                    <option>E-Commerce</option>
                    <option>DevOps</option>
                    <option>Internal Tool</option>
                  </select>
                </div>
              </div>

              <SectionTitle title="Project Details" className="mt-8" />

              <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField
                  label="Deadline"
                  name="due"
                  value={form.due}
                  onChange={handleChange}
                  error={errors.due}
                  type="date"
                />

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option>Active</option>
                    <option>Review</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

              <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <InputField
                  label="Team"
                  name="team"
                  value={form.team}
                  onChange={handleChange}
                  error={errors.team}
                  type="number"
                  placeholder="4"
                />

                <InputField
                  label="Progress %"
                  name="progress"
                  value={form.progress}
                  onChange={handleChange}
                  error={errors.progress}
                  type="number"
                  placeholder="0"
                />

                <InputField
                  label="Hours"
                  name="hours"
                  value={form.hours}
                  onChange={handleChange}
                  type="number"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Project Description
                </label>

                <textarea
                  name="desc"
                  value={form.desc}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write project scope and description..."
                  className={`w-full resize-none rounded-xl border bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                    errors.desc
                      ? "border-red-400 focus:border-red-400"
                      : "border-slate-200 focus:border-blue-500"
                  }`}
                />

                {errors.desc && (
                  <p className="mt-1 text-xs text-red-500">{errors.desc}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-5">
              <span className="text-xs text-slate-400">
                Data will be saved in browser localStorage.
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={closeModal}
                  className="h-11 rounded-lg border border-slate-200 px-5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveProject}
                  className="h-11 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700"
                >
                  {isEditMode ? "Update Project" : "Create Project"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <FiAlertTriangle size={22} />
            </div>

            <h3 className="text-xl font-bold text-slate-900">Delete project?</h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-700">
                {deleteProject.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteProject(null)}
                className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="h-10 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionTitle({ title, className = "" }) {
  return (
    <div className={`mb-6 border-b border-slate-100 pb-4 ${className}`}>
      <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder = "",
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className={`h-12 w-full rounded-xl border bg-slate-50 px-4 text-sm outline-none transition-all focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
          error
            ? "border-red-400 focus:border-red-400"
            : "border-slate-200 focus:border-blue-500"
        }`}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default Projects;