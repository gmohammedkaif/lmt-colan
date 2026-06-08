import {
  FiUser,
  FiLock,
  FiImage,
  FiEdit3,
  FiArrowLeft,
  FiSave,
  FiX,
} from "react-icons/fi";

function AccountSettings() {
  return (
    <div className="w-full">
      <div className="bg-white border-b border-slate-100 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Account Settings</h1>
          <p className="text-sm text-slate-500 mt-1">
            Update your login credentials and profile information
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition">
          <FiArrowLeft size={16} />
          Back
        </button>
      </div>

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

            <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md shadow-blue-100 hover:bg-blue-700 transition">
              <FiEdit3 size={17} />
              Edit
            </button>
          </div>

          <div className="p-6 space-y-5">
            <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FiUser size={22} />
              </div>

              <label className="w-44 text-sm font-bold text-slate-900">
                UserName
              </label>

              <input
                type="email"
                defaultValue="mohammed.kaif@colanonline.com"
                className="flex-1 h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              />
            </div>

            <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FiLock size={22} />
              </div>

              <label className="w-44 text-sm font-bold text-slate-900">
                Current Password <span className="text-red-500">*</span>
              </label>

              <input
                type="password"
                defaultValue="123456"
                className="flex-1 h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              />
            </div>

            <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FiLock size={22} />
              </div>

              <label className="w-44 text-sm font-bold text-slate-900">
                New Password <span className="text-red-500">*</span>
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                className="flex-1 h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              />
            </div>

            <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FiLock size={22} />
              </div>

              <label className="w-44 text-sm font-bold text-slate-900">
                Confirm Password <span className="text-red-500">*</span>
              </label>

              <input
                type="password"
                placeholder="Confirm new password"
                className="flex-1 h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              />
            </div>

            <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FiImage size={22} />
              </div>

              <label className="w-44 text-sm font-bold text-slate-900">
                Profile Picture
              </label>

              <input
                type="file"
                className="flex-1 h-12 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-600 file:font-semibold"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
              <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 font-semibold hover:bg-slate-50 transition">
                <FiX size={16} />
                Cancel
              </button>

              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-100 hover:bg-emerald-600 transition">
                <FiSave size={16} />
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;