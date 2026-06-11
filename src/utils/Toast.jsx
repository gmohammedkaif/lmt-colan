import { useState, useEffect, useCallback } from "react";
import { FiCheckCircle, FiTrash2, FiX } from "react-icons/fi";

export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(hideToast, 3000);
    return () => clearTimeout(timer);
  }, [toast, hideToast]);

  return { toast, showToast, hideToast };
}

const typeStyles = {
  delete: {
    bg: "bg-red-500",
    bar: "bg-red-300",
    icon: FiTrash2,
  },
  success: {
    bg: "bg-emerald-500",
    bar: "bg-emerald-300",
    icon: FiCheckCircle,
  },
  error: {
    bg: "bg-red-500",
    bar: "bg-red-300",
    icon: FiX,
  },
};

export function Toast({ toast, onClose }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!toast) return;
    setProgress(100);
    const start = Date.now();
    const duration = 3000;
    const tick = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining > 0) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [toast]);

  if (!toast) return null;

  const style = typeStyles[toast.type] || typeStyles.success;
  const Icon = style.icon;

  return (
    <div className="fixed top-24 right-8 z-50">
      <div
        className={`${style.bg} text-white rounded-xl shadow-lg text-sm font-semibold overflow-hidden`}
      >
        <div className="flex items-center gap-3 px-5 py-3">
          <Icon size={16} className="shrink-0" />
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white shrink-0 transition"
            aria-label="Dismiss"
          >
            <FiX size={14} />
          </button>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 bg-white/20">
          <div
            className={`h-full ${style.bar} transition-none`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <style>{`
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .fixed.top-24.right-8 > div {
          animation: toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}
