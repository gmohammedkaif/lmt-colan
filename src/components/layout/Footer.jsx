function Footer() {
  return (
    <footer className="ci-footer">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        .ci-footer {
          height: 42px;
          padding: 0 28px;

          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(8px);

          border-top: 1px solid #f8fafc;

          display: flex;
          align-items: center;
          justify-content: space-between;

          font-family: 'DM Sans', sans-serif;
          flex-shrink: 0;
        }

        .ci-footer-left {
          display: flex;
          align-items: center;
          gap: 6px;

          font-size: 11px;
          color: #94a3b8;
        }

        .ci-footer-left strong {
          color: #475569;
          font-weight: 600;
        }

        .ci-footer-sep {
          color: #cbd5e1;
          font-size: 10px;
        }

        .ci-footer-right {
          display: flex;
          align-items: center;
          gap: 8px;

          font-size: 11px;
          color: #94a3b8;
        }

        .ci-footer-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;

          padding: 3px 10px;

          border-radius: 999px;

          background: #f8fafc;
          border: 1px solid #f1f5f9;

          color: #64748b;

          font-size: 10px;
          font-weight: 500;
        }

        .ci-footer-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #22c55e;
          display: inline-block;
        }

        .ci-footer-version {
          opacity: 0.7;
          font-size: 10px;
        }

        @media (max-width: 767px) {
          .ci-footer {
            padding: 0 18px;
          }

          .ci-footer-right {
            display: none;
          }

          .ci-footer-left {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      {/* LEFT */}
      <div className="ci-footer-left">
        <span>© 2026</span>

        <strong>Colan Infotech</strong>

        <span className="ci-footer-sep">|</span>

        <span>Workspace Portal</span>
      </div>

      {/* RIGHT */}
      <div className="ci-footer-right">
        <span className="ci-footer-badge">
          <span className="ci-footer-dot" />
          All systems operational
        </span>

        <span className="ci-footer-sep">·</span>

        <span className="ci-footer-version">
          v2.0.0
        </span>
      </div>
    </footer>
  );
}

export default Footer;