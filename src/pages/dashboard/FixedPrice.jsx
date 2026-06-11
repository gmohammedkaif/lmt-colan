import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiClock,
  FiFilter,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import SideModal from "../../components/layout/ui/SideModal";
import ConfirmModal from "../../utils/ConfirmModal";
import { useToast, Toast } from "../../utils/Toast";

const STORAGE_KEY = "cipl_fixed_price";

function loadEntries() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  const defaults = [
    { id: 1, date: "10/06/2026", project: "True Hope Website", taskTitle: "Homepage Design", description: "Completed responsive homepage layout", startTime: "09:00 AM", endTime: "06:00 PM", hours: "09:00", billable: "Yes" },
    { id: 2, date: "09/06/2026", project: "ERP Portal", taskTitle: "Dashboard Development", description: "Created analytics dashboard widgets", startTime: "10:00 AM", endTime: "07:00 PM", hours: "09:00", billable: "No" },
  ];
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults)); } catch {}
  return defaults;
}

function formatTimeDisplay(timeStr) {
  if (!timeStr || timeStr.includes("AM") || timeStr.includes("PM")) return timeStr;
  const [h, m] = timeStr.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${String(h12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
}

function calcHours(start, end) {
  if (!start || !end) return "00:00";
  const parse = (t) => {
    if (t.includes("AM") || t.includes("PM")) {
      const [_, hh, mm, ap] = t.match(/(\d+):(\d+)\s*(AM|PM)/i) || [];
      let h = parseInt(hh);
      if (ap === "PM" && h !== 12) h += 12;
      if (ap === "AM" && h === 12) h = 0;
      return h * 60 + parseInt(mm);
    }
    const [sh, sm] = t.split(":").map(Number);
    return sh * 60 + sm;
  };
  let diff = parse(end) - parse(start);
  if (diff < 0) diff += 24 * 60;
  return `${String(Math.floor(diff / 60)).padStart(2, "0")}:${String(diff % 60).padStart(2, "0")}`;
}

function FixedPrice() {
  const [entries, setEntries] = useState(loadEntries);
  const [openModal, setOpenModal] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const { toast, showToast } = useToast();
  const [modalForm, setModalForm] = useState({
    project: "", date: "", startTime: "", endTime: "",
    type: "", billable: true, taskTitle: "", description: "",
  });
  const [modalErrors, setModalErrors] = useState({});

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(entries)); } catch {}
  }, [entries]);

  const totalEntries = entries.length;
  const totalHours = entries.reduce((acc, e) => {
    const [h, m] = (e.hours || "00:00").split(":").map(Number);
    return acc + h * 60 + m;
  }, 0);
  const totalHoursStr = `${String(Math.floor(totalHours / 60)).padStart(2, "0")}:${String(totalHours % 60).padStart(2, "0")}`;
  const billableEntries = entries.filter((e) => e.billable === "Yes");
  const nonBillableEntries = entries.filter((e) => e.billable === "No");
  const billableMinutes = billableEntries.reduce((acc, e) => {
    const [h, m] = (e.hours || "00:00").split(":").map(Number);
    return acc + h * 60 + m;
  }, 0);
  const nonBillableMinutes = nonBillableEntries.reduce((acc, e) => {
    const [h, m] = (e.hours || "00:00").split(":").map(Number);
    return acc + h * 60 + m;
  }, 0);

  const handleModalChange = (e) => {
    const { name, value, type, checked } = e.target;
    setModalForm((prev) => {
      const next = { ...prev, [name]: type === "checkbox" ? checked : value };
      if (name === "startTime" || name === "endTime") {
        if (next.startTime && next.endTime) {
          const [sh, sm] = next.startTime.split(":").map(Number);
          const [eh, em] = next.endTime.split(":").map(Number);
          let diff = (eh * 60 + em) - (sh * 60 + sm);
          if (diff < 0) diff += 24 * 60;
          const h = String(Math.floor(diff / 60)).padStart(2, "0");
          const m = String(diff % 60).padStart(2, "0");
          next.autoHours = `${h}:${m}`;
        }
      }
      return next;
    });
    setModalErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateModal = () => {
    const errs = {};
    if (!modalForm.project) errs.project = "Select a project";
    if (!modalForm.date) errs.date = "Select a date";
    if (!modalForm.startTime) errs.startTime = "Start time required";
    if (!modalForm.endTime) errs.endTime = "End time required";
    if (!modalForm.type) errs.type = "Select a type";
    if (!modalForm.taskTitle) errs.taskTitle = "Select a task";
    if (!modalForm.description.trim()) errs.description = "Description required";
    return errs;
  };

  const openAddModal = () => {
    setModalForm({
      project: "", date: "", startTime: "", endTime: "",
      type: "", billable: true, taskTitle: "", description: "",
    });
    setModalErrors({});
    setOpenModal(true);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    const errs = validateModal();
    setModalErrors(errs);
    if (Object.keys(errs).length) return;

    const autoH = calcHours(modalForm.startTime, modalForm.endTime);

    const newEntry = {
      id: Date.now(),
      date: modalForm.date.split("-").reverse().join("/"),
      project: modalForm.project,
      taskTitle: modalForm.taskTitle,
      description: modalForm.description.trim(),
      startTime: modalForm.startTime,
      endTime: modalForm.endTime,
      hours: autoH,
      billable: modalForm.billable ? "Yes" : "No",
    };

    setEntries((prev) => [newEntry, ...prev]);
    showToast("Time logged successfully!", "success");
    setOpenModal(false);
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    setEntries((prev) => prev.filter((item) => item.id !== pendingDelete));
    setPendingDelete(null);
    showToast("Entry deleted", "delete");
  };

  return (
    <>
      <Toast toast={toast} onClose={() => {}} />
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Fixed Price Management
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Track project effort and logged work for fixed price projects.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm font-semibold"
          >
            <FiClock />
            Log Time
          </button>
        </div>

        {/* FILTER SECTION */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-5">
            <FiFilter className="text-slate-500" />
            <h2 className="font-bold text-slate-900">
              Filter Fixed Price Entries
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <select className="px-4 py-3 rounded-xl border border-slate-200 outline-none">
              <option>All Projects</option>
              <option>True Hope Website</option>
              <option>ERP Portal</option>
            </select>

            <input
              type="date"
              className="px-4 py-3 rounded-xl border border-slate-200 outline-none"
            />

            <input
              type="date"
              className="px-4 py-3 rounded-xl border border-slate-200 outline-none"
            />

            <select className="px-4 py-3 rounded-xl border border-slate-200 outline-none">
              <option>All</option>
              <option>Billable</option>
              <option>Non Billable</option>
            </select>

            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold">
              Apply
            </button>
          </div>
        </div>

        {/* SUMMARY - auto-calculated from entries */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-sm text-slate-500">Total Entries</p>
              <h3 className="text-2xl font-bold text-slate-900">{totalEntries}</h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">Total Hours</p>
              <h3 className="text-2xl font-bold text-blue-600">{totalHoursStr}</h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">Billable Hours</p>
              <h3 className="text-2xl font-bold text-green-600">
                {String(Math.floor(billableMinutes / 60)).padStart(2, "0")}:{String(billableMinutes % 60).padStart(2, "0")}
              </h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">Non Billable</p>
              <h3 className="text-2xl font-bold text-orange-600">
                {String(Math.floor(nonBillableMinutes / 60)).padStart(2, "0")}:{String(nonBillableMinutes % 60).padStart(2, "0")}
              </h3>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1300px]">
              <thead className="bg-slate-900 text-white">
                <tr>
                  {[
                    "Date", "Project", "Task Title", "Description",
                    "Start Time", "End Time", "Hours", "Billable", "Actions",
                  ].map((head) => (
                    <th
                      key={head}
                      className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {entries.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-10 text-slate-500">
                      No entries found. Click "Log Time" to add one.
                    </td>
                  </tr>
                ) : (
                  entries.map((item) => (
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
                        {item.taskTitle}
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-700 max-w-xs">
                        {item.description}
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-700">
                        {formatTimeDisplay(item.startTime)}
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-700">
                        {formatTimeDisplay(item.endTime)}
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
                            item.billable === "Yes"
                              ? "bg-green-100 text-green-600"
                              : "bg-orange-100 text-orange-600"
                          }`}
                        >
                          {item.billable}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex gap-2">
                          <button className="w-9 h-9 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center" aria-label="View entry">
                            <FiEye />
                          </button>

                          <button className="w-9 h-9 rounded-xl bg-green-50 hover:bg-green-100 text-green-600 flex items-center justify-center" aria-label="Edit entry">
                            <FiEdit2 />
                          </button>

                          <button
                            onClick={() => setPendingDelete(item.id)}
                            className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center"
                            aria-label="Delete entry"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* LOG TIME MODAL */}
        <SideModal
          open={openModal}
          title="Log Time On Project"
          subtitle="Track fixed price project effort."
          onClose={() => setOpenModal(false)}
          width="700px"
        >
          <form onSubmit={handleModalSubmit}>
            <div className="space-y-5">
              {/* ROW 1 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="fp-project" className="text-sm font-semibold text-slate-700">
                    Project *
                  </label>
                  <select id="fp-project" name="project" value={modalForm.project} onChange={handleModalChange}
                    className={`mt-2 w-full px-4 py-3 rounded-xl border outline-none ${modalErrors.project ? "border-red-300 bg-red-50" : "border-slate-200"}`}>
                    <option value="">Select Project</option>
                    <option value="True Hope Website">True Hope Website</option>
                    <option value="ERP Portal">ERP Portal</option>
                  </select>
                  {modalErrors.project && <p className="text-xs text-red-500 mt-1">{modalErrors.project}</p>}
                </div>

                <div>
                  <label htmlFor="fp-date" className="text-sm font-semibold text-slate-700">
                    Date *
                  </label>
                  <input id="fp-date" type="date" name="date" value={modalForm.date} onChange={handleModalChange}
                    className={`mt-2 w-full px-4 py-3 rounded-xl border outline-none ${modalErrors.date ? "border-red-300 bg-red-50" : "border-slate-200"}`} />
                  {modalErrors.date && <p className="text-xs text-red-500 mt-1">{modalErrors.date}</p>}
                </div>

                <div>
                  <label htmlFor="fp-start" className="text-sm font-semibold text-slate-700">
                    Start Time *
                  </label>
                  <input id="fp-start" type="time" name="startTime" value={modalForm.startTime} onChange={handleModalChange}
                    className={`mt-2 w-full px-4 py-3 rounded-xl border outline-none ${modalErrors.startTime ? "border-red-300 bg-red-50" : "border-slate-200"}`} />
                  {modalErrors.startTime && <p className="text-xs text-red-500 mt-1">{modalErrors.startTime}</p>}
                </div>

                <div>
                  <label htmlFor="fp-end" className="text-sm font-semibold text-slate-700">
                    End Time *
                  </label>
                  <input id="fp-end" type="time" name="endTime" value={modalForm.endTime} onChange={handleModalChange}
                    className={`mt-2 w-full px-4 py-3 rounded-xl border outline-none ${modalErrors.endTime ? "border-red-300 bg-red-50" : "border-slate-200"}`} />
                  {modalErrors.endTime && <p className="text-xs text-red-500 mt-1">{modalErrors.endTime}</p>}
                </div>
              </div>

              {/* ROW 2 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Hours
                  </label>
                  <input type="text" readOnly value={modalForm.startTime && modalForm.endTime ? calcHours(modalForm.startTime, modalForm.endTime) : ""}
                    placeholder="Auto-calc" className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none text-sm" />
                </div>

                <div>
                  <label htmlFor="fp-type" className="text-sm font-semibold text-slate-700">
                    Type *
                  </label>
                  <select id="fp-type" name="type" value={modalForm.type} onChange={handleModalChange}
                    className={`mt-2 w-full px-4 py-3 rounded-xl border outline-none ${modalErrors.type ? "border-red-300 bg-red-50" : "border-slate-200"}`}>
                    <option value="">Select Type</option>
                    <option value="WBS">WBS</option>
                    <option value="Development">Development</option>
                    <option value="Testing">Testing</option>
                    <option value="Design">Design</option>
                  </select>
                  {modalErrors.type && <p className="text-xs text-red-500 mt-1">{modalErrors.type}</p>}
                </div>

                <div className="flex items-center gap-3 pt-10">
                  <input id="fp-billable" type="checkbox" name="billable" checked={modalForm.billable} onChange={handleModalChange} className="w-4 h-4" />
                  <label htmlFor="fp-billable" className="text-sm font-medium text-slate-700">Billable ?</label>
                </div>
              </div>

              {/* TASK TITLE */}
              <div>
                <label htmlFor="fp-task" className="text-sm font-semibold text-slate-700">
                  Task Title *
                </label>
                <select id="fp-task" name="taskTitle" value={modalForm.taskTitle} onChange={handleModalChange}
                  className={`mt-2 w-full px-4 py-3 rounded-xl border outline-none ${modalErrors.taskTitle ? "border-red-300 bg-red-50" : "border-slate-200"}`}>
                  <option value="">Select Task</option>
                  <option value="Homepage Design">Homepage Design</option>
                  <option value="Dashboard Development">Dashboard Development</option>
                  <option value="Bug Fixing">Bug Fixing</option>
                  <option value="Testing">Testing</option>
                </select>
                {modalErrors.taskTitle && <p className="text-xs text-red-500 mt-1">{modalErrors.taskTitle}</p>}
              </div>

              {/* DESCRIPTION */}
              <div>
                <label htmlFor="fp-desc" className="text-sm font-semibold text-slate-700">
                  Description *
                </label>
                <textarea id="fp-desc" name="description" value={modalForm.description} onChange={handleModalChange}
                  rows="5" placeholder="Enter work description..."
                  className={`mt-2 w-full px-4 py-3 rounded-xl border outline-none resize-none ${modalErrors.description ? "border-red-300 bg-red-50" : "border-slate-200"}`} />
                {modalErrors.description && <p className="text-xs text-red-500 mt-1">{modalErrors.description}</p>}
              </div>

              {/* FOOTER */}
              <div className="border-t border-slate-100 pt-5 flex justify-end gap-3">
                <button type="button" onClick={() => setOpenModal(false)}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700">
                  Cancel
                </button>
                <button type="submit"
                  className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold">
                  Log Time
                </button>
              </div>
            </div>
          </form>
        </SideModal>
      </div>

      <ConfirmModal
        open={!!pendingDelete}
        title="Delete Fixed Price Entry"
        message="Are you sure you want to delete this entry? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
}

export default FixedPrice;
