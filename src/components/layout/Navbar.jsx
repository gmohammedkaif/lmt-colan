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
    <header
      className="h-[56px] bg-white border-b border-slate-100 flex items-center justify-between"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        paddingLeft: "clamp(12px, 4vw, 32px)",
        paddingRight: "clamp(12px, 4vw, 32px)",
      }}
    >
      {/* Left: Search (desktop) / Page title (mobile) */}
      <div className="flex items-center min-w-0">
        {/* Desktop search */}
        <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 h-9 w-64 focus-within:border-blue-400 focus-within:bg-white transition-all">
          <FiSearch size={14} className="text-slate-400 shrink-0" />
          <input
            placeholder="Search..."
            className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
          />
        </div>

        {/* Mobile: icon-only search button */}
        <button className="md:hidden w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
          <FiSearch size={15} />
        </button>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Bell */}
        <button className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
          <FiBell size={15} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-slate-200 mx-0.5 sm:mx-1" />

        {/* User pill — avatar only on mobile, full pill on sm+ */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2 sm:px-3 py-1.5">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] sm:text-[11px] font-bold shrink-0">
            {initials}
          </div>
          {/* Name + email: hidden below sm */}
          <div className="hidden sm:block">
            <p className="text-[12px] font-semibold text-slate-800 leading-4 capitalize">
              {name}
            </p>
            <p className="text-[10px] text-slate-400">{email}</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-red-50 border border-red-100 text-red-400 flex items-center justify-center hover:bg-red-100 hover:text-red-600 transition-colors"
          aria-label="Logout"
        >
          <FiLogOut size={14} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;