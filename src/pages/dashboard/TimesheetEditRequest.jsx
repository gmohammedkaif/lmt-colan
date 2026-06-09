import { useEffect, useState } from "react";
import {
  FiPlus,
  FiClock,
  FiAlertCircle,
  FiCheckCircle,
  FiEye,
  FiX,
  FiTrash2,
} from "react-icons/fi";
import SideModal from "../../components/layout/ui/SideModal";

const defaultRequests = [
  {
    id: 1,
    interval: "Last 15 Days",
    validUpto: "3 Days",
    status: "Pending",
    comments: "Need to update missed timesheet entries.",
  },
  {
    id: 2,
    interval: "Last 7 Days",
    validUpto: "Approved",
    status: "Approved",
    comments: "Approved request.",
  },
];

function TimesheetEditRequest() {
  const [openModal, setOpenModal] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [requests, setRequests] = useState(defaultRequests);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    interval: "Select",
    validUpto: "Select",
    comments: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("timesheetEditRequests");
    if (stored) setRequests(JSON.parse(stored));
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem("timesheetEditRequests", JSON.stringify(data));
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.interval === "Select") {
      newErrors.interval = "Please select edit interval.";
    }

    if (formData.validUpto === "Select") {
      newErrors.validUpto = "Please select valid upto.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleAddRequest = () => {
    if (!validateForm()) return;

    const newRequest = {
      id: Date.now(),
      interval: formData.interval,
      validUpto: formData.validUpto,
      status: "Pending",
      comments: formData.comments || "Nil",
    };

    const updated = [newRequest, ...requests];
    setRequests(updated);
    saveToLocalStorage(updated);

    setFormData({
      interval: "Select",
      validUpto: "Select",
      comments: "",
    });

    setErrors({});
    setOpenModal(false);
  };

  const handleDelete = (id) => {
    const updated = requests.filter((item) => item.id !== id);
    setRequests(updated);
    saveToLocalStorage(updated);
  };

  const totalRequests = requests.length;
  const pendingRequests = requests.filter(
    (item) => item.status === "Pending"
  ).length;
  const approvedRequests = requests.filter(
    (item) => item.status === "Approved"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Edit Request</h1>
          <p className="text-sm text-slate-500 mt-1">
            Request permission to edit locked timesheets.
          </p>
        </div>

        <button
          onClick={() => {
            setErrors({});
            setOpenModal(true);
          }}
          className="h-12 px-5 rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-semibold flex items-center gap-2 shadow-sm"
        >
          <FiPlus />
          New Request
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          title="Total Requests"
          value={totalRequests}
          icon={FiClock}
          iconClass="bg-blue-50 text-blue-600"
          valueClass="text-slate-900"
        />

        <StatCard
          title="Pending"
          value={pendingRequests}
          icon={FiAlertCircle}
          iconClass="bg-amber-50 text-amber-500"
          valueClass="text-amber-500"
        />

        <StatCard
          title="Approved"
          value={approvedRequests}
          icon={FiCheckCircle}
          iconClass="bg-emerald-50 text-emerald-600"
          valueClass="text-emerald-600"
        />
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Request History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  Interval
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  Valid Upto
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {requests.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-5 text-sm font-medium text-slate-700">
                    {item.interval}
                  </td>

                  <td className="px-6 py-5 text-sm font-medium text-slate-700">
                    {item.validUpto}
                  </td>

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
                    <div className="flex justify-end gap-2">
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

              {requests.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No edit requests added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SideModal
          open={openModal}
          title="New Edit Request"
          subtitle="Submit timesheet edit permission request."
          onClose={() => setOpenModal(false)}
        >
          <div className="p-6 space-y-5">
            <FormSelect
              label="Select Edit Interval"
              required
              value={formData.interval}
              error={errors.interval}
              onChange={(e) => {
                setFormData({ ...formData, interval: e.target.value });
                clearError("interval");
              }}
              options={[
                "Select",
                "Last 7 Days",
                "Last 15 Days",
                "Last 30 Days",
                "This Month",
                "Previous Month",
              ]}
            />

            <FormSelect
              label="Edit Status Valid Upto"
              required
              value={formData.validUpto}
              error={errors.validUpto}
              onChange={(e) => {
                setFormData({ ...formData, validUpto: e.target.value });
                clearError("validUpto");
              }}
              options={["Select", "1 Day", "2 Days", "3 Days", "5 Days", "7 Days"]}
            />

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Comments
              </label>

              <textarea
                rows="5"
                value={formData.comments}
                onChange={(e) =>
                  setFormData({ ...formData, comments: e.target.value })
                }
                placeholder="Write comments..."
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none resize-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
              />
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
              onClick={handleAddRequest}
              className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-semibold"
            >
              Add
            </button>
          </div>
        </SideModal>

      <SideModal
          open={!!viewItem}
          title="Request Details"
          subtitle="View edit request information."
          onClose={() => setViewItem(null)}
        >
          {viewItem && <div className="space-y-4">
            <DetailRow label="Interval" value={viewItem.interval} />
            <DetailRow label="Valid Upto" value={viewItem.validUpto} />
            <DetailRow label="Status" value={viewItem.status} />
            <DetailRow label="Comments" value={viewItem.comments} />
          </div>}

          <div className="sticky bottom-0 bg-white border-t border-slate-100 p-5 flex justify-end">
            <button
              onClick={() => setViewItem(null)}
              className="h-12 px-5 rounded-xl border border-slate-200 hover:bg-slate-100 text-sm font-semibold"
            >
              Close
            </button>
          </div>
        </SideModal>
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

function StatCard({ title, value, icon: Icon, iconClass, valueClass }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h2 className={`text-3xl font-bold mt-2 ${valueClass}`}>{value}</h2>
        </div>

        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconClass}`}
        >
          <Icon className="text-xl" />
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase text-slate-400">{label}</p>
      <p className="text-sm font-semibold text-slate-800 mt-1">{value}</p>
    </div>
  );
}

export default TimesheetEditRequest;