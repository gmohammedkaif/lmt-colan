import { useState } from "react";
import {
  FiUser,
  FiLock,
  FiImage,
  FiEdit3,
  FiArrowLeft,
  FiSave,
  FiX,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function AccountSettings() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState("mohammed.kaif@colanonline.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!email.trim()) errs.email = "Email is required";
    if (editing) {
      if (!currentPassword) errs.currentPassword = "Current password required";
      if (!newPassword) errs.newPassword = "New password required";
      else if (newPassword.length < 4) errs.newPassword = "At least 4 characters";
      if (!confirmPassword) errs.confirmPassword = "Confirm your new password";
      else if (newPassword !== confirmPassword) errs.confirmPassword = "Passwords do not match";
    }
    return errs;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    try {
      localStorage.setItem("userEmail", email);
    } catch {
      console.warn("Failed to save user email");
    }

    setSuccess(true);
    setEditing(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleCancel = () => {
    setEditing(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  const inputClass = (field) =>
    `flex-1 h-12 rounded-xl border bg-white px-4 text-sm text-slate-700 outline-none ${
      errors[field]
        ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-red-100 focus:border-red-400"
        : "border-slate-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
    }`;

  return (
    <div className="w-full">
      <div className="bg-white border-b border-slate-100 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Account Settings</h1>
          <p className="text-sm text-slate-500 mt-1">
            Update your login credentials and profile information
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition"
        >
          <FiArrowLeft size={16} />
          Back
        </button>
      </div>

      {success && (
        <div className="px-8 pt-4">
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-4 rounded-xl text-sm font-semibold">
            Account updated successfully!
          </div>
        </div>
      )}

      <div className="p-8 bg-slate-50 min-h-[calc(100vh-90px)]">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-7 py-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Account Information
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Manage username, password and profile picture
              </p>
            </div>

            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md shadow-blue-100 hover:bg-blue-700 transition"
              >
                <FiEdit3 size={17} />
                Edit
              </button>
            )}
          </div>

          <form onSubmit={handleUpdate}>
            <div className="p-6 space-y-5">
              <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FiUser size={22} />
                </div>

                <label
                  htmlFor="as-email"
                  className="w-44 text-sm font-bold text-slate-900"
                >
                  UserName
                </label>

                <div className="flex-1">
                  <input
                    id="as-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((p) => ({ ...p, email: "" }));
                    }}
                    readOnly={!editing}
                    className={`flex-1 h-12 rounded-xl border bg-white px-4 text-sm text-slate-700 outline-none w-full ${
                      errors.email
                        ? "border-red-300 bg-red-50"
                        : editing
                          ? "border-blue-400 ring-2 ring-blue-100"
                          : "border-slate-200"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {editing && (
                <>
                  <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <FiLock size={22} />
                    </div>

                    <label
                      htmlFor="as-current"
                      className="w-44 text-sm font-bold text-slate-900"
                    >
                      Current Password <span className="text-red-500">*</span>
                    </label>

                    <div className="flex-1">
                      <input
                        id="as-current"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => {
                          setCurrentPassword(e.target.value);
                          setErrors((p) => ({ ...p, currentPassword: "" }));
                        }}
                        placeholder="Enter current password"
                        className={inputClass("currentPassword")}
                      />
                      {errors.currentPassword && (
                        <p className="text-xs text-red-500 mt-1">{errors.currentPassword}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <FiLock size={22} />
                    </div>

                    <label
                      htmlFor="as-new"
                      className="w-44 text-sm font-bold text-slate-900"
                    >
                      New Password <span className="text-red-500">*</span>
                    </label>

                    <div className="flex-1">
                      <input
                        id="as-new"
                        type="password"
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          setErrors((p) => ({ ...p, newPassword: "" }));
                        }}
                        placeholder="Enter new password"
                        className={inputClass("newPassword")}
                      />
                      {errors.newPassword && (
                        <p className="text-xs text-red-500 mt-1">{errors.newPassword}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <FiLock size={22} />
                    </div>

                    <label
                      htmlFor="as-confirm"
                      className="w-44 text-sm font-bold text-slate-900"
                    >
                      Confirm Password <span className="text-red-500">*</span>
                    </label>

                    <div className="flex-1">
                      <input
                        id="as-confirm"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setErrors((p) => ({ ...p, confirmPassword: "" }));
                        }}
                        placeholder="Confirm new password"
                        className={inputClass("confirmPassword")}
                      />
                      {errors.confirmPassword && (
                        <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FiImage size={22} />
                </div>

                <label
                  htmlFor="as-pic"
                  className="w-44 text-sm font-bold text-slate-900"
                >
                  Profile Picture
                </label>

                <input
                  id="as-pic"
                  type="file"
                  disabled={!editing}
                  className="flex-1 h-12 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-600 file:font-semibold"
                />
              </div>

              {editing && (
                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 font-semibold hover:bg-slate-50 transition"
                  >
                    <FiX size={16} />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-100 hover:bg-emerald-600 transition"
                  >
                    <FiSave size={16} />
                    Update
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;