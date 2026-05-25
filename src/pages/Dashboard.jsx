function Dashboard() {
  const email = localStorage.getItem("userEmail");

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-3xl font-bold text-slate-900">
        Welcome to Timesheet Dashboard
      </h1>

      <p className="mt-4 text-slate-600">
        Logged in as: {email}
      </p>
    </div>
  );
}

export default Dashboard;