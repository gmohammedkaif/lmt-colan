/**
 * SideModal — shared animated panel
 * Desktop: slides in from the right (half-page width)
 * Mobile: slides up from the bottom (full width, max 90vh)
 *
 * Props:
 *   open      {boolean}   controls visibility
 *   onClose   {function}  called when backdrop or X is clicked
 *   title     {string}
 *   subtitle  {string}    optional
 *   children  {node}
 *   width     {string}    max panel width on desktop (default "520px")
 */
import { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";

function SideModal({ open, onClose, title, subtitle, children, width = "520px" }) {
  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="ci-sidemodal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <style>{`
        @keyframes ci-slide-from-right {
          from { transform: translateX(100%); opacity: 0.6; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes ci-slide-from-bottom {
          from { transform: translateY(100%); opacity: 0.6; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        .ci-sidemodal-overlay {
          position: fixed;
          inset: 0;
          z-index: 50;
          background: rgba(15,23,42,0.40);
          backdrop-filter: blur(3px);
          display: flex;
          justify-content: flex-end;
          animation: ci-overlay-in 0.25s ease both;
        }

        @keyframes ci-overlay-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .ci-sidemodal-panel {
          position: relative;
          height: 100%;
          width: 100%;
          max-width: ${width};
          background: #ffffff;
          display: flex;
          flex-direction: column;
          box-shadow: -8px 0 40px rgba(15,23,42,0.12);
          animation: ci-slide-from-right 0.38s cubic-bezier(0.16,1,0.3,1) both;
        }

        .ci-sidemodal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 20px 24px 16px;
          border-bottom: 1px solid #f1f5f9;
          flex-shrink: 0;
        }

        .ci-sidemodal-title {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          font-family: 'DM Sans', sans-serif;
          line-height: 1.3;
        }

        .ci-sidemodal-subtitle {
          font-size: 12px;
          color: #94a3b8;
          margin-top: 3px;
          font-family: 'DM Sans', sans-serif;
        }

        .ci-sidemodal-close {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #64748b;
          flex-shrink: 0;
          margin-left: 12px;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
        }

        .ci-sidemodal-close:hover {
          background: #fee2e2;
          color: #dc2626;
          border-color: #fecaca;
        }

        .ci-sidemodal-body {
          flex: 1;
          overflow-y: auto;
          padding: 20px 24px;
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }

        .ci-sidemodal-body::-webkit-scrollbar { width: 6px; }
        .ci-sidemodal-body::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 999px; }

        /* ── Mobile: bottom sheet ── */
        @media (max-width: 639px) {
          .ci-sidemodal-overlay {
            align-items: flex-end;
            justify-content: stretch;
          }

          .ci-sidemodal-panel {
            max-width: 100%;
            width: 100%;
            height: auto;
            max-height: 90vh;
            border-radius: 20px 20px 0 0;
            box-shadow: 0 -8px 40px rgba(15,23,42,0.14);
            animation: ci-slide-from-bottom 0.38s cubic-bezier(0.16,1,0.3,1) both;
          }

          .ci-sidemodal-body {
            padding: 16px 20px 24px;
          }

          .ci-sidemodal-header {
            padding: 18px 20px 14px;
          }
        }
      `}</style>

      <div className="ci-sidemodal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="ci-sidemodal-header">
          <div>
            <div className="ci-sidemodal-title">{title}</div>
            {subtitle && <div className="ci-sidemodal-subtitle">{subtitle}</div>}
          </div>
          <button className="ci-sidemodal-close" onClick={onClose} aria-label="Close">
            <FiX size={15} />
          </button>
        </div>

        <div className="ci-sidemodal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default SideModal;
