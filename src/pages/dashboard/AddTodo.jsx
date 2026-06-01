// ===============================
// ADD TODO PAGE
// ===============================

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTodo() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "",
    description: "",
    date: "",
    priority: "Medium",
    notification: true,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("To-Do added successfully!");

    navigate("/dashboard/todo");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Add New To-Do
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Create a reminder or personal task.
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard/todo")}
          className="px-5 py-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold"
        >
          Back
        </button>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6"
      >
        {/* TYPE */}
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Type *
          </label>

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select type</option>

            <option>Reminder</option>

            <option>Meeting</option>

            <option>Office Work</option>

            <option>Personal Task</option>
          </select>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Description *
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Write task details..."
            className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none resize-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* DATE */}
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Due Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* PRIORITY */}
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Priority
            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          {/* NOTIFICATION */}
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Notification
            </label>

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    notification: !formData.notification,
                  })
                }
                className={`w-14 h-8 rounded-full transition relative ${
                  formData.notification
                    ? "bg-blue-600"
                    : "bg-slate-300"
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full absolute top-1 transition ${
                    formData.notification
                      ? "right-1"
                      : "left-1"
                  }`}
                />
              </button>

              <span className="text-sm text-slate-600">
                {formData.notification ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/dashboard/todo")}
            className="px-5 py-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
          >
            Save To-Do
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTodo;