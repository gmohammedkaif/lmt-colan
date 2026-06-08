import React, { useEffect, useState } from "react";
import {
  Edit3,
  UserRound,
  CalendarDays,
  Droplet,
  MessageCircle,
  Landmark,
  CreditCard,
  Plane,
  Image,
  X,
  Save,
} from "lucide-react";

export default function Personal() {
  const defaultData = {
    fatherName: "Suhail Ahmed",
    motherName: "Saira Banu",
    dob: "2004-08-25",
    bloodGroup: "",
    skypePersonal: "",
    skypeOfficial: "",
    bankAccNo: "",
    pancardNo: "",
    passportNumber: "",
    passportValidity: "",
    profilePicture: "",
  };

  const [openModal, setOpenModal] = useState(false);
  const [personalData, setPersonalData] = useState(defaultData);
  const [formData, setFormData] = useState(defaultData);

  useEffect(() => {
    const stored = localStorage.getItem("personalDetails");

    if (stored) {
      const parsed = JSON.parse(stored);
      setPersonalData(parsed);
      setFormData(parsed);
    }
  }, []);

  const formatDate = (date) => {
    if (!date) return "Nil";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const displayValue = (value) => {
    return value && value.trim() !== "" ? value : "Nil";
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    localStorage.setItem("personalDetails", JSON.stringify(formData));
    setPersonalData(formData);
    setOpenModal(false);
  };

  const personalDetails = [
    {
      label: "Father Name",
      value: displayValue(personalData.fatherName),
      icon: UserRound,
    },
    {
      label: "Mother Name",
      value: displayValue(personalData.motherName),
      icon: UserRound,
    },
    {
      label: "DOB",
      value: formatDate(personalData.dob),
      icon: CalendarDays,
    },
    {
      label: "Blood Group",
      value: displayValue(personalData.bloodGroup),
      icon: Droplet,
    },
    {
      label: "Skype ID Personal",
      value: displayValue(personalData.skypePersonal),
      icon: MessageCircle,
    },
    {
      label: "Skype ID Official",
      value: displayValue(personalData.skypeOfficial),
      icon: MessageCircle,
    },
    {
      label: "Bank Acc/No",
      value: displayValue(personalData.bankAccNo),
      icon: Landmark,
    },
    {
      label: "Pancard No",
      value: displayValue(personalData.pancardNo),
      icon: CreditCard,
    },
    {
      label: "Passport Number",
      value: displayValue(personalData.passportNumber),
      icon: Plane,
    },
    {
      label: "Passport Validity",
      value: displayValue(personalData.passportValidity),
      icon: CalendarDays,
    },
    {
      label: "Profile Picture",
      value: displayValue(personalData.profilePicture),
      icon: Image,
    },
  ];

  return (
    <>
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Personal Details
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Personal information and employee identity records
            </p>
          </div>

          <button
            onClick={() => {
              setFormData(personalData);
              setOpenModal(true);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700"
          >
            <Edit3 size={16} />
            Edit
          </button>
        </div>

        <div className="p-5">
          <div className="grid gap-4">
            {personalDetails.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-blue-200 hover:bg-white hover:shadow-sm md:grid-cols-[260px_1fr]"
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
          <div className="h-screen w-full max-w-3xl overflow-y-auto bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white px-6 py-5">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Edit Personal Details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Update personal and identity information
                </p>
              </div>

              <button
                onClick={() => setOpenModal(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 overflow-hidden">
                <div className="border-b border-slate-200 bg-white px-5 py-4">
                  <h3 className="font-bold text-slate-900">
                    Personal Details
                  </h3>
                </div>

                <div className="p-5 space-y-4">
                  <FormInput
                    label="Father Name"
                    required
                    value={formData.fatherName}
                    onChange={(e) => handleChange("fatherName", e.target.value)}
                  />

                  <FormInput
                    label="Mother Name"
                    required
                    value={formData.motherName}
                    onChange={(e) => handleChange("motherName", e.target.value)}
                  />

                  <FormInput
                    label="DOB"
                    required
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleChange("dob", e.target.value)}
                  />

                  <FormInput
                    label="Blood Group"
                    value={formData.bloodGroup}
                    onChange={(e) => handleChange("bloodGroup", e.target.value)}
                  />

                  <FormInput
                    label="Skype ID Personal"
                    value={formData.skypePersonal}
                    onChange={(e) =>
                      handleChange("skypePersonal", e.target.value)
                    }
                  />

                  <FormInput
                    label="Skype ID Official"
                    value={formData.skypeOfficial}
                    onChange={(e) =>
                      handleChange("skypeOfficial", e.target.value)
                    }
                  />

                  <FormInput
                    label="Bank Acc/No"
                    value={formData.bankAccNo}
                    onChange={(e) => handleChange("bankAccNo", e.target.value)}
                  />

                  <FormInput
                    label="Pancard No"
                    value={formData.pancardNo}
                    onChange={(e) => handleChange("pancardNo", e.target.value)}
                  />

                  <FormInput
                    label="Passport Number"
                    value={formData.passportNumber}
                    onChange={(e) =>
                      handleChange("passportNumber", e.target.value)
                    }
                  />

                  <FormInput
                    label="Passport Validity"
                    type="date"
                    value={formData.passportValidity}
                    onChange={(e) =>
                      handleChange("passportValidity", e.target.value)
                    }
                  />

                  <div className="grid gap-3 md:grid-cols-[190px_1fr] md:items-center">
                    <label className="text-sm font-bold text-slate-800">
                      Profile Picture
                    </label>

                    <input
                      type="file"
                      onChange={(e) =>
                        handleChange(
                          "profilePicture",
                          e.target.files?.[0]?.name || ""
                        )
                      }
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-600 file:font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
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
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FormInput({ label, required, type = "text", value, onChange }) {
  return (
    <div className="grid gap-3 md:grid-cols-[190px_1fr] md:items-center">
      <label className="text-sm font-bold text-slate-800">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}