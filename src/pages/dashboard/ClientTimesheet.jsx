import { useEffect, useState } from "react";
import { FiPlus, FiFilter, FiEye, FiX, FiTrash2 } from "react-icons/fi";
import SideModal from "../../components/layout/ui/SideModal";

const defaultRecords = [
  {
    id: 1,
    date: "26 May 2026",
    code: "ERP-001",
    project: "ERP Portal",
    mode: "Fixed Price",
    hours: "09:30",
    status: "Approved",
    billableMonth: "May",
    billableYear: "2026",
    attachment: "erp-timesheet.xlsx",
    reportingPerson: "Client Manager",
    designation: "Project Manager",
    comments: "Approved client billable timesheet.",
  },
  {
    id: 2,
    date: "25 May 2026",
    code: "QA-002",
    project: "QA Dashboard",
    mode: "Retainer",
    hours: "08:00",
    status: "Pending",
    billableMonth: "May",
    billableYear: "2026",
    attachment: "qa-timesheet.xlsx",
    reportingPerson: "QA Lead",
    designation: "Team Lead",
    comments: "Waiting for client approval.",
  },
];

const months = [
  "Month",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = ["Year", "2026", "2025", "2024", "2023"];

function ClientTimesheet() {
  const [openModal, setOpenModal] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [records, setRecords] = useState(defaultRecords);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    project: "Select",
    billableMonth: "Month",
    billableYear: "Year",
    attachment: "",
    hours: "",
    reportingPerson: "",
    designation: "",
    comments: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("clientTimesheetRecords");
    if (stored) setRecords(JSON.parse(stored));
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem("clientTimesheetRecords", JSON.stringify(data));
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.project === "Select") newErrors.project = "Please select project name.";
    if (formData.billableMonth === "Month") newErrors.billableMonth = "Please select month.";
    if (formData.billableYear === "Year") newErrors.billableYear = "Please select year.";
    if (!formData.attachment) newErrors.attachment = "Please upload attachment.";
    if (!formData.hours.trim()) newErrors.hours = "Please enter approved hours.";
    if (!formData.reportingPerson.trim()) newErrors.reportingPerson = "Please enter reporting person.";
    if (!formData.designation.trim()) newErrors.designation = "Please enter designation.";
    if (!formData.comments.trim()) newErrors.comments = "Please enter comments.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddRecord = () => {
    if (!validateForm()) return;

    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const newRecord = {
      id: Date.now(),
      date: today,
      code: formData.project === "ERP Portal" ? "ERP-001" : "QA-002",
      project: formData.project,
      mode: formData.project === "ERP Portal" ? "Fixed Price" : "Retainer",
      hours: formData.hours,
      status: "Pending",
      billableMonth: formData.billableMonth,
      billableYear: formData.billableYear,
      attachment: formData.attachment || "Nil",
      reportingPerson: formData.reportingPerson,
      designation: formData.designation,
      comments: formData.comments,
    };

    const updated = [newRecord, ...records];
    setRecords(updated);
    saveToLocalStorage(updated);

    setFormData({
      project: "Select",
      billableMonth: "Month",
      billableYear: "Year",
      attachment: "",
      hours: "",
      reportingPerson: "",
      designation: "",
      comments: "",
    });

    setErrors({});
    setOpenModal(false);
  };

  const handleDelete = (id) => {
    const updated = records.filter((item) => item.id !== id);
    setRecords(updated);
    saveToLocalStorage(updated);
  };

  const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Client Approval</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track client billable timesheet approvals.
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="h-12 px-5 rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-semibold flex items-center gap-2 shadow-sm"
        >
          <FiPlus />
          Add New
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-5">
          <FiFilter className="text-slate-500" />
          <h2 className="text-lg font-bold text-slate-900">Filter Records</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <select className="h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none">
            <option>All Projects</option>
            <option>ERP Portal</option>
            <option>QA Dashboard</option>
          </select>

          <input type="date" className="h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none" />
          <input type="date" className="h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none" />

          <select className="h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none">
            <option>All Status</option>
            <option>Approved</option>
            <option>Pending</option>
          </select>

          <button className="h-12 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-semibold">
            Apply Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Client Timesheet List</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead className="bg-slate-50">
              <tr>
                {["Date", "Project Code", "Project Name", "Project Mode", "Billable Hours", "Status", "Actions"].map((head) => (
                  <th key={head} className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {records.map((item) => (
                <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50 transition">
                  <td className="px-6 py-5 text-sm text-slate-700">{item.date}</td>
                  <td className="px-6 py-5 text-sm font-semibold text-slate-800">{item.code}</td>
                  <td className="px-6 py-5 text-sm text-slate-700">{item.project}</td>
                  <td className="px-6 py-5 text-sm text-slate-700">{item.mode}</td>
                  <td className="px-6 py-5 text-sm font-bold text-slate-900">{item.hours}</td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Approved"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewItem(item)}
                        className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"
                      >
                        <FiEye className="text-slate-700" />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center transition"
                      >
                        <FiTrash2 className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {records.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-sm text-slate-500">
                    No client timesheet records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SideModal
          open={openModal}
          title="Add New Client Timesheet"
          subtitle="Submit client billable timesheet approval details."
          onClose={() => setOpenModal(false)}
        >
          <div className="p-6 space-y-5">
            <FormSelect
              label="Select Project Name"
              required
              value={formData.project}
              error={errors.project}
              onChange={(e) => {
                setFormData({ ...formData, project: e.target.value });
                clearError("project");
              }}
              options={["Select", "ERP Portal", "QA Dashboard"]}
            />

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Billable Period <span className="text-red-500">*</span>
              </label>

              <div className="grid grid-cols-2 gap-3 mt-2">
                <select
                  value={formData.billableMonth}
                  onChange={(e) => {
                    setFormData({ ...formData, billableMonth: e.target.value });
                    clearError("billableMonth");
                  }}
                  className={`h-12 rounded-xl border px-4 text-sm outline-none focus:ring-2 focus:ring-blue-100 ${
                    errors.billableMonth ? "border-red-400" : "border-slate-200 focus:border-blue-500"
                  }`}
                >
                  {months.map((month) => <option key={month}>{month}</option>)}
                </select>

                <select
                  value={formData.billableYear}
                  onChange={(e) => {
                    setFormData({ ...formData, billableYear: e.target.value });
                    clearError("billableYear");
                  }}
                  className={`h-12 rounded-xl border px-4 text-sm outline-none focus:ring-2 focus:ring-blue-100 ${
                    errors.billableYear ? "border-red-400" : "border-slate-200 focus:border-blue-500"
                  }`}
                >
                  {years.map((year) => <option key={year}>{year}</option>)}
                </select>
              </div>

              {(errors.billableMonth || errors.billableYear) && (
                <p className="mt-1 text-xs font-medium text-red-500">
                  {errors.billableMonth || errors.billableYear}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Attachments <span className="text-red-500">*</span>{" "}
                <span className="text-xs text-slate-400">(xlsx, xls)</span>
              </label>

              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => {
                  setFormData({ ...formData, attachment: e.target.files?.[0]?.name || "" });
                  clearError("attachment");
                }}
                className={`mt-2 w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-600 file:font-semibold outline-none focus:ring-2 focus:ring-blue-100 ${
                  errors.attachment ? "border-red-400" : "border-slate-200 focus:border-blue-500"
                }`}
              />

              {errors.attachment && (
                <p className="mt-1 text-xs font-medium text-red-500">{errors.attachment}</p>
              )}
            </div>

            <FormInput
              label="Approved Hours"
              required
              placeholder="Example: 09:30"
              value={formData.hours}
              error={errors.hours}
              onChange={(e) => {
                setFormData({ ...formData, hours: e.target.value });
                clearError("hours");
              }}
            />

            <FormInput
              label="Reporting Person"
              required
              value={formData.reportingPerson}
              error={errors.reportingPerson}
              onChange={(e) => {
                setFormData({ ...formData, reportingPerson: e.target.value });
                clearError("reportingPerson");
              }}
            />

            <FormInput
              label="Reporting Person Designation"
              required
              value={formData.designation}
              error={errors.designation}
              onChange={(e) => {
                setFormData({ ...formData, designation: e.target.value });
                clearError("designation");
              }}
            />

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Comments <span className="text-red-500">*</span>
              </label>

              <textarea
                rows="5"
                value={formData.comments}
                onChange={(e) => {
                  setFormData({ ...formData, comments: e.target.value });
                  clearError("comments");
                }}
                placeholder="Write comments..."
                className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none resize-none focus:ring-2 focus:ring-blue-100 ${
                  errors.comments ? "border-red-400" : "border-slate-200 focus:border-blue-500"
                }`}
              />

              {errors.comments && (
                <p className="mt-1 text-xs font-medium text-red-500">{errors.comments}</p>
              )}
            </div>
          </div>

          <div className="sticky bottom-0 bg-white border-t border-slate-100 p-5 flex justify-end gap-3">
            <button
              onClick={() => setOpenModal(false)}
              className="h-12 px-5 rounded-xl border border-slate-200 hover:bg-slate-100 text-sm font-semibold"
            >
              Cancel
            </button>

            <button
              onClick={handleAddRecord}
              className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-semibold"
            >
              Submit
            </button>
          </div>
        </SideModal>

      <SideModal
          open={!!viewItem}
          title="Client Timesheet Details"
          subtitle="View submitted client approval information."
          onClose={() => setViewItem(null)}
        >
          {viewItem && <div className="space-y-4">
            <DetailRow label="Project Name" value={viewItem.project} />
            <DetailRow label="Project Code" value={viewItem.code} />
            <DetailRow label="Billable Period" value={`${viewItem.billableMonth} ${viewItem.billableYear}`} />
            <DetailRow label="Attachment" value={viewItem.attachment} />
            <DetailRow label="Approved Hours" value={viewItem.hours} />
            <DetailRow label="Reporting Person" value={viewItem.reportingPerson} />
            <DetailRow label="Designation" value={viewItem.designation} />
            <DetailRow label="Comments" value={viewItem.comments} />
          </div>}
        </SideModal>
    </div>
  );
}

function FormInput({ label, required, value, onChange, placeholder, error }) {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-2 w-full h-12 rounded-xl border px-4 text-sm outline-none focus:ring-2 focus:ring-blue-100 ${
          error ? "border-red-400" : "border-slate-200 focus:border-blue-500"
        }`}
      />

      {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

function FormSelect({ label, required, value, onChange, options, error }) {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <select
        value={value}
        onChange={onChange}
        className={`mt-2 w-full h-12 rounded-xl border px-4 text-sm outline-none focus:ring-2 focus:ring-blue-100 ${
          error ? "border-red-400" : "border-slate-200 focus:border-blue-500"
        }`}
      >
        {options.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>

      {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase text-slate-400">{label}</p>
      <p className="text-sm font-semibold text-slate-800 mt-1">{value || "Nil"}</p>
    </div>
  );
}

export default ClientTimesheet;