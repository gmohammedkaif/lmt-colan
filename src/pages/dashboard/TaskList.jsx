import { useEffect, useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiPlus, FiX, FiClock, FiCheckCircle, FiAlertCircle, FiList, FiCalendar, FiTrendingUp } from "react-icons/fi";
import SideModal from "../../components/layout/ui/SideModal";
import ConfirmModal from "../../utils/ConfirmModal";
import { useToast, Toast } from "../../utils/Toast";

const STORAGE_KEY = "cipl_tasks";

// ─── Mini SVG Arc Progress Ring ──────────────────────────────────────────────
function ProgressRing({ percent, size = 56, stroke = 5, color = "#3B82F6", bg = "#E0F2FE" }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bg} strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 0.8s cubic-bezier(.4,0,.2,1)" }}
      />
    </svg>
  );
}

// ─── Priority Badge ───────────────────────────────────────────────────────────
function PriorityBadge({ priority }) {
  const map = {
    High:   { bg: "#FEF2F2", color: "#EF4444", dot: "#EF4444" },
    Normal: { bg: "#FFF7ED", color: "#F97316", dot: "#F97316" },
    Low:    { bg: "#F0FDF4", color: "#22C55E", dot: "#22C55E" },
  };
  const s = map[priority] || map.Normal;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: s.bg, color: s.color,
      padding: "3px 10px", borderRadius: 999,
      fontSize: 11, fontWeight: 700, letterSpacing: "0.03em"
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, display: "inline-block" }} />
      {priority}
    </span>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    Pending:     { bg: "#EFF6FF", color: "#3B82F6", border: "#BFDBFE" },
    "In Progress": { bg: "#FFF7ED", color: "#F97316", border: "#FED7AA" },
    Completed:   { bg: "#F0FDF4", color: "#16A34A", border: "#BBF7D0" },
  };
  const s = map[status] || map.Pending;
  return (
    <span style={{
      background: s.bg, color: s.color,
      border: `1px solid ${s.border}`,
      padding: "3px 12px", borderRadius: 999,
      fontSize: 11, fontWeight: 700
    }}>
      {status}
    </span>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, accent }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #E2E8F0",
      borderRadius: 16,
      padding: "18px 22px",
      display: "flex", alignItems: "center", gap: 14,
      boxShadow: "0 1px 4px rgba(15,23,42,0.06)",
      flex: 1, minWidth: 140
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: 12,
        background: accent + "18",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: accent, fontSize: 18, flexShrink: 0
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 3, fontWeight: 500 }}>{label}</div>
      </div>
    </div>
  );
}

