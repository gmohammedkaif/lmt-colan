import React, { useEffect, useState } from "react";
import {
  Edit3,
  GraduationCap,
  BriefcaseBusiness,
  FileText,
  X,
  Save,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";

const courses = [
  "Select",
  "Any",
  "Any Computers (Degree/Diploma)",
  "Any Diploma Holders",
  "Any Engineering",
  "Any Hotel Management",
  "Any Management",
  "Any Medical",
  "Any Post Graduate",
  "B. Com",
  "B. Pharma.",
  "B. Sc.",
  "B. Tech/B.E.",
  "B.A.",
  "B.B.A.",
  "B.C.A.",
  "B.H.M",
  "Bachelor of Bus. Admin/ Mgmt.",
  "Bachelor of Comp. Apps./ Mgmt.",
  "Bachelor of Dental Science",
  "ICWA",
  "Integrated PG. Course",
  "Journalism/ Mass Communication",
  "LLB",
  "M.C.A",
  "M.S/M.D",
  "Master of Architecture",
  "Master of Arts",
  "Master of Commerce (M. Com.)",
  "Master of Education",
  "Master of Law",
  "Master of Pharmacy",
  "Master of Science",
  "Master of Technology",
  "MBA/PGDBM",
  "MBBS",
  "MPHIL",
  "Others",
  "PG. Diploma",
];

const years = ["Year", ...Array.from({ length: 35 }, (_, i) => String(2026 - i))];

const months = [
  "Month",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const emptyQualification = {
  course: "Select",
  major: "",
  from: "Year",
  to: "Year",
  percentage: "",
  college: "",
};

const emptyExperience = {
  company: "",
  role: "",
  tech: "",
  fromMonth: "Month",
  fromYear: "Year",
  toMonth: "Month",
  toYear: "Year",
};

export default function QualificationDetails() {
  const [openModal, setOpenModal] = useState(false);
  const [savedData, setSavedData] = useState({
    qualifications: [],
    experiences: [],
    cvName: "",
  });

  const [form, setForm] = useState({
    qualifications: Array.from({ length: 5 }, () => ({ ...emptyQualification })),
    experiences: Array.from({ length: 5 }, () => ({ ...emptyExperience })),
    cvName: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("qualificationDetails");

    if (stored) {
      const parsed = JSON.parse(stored);
      setSavedData(parsed);
      setForm({
        qualifications:
          parsed.qualifications?.length > 0
            ? parsed.qualifications
            : Array.from({ length: 5 }, () => ({ ...emptyQualification })),
        experiences:
          parsed.experiences?.length > 0
            ? parsed.experiences
            : Array.from({ length: 5 }, () => ({ ...emptyExperience })),
        cvName: parsed.cvName || "",
      });
    }
  }, []);

  const handleQualificationChange = (index, field, value) => {
    const updated = [...form.qualifications];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, qualifications: updated });
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...form.experiences];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, experiences: updated });
  };

  const addQualificationRow = () => {
    setForm({
      ...form,
      qualifications: [...form.qualifications, { ...emptyQualification }],
    });
  };

  const addExperienceRow = () => {
    setForm({
      ...form,
      experiences: [...form.experiences, { ...emptyExperience }],
    });
  };

  const removeQualificationRow = (index) => {
    const updated = form.qualifications.filter((_, i) => i !== index);
    setForm({ ...form, qualifications: updated });
  };

  const removeExperienceRow = (index) => {
    const updated = form.experiences.filter((_, i) => i !== index);
    setForm({ ...form, experiences: updated });
  };

  const handleSave = () => {
    const finalData = {
      qualifications: form.qualifications.filter(
        (item) =>
          item.course !== "Select" ||
          item.major ||
          item.from !== "Year" ||
          item.to !== "Year" ||
          item.percentage ||
          item.college
      ),
      experiences: form.experiences.filter(
        (item) =>
          item.company ||
          item.role ||
          item.tech ||
          item.fromMonth !== "Month" ||
          item.fromYear !== "Year" ||
          item.toMonth !== "Month" ||
          item.toYear !== "Year"
      ),
      cvName: form.cvName,
    };

    localStorage.setItem("qualificationDetails", JSON.stringify(finalData));
    setSavedData(finalData);
    setOpenModal(false);
  };

  const qualificationText =
    savedData.qualifications.length > 0
      ? `${savedData.qualifications.length} qualification added`
      : "Not yet updated";

  const experienceText =
    savedData.experiences.length > 0
      ? `${savedData.experiences.length} experience added`
      : "Not yet updated";

  const cvText = savedData.cvName || "Not yet updated";

  const qualificationData = [
    {
      label: "Qualification",
      value: qualificationText,
      icon: GraduationCap,
    },
    {
      label: "Experience",
      value: experienceText,
      icon: BriefcaseBusiness,
    },
    {
      label: "Updated CV",
      value: cvText,
      icon: FileText,
    },
  ];

  return (
    <>
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Qualification Details
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Education, experience and resume information
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700"
          >
            <Edit3 size={16} />
            Edit
          </button>
        </div>

        <div className="p-5">
          <div className="grid gap-4">
            {qualificationData.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-blue-200 hover:bg-white hover:shadow-sm md:grid-cols-[230px_1fr]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon size={20} />
                    </div>

                    <p className="font-semibold text-slate-800">
                      {item.label}
                    </p>
                  </div>

                  <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-500">
                    {item.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="h-screen w-full max-w-6xl overflow-y-auto bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white px-6 py-5">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Edit Qualification Details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Add qualification, experience and updated CV details
                </p>
              </div>

              <button
                onClick={() => setOpenModal(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 overflow-hidden">
                <div className="border-b border-slate-200 bg-white px-5 py-4">
                  <h3 className="font-bold text-slate-900">
                    Qualification Details
                  </h3>
                </div>

                <div className="overflow-x-auto p-5">
                  <table className="w-full min-w-[980px]">
                    <thead>
                      <tr className="text-xs font-bold text-slate-500">
                        <th className="px-2 py-2 text-left w-[260px]">
                          Course
                        </th>
                        <th className="px-2 py-2 text-left">Major</th>
                        <th className="px-2 py-2 text-left">From</th>
                        <th className="px-2 py-2 text-left">To</th>
                        <th className="px-2 py-2 text-left">Per/Grade</th>
                        <th className="px-2 py-2 text-left">
                          College/Institute
                        </th>
                        <th className="px-2 py-2 text-center">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {form.qualifications.map((item, index) => (
                        <tr key={index}>
                          <td className="px-2 py-2">
                            <select
                              value={item.course}
                              onChange={(e) =>
                                handleQualificationChange(
                                  index,
                                  "course",
                                  e.target.value
                                )
                              }
                              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                              {courses.map((course) => (
                                <option key={course}>{course}</option>
                              ))}
                            </select>
                          </td>

                          <td className="px-2 py-2">
                            <input
                              value={item.major}
                              onChange={(e) =>
                                handleQualificationChange(
                                  index,
                                  "major",
                                  e.target.value
                                )
                              }
                              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                          </td>

                          <td className="px-2 py-2">
                            <select
                              value={item.from}
                              onChange={(e) =>
                                handleQualificationChange(
                                  index,
                                  "from",
                                  e.target.value
                                )
                              }
                              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                              {years.map((year) => (
                                <option key={year}>{year}</option>
                              ))}
                            </select>
                          </td>

                          <td className="px-2 py-2">
                            <select
                              value={item.to}
                              onChange={(e) =>
                                handleQualificationChange(
                                  index,
                                  "to",
                                  e.target.value
                                )
                              }
                              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                              {years.map((year) => (
                                <option key={year}>{year}</option>
                              ))}
                            </select>
                          </td>

                          <td className="px-2 py-2">
                            <input
                              value={item.percentage}
                              onChange={(e) =>
                                handleQualificationChange(
                                  index,
                                  "percentage",
                                  e.target.value
                                )
                              }
                              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                          </td>

                          <td className="px-2 py-2">
                            <input
                              value={item.college}
                              onChange={(e) =>
                                handleQualificationChange(
                                  index,
                                  "college",
                                  e.target.value
                                )
                              }
                              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                          </td>

                          <td className="px-2 py-2 text-center">
                            <button
                              onClick={() => removeQualificationRow(index)}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <button
                    onClick={addQualificationRow}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-100"
                  >
                    <Plus size={16} />
                    Add Qualification
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 overflow-hidden">
                <div className="border-b border-slate-200 bg-white px-5 py-4">
                  <h3 className="font-bold text-slate-900">Experience</h3>
                </div>

                <div className="overflow-x-auto p-5">
                  <table className="w-full min-w-[980px]">
                    <thead>
                      <tr className="text-xs font-bold text-slate-500">
                        <th className="px-2 py-2 text-left">Company</th>
                        <th className="px-2 py-2 text-left">Role</th>
                        <th className="px-2 py-2 text-left w-[240px]">
                          Working Tech
                        </th>
                        <th className="px-2 py-2 text-left">From</th>
                        <th className="px-2 py-2 text-left">To</th>
                        <th className="px-2 py-2 text-center">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {form.experiences.map((item, index) => (
                        <tr key={index}>
                          <td className="px-2 py-2">
                            <input
                              value={item.company}
                              onChange={(e) =>
                                handleExperienceChange(
                                  index,
                                  "company",
                                  e.target.value
                                )
                              }
                              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                          </td>

                          <td className="px-2 py-2">
                            <input
                              value={item.role}
                              onChange={(e) =>
                                handleExperienceChange(
                                  index,
                                  "role",
                                  e.target.value
                                )
                              }
                              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                          </td>

                          <td className="px-2 py-2">
                            <textarea
                              rows={2}
                              value={item.tech}
                              onChange={(e) =>
                                handleExperienceChange(
                                  index,
                                  "tech",
                                  e.target.value
                                )
                              }
                              className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                          </td>

                          <td className="px-2 py-2">
                            <div className="flex gap-2">
                              <select
                                value={item.fromMonth}
                                onChange={(e) =>
                                  handleExperienceChange(
                                    index,
                                    "fromMonth",
                                    e.target.value
                                  )
                                }
                                className="w-full rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm outline-none"
                              >
                                {months.map((month) => (
                                  <option key={month}>{month}</option>
                                ))}
                              </select>

                              <select
                                value={item.fromYear}
                                onChange={(e) =>
                                  handleExperienceChange(
                                    index,
                                    "fromYear",
                                    e.target.value
                                  )
                                }
                                className="w-full rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm outline-none"
                              >
                                {years.map((year) => (
                                  <option key={year}>{year}</option>
                                ))}
                              </select>
                            </div>
                          </td>

                          <td className="px-2 py-2">
                            <div className="flex gap-2">
                              <select
                                value={item.toMonth}
                                onChange={(e) =>
                                  handleExperienceChange(
                                    index,
                                    "toMonth",
                                    e.target.value
                                  )
                                }
                                className="w-full rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm outline-none"
                              >
                                {months.map((month) => (
                                  <option key={month}>{month}</option>
                                ))}
                              </select>

                              <select
                                value={item.toYear}
                                onChange={(e) =>
                                  handleExperienceChange(
                                    index,
                                    "toYear",
                                    e.target.value
                                  )
                                }
                                className="w-full rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm outline-none"
                              >
                                {years.map((year) => (
                                  <option key={year}>{year}</option>
                                ))}
                              </select>
                            </div>
                          </td>

                          <td className="px-2 py-2 text-center">
                            <button
                              onClick={() => removeExperienceRow(index)}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <button
                    onClick={addExperienceRow}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-100"
                  >
                    <Plus size={16} />
                    Add Experience
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                <label className="mb-2 block text-sm font-bold text-slate-800">
                  Updated CV
                </label>

                <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-300 bg-white px-5 py-8 text-center hover:border-blue-400">
                  <Upload className="text-blue-600" size={24} />
                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      {form.cvName || "Choose CV file"}
                    </p>
                    <p className="text-xs text-slate-400">
                      PDF, DOC, DOCX supported
                    </p>
                  </div>

                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        cvName: e.target.files?.[0]?.name || "",
                      })
                    }
                  />
                </label>
              </div>
            </div>

            <div className="sticky bottom-0 flex justify-end gap-3 border-t border-slate-200 bg-white px-6 py-4">
              <button
                onClick={() => setOpenModal(false)}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-600"
              >
                <Save size={16} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}