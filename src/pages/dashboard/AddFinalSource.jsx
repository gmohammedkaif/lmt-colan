import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";

function AddFinalSource() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectName: "",
    sourceType: "",
    version: "",
    repoUrl: "",
    comments: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setTimeout(() => {
      navigate("/dashboard/final-resource");
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Add Final Source
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Upload final project source and delivery details.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/dashboard/final-resource")}
          className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Back
        </button>
      </div>

      {submitted && (
        <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-4 rounded-xl text-sm font-semibold">
          Final source added successfully! Redirecting...
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 space-y-6"
      >
        {/* Top Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Project */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Project Name *
            </label>

            <select
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              required
              className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Select Project</option>

              <option>Timesheet Management System</option>

              <option>Property Management System</option>

              <option>RFP Portal Upgrade</option>
            </select>
          </div>

          {/* Source Type */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Source Type *
            </label>

            <select
              name="sourceType"
              value={formData.sourceType}
              onChange={handleChange}
              required
              className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Select Source Type</option>

              <option>Git Repository</option>

              <option>ZIP File</option>

              <option>Drive Link</option>

              <option>Documentation</option>
            </select>
          </div>

          {/* Version */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Version *
            </label>

            <input
              type="text"
              name="version"
              value={formData.version}
              onChange={handleChange}
              required
              placeholder="Example: v1.0"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* URL */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Repository / Drive URL
            </label>

            <input
              type="text"
              name="repoUrl"
              value={formData.repoUrl}
              onChange={handleChange}
              placeholder="Paste source link"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Upload */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Upload Files
          </label>

          <div className="mt-2 border-2 border-dashed border-slate-200 rounded-2xl p-8 bg-slate-50 text-center">
            <FiUploadCloud
              size={34}
              className="mx-auto text-blue-600"
            />

            <p className="mt-3 font-medium text-slate-800">
              Upload final source package
            </p>

            <p className="text-sm text-slate-500 mt-1">
              ZIP, PDF, DOCX or deployment files
            </p>

            <input type="file" className="mt-4 text-sm" />
          </div>
        </div>

        {/* Comments */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Comments
          </label>

          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows="5"
            placeholder="Add release notes or handover details..."
            className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none resize-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/dashboard/final-resource")}
            className="px-5 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
          >
            Submit Final Source
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddFinalSource;