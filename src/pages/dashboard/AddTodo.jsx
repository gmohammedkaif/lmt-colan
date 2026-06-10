import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft, FiCheck, FiX, FiPlus, FiCalendar,
  FiClock, FiRepeat, FiFileText, FiBell, FiChevronDown,
  FiAlertCircle, FiLoader, FiChevronLeft, FiChevronRight,
  FiCheckCircle, FiClock as FiClockIcon,
} from "react-icons/fi";

const STORAGE_KEY = "cipl_todos";
const TOAST_KEY = "cipl_todo_toast";

const STEPS = [
  { key: "type", label: "Type", icon: FiRepeat },
  { key: "schedule", label: "Schedule", icon: FiCalendar },
  { key: "details", label: "Details", icon: FiFileText },
  { key: "review", label: "Review", icon: FiCheckCircle },
];

const TIMES = [
  "12:00 am","01:00 am","02:00 am","03:00 am",
  "04:00 am","05:00 am","06:00 am","07:00 am",
  "08:00 am","09:00 am","10:00 am","11:00 am",
  "12:00 pm","01:00 pm","02:00 pm","03:00 pm",
  "04:00 pm","05:00 pm","06:00 pm","07:00 pm",
  "08:00 pm","09:00 pm","10:00 pm","11:00 pm",
];

const typeOptions = [
  { value: "No Repeat", label: "One-Time", desc: "Single task for a specific day", Icon: FiCalendar, accent: "violet" },
  { value: "Repeat", label: "Recurring", desc: "Task repeats over a date range", Icon: FiRepeat, accent: "emerald" },
];

const notifyOptions = [
  { value: "Yes", label: "Notify me", desc: "Push notification on due", Icon: FiBell, accent: "emerald" },
  { value: "No", label: "No thanks", desc: "Skip the reminder", Icon: FiX, accent: "slate" },
];

const accentMap = {
  violet: {
    bg: "bg-violet-50", text: "text-violet-700", iconBg: "bg-violet-100", iconText: "text-violet-600",
    ring: "ring-violet-200", border: "border-violet-400", chip: "bg-violet-100 text-violet-700",
    badge: "bg-violet-50 text-violet-600 border-violet-200",
  },
  emerald: {
    bg: "bg-emerald-50", text: "text-emerald-700", iconBg: "bg-emerald-100", iconText: "text-emerald-600",
    ring: "ring-emerald-200", border: "border-emerald-400", chip: "bg-emerald-100 text-emerald-700",
    badge: "bg-emerald-50 text-emerald-600 border-emerald-200",
  },
  slate: {
    bg: "bg-slate-50", text: "text-slate-700", iconBg: "bg-slate-100", iconText: "text-slate-600",
    ring: "ring-slate-200", border: "border-slate-400", chip: "bg-slate-100 text-slate-700",
    badge: "bg-slate-50 text-slate-600 border-slate-200",
  },
  blue: {
    bg: "bg-blue-50", text: "text-blue-700", iconBg: "bg-blue-100", iconText: "text-blue-600",
    ring: "ring-blue-200", border: "border-blue-400", chip: "bg-blue-100 text-blue-700",
    badge: "bg-blue-50 text-blue-600 border-blue-200",
  },
  amber: {
    bg: "bg-amber-50", text: "text-amber-700", iconBg: "bg-amber-100", iconText: "text-amber-600",
    ring: "ring-amber-200", border: "border-amber-400", chip: "bg-amber-100 text-amber-700",
    badge: "bg-amber-50 text-amber-600 border-amber-200",
  },
};

