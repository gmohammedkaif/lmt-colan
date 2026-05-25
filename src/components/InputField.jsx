import { FiMail, FiLock, FiEyeOff, FiEye } from "react-icons/fi";
import { useState } from "react";

function InputField({ label, type, placeholder, value, onChange }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="mb-5">
      <label className="block text-[11px] font-semibold text-slate-600 mb-2 uppercase tracking-wide">
        {label}
      </label>
      <div className="flex items-center gap-3 h-12 border border-slate-200 rounded-xl px-4 bg-slate-50
        focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all">
        {isPassword
          ? <FiLock className="text-slate-400 shrink-0" size={15} />
          : <FiMail className="text-slate-400 shrink-0" size={15} />
        }
        <input type={inputType} placeholder={placeholder} value={value} onChange={onChange}
          className="flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400" />
        {isPassword && (
          <button type="button" onClick={() => setShow(!show)} className="text-slate-400 hover:text-slate-600 transition-colors">
            {show ? <FiEye size={15} /> : <FiEyeOff size={15} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default InputField;