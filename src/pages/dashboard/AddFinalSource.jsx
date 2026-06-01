import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUploadCloud, FiArrowLeft, FiSave,
  FiFileText, FiLink, FiFolder, FiChevronDown,
} from "react-icons/fi";

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100";

const selectClass =
  "w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100";

function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function SelectWrap({ children }) {
  return (
    <div className="relative">
      {children}
      <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
    </div>
  );
}

function AddFinalSource() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: "",
    sourceType: "",
    version: "",
    repoUrl: "",
    comments: "",
  });
  const [fileName, setFileName] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) =>
    setFileName(e.target.files[0]?.name || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Final source added successfully!");
    navigate("/dashboard/final-resource");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl space-y-5">

        {/* ── Page Header ── */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">
              Delivery Management
            </p>
            <h1 className="text-xl font-semibold text-gray-900">Add Final Source</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Upload or link the approved project source and delivery details
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard/final-resource")}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <FiArrowLeft size={14} />
            Back
          </button>
        </div>

        {/* ── Form Card ── */}
        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">

          {/* Card Header */}
          <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
            <h2 className="text-sm font-semibold text-gray-800">Source Information</h2>
            <p className="text-xs text-gray-500 mt-0.5">Fill in the final delivery details carefully</p>
          </div>

          {/* Form Fields */}
          <div className="p-6 grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Project Name */}
            <Field label="Project Name" required>
              <SelectWrap>
                <select
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  required
                  className={selectClass}
                >
                  <option value="">Select project</option>
                  <option>Timesheet Management System</option>
                  <option>Property Management System</option>
                  <option>RFP Portal Upgrade</option>
                </select>
              </SelectWrap>
            </Field>

            {/* Source Type */}
            <Field label="Source Type" required>
              <SelectWrap>
                <select
                  name="sourceType"
                  value={formData.sourceType}
                  onChange={handleChange}
                  required
                  className={selectClass}
                >
                  <option value="">Select source type</option>
                  <option>Git Repository</option>
                  <option>Zip File</option>
                  <option>Document Link</option>
                  <option>Drive Link</option>
                </select>
              </SelectWrap>
            </Field>

            {/* Version */}
            <Field label="Version" required>
              <input
                name="version"
                value={formData.version}
                onChange={handleChange}
                placeholder="e.g. v1.0"
                required
                className={inputClass}
              />
            </Field>

            {/* Repo URL */}
            <Field label="Repository / Drive URL">
              <div className="relative">
                <FiLink className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input
                  name="repoUrl"
                  value={formData.repoUrl}
                  onChange={handleChange}
                  placeholder="Paste GitHub, GitLab or Drive link"
                  className={`${inputClass} pl-9`}
                />
              </div>
            </Field>
          </div>

          {/* Upload Box */}
          <div className="px-6 pb-5">
            <p className="text-sm font-medium text-gray-700 mb-2">Upload Source File</p>
            <label className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-8 cursor-pointer hover:border-blue-300 hover:bg-blue-50/40 transition-colors group">
              <div className="h-11 w-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-blue-500 group-hover:border-blue-200 transition-colors shadow-sm">
                <FiUploadCloud size={22} />
              </div>
              {fileName ? (
                <div className="text-center">
                  <p className="text-sm font-medium text-blue-600">{fileName}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Click to change file</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700">Click to upload source file</p>
                  <p className="text-xs text-gray-400 mt-0.5">ZIP, PDF, DOCX or project handover file</p>
                </div>
              )}
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
          </div>

          {/* Comments */}
          <div className="px-6 pb-6">
            <Field label="Comments">
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows={4}
                placeholder="Add release notes, handover comments or version details…"
                className={`${inputClass} resize-none`}
              />
            </Field>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/final-resource")}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2 text-sm font-medium text-white hover:bg-blue-800 transition-colors"
            >
              <FiSave size={14} />
              Submit Final Source
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default AddFinalSource;