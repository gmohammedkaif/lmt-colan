import { useState } from "react";
import {
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiFileText,
  FiFolder,
  FiLayers,
  FiUsers,
} from "react-icons/fi";

const tabs = [
  "Overview",
  "Description",
  "Team",
  "Budget",
];

const teamMembers = [
  {
    name: "Hassan Ambur",
    role: "Project Manager",
    id: "CIPL6767",
  },
  {
    name: "Sheik FT Faizan Ur Rahman ",
    role: "Team Leader",
    id: "CIPL00007",
  },
  {
    name: "Zaid Ali",
    role: "Frontend Developer",
    id: "CIPL0029",
  },
  {
    name: "Mohammed Vighnesh",
    role: "Project Coordinator",
    id: "CIPL1111",
  },
  {
    name: "Kaif Khiladi",
    role: "Design Lead",
    id: "CIPL00212",
  },
];

function ProjectDetails() {
  const [activeTab, setActiveTab] =
    useState("Overview");

  return (
    <div
      className="pb-10"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700&display=swap');

        .fade-up {
          animation: fadeUp .35s ease;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {/* HEADER */}
      <div className="flex items-start justify-between mb-7 fade-up">
        <div>
          <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-5 transition-all">
            <FiArrowLeft size={15} />
            Back to Projects
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
              <FiFolder
                size={24}
                className="text-blue-600"
              />
            </div>

            <div>
              <h1
                className="text-[30px] font-bold text-slate-900"
                style={{
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                Client Portal
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Acme Corp • Web Application
              </p>
            </div>
          </div>

          <p className="text-[15px] text-slate-500 max-w-[760px] leading-7">
            Full-stack web application with
            real-time dashboards, analytics,
            employee workflows, reporting, and
            automation systems for enterprise
            management.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold border border-emerald-100">
            Active
          </span>

          <button className="h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all">
            Edit Project
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-7 fade-up">
        {[
          {
            title: "Progress",
            value: "72%",
            icon: FiLayers,
            color:
              "bg-blue-50 text-blue-600",
          },
          {
            title: "Team Members",
            value: "5",
            icon: FiUsers,
            color:
              "bg-violet-50 text-violet-600",
          },
          {
            title: "Deadline",
            value: "15 Jun",
            icon: FiCalendar,
            color:
              "bg-amber-50 text-amber-600",
          },
          {
            title: "Budget",
            value: "₹8.5L",
            icon: FiDollarSign,
            color:
              "bg-emerald-50 text-emerald-600",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)]"
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${item.color}`}
              >
                <Icon size={18} />
              </div>

              <p className="text-sm text-slate-500">
                {item.title}
              </p>

              <h3 className="text-[28px] font-bold text-slate-900 mt-1">
                {item.value}
              </h3>
            </div>
          );
        })}
      </div>

      {/* TABS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2 mb-6 inline-flex gap-2 fade-up">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() =>
              setActiveTab(tab)
            }
            className={`px-5 h-11 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {activeTab === "Overview" && (
        <div className="space-y-6 fade-up">
          
          {/* Project Details */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
            <div className="px-6 py-5 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900">
                Project Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {[
                [
                  "Project Code",
                  "PRJ-2026-001",
                ],
                [
                  "Project Mode",
                  "Fixed Bid",
                ],
                [
                  "Department",
                  "Software Development",
                ],
                [
                  "Technology",
                  "React, Node.js, MongoDB",
                ],
                [
                  "Priority",
                  "High",
                ],
                [
                  "Start Date",
                  "26 May 2026",
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="px-6 py-5 border-b border-r border-slate-100 last:border-r-0"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                    {label}
                  </p>

                  <p className="text-[15px] font-medium text-slate-800">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">
              Workflow Status
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  title: "Project Created",
                  icon: FiCheckCircle,
                  color:
                    "bg-emerald-50 text-emerald-600",
                },
                {
                  title: "Design Phase",
                  icon: FiClock,
                  color:
                    "bg-amber-50 text-amber-600",
                },
                {
                  title: "Development",
                  icon: FiLayers,
                  color:
                    "bg-blue-50 text-blue-600",
                },
              ].map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.title}
                    className="border border-slate-100 rounded-2xl p-5"
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${step.color}`}
                    >
                      <Icon size={18} />
                    </div>

                    <h4 className="font-semibold text-slate-900">
                      {step.title}
                    </h4>

                    <p className="text-sm text-slate-500 mt-2 leading-6">
                      Workflow stage updated and
                      actively monitored.
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* DESCRIPTION */}
      {activeTab === "Description" && (
        <div className="fade-up">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <FiFileText
                  size={18}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Project Description
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Scope and requirement details.
                </p>
              </div>
            </div>

            <div className="text-[15px] text-slate-600 leading-8 space-y-5">
              <p>
                The project aims to redesign and
                redevelop the Client Portal into a
                scalable enterprise platform with
                modern UI, real-time reporting,
                authentication workflows, analytics,
                dashboards, and task automation.
              </p>

              <p>
                Features include employee
                management, secure role-based
                authentication, reporting systems,
                document handling, notification
                systems, project tracking, and
                advanced admin management.
              </p>

              <p>
                The platform is designed using React,
                Node.js, MongoDB, and REST APIs with
                responsive UI architecture and clean
                component-based workflows.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TEAM */}
      {activeTab === "Team" && (
        <div className="fade-up">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
            <div className="px-6 py-5 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900">
                Team Members
              </h3>
            </div>

            <div>
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between px-6 py-5 border-b border-slate-100 last:border-b-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-semibold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {member.name}
                      </h4>

                      <p className="text-sm text-slate-500 mt-1">
                        {member.id}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-slate-600 font-medium">
                    {member.role}
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BUDGET */}
      {activeTab === "Budget" && (
        <div className="fade-up">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
            <div className="px-6 py-5 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900">
                Budget Details
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    {[
                      "Estimated Hours",
                      "Estimated Cost",
                      "Approved Hours",
                      "Approved Cost",
                      "Status",
                    ].map((head) => (
                      <th
                        key={head}
                        className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t border-slate-100">
                    <td className="px-6 py-5 text-sm font-medium text-slate-800">
                      1100 hrs
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      ₹8,50,000
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      950 hrs
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      ₹7,90,000
                    </td>

                    <td className="px-6 py-5">
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                        Approved
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;