// ─── Timesheet Row Card ───────────────────────────────────────────────────────
function TimesheetRow({ label, date, worked, total, status }) {
  const workedNum = parseFloat(worked);
  const totalNum = parseFloat(total);
  const pct = totalNum > 0 ? Math.min(100, Math.round((workedNum / totalNum) * 100)) : 0;
  const isGood = status === "Good";
  const ringColor = isGood ? "#22C55E" : "#F97316";
  const ringBg = isGood ? "#DCFCE7" : "#FEF3C7";

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 20,
      padding: "18px 24px",
      borderBottom: "1px solid #F1F5F9",
      transition: "background 0.15s",
    }}
      onMouseEnter={e => e.currentTarget.style.background = "#F8FAFC"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
    >
      {/* Ring */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <ProgressRing percent={pct} color={ringColor} bg={ringBg} />
        <span style={{
          position: "absolute", inset: 0, display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: 10, fontWeight: 800, color: ringColor
        }}>{pct}%</span>
      </div>

      {/* Label + date */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#1E293B" }}>{label}</div>
        <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>{date}</div>
      </div>

      {/* Hours bar */}
      <div style={{ flex: 2, minWidth: 120 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#1E293B" }}>{worked} Hrs</span>
          <span style={{ fontSize: 12, color: "#94A3B8" }}>of {total} Hrs</span>
        </div>
        <div style={{ height: 6, background: "#F1F5F9", borderRadius: 999, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${pct}%`,
            background: `linear-gradient(90deg, ${ringColor}99, ${ringColor})`,
            borderRadius: 999,
            transition: "width 0.8s cubic-bezier(.4,0,.2,1)"
          }} />
        </div>
      </div>

      {/* Badge */}
      <div style={{ flexShrink: 0 }}>
        <span style={{
          display: "inline-block",
          padding: "6px 18px",
          borderRadius: 10,
          fontSize: 12, fontWeight: 800,
          background: isGood ? "#F0FDF4" : "#FFF7ED",
          color: isGood ? "#16A34A" : "#EA580C",
          border: `1.5px solid ${isGood ? "#BBF7D0" : "#FED7AA"}`
        }}>
          {isGood ? "✓ Good" : "⚠ Incomplete"}
        </span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
function TaskList() {
  const [mode, setMode] = useState("day");
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const { toast, showToast } = useToast();

  const [form, setForm] = useState({
    project: "", employee: "", task: "", priority: "Normal", status: "Pending",
  });
  const [errors, setErrors] = useState({ project: "", employee: "", task: "" });

  const today = new Date();
  const displayDate = today.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const summary = useMemo(() => ({
    todayWorked: "00:00", todayTotal: "10:00",
    yesterdayWorked: "09:30", yesterdayTotal: "10:00",
    weekWorked: "28:30", weekTotal: "30:00",
  }), []);

  const stats = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter(t => t.status === "Pending").length,
    inProgress: tasks.filter(t => t.status === "In Progress").length,
    completed: tasks.filter(t => t.status === "Completed").length,
  }), [tasks]);

  const handleCreateTask = (e) => {
    e.preventDefault();
    const newErrors = {
      project: !form.project ? "Project is required" : "",
      employee: !form.employee ? "Employee is required" : "",
      task: !form.task ? "Task is required" : "",
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    setTasks(prev => [...prev, { id: Date.now(), ...form }]);
    setForm({ project: "", employee: "", task: "", priority: "Normal", status: "Pending" });
    setErrors({ project: "", employee: "", task: "" });
    setOpenModal(false);
  };

  const confirmDeleteTask = () => {
    if (!pendingDelete) return;
    setTasks(prev => prev.filter(t => t.id !== pendingDelete));
    setPendingDelete(null);
    showToast("Task deleted", "delete");
  };

  // ── Input field style helper ────────────────────────────────────────────────
  const inputStyle = (hasError) => ({
    width: "100%", padding: "11px 14px", borderRadius: 12,
    border: `1.5px solid ${hasError ? "#FCA5A5" : "#E2E8F0"}`,
    outline: "none", fontSize: 14, color: "#1E293B",
    background: hasError ? "#FFF5F5" : "#FAFAFA",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* ── STAT CARDS ─────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <StatCard icon={<FiList />}         label="Total Tasks"   value={stats.total}      accent="#3B82F6" />
        <StatCard icon={<FiClock />}        label="Pending"       value={stats.pending}     accent="#F97316" />
        <StatCard icon={<FiTrendingUp />}   label="In Progress"   value={stats.inProgress}  accent="#8B5CF6" />
        <StatCard icon={<FiCheckCircle />}  label="Completed"     value={stats.completed}   accent="#22C55E" />
      </div>

      {/* ── CONTROLS BAR ───────────────────────────────────────────────────── */}
      <div style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: 18,
        padding: "16px 20px",
        boxShadow: "0 1px 4px rgba(15,23,42,0.06)",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap", gap: 12
      }}>
        {/* Nav buttons */}
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { label: "PREV", icon: <FiChevronLeft />, iconPos: "left" },
            { label: "NEXT", icon: <FiChevronRight />, iconPos: "right" },
            { label: "CURRENT", icon: null },
          ].map(btn => (
            <button key={btn.label} style={{
              display: "flex", alignItems: "center", gap: 4,
              padding: "8px 14px", borderRadius: 10,
              background: "#F0F9FF", color: "#0369A1",
              border: "1px solid #BAE6FD",
              fontSize: 12, fontWeight: 800, cursor: "pointer",
              letterSpacing: "0.04em",
              transition: "all 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#E0F2FE"}
              onMouseLeave={e => e.currentTarget.style.background = "#F0F9FF"}
            >
              {btn.iconPos === "left" && btn.icon}
              {btn.label}
              {btn.iconPos === "right" && btn.icon}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Mode toggle */}
          <div style={{
            display: "flex", borderRadius: 10, overflow: "hidden",
            border: "1px solid #BAE6FD", background: "#F0F9FF"
          }}>
            {["day", "week", "month"].map(item => (
              <button key={item} onClick={() => setMode(item)} style={{
                padding: "8px 16px", fontSize: 12, fontWeight: 800,
                cursor: "pointer", border: "none", textTransform: "capitalize",
                letterSpacing: "0.03em",
                background: mode === item
                  ? "linear-gradient(135deg, #3B82F6, #0EA5E9)"
                  : "transparent",
                color: mode === item ? "#fff" : "#0369A1",
                transition: "all 0.2s",
              }}>
                {item}
              </button>
            ))}
          </div>

          {/* Add task button */}
          <button onClick={() => setOpenModal(true)} style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "9px 18px", borderRadius: 10,
            background: "linear-gradient(135deg, #3B82F6, #0EA5E9)",
            color: "#fff", fontSize: 13, fontWeight: 700,
            border: "none", cursor: "pointer",
            boxShadow: "0 4px 14px rgba(59,130,246,0.35)",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(59,130,246,0.45)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(59,130,246,0.35)";
            }}
          >
            <FiPlus style={{ fontSize: 16 }} />
            Add Task
          </button>
        </div>
      </div>

      {/* ── TASK TABLE ─────────────────────────────────────────────────────── */}
      <div style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: 18,
        boxShadow: "0 1px 4px rgba(15,23,42,0.06)",
        overflow: "hidden"
      }}>
        {/* Table header strip */}
        <div style={{
          background: "linear-gradient(135deg, #F8FAFC 0%, #F0F9FF 100%)",
          borderBottom: "2px solid #E0F2FE",
          padding: "14px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: "#0369A1", letterSpacing: "0.02em" }}>
            📋 Task List
          </span>
          <span style={{
            fontSize: 12, color: "#64748B", fontWeight: 600,
            background: "#EFF6FF", padding: "3px 10px", borderRadius: 8, border: "1px solid #BFDBFE"
          }}>
            {displayDate}
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", minWidth: 800, borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#FAFAFA", borderBottom: "1px solid #F1F5F9" }}>
                {["Project", "Employee", "Task", "Priority", "Status", "Action"].map(h => (
                  <th key={h} style={{
                    padding: "13px 20px", textAlign: "center",
                    fontSize: 12, fontWeight: 800, color: "#0369A1",
                    letterSpacing: "0.06em", textTransform: "uppercase"
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "52px 20px", textAlign: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 56, height: 56, borderRadius: 16,
                        background: "linear-gradient(135deg, #EFF6FF, #F0F9FF)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 24, border: "1px solid #BFDBFE"
                      }}>📝</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#1E293B" }}>No tasks yet</div>
                      <div style={{ fontSize: 13, color: "#94A3B8" }}>Click "Add Task" to get started</div>
                    </div>
                  </td>
                </tr>
              ) : (
                tasks.map((item, i) => (
                  <tr key={item.id} style={{
                    borderBottom: "1px solid #F8FAFC",
                    transition: "background 0.15s",
                    animation: "fadeSlideIn 0.25s ease forwards",
                    animationDelay: `${i * 40}ms`,
                    opacity: 0,
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F8FAFC"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <td style={{ padding: "15px 20px", textAlign: "center", wordBreak: "break-word", overflowWrap: "break-word", whiteSpace: "normal" }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#1E293B" }}>{item.project}</span>
                    </td>
                    <td style={{ padding: "15px 20px", textAlign: "center", wordBreak: "break-word", overflowWrap: "break-word", whiteSpace: "normal" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: "50%",
                          background: "linear-gradient(135deg, #3B82F6, #0EA5E9)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#fff", fontSize: 11, fontWeight: 800, flexShrink: 0
                        }}>
                          {item.employee.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontSize: 13, color: "#475569" }}>{item.employee}</span>
                      </div>
                    </td>
                    <td style={{ padding: "15px 20px", textAlign: "center", wordBreak: "break-word", overflowWrap: "break-word", whiteSpace: "normal" }}>
                      <span style={{ fontSize: 13, color: "#475569", maxWidth: 200, display: "inline-block" }}>{item.task}</span>
                    </td>
                    <td style={{ padding: "15px 20px", textAlign: "center" }}>
                      <PriorityBadge priority={item.priority} />
                    </td>
                    <td style={{ padding: "15px 20px", textAlign: "center" }}>
                      <StatusBadge status={item.status} />
                    </td>
                    <td style={{ padding: "15px 20px", textAlign: "center" }}>
                      <button onClick={() => setPendingDelete(item.id)} style={{
                        padding: "6px 14px", borderRadius: 8,
                        background: "#FEF2F2", color: "#EF4444",
                        border: "1px solid #FECACA",
                        fontSize: 12, fontWeight: 700, cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = "#EF4444";
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = "#FEF2F2";
                          e.currentTarget.style.color = "#EF4444";
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── TIMESHEET SUMMARY ──────────────────────────────────────────────── */}
      <div style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: 18,
        boxShadow: "0 1px 4px rgba(15,23,42,0.06)",
        overflow: "hidden"
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)",
          padding: "18px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>⏱ Your Timesheet Summary</div>
            <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>Weekly work hours at a glance</div>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#38BDF8" }}>38h</div>
              <div style={{ fontSize: 10, color: "#64748B" }}>Target</div>
            </div>
            <div style={{ width: 1, background: "#1E3A5F" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#22C55E" }}>28.5h</div>
              <div style={{ fontSize: 10, color: "#64748B" }}>Logged</div>
            </div>
          </div>
        </div>

        {/* Rows */}
        <TimesheetRow
          label="Today" date="04/06/2026"
          worked="00:00" total="10:00" status="Incomplete"
        />
        <TimesheetRow
          label="Yesterday" date="03/06/2026"
          worked="09:30" total="10:00" status="Good"
        />
        <TimesheetRow
          label="This Week" date="01 June – 05 June 2026"
          worked="28:30" total="30:00" status="Good"
        />
      </div>

      {/* ── KEYFRAMES via style tag ─────────────────────────────────────────── */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── ADD TASK MODAL ─────────────────────────────────────────────────── */}
      <SideModal
        open={openModal}
        title="Create Task"
        subtitle="Fill in the details below to add a new task."
        onClose={() => {
          setOpenModal(false);
          setErrors({ project: "", employee: "", task: "" });
        }}
      >
        <form onSubmit={handleCreateTask}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: "4px 0" }}>
            {[
              { key: "project", placeholder: "Project name" },
              { key: "employee", placeholder: "Employee name" },
              { key: "task", placeholder: "Task description" },
            ].map(({ key, placeholder }) => (
              <div key={key}>
                <input
                  value={form[key]}
                  onChange={e => {
                    setForm({ ...form, [key]: e.target.value });
                    if (e.target.value) setErrors(prev => ({ ...prev, [key]: "" }));
                  }}
                  placeholder={placeholder}
                  style={inputStyle(!!errors[key])}
                  onFocus={e => e.target.style.borderColor = "#3B82F6"}
                  onBlur={e => e.target.style.borderColor = errors[key] ? "#FCA5A5" : "#E2E8F0"}
                />
                {errors[key] && (
                  <p style={{ marginTop: 4, fontSize: 11, color: "#EF4444" }}>{errors[key]}</p>
                )}
              </div>
            ))}

            <select
              value={form.priority}
              onChange={e => setForm({ ...form, priority: e.target.value })}
              style={{ ...inputStyle(false), cursor: "pointer" }}
            >
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
            </select>

            <select
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
              style={{ ...inputStyle(false), cursor: "pointer" }}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div style={{
            marginTop: 20, paddingTop: 16,
            borderTop: "1px solid #F1F5F9",
            display: "flex", justifyContent: "flex-end", gap: 10
          }}>
            <button type="button" onClick={() => {
              setOpenModal(false);
              setErrors({ project: "", employee: "", task: "" });
            }} style={{
              padding: "10px 20px", borderRadius: 10,
              border: "1px solid #E2E8F0", background: "#fff",
              color: "#475569", fontSize: 13, fontWeight: 600, cursor: "pointer"
            }}>
              Cancel
            </button>
            <button type="submit" style={{
              padding: "10px 24px", borderRadius: 10,
              background: "linear-gradient(135deg, #3B82F6, #0EA5E9)",
              color: "#fff", fontSize: 13, fontWeight: 700,
              border: "none", cursor: "pointer",
              boxShadow: "0 4px 12px rgba(59,130,246,0.3)"
            }}>
              Save Task
            </button>
          </div>
        </form>
      </SideModal>

      <Toast toast={toast} onClose={() => {}} />
      <ConfirmModal
        open={!!pendingDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={confirmDeleteTask}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}

export default TaskList;