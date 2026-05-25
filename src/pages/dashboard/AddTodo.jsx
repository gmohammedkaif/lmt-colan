import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTodo() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "",
    description: "",
    notification: "No",
    date: "",
    priority: "Medium",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("To-Do added successfully!");
    navigate("/dashboard/todo");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add New To-Do</h1>
          <p className="text-sm text-slate-500 mt-1">
            Create a reminder or personal task.
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard/todo")}
          className="px-5 py-3 rounded-xl bg-white border text-sm font-semibold"
        >
          Back
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border shadow-sm p-6 space-y-5"
      >
        <div>
          <label className="text-sm font-semibold text-slate-700">Type *</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="mt-2 w-full px-4 py-3 rounded-xl border outline-none"
          >
            <option value="">Select type</option>
            <option>Reminder</option>
            <option>Meeting</option>
            <option>Personal Task</option>
            <option>Office Work</option>
          </select>
        </div>

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
            placeholder="Enter to-do description..."
            className="mt-2 w-full px-4 py-3 rounded-xl border outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="text-sm font-semibold text-slate-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 rounded-xl border outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 rounded-xl border outline-none"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Notification *
            </label>
            <div className="flex gap-5 mt-4">
              <label>
                <input
                  type="radio"
                  name="notification"
                  value="Yes"
                  checked={formData.notification === "Yes"}
                  onChange={handleChange}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="notification"
                  value="No"
                  checked={formData.notification === "No"}
                  onChange={handleChange}
                />{" "}
                No
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard/todo")}
            className="px-5 py-3 rounded-xl border text-sm font-semibold"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold"
          >
            Save To-Do
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTodo;