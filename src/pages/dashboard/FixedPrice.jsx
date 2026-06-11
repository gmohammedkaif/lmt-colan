import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiClock,
  FiFilter,
} from "react-icons/fi";
import { useState } from "react";
import SideModal from "../../components/layout/ui/SideModal";

const entries = [
  {
    id: 1,
    date: "10/06/2026",
    project: "True Hope Website",
    taskTitle: "Homepage Design",
    description: "Completed responsive homepage layout",
    startTime: "09:00 AM",
    endTime: "06:00 PM",
    hours: "09:00",
    billable: "Yes",
  },
  {
    id: 2,
    date: "09/06/2026",
    project: "ERP Portal",
    taskTitle: "Dashboard Development",
    description: "Created analytics dashboard widgets",
    startTime: "10:00 AM",
    endTime: "07:00 PM",
    hours: "09:00",
    billable: "No",
  },
];

function FixedPrice() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Fixed Price Management
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Track project effort and logged work for fixed price projects.
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm font-semibold"
          >
            <FiClock />
            Log Time
          </button>
        </div>

        {/* FILTER SECTION */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-5">
            <FiFilter className="text-slate-500" />

            <h2 className="font-bold text-slate-900">
              Filter Fixed Price Entries
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <select className="px-4 py-3 rounded-xl border border-slate-200 outline-none">
              <option>All Projects</option>
              <option>True Hope Website</option>
              <option>ERP Portal</option>
            </select>

            <input
              type="date"
              className="px-4 py-3 rounded-xl border border-slate-200 outline-none"
            />

            <input
              type="date"
              className="px-4 py-3 rounded-xl border border-slate-200 outline-none"
            />

            <select className="px-4 py-3 rounded-xl border border-slate-200 outline-none">
              <option>All</option>
              <option>Billable</option>
              <option>Non Billable</option>
            </select>

            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold">
              Apply
            </button>
          </div>
        </div>
                {/* SUMMARY */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-sm text-slate-500">Total Entries</p>
              <h3 className="text-2xl font-bold text-slate-900">24</h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">Total Hours</p>
              <h3 className="text-2xl font-bold text-blue-600">186:30</h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">Billable Hours</p>
              <h3 className="text-2xl font-bold text-green-600">142:00</h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">Non Billable</p>
              <h3 className="text-2xl font-bold text-orange-600">44:30</h3>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1300px]">
              <thead className="bg-slate-900 text-white">
                <tr>
                  {[
                    "Date",
                    "Project",
                    "Task Title",
                    "Description",
                    "Start Time",
                    "End Time",
                    "Hours",
                    "Billable",
                    "Actions",
                  ].map((head) => (
                    <th
                      key={head}
                      className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {entries.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-5 text-sm text-slate-700">
                      {item.date}
                    </td>

                    <td className="px-6 py-5 font-semibold text-slate-900">
                      {item.project}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-700">
                      {item.taskTitle}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-700 max-w-xs">
                      {item.description}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-700">
                      {item.startTime}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-700">
                      {item.endTime}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <FiClock size={14} />
                        {item.hours}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.billable === "Yes"
                            ? "bg-green-100 text-green-600"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {item.billable}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex gap-2">
                        <button className="w-9 h-9 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center">
                          <FiEye />
                        </button>

                        <button className="w-9 h-9 rounded-xl bg-green-50 hover:bg-green-100 text-green-600 flex items-center justify-center">
                          <FiEdit2 />
                        </button>

                        <button className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
                {/* LOG TIME MODAL */}
        <SideModal
          open={openModal}
          title="Log Time On Project"
          subtitle="Track fixed price project effort."
          onClose={() => setOpenModal(false)}
          width="700px"
        >
          <div className="space-y-5">
            {/* ROW 1 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Project *
                </label>

                <select className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none">
                  <option>True Hope Website</option>
                  <option>ERP Portal</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Date *
                </label>

                <input
                  type="date"
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Start Time *
                </label>

                <input
                  type="time"
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  End Time *
                </label>

                <input
                  type="time"
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                />
              </div>
            </div>

            {/* ROW 2 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Hours
                </label>

                <input
                  type="number"
                  placeholder="00"
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Minutes
                </label>

                <input
                  type="number"
                  placeholder="00"
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Type *
                </label>

                <select className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none">
                  <option>WBS</option>
                  <option>Development</option>
                  <option>Testing</option>
                  <option>Design</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-10">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  defaultChecked
                />

                <span className="text-sm font-medium text-slate-700">
                  Billable ?
                </span>
              </div>
            </div>

            {/* TASK TITLE */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Task Title *
              </label>

              <select className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none">
                <option>Select Task</option>
                <option>Homepage Design</option>
                <option>Dashboard Development</option>
                <option>Bug Fixing</option>
                <option>Testing</option>
              </select>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Description *
              </label>

              <textarea
                rows="5"
                placeholder="Enter work description..."
                className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none resize-none"
              />
            </div>

            {/* FOOTER */}
            <div className="border-t border-slate-100 pt-5 flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700"
              >
                Cancel
              </button>

              <button className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold">
                Log Time
              </button>
            </div>
          </div>
        </SideModal>
      </div>
    </>
  );
}

export default FixedPrice;