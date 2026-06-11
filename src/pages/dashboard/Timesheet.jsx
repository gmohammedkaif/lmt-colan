import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiDownload,
  FiPlus,
  FiClock,
  FiFilter,
  FiX,
  FiBriefcase,
  FiRefreshCcw,
  FiAlertCircle,
} from "react-icons/fi";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SideModal from "../../components/layout/ui/SideModal";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import ConfirmModal from "../../utils/ConfirmModal";
import { useToast, Toast } from "../../utils/Toast";

const STORAGE_KEY = "cipl_timesheets";

function initEntries() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // corrupted data, use defaults
  }
  const defaults = [
    { id: 1, date: "20/05/2026", project: "No Project", module: "General", task: "Working on LMT Timesheet UI", start: "10:30 AM", end: "08:00 PM", hours: "09:30", status: "Non Billable" },
    { id: 2, date: "19/05/2026", project: "ERP Portal", module: "Dashboard", task: "Dashboard layout update", start: "10:30 AM", end: "08:00 PM", hours: "09:30", status: "Billable" },
  ];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
  } catch {}
  return defaults;
}

function calcHours(start, end) {
  if (!start || !end) return "";
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  let diff = (eh * 60 + em) - (sh * 60 + sm);
  if (diff < 0) diff += 24 * 60;
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function formatTimeForDisplay(timeStr) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${String(h12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
}

function Timesheet() {
  const [openModal, setOpenModal] = useState(false);
  const [entries, setEntries] = useState(initEntries);
  const [form, setForm] = useState({ project: "", module: "", task: "", date: "", start: "", end: "", hours: "", status: "Billable" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [pendingDelete, setPendingDelete] = useState(null);
  const { toast, showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(entries)); }, [entries]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((p) => ({ ...p, [name]: "" }));
    setTouched((p) => ({ ...p, [name]: true }));
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if ((name === "start" || name === "end") && next.start && next.end) {
        next.hours = calcHours(next.start, next.end);
      }
      return next;
    });
  };

  const handleBlur = (f) => setTouched((p) => ({ ...p, [f]: true }));

  const openAddModal = () => {
    setForm({ project: "", module: "", task: "", date: "", start: "", end: "", hours: "", status: "Billable" });
    setErrors({});
    setTouched({});
    setOpenModal(true);
  };

  const validate = () => {
    const e = {};
    if (!form.project) e.project = "Select a project";
    if (!form.module) e.module = "Select a module";
    if (!form.task.trim()) e.task = "Task description required";
    else if (form.task.trim().length < 3) e.task = "At least 3 characters";
    if (!form.date) e.date = "Date required";
    if (!form.start) e.start = "Start time required";
    if (!form.end) e.end = "End time required";
    if (!form.hours.trim()) e.hours = "Set start & end time to auto-calculate";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nt = { project: true, module: true, task: true, date: true, start: true, end: true, hours: true };
    setTouched((p) => ({ ...p, ...nt }));
    const ve = validate();
    setErrors(ve);
    if (Object.keys(ve).length) return;

    const newEntry = {
      id: Date.now(),
      date: form.date.split("-").reverse().join("/"),
      project: form.project,
      module: form.module,
      task: form.task.trim(),
      start: form.start,
      end: form.end,
      hours: form.hours.trim(),
      status: form.status,
    };
    setEntries((prev) => [newEntry, ...prev]);
    setOpenModal(false);
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    setEntries((prev) => prev.filter((item) => item.id !== pendingDelete));
    setPendingDelete(null);
    showToast("Timesheet entry deleted", "delete");
  };

  const exportPDF = useCallback(() => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Timesheet Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}`, 14, 28);

    const tableData = entries.map((e) => [
      e.date, e.project, e.module, e.task,
      formatTimeForDisplay(e.start), formatTimeForDisplay(e.end),
      e.hours, e.status,
    ]);

    autoTable(doc, {
      startY: 34,
      head: [["Date", "Project", "Module", "Task", "Start", "End", "Hours", "Status"]],
      body: tableData,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [30, 41, 59], textColor: 255, fontSize: 8 },
      alternateRowStyles: { fillColor: [248, 250, 252] },
    });

    doc.save(`timesheet-report-${Date.now()}.pdf`);
  }, [entries]);

  const hasError = (f) => errors[f] && touched[f];
  const errClass = (f) => hasError(f)
    ? "border-red-300 bg-red-50/40 focus:ring-4 focus:ring-red-100 focus:border-red-400"
    : "border-slate-200 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300";

  const ErrMsg = ({ field }) => hasError(field) ? (
    <p className="flex items-center gap-1 text-xs font-medium text-red-500 mt-1.5"><FiAlertCircle size={11} />{errors[field]}</p>
  ) : null;

  return (
    <>
      <div className="space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Timesheet Management
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Track working hours, project activity and employee productivity.
          </p>
        </div>

        {/* TOP CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
  {/* FIXED PRICE */}
<div
  onClick={() => navigate("/dashboard/fixed-price")}
  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-5 border border-slate-700/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
>    
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          Project Type
        </p>

        <h2 className="text-2xl font-bold text-white mt-2">
          Fixed Price
        </h2>
      </div>

      <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
        <FiBriefcase className="text-white text-lg" />
      </div>
    </div>

    <p className="text-sm leading-6 text-slate-300 mt-4">
      Standard fixed-cost project tracking.
    </p>

    <div className="flex items-center justify-between mt-5">
      <span className="text-xs text-slate-400">
        Enterprise Workflow
      </span>

      <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-[11px] font-semibold">
        Active
      </span>
    </div>
  </div>

  {/* TIME & MATERIAL */}
  <div onClick={() => navigate("/dashboard/time-material")} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-800 to-blue-700 p-5 border border-indigo-700/60 shadow-sm hover:shadow-lg transition-all duration-300">

    <div className="flex items-start justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-200/70">
          Project Type
        </p>

        <h2 className="text-2xl font-bold text-white mt-2">
          Time & Material
        </h2>
      </div>

      <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
        <FiClock className="text-white text-lg" />
      </div>
    </div>

    <p className="text-sm leading-6 text-blue-100/90 mt-4">
      Flexible hourly billing workflow.
    </p>

    <div className="flex items-center justify-between mt-5">
      <span className="text-xs text-blue-100/70">
        Productivity Tracking
      </span>

      <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold">
        Running
      </span>
    </div>
  </div>

  {/* RETAINER */}
  <div onClick={() => navigate("/dashboard/retainer")} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-800 to-fuchsia-700 p-5 border border-violet-700/60 shadow-sm hover:shadow-lg transition-all duration-300">

    <div className="flex items-start justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-200/70">
          Project Type
        </p>

        <h2 className="text-2xl font-bold text-white mt-2">
          Retainer
        </h2>
      </div>

      <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
        <FiRefreshCcw className="text-white text-lg" />
      </div>
    </div>

    <p className="text-sm leading-6 text-violet-100/90 mt-4">
      Monthly recurring client engagement.
    </p>

    <div className="flex items-center justify-between mt-5">
      <span className="text-xs text-violet-100/70">
        Long-Term Contract
      </span>

      <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold">
        Stable
      </span>
    </div>
  </div>
</div>
        {/* FILTER */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-5">
            <FiFilter className="text-slate-500" />

            <h2 className="font-bold text-slate-900">
              Filter Timesheet
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <select className="px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none">
              <option>All Projects</option>
            </select>

            <input
              type="date"
              className="px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none"
            />

            <input
              type="date"
              className="px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none"
            />

            <select className="px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none">
              <option>All Status</option>
            </select>

            <select className="px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none">
              <option>Newest First</option>
            </select>

            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold">
              Apply
            </button>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Tuesday, 26 May 2026
            </h2>

            <div className="flex flex-wrap gap-5 mt-3 text-sm">
              <p className="text-slate-600">
                Billable:
                <span className="font-bold text-slate-900 ml-1">
                  09:30 Hrs
                </span>
              </p>

              <p className="text-slate-600">
                Non Billable:
                <span className="font-bold text-slate-900 ml-1">
                  09:30 Hrs
                </span>
              </p>

              <p className="text-slate-600">
                Total:
                <span className="font-bold text-blue-600 ml-1">
                  19:00 Hrs
                </span>
              </p>
            </div>
          </div>

          <div className="flex gap-3">
              <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm font-semibold"
            >
              <FiPlus />
              Add Timesheet
            </button>

            <button onClick={exportPDF} className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
              <FiDownload />
              Export
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-slate-900 text-white">
                <tr>
                  {[
                    "Date",
                    "Project",
                    "Module",
                    "Task",
                    "Start",
                    "End",
                    "Hours",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {entries.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-5 text-sm text-slate-700">
                      {item.date}
                    </td>

                    <td className="px-6 py-5 font-semibold text-slate-900">
                      {item.project}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-700">
                      {item.module}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-700">
                      {item.task}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-700">
                      {item.start.includes(":") && !item.start.includes("AM") && !item.start.includes("PM")
                        ? formatTimeForDisplay(item.start)
                        : item.start}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-700">
                      {item.end.includes(":") && !item.end.includes("AM") && !item.end.includes("PM")
                        ? formatTimeForDisplay(item.end)
                        : item.end}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <FiClock size={14} />
                        {item.hours}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === "Billable"
                            ? "bg-green-100 text-green-600"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex gap-2">
                        <button className="w-9 h-9 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center">
                          <FiEye />
                        </button>

                        <button className="w-9 h-9 rounded-xl bg-green-50 hover:bg-green-100 text-green-600 flex items-center justify-center">
                          <FiEdit2 />
                        </button>

                        <button onClick={() => setPendingDelete(item.id)} className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ADD TIMESHEET MODAL */}
      <SideModal
        open={openModal}
        title="Add New Timesheet"
        subtitle="Add project work hours and employee activity."
        onClose={() => setOpenModal(false)}
        width="640px"
      >
        <form onSubmit={handleSubmit}>
            {/* FORM */}
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Project
                  </label>

                  <select name="project" value={form.project} onChange={handleChange} onBlur={() => handleBlur("project")}
                    className={`mt-2 w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 ${errClass("project")}`}>
                    <option value="">Select Project</option>
                    <option value="No Project">No Project</option>
                    <option value="ERP Portal">ERP Portal</option>
                    <option value="Timesheet System">Timesheet System</option>
                  </select>
                  <ErrMsg field="project" />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Module
                  </label>

                  <select name="module" value={form.module} onChange={handleChange} onBlur={() => handleBlur("module")}
                    className={`mt-2 w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 ${errClass("module")}`}>
                    <option value="">Select Module</option>
                    <option value="General">General</option>
                    <option value="Dashboard">Dashboard</option>
                    <option value="UI">UI</option>
                  </select>
                  <ErrMsg field="module" />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Task Description
                </label>

                <textarea name="task" value={form.task} onChange={handleChange} onBlur={() => handleBlur("task")}
                  rows="5" placeholder="Write work details..."
                  className={`mt-2 w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none transition-all duration-200 ${errClass("task")}`} />
                <ErrMsg field="task" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Date
                  </label>

                  <input type="date" name="date" value={form.date} onChange={handleChange} onBlur={() => handleBlur("date")}
                    className={`mt-2 w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 ${errClass("date")}`} />
                  <ErrMsg field="date" />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Start Time
                  </label>

                  <input type="time" name="start" value={form.start} onChange={handleChange} onBlur={() => handleBlur("start")}
                    className={`mt-2 w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 ${errClass("start")}`} />
                  <ErrMsg field="start" />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    End Time
                  </label>

                  <input type="time" name="end" value={form.end} onChange={handleChange} onBlur={() => handleBlur("end")}
                    className={`mt-2 w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 ${errClass("end")}`} />
                  <ErrMsg field="end" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Hours Worked
                  </label>

                  <input type="text" name="hours" value={form.hours} readOnly
                    placeholder="Auto-calculated"
                    className={`mt-2 w-full px-4 py-3 rounded-xl border text-sm bg-slate-50 outline-none transition-all duration-200 ${errClass("hours")}`} />
                  <ErrMsg field="hours" />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Work Type
                  </label>

                  <select name="status" value={form.status} onChange={handleChange}
                    className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none transition-all duration-200">
                    <option value="Billable">Billable</option>
                    <option value="Non Billable">Non Billable</option>
                  </select>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="sticky bottom-0 bg-white border-t border-slate-100 p-5 flex justify-end gap-3">
              <button type="button"
                onClick={() => setOpenModal(false)}
                className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>

              <button type="submit" className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition">
                Save Timesheet
              </button>
            </div>
        </form>
        </SideModal>
      <Toast toast={toast} onClose={() => {}} />

      <ConfirmModal
        open={!!pendingDelete}
        title="Delete Timesheet Entry"
        message="Are you sure you want to delete this timesheet entry? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
}

export default Timesheet;