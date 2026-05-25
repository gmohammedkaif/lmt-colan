import { useNavigate } from "react-router-dom";
import { FiLogOut, FiBell, FiUser, FiSearch } from "react-icons/fi";

function Navbar() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail") || "employee@colan.com";
  const name = email.split("@")[0];
  const initials = name.slice(0, 2).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <header className="h-[60px] bg-white border-b border-slate-100 px-6 flex items-center justify-between"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Left: Search bar */}
      <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 h-9 w-64 focus-within:border-blue-400 focus-within:bg-white transition-all">
        <FiSearch size={14} className="text-slate-400 shrink-0" />
        <input placeholder="Search..." className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400" />
      </div>

      {/* Mobile: page title */}
      <div className="md:hidden">
        <p className="text-sm font-bold text-slate-900">Timesheet</p>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        {/* Bell */}
        <button className="relative w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
          <FiBell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200 mx-1" />

        {/* User */}
        <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0">
            {initials}
          </div>
          <div className="hidden sm:block">
            <p className="text-[12px] font-semibold text-slate-800 leading-4 capitalize">{name}</p>
            <p className="text-[10px] text-slate-400">{email}</p>
          </div>
        </div>

        {/* Logout */}
        <button onClick={handleLogout}
          className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 text-red-400 flex items-center justify-center hover:bg-red-100 hover:text-red-600 transition-colors">
          <FiLogOut size={15} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;