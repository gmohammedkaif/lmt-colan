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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Final source added successfully!");
    navigate("/dashboard/final-resource");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add Final Source</h1>
          <p className="text-sm text-slate-500 mt-1">
            Upload or link the final approved project source.
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard/final-resource")}
          className="px-5 py-3 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-semibold text-slate-700">Project Name *</label>
            <select
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-100"
              required
            >
              <option value="">Select project</option>
              <option>Timesheet Management System</option>
              <option>Property Management System</option>
              <option>RFP Portal Upgrade</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Source Type *</label>
            <select
              name="sourceType"
              value={formData.sourceType}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-100"
              required
            >
              <option value="">Select source type</option>
              <option>Git Repository</option>
              <option>Zip File</option>
              <option>Document Link</option>
              <option>Drive Link</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Version *</label>
            <input
              name="version"
              value={formData.version}
              onChange={handleChange}
              placeholder="Example: v1.0"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Repository / Drive URL</label>
            <input
              name="repoUrl"
              value={formData.repoUrl}
              onChange={handleChange}
              placeholder="Paste GitHub, GitLab or Drive link"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center bg-slate-50">
          <FiUploadCloud className="mx-auto text-blue-600" size={34} />
          <p className="font-semibold text-slate-800 mt-3">Upload source file</p>
          <p className="text-sm text-slate-500 mt-1">ZIP, PDF, DOCX or project handover file</p>
          <input type="file" className="mt-4 text-sm" />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">Comments</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows="5"
            placeholder="Add release notes, handover comments or version details..."
            className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-100 resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard/final-resource")}
            className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
          >
            Submit Final Source
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddFinalSource;