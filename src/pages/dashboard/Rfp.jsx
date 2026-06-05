import { useState } from "react";
import { FiFilter, FiRefreshCcw, FiEye } from "react-icons/fi";

const rfpData = [
  {
    date: "28 May 2026",
    code: "RFP-2026-001",
    title: "AI Based Timesheet Automation",
    department: "Software Development",
    status: "In Review",
  },
  {
    date: "02 Jun 2026",
    code: "RFP-2026-002",
    title: "Property Management System",
    department: "Web Application",
    status: "Approved",
  },
  {
    date: "10 Jun 2026",
    code: "RFP-2026-003",
    title: "Healthcare CRM Platform",
    department: "CRM",
    status: "Pending",
  },
];

function RFP() {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredRfps = rfpData.filter((rfp) => {
    return filterStatus === "All" || rfp.status === filterStatus;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilterStatus(selectedStatus);
  };

  const handleReset = () => {
    setSelectedStatus("All");
    setFilterStatus("All");
  };

  return (
    <div className="space-y-6">
      {/* FILTER BOX */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <FiFilter className="text-slate-500" size={16} />
            <h2 className="text-sm font-bold text-slate-900">Filter By</h2>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-6 py-6 flex flex-col lg:flex-row lg:items-center gap-5"
        >
          <label className="text-sm font-semibold text-slate-700 min-w-[120px]">
            Status
          </label>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full lg:w-[320px] h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          >
            <option>All</option>
            <option>open</option>
            <option>Pending</option>
            <option>Reopen</option>
            <option>Approved</option>
          </select>

          <div className="flex items-center gap-3 lg:ml-auto">
            <button
              type="submit"
              className="cursor-pointer h-11 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold shadow-sm"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="cursor-pointer h-11 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-sm font-semibold flex items-center gap-2"
            >
              <FiRefreshCcw size={14} />
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* RFP TABLE */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-5 py-4 text-center text-sky-700 font-semibold">
                  Date
                </th>

                <th className="px-5 py-4 text-center text-sky-700 font-semibold">
                  RFP Code
                </th>

                <th className="px-5 py-4 text-center text-sky-700 font-semibold">
                  RFP Title
                </th>

                <th className="px-5 py-4 text-center text-sky-700 font-semibold">
                  Department
                </th>

                <th className="px-5 py-4 text-center text-sky-700 font-semibold">
                  Status
                </th>

                <th className="px-5 py-4 text-center text-sky-700 font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredRfps.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-8 text-center text-sm text-slate-500"
                  >
                    No Record Found
                  </td>
                </tr>
              ) : (
                filteredRfps.map((rfp) => (
                  <tr
                    key={rfp.code}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="px-5 py-5 text-center text-sm text-slate-700">
                      {rfp.date}
                    </td>

                    <td className="px-5 py-5 text-center text-sm font-semibold text-slate-800">
                      {rfp.code}
                    </td>

                    <td className="px-5 py-5 text-center text-sm text-slate-700">
                      {rfp.title}
                    </td>

                    <td className="px-5 py-5 text-center text-sm text-slate-700">
                      {rfp.department}
                    </td>

                    <td className="px-5 py-5 text-center">
                      <span
                        className={`inline-block min-w-[100px] px-4 py-1.5 rounded-lg text-xs font-bold border ${
                          rfp.status === "Approved"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : rfp.status === "In Review"
                            ? "bg-blue-50 text-blue-600 border-blue-100"
                            : "bg-orange-50 text-orange-600 border-orange-100"
                        }`}
                      >
                        {rfp.status}
                      </span>
                    </td>

                    <td className="px-5 py-5 text-center">
                      <button
                        className="cursor-pointer w-9 h-9 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 inline-flex items-center justify-center"
                        title="View"
                      >
                        <FiEye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RFP;