function AddTodo() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [formData, setFormData] = useState({
    type: "", startDate: "", completionDate: "", date: "",
    time: "12:00 am", description: "", notification: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [step]);

  const hasError = (f) => errors[f] && touched[f];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((p) => ({ ...p, [name]: "" }));
    setTouched((p) => ({ ...p, [name]: true }));
    if (name === "type") {
      setFormData({ ...formData, type: value, startDate: "", completionDate: "", date: "", time: "12:00 am" });
      return;
    }
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleBlur = (f) => setTouched((p) => ({ ...p, [f]: true }));

  const validateForm = () => {
    const e = {};
    if (!formData.type) e.type = "Select a task type";
    if (formData.type === "Repeat") {
      if (!formData.startDate) e.startDate = "Start date required";
      if (!formData.completionDate) e.completionDate = "Completion date required";
      if (formData.startDate && formData.completionDate && formData.completionDate < formData.startDate)
        e.completionDate = "Must be after start date";
    }
    if (formData.type === "No Repeat" && !formData.date) e.date = "Date required";
    if (!formData.description.trim()) e.description = "Description required";
    else if (formData.description.trim().length < 5) e.description = "At least 5 characters";
    if (!formData.notification) e.notification = "Select notification preference";
    return e;
  };

  const canProceed = () => {
    if (step === 0) return !!formData.type;
    if (step === 1) {
      if (formData.type === "Repeat") return !!formData.startDate && !!formData.completionDate;
      return !!formData.date;
    }
    if (step === 2) return formData.description.trim().length >= 5 && !!formData.notification;
    return true;
  };

  const nextStep = () => {
    if (step === 0 && !formData.type) { setTouched((p) => ({ ...p, type: true })); setErrors((p) => ({ ...p, type: "Select a task type" })); return; }
    if (step === 1) {
      const f = formData.type === "Repeat" ? ["startDate", "completionDate"] : ["date"];
      const nt = {}; const ne = {};
      f.forEach((x) => { nt[x] = true; if (!formData[x]) ne[x] = `${x === "startDate" ? "Start" : x === "completionDate" ? "Completion" : ""} date required`; });
      if (formData.startDate && formData.completionDate && formData.completionDate < formData.startDate) ne.completionDate = "Must be after start date";
      setTouched((p) => ({ ...p, ...nt })); setErrors((p) => ({ ...p, ...ne }));
      if (Object.keys(ne).length) return;
    }
    if (step === 2) {
      const nt = { description: true, notification: true };
      const ne = {};
      if (!formData.description.trim()) ne.description = "Description required";
      else if (formData.description.trim().length < 5) ne.description = "At least 5 characters";
      if (!formData.notification) ne.notification = "Select notification preference";
      setTouched((p) => ({ ...p, ...nt })); setErrors((p) => ({ ...p, ...ne }));
      if (Object.keys(ne).length) return;
    }
    setDirection(1);
    setStep((s) => Math.min(s + 1, 3));
  };

  const prevStep = () => { setDirection(-1); setStep((s) => Math.max(s - 1, 0)); };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allFields = ["type", "description", "notification"];
    if (formData.type === "Repeat") allFields.push("startDate", "completionDate");
    if (formData.type === "No Repeat") allFields.push("date");
    const at = {};
    allFields.forEach((f) => (at[f] = true));
    setTouched(at);
    const ve = validateForm();
    setErrors(ve);
    if (Object.keys(ve).length) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const old = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      const todo = {
        id: Date.now(), type: formData.type, description: formData.description.trim(),
        status: "Pending", time: formData.time, notification: formData.notification,
        date: formData.type === "Repeat" ? formData.startDate : formData.date,
        startDate: formData.startDate, completionDate: formData.completionDate,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...old, todo]));
      sessionStorage.setItem(TOAST_KEY, "To-Do created successfully");
      setIsSubmitting(false);
      navigate("/dashboard/todo");
    }, 600);
  };

  const preview = useMemo(() => ({
    type: formData.type || "—",
    date: formData.type === "Repeat" ? formData.startDate || "—" : formData.date || "—",
    endDate: formData.type === "Repeat" ? formData.completionDate || "—" : null,
    time: formData.time || "12:00 am",
    description: formData.description.trim() || "Your task description...",
    notification: formData.notification || "—",
  }), [formData]);

  const activeStyle = (accent) => accentMap[accent];

  const inputClass = (field) =>
    `w-full px-4 py-3 text-sm font-medium rounded-xl border-2 outline-none transition-all duration-200 ${
      hasError(field)
        ? "border-red-300 bg-red-50/40 focus:ring-4 focus:ring-red-100 focus:border-red-400"
        : "border-slate-200 bg-white hover:border-slate-300 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400"
    }`;

  const FieldError = ({ field }) =>
    hasError(field) && errors[field] ? (
      <p className="flex items-center gap-1.5 text-xs font-medium text-red-500 mt-1.5">
        <FiAlertCircle size={12} />
        {errors[field]}
      </p>
    ) : null;

  return (
    <div className="min-h-screen pb-12">
      {/* ─── HERO ─── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 mb-8 shadow-2xl shadow-slate-900/20">
        <div className="absolute inset-0">
          <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] rounded-full bg-gradient-to-br from-indigo-500/10 to-violet-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] rounded-full bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />
        </div>

        <div className="relative px-8 py-6 md:px-10 md:py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-500/25 ring-4 ring-white/10">
                  <FiPlus size={22} className="text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">Create To-Do</h1>
                <p className="text-xs md:text-sm text-slate-300/80 font-medium">Build your task step by step</p>
              </div>
            </div>
            <button type="button" onClick={() => navigate("/dashboard/todo")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-slate-200 hover:text-white text-sm font-semibold transition-all duration-200 backdrop-blur-sm">
              <FiArrowLeft size={15} /> Back
            </button>
          </div>

          {/* ─── STEPPER ─── */}
          <div className="mt-7">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const active = i === step;
                const done = i < step;
                return (
                  <div key={s.key} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                        active ? "bg-white shadow-lg scale-110" : done ? "bg-emerald-500" : "bg-white/10"
                      }`}>
                        {done ? (
                          <FiCheck size={16} className="text-white" />
                        ) : (
                          <Icon size={16} className={active ? "text-slate-900" : "text-white/50"} />
                        )}
                        {active && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-indigo-400 border-2 border-slate-900 animate-pulse" />
                        )}
                      </div>
                      <span className={`text-[10px] font-semibold mt-1.5 transition-colors ${
                        active ? "text-white" : done ? "text-emerald-400" : "text-white/40"
                      }`}>{s.label}</span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={`h-0.5 w-12 md:w-20 mx-2 rounded-full transition-all duration-500 ${
                        done || (active && step > i) ? "bg-emerald-500" : "bg-white/10"
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ─── FORM + PREVIEW ─── */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* FORM */}
        <div className="xl:col-span-3">
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-200/40 overflow-hidden min-h-[400px]">
              <div className="relative overflow-hidden">
                {/* Step content */}
                <div className="p-6 md:p-8" style={{ animation: `${direction >= 0 ? "slideInRight" : "slideInLeft"} 0.35s ease-out` }}>

                  {/* STEP 0: TYPE */}
                  {step === 0 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-bold text-slate-800">Choose a task type</h2>
                        <p className="text-sm text-slate-400 mt-0.5">How should this task behave on your calendar?</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {typeOptions.map(({ value, label, desc, Icon, accent }) => {
                          const a = activeStyle(accent);
                          const sel = formData.type === value;
                          return (
                            <button key={value} type="button" onClick={() => {
                              handleChange({ target: { name: "type", value } });
                              setTouched((p) => ({ ...p, type: true }));
                            }}
                              className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-200 group ${
                                sel ? `${a.border} ${a.bg} shadow-lg shadow-${accent}-200/40` : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                              }`}>
                              {sel && (
                                <div className={`absolute top-3 right-3 w-5 h-5 rounded-full ${a.chip} flex items-center justify-center`}>
                                  <FiCheck size={12} />
                                </div>
                              )}
                              <div className={`w-12 h-12 rounded-xl ${sel ? a.iconBg : "bg-slate-100"} flex items-center justify-center mb-4 transition-all duration-200 ${
                                sel ? `ring-2 ${a.ring} ring-offset-2 ring-offset-white` : ""
                              }`}>
                                <Icon size={20} className={sel ? a.iconText : "text-slate-500"} />
                              </div>
                              <p className="text-base font-bold text-slate-800">{label}</p>
                              <p className="text-sm text-slate-400 mt-1 leading-relaxed">{desc}</p>
                            </button>
                          );
                        })}
                      </div>
                      <FieldError field="type" />
                    </div>
                  )}

                  {/* STEP 1: SCHEDULE */}
                  {step === 1 && formData.type && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-bold text-slate-800">Set the schedule</h2>
                        <p className="text-sm text-slate-400 mt-0.5">
                          {formData.type === "Repeat" ? "Define the recurring period for this task" : "Pick a date for this one-time task"}
                        </p>
                      </div>

                      {formData.type === "Repeat" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 tracking-wide uppercase">Start Date</label>
                            <div className="relative">
                              <FiCalendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                              <input type="date" name="startDate" value={formData.startDate}
                                onChange={handleChange} onBlur={() => handleBlur("startDate")}
                                className={`pl-10 ${inputClass("startDate")}`} />
                            </div>
                            <FieldError field="startDate" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 tracking-wide uppercase">Completion Date</label>
                            <div className="relative">
                              <FiCalendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                              <input type="date" name="completionDate" value={formData.completionDate}
                                onChange={handleChange} onBlur={() => handleBlur("completionDate")}
                                className={`pl-10 ${inputClass("completionDate")}`} />
                            </div>
                            <FieldError field="completionDate" />
                          </div>
                        </div>
                      ) : (
                        <div className="sm:w-3/4 space-y-1.5">
                          <label className="text-xs font-semibold text-slate-500 tracking-wide uppercase">Date</label>
                          <div className="relative">
                            <FiCalendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input type="date" name="date" value={formData.date}
                              onChange={handleChange} onBlur={() => handleBlur("date")}
                              className={`pl-10 ${inputClass("date")}`} />
                          </div>
                          <FieldError field="date" />
                        </div>
                      )}

                      <div className="sm:w-1/2 space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500 tracking-wide uppercase">Time</label>
                        <div className="relative">
                          <FiClock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          <select name="time" value={formData.time} onChange={handleChange}
                            className={`cursor-pointer appearance-none pl-10 pr-10 ${inputClass("time")}`}>
                            {TIMES.map((t) => <option key={t}>{t}</option>)}
                          </select>
                          <FiChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: DETAILS */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-bold text-slate-800">Task details</h2>
                        <p className="text-sm text-slate-400 mt-0.5">Describe the task and set notifications</p>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500 tracking-wide uppercase">Description</label>
                        <textarea name="description" value={formData.description}
                          onChange={(e) => { if (e.target.value.length <= 500) handleChange(e); }}
                          onBlur={() => handleBlur("description")}
                          rows={4} placeholder="What needs to be done? Be specific..."
                          className={`w-full px-4 py-3 text-sm font-medium rounded-xl border-2 outline-none transition-all duration-200 resize-none placeholder:text-slate-400 ${
                            hasError("description") ? "border-red-300 bg-red-50/40 focus:ring-4 focus:ring-red-100 focus:border-red-400" : "border-slate-200 bg-white hover:border-slate-300 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400"
                          }`} />
                        <div className="flex items-center justify-between mt-1">
                          <FieldError field="description" />
                          <span className={`text-xs font-medium ${formData.description.length > 400 ? "text-amber-500" : "text-slate-400"}`}>
                            {formData.description.length}/500
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500 tracking-wide uppercase">Notification</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {notifyOptions.map(({ value, label, desc, Icon, accent }) => {
                            const a = activeStyle(accent);
                            const sel = formData.notification === value;
                            return (
                              <label key={value}
                                className={`relative flex items-center gap-3.5 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                                  sel ? `${a.border} ${a.bg} shadow-md` : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                                }`}>
                                <input type="radio" name="notification" value={value}
                                  checked={sel} onChange={handleChange} className="sr-only" />
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                                  sel ? (value === "Yes" ? "border-emerald-500" : "border-slate-500") : "border-slate-300"
                                }`}>
                                  {sel && <div className={`w-2.5 h-2.5 rounded-full ${value === "Yes" ? "bg-emerald-500" : "bg-slate-500"}`} />}
                                </div>
                                <div className="flex items-center gap-2.5">
                                  <div className={`w-8 h-8 rounded-lg ${sel ? a.iconBg : "bg-slate-100"} flex items-center justify-center`}>
                                    <Icon size={14} className={sel ? a.iconText : "text-slate-500"} />
                                  </div>
                                  <div>
                                    <p className={`text-sm font-semibold ${sel ? a.text : "text-slate-600"}`}>{label}</p>
                                    <p className="text-xs text-slate-400">{desc}</p>
                                  </div>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                        <FieldError field="notification" />
                      </div>
                    </div>
                  )}

                  {/* STEP 3: REVIEW */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-bold text-slate-800">Review & confirm</h2>
                        <p className="text-sm text-slate-400 mt-0.5">Check everything looks right before saving</p>
                      </div>

                      <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200 p-5 space-y-4">
                        {[
                          { label: "Type", value: formData.type, icon: FiRepeat, color: formData.type === "Repeat" ? "emerald" : "violet" },
                          { label: formData.type === "Repeat" ? "Start Date" : "Date", value: formData.type === "Repeat" ? formData.startDate : formData.date, icon: FiCalendar, color: "blue" },
                          ...(formData.type === "Repeat" ? [{ label: "Completion Date", value: formData.completionDate, icon: FiCalendar, color: "amber" }] : []),
                          { label: "Time", value: formData.time, icon: FiClockIcon, color: "slate" },
                          { label: "Description", value: formData.description.trim().slice(0, 80) + (formData.description.trim().length > 80 ? "..." : ""), icon: FiFileText, color: "violet" },
                          { label: "Notification", value: formData.notification === "Yes" ? "Enabled" : "Disabled", icon: FiBell, color: formData.notification === "Yes" ? "emerald" : "slate" },
                        ].map(({ label, value, icon: Icon, color }) => {
                          const a = accentMap[color] || accentMap.slate;
                          return (
                            <div key={label} className="flex items-center gap-3.5 py-1">
                              <div className={`w-8 h-8 rounded-lg ${a.iconBg} flex items-center justify-center shrink-0`}>
                                <Icon size={13} className={a.iconText} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">{label}</p>
                                <p className="text-sm font-semibold text-slate-800 truncate">{value || "—"}</p>
                              </div>
                              <FiCheck size={14} className="text-emerald-500 shrink-0" />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* ─── NAV FOOTER ─── */}
              <div className="px-6 md:px-8 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div>
                  {step > 0 && (
                    <button type="button" onClick={prevStep}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200">
                      <FiChevronLeft size={15} /> Back
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">{STEPS[step].label} · Step {step + 1} of 4</span>
                  <div className="flex gap-1">
                    {STEPS.map((_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        i <= step ? "bg-indigo-500" : "bg-slate-200"
                      }`} />
                    ))}
                  </div>
                </div>
                {step < 3 ? (
                  <button type="button" onClick={nextStep}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-lg shadow-indigo-200 transition-all duration-200">
                    Continue <FiChevronRight size={15} />
                  </button>
                ) : (
                  <button type="submit" disabled={isSubmitting}
                    className="group flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-200 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
                    {isSubmitting ? (
                      <><FiLoader size={15} className="animate-spin" /> Saving...</>
                    ) : (
                      <><FiCheck size={15} className="group-hover:scale-110 transition-transform" /> Create To-Do</>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* ─── PREVIEW SIDEBAR ─── */}
        <div className="xl:col-span-2 hidden xl:block">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-200/40 overflow-hidden sticky top-6">
            <div className="px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <FiCalendar size={13} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Live Preview</h3>
                  <p className="text-[11px] text-slate-400">Real-time task card preview</p>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 shadow-xl">
                {/* Mock card header */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                    preview.type === "Repeat" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-violet-500/20 text-violet-300 border-violet-500/30"
                  }`}>
                    {preview.type === "Repeat" ? "Recurring" : "One-Time"}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">{preview.time}</span>
                </div>

                <p className="text-sm font-semibold text-white leading-relaxed line-clamp-3 min-h-[3rem]">
                  {preview.description}
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <FiCalendar size={11} />
                    <span>{preview.date}{preview.endDate ? ` → ${preview.endDate}` : ""}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <FiBell size={11} />
                    <span>Notification: {preview.notification}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[10px] font-semibold text-amber-300/80 uppercase tracking-wide">Pending</span>
                </div>
              </div>

              {/* Tips */}
              <div className="mt-5 space-y-2.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Quick tips</p>
                {step === 0 && <Tip text="Choose 'Recurring' for tasks that span multiple days" />}
                {step === 1 && <Tip text="Time slots use 12-hour format with AM/PM" />}
                {step === 2 && <Tip text="Be specific in descriptions — it helps with tracking" />}
                {step === 3 && <Tip text="You can edit or delete tasks later from the list view" />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

function Tip({ text }) {
  return (
    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-indigo-50 border border-indigo-100">
      <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
        <span className="text-[10px] font-bold text-indigo-600">i</span>
      </div>
      <p className="text-xs text-indigo-700 leading-relaxed">{text}</p>
    </div>
  );
}

export default AddTodo;
