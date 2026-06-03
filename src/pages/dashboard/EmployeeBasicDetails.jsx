import React from "react";

const employee = {
  employeeId: "CIPL1918",
  gender: "Male",
  employeeName: "Mohammed Kaif",
  department: "React JS",
  role: "Trainee Software Engineer",
  dateOfJoin: "01/05/2026",
  officialEmail: "mohammed.kaif@colanonline.com",
  onsite: "No",
  verticalsWorked: "Nil",
  reportingPerson: "Aadil Ahmed",
};

export default function EmployeeBasicDetails() {
  const details = [
    ["Employee ID", employee.employeeId],
    ["Gender", employee.gender],
    ["Employee Name", employee.employeeName],
    ["Department", employee.department],
    ["Role", employee.role],
    ["Date of Join", employee.dateOfJoin],
    ["Official Email", employee.officialEmail],
    ["Onsite", employee.onsite],
    ["Verticals Worked", employee.verticalsWorked],
    ["Reporting Person", employee.reportingPerson],
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">
          Basic Details
        </h2>
      </div>

      {/* Details Table */}
      <div>
        {details.map(([label, value], index) => (
          <div
            key={label}
            className={`grid md:grid-cols-2 ${
              index !== details.length - 1
                ? "border-b border-slate-100"
                : ""
            }`}
          >
            <div className="px-6 py-4 font-semibold text-slate-800 bg-slate-50">
              {label}
            </div>

            <div className="px-6 py-4 text-slate-600">
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}