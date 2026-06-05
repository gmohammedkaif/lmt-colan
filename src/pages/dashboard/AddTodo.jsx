import { useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "cipl_todos";
const TOAST_KEY = "cipl_todo_toast";

function AddTodo() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "",
    startDate: "",
    completionDate: "",
    date: "",
    time: "12:00 am",
    description: "",
    notification: "",
  });

  const [errors, setErrors] = useState({});

  const times = [
    "12:00 am", "01:00 am", "02:00 am", "03:00 am",
    "04:00 am", "05:00 am", "06:00 am", "07:00 am",
    "08:00 am", "09:00 am", "10:00 am", "11:00 am",
    "12:00 pm", "01:00 pm", "02:00 pm", "03:00 pm",
    "04:00 pm", "05:00 pm", "06:00 pm", "07:00 pm",
    "08:00 pm", "09:00 pm", "10:00 pm", "11:00 pm",
  ];

  const inputClass = (field) =>
    `w-full px-4 py-2.5 rounded-lg border outline-none focus:ring-2 ${
      errors[field]
        ? "border-red-500 focus:ring-red-100"
        : "border-slate-300 focus:ring-blue-100"
    }`;

  const textareaClass = (field) =>
    `w-full px-4 py-3 rounded-lg border outline-none resize-none focus:ring-2 ${
      errors[field]
        ? "border-red-500 focus:ring-red-100"
        : "border-slate-300 focus:ring-blue-100"
    }`;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "type") {
      setFormData({
        ...formData,
        type: value,
        startDate: "",
        completionDate: "",
        date: "",
      });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.type) newErrors.type = "Please select type";

    if (formData.type === "Repeat") {
      if (!formData.startDate) newErrors.startDate = "Start date is required";
      if (!formData.completionDate)
        newErrors.completionDate = "Completion date is required";
    }

    if (formData.type === "No Repeat") {
      if (!formData.date) newErrors.date = "Date is required";
    }

    if (!formData.description.trim())
      newErrors.description = "Description is required";

    if (!formData.notification)
      newErrors.notification = "Please select notification";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const oldTodos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const newTodo = {
      id: Date.now(),
      type: formData.type,
      description: formData.description.trim(),
      status: "Pending",
      time: formData.time,
      notification: formData.notification,
      date: formData.type === "Repeat" ? formData.startDate : formData.date,
      startDate: formData.startDate,
      completionDate: formData.completionDate,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...oldTodos, newTodo]));
    sessionStorage.setItem(TOAST_KEY, "To-Do created successfully");

    navigate("/dashboard/todo");
  };

  const ErrorText = ({ message }) =>
    message ? <p className="text-red-500 text-xs mt-1">{message}</p> : null;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Add New To-Do</h1>

        <button
          type="button"
          onClick={() => navigate("/dashboard/todo")}
          className="cursor-pointer px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold"
        >
          Back
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8"
      >
        <div className="max-w-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-start">
            <label className="text-sm font-semibold text-slate-700 pt-2">
              Type <span className="text-red-500">*</span>
            </label>

            <div>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`cursor-pointer ${inputClass("type")}`}
              >
                <option value="">Select</option>
                <option value="Repeat">Repeat</option>
                <option value="No Repeat">No Repeat</option>
              </select>
              <ErrorText message={errors.type} />
            </div>
          </div>

          {formData.type === "Repeat" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-start">
                <label className="text-sm font-semibold text-slate-700 pt-2">
                  Start Date <span className="text-red-500">*</span>
                </label>

                <div>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={inputClass("startDate")}
                  />
                  <ErrorText message={errors.startDate} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-start">
                <label className="text-sm font-semibold text-slate-700 pt-2">
                  Completion Date <span className="text-red-500">*</span>
                </label>

                <div>
                  <input
                    type="date"
                    name="completionDate"
                    value={formData.completionDate}
                    onChange={handleChange}
                    className={inputClass("completionDate")}
                  />
                  <ErrorText message={errors.completionDate} />
                </div>
              </div>
            </>
          )}

          {formData.type === "No Repeat" && (
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-start">
              <label className="text-sm font-semibold text-slate-700 pt-2">
                Date <span className="text-red-500">*</span>
              </label>

              <div>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={inputClass("date")}
                />
                <ErrorText message={errors.date} />
              </div>
            </div>
          )}

          {(formData.type === "Repeat" || formData.type === "No Repeat") && (
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-start">
              <label className="text-sm font-semibold text-slate-700 pt-2">
                Time <span className="text-red-500">*</span>
              </label>

              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`cursor-pointer ${inputClass("time")}`}
              >
                {times.map((time) => (
                  <option key={time}>{time}</option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-start">
            <label className="text-sm font-semibold text-slate-700 pt-2">
              Description <span className="text-red-500">*</span>
            </label>

            <div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                className={textareaClass("description")}
              />
              <ErrorText message={errors.description} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-start">
            <label className="text-sm font-semibold text-slate-700 pt-1">
              Notification <span className="text-red-500">*</span>
            </label>

            <div>
              <div className="flex items-center gap-6">
                {["Yes", "No"].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="notification"
                      value={item}
                      checked={formData.notification === item}
                      onChange={handleChange}
                    />
                    {item}
                  </label>
                ))}
              </div>
              <ErrorText message={errors.notification} />
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-6">
            <button
              type="submit"
              className="cursor-pointer px-7 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard/todo")}
              className="cursor-pointer px-7 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddTodo;