import { useState } from "react";
import {
  FiPlus,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiTrash2,
  FiEye,
} from "react-icons/fi";
import SideModal from "../../components/layout/ui/SideModal";
import ConfirmModal from "../../utils/ConfirmModal";
import { useToast, Toast } from "../../utils/Toast";

const APPROVAL_KEY = "timesheet_approvals";

function loadApprovals() {
  try {
    const data = localStorage.getItem(APPROVAL_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function TimesheetApproval() {
  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [approvals, setApprovals] = useState(loadApprovals);
  const [formData, setFormData] = useState({ fromDate: "", toDate: "", comments: "" });
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const { toast, showToast } = useToast();

  const pendingCount = approvals.filter((a) => a.status === "Pending").length;
  const approvedCount = approvals.filter((a) => a.status === "Approved").length;

  const saveApprovals = (updated) => {
    setApprovals(updated);
    try { localStorage.setItem(APPROVAL_KEY, JSON.stringify(updated)); } catch {}
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.fromDate) errs.fromDate = "From date required";
    if (!formData.toDate) errs.toDate = "To date required";
    if (formData.fromDate && formData.toDate && formData.toDate < formData.fromDate) {
      errs.toDate = "Must be after from date";
    }
    return errs;
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    const errs = validateForm();
    setFormErrors(errs);
    if (Object.keys(errs).length) return;

    const newApproval = {
      id: Date.now(),
      from: formData.fromDate,
      to: formData.toDate,
      comments: formData.comments,
      status: "Pending",
    };

    saveApprovals([...approvals, newApproval]);
    setSubmitted(true);
    setFormData({ fromDate: "", toDate: "", comments: "" });
    setTimeout(() => { setOpenModal(false); setSubmitted(false); }, 1200);
  };

  const handleView = (item) => {
    setSelectedApproval(item);
    setOpenViewModal(true);
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    saveApprovals(approvals.filter((a) => a.id !== pendingDelete));
    setPendingDelete(null);
    showToast("Approval request deleted", "delete");
  };

  const formatDate = (d) => {
    if (!d) return "";
    const date = new Date(d + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      day: "numeric", month: "short", year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Timesheet Approval
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage and send weekly approval requests.
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="h-12 px-5 rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-semibold flex items-center gap-2 shadow-sm"
        >
          <FiPlus />
          New Approval
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Requests</p>
              <h2 className="text-3xl font-bold text-slate-900 mt-2">{approvals.length}</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
              <FiCalendar className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Pending</p>
              <h2 className="text-3xl font-bold text-amber-500 mt-2">{pendingCount}</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center">
              <FiClock className="text-amber-500 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Approved</p>
              <h2 className="text-3xl font-bold text-emerald-600 mt-2">{approvedCount}</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
              <FiCheckCircle className="text-emerald-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Approval History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">From Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">To Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500">Actions</th>
              </tr>
            </thead>

            <tbody>
              {approvals.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-slate-500">
                    No approval requests yet
                  </td>
                </tr>
              ) : (
                approvals.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50 transition">
                    <td className="px-6 py-5 text-sm font-medium text-slate-700">
                      {formatDate(item.from)}
                    </td>

                    <td className="px-6 py-5 text-sm font-medium text-slate-700">
                      {formatDate(item.to)}
                    </td>

                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Approved"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleView(item)}
                          className="w-9 h-9 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center"
                          aria-label="View details"
                        >
                          <FiEye size={15} />
                        </button>
                        <button
                          onClick={() => setPendingDelete(item.id)}
                          className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center"
                          aria-label="Delete request"
                        >
                          <FiTrash2 size={15} />
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

      {/* VIEW DETAILS MODAL */}
      <SideModal
        open={openViewModal}
        title="Approval Details"
        subtitle="View timesheet approval request."
        onClose={() => { setOpenViewModal(false); setSelectedApproval(null); }}
      >
        {selectedApproval && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">From Date</p>
                <h4 className="font-bold text-slate-900 mt-1">{formatDate(selectedApproval.from)}</h4>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">To Date</p>
                <h4 className="font-bold text-slate-900 mt-1">{formatDate(selectedApproval.to)}</h4>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-sm text-slate-500">Status</p>
              <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                selectedApproval.status === "Approved"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}>
                {selectedApproval.status}
              </span>
            </div>

            {selectedApproval.comments && (
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                <p className="text-sm text-blue-600 font-semibold">Comments</p>
                <p className="text-sm text-blue-900 mt-2 leading-7">
                  {selectedApproval.comments}
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => { setOpenViewModal(false); setSelectedApproval(null); }}
                className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </SideModal>

      {/* ADD MODAL */}
      <SideModal
        open={openModal}
        title="New Approval Request"
        subtitle="Submit weekly timesheet for approval."
        onClose={() => setOpenModal(false)}
      >
        <form onSubmit={handleSubmitRequest}>
          {submitted && (
            <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm font-semibold">
              Approval request submitted!
            </div>
          )}
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="ta-from" className="text-sm font-semibold text-slate-700">From Date</label>
                <input id="ta-from" type="date" name="fromDate" value={formData.fromDate} onChange={handleFormChange}
                  className={`mt-2 w-full h-12 rounded-xl border px-4 outline-none ${formErrors.fromDate ? "border-red-300 bg-red-50" : "border-slate-200"}`} />
                {formErrors.fromDate && <p className="text-xs text-red-500 mt-1">{formErrors.fromDate}</p>}
              </div>
              <div>
                <label htmlFor="ta-to" className="text-sm font-semibold text-slate-700">To Date</label>
                <input id="ta-to" type="date" name="toDate" value={formData.toDate} onChange={handleFormChange}
                  className={`mt-2 w-full h-12 rounded-xl border px-4 outline-none ${formErrors.toDate ? "border-red-300 bg-red-50" : "border-slate-200"}`} />
                {formErrors.toDate && <p className="text-xs text-red-500 mt-1">{formErrors.toDate}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="ta-comments" className="text-sm font-semibold text-slate-700">Comments</label>
              <textarea id="ta-comments" name="comments" value={formData.comments} onChange={handleFormChange}
                rows="4" placeholder="Write comments..."
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none resize-none" />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setOpenModal(false)}
                className="h-12 px-5 rounded-xl border border-slate-200 hover:bg-slate-100 text-sm font-semibold">
                Cancel
              </button>
              <button type="submit" className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-semibold">
                Submit Request
              </button>
            </div>
          </div>
        </form>
      </SideModal>

      <Toast toast={toast} onClose={() => {}} />
      <ConfirmModal
        open={!!pendingDelete}
        title="Delete Approval Request"
        message="Are you sure you want to delete this approval request? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}

export default TimesheetApproval;
