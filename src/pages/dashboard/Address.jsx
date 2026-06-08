import React, { useEffect, useState } from "react";
import { Edit3, Mail, Smartphone, MapPin, Home, X, Save } from "lucide-react";

export default function AddressCommDetails() {
  const defaultData = {
    email: "gmohammedkai@gmail.com",
    alternateEmail: "",
    mobile: "8925440512",
    alternateMobile: "",
    permanentAddress: "66/20, Umar Street, Pernambut 635810",
    residentialAddress: "66/20, Umar Street, Pernambut 635810",
  };

  const [openModal, setOpenModal] = useState(false);
  const [addressData, setAddressData] = useState(defaultData);
  const [formData, setFormData] = useState(defaultData);

  useEffect(() => {
    const stored = localStorage.getItem("addressCommDetails");

    if (stored) {
      const parsed = JSON.parse(stored);
      setAddressData(parsed);
      setFormData(parsed);
    }
  }, []);

  const displayValue = (value) => {
    return value && value.trim() !== "" ? value : "Nil";
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    localStorage.setItem("addressCommDetails", JSON.stringify(formData));
    setAddressData(formData);
    setOpenModal(false);
  };

  const addressDetails = [
    {
      label: "Email",
      value: displayValue(addressData.email),
      icon: Mail,
    },
    {
      label: "Alternate Email",
      value: displayValue(addressData.alternateEmail),
      icon: Mail,
    },
    {
      label: "Mobile",
      value: displayValue(addressData.mobile),
      icon: Smartphone,
    },
    {
      label: "Alternate Mobile",
      value: displayValue(addressData.alternateMobile),
      icon: Smartphone,
    },
    {
      label: "Permanent Address",
      value: displayValue(addressData.permanentAddress),
      icon: MapPin,
    },
    {
      label: "Residential Address",
      value: displayValue(addressData.residentialAddress),
      icon: Home,
    },
  ];

  return (
    <>
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Address & Comm Details
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Contact details and address information
            </p>
          </div>

          <button
            onClick={() => {
              setFormData(addressData);
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
            {addressDetails.map((item) => {
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

                  <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600">
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
                  Edit Address & Communication
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Update contact details and address information
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
                    Address & Communication Details
                  </h3>
                </div>

                <div className="p-5 space-y-4">
                  <FormInput
                    label="Email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />

                  <FormInput
                    label="Alternate Email"
                    value={formData.alternateEmail}
                    onChange={(e) =>
                      handleChange("alternateEmail", e.target.value)
                    }
                  />

                  <FormInput
                    label="Mobile"
                    required
                    value={formData.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                  />

                  <FormInput
                    label="Alternate Mobile"
                    value={formData.alternateMobile}
                    onChange={(e) =>
                      handleChange("alternateMobile", e.target.value)
                    }
                  />

                  <FormTextarea
                    label="Permanent Address"
                    required
                    value={formData.permanentAddress}
                    onChange={(e) =>
                      handleChange("permanentAddress", e.target.value)
                    }
                  />

                  <FormTextarea
                    label="Residential Address"
                    required
                    value={formData.residentialAddress}
                    onChange={(e) =>
                      handleChange("residentialAddress", e.target.value)
                    }
                  />
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

function FormInput({ label, required, value, onChange }) {
  return (
    <div className="grid gap-3 md:grid-cols-[190px_1fr] md:items-center">
      <label className="text-sm font-bold text-slate-800">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

function FormTextarea({ label, required, value, onChange }) {
  return (
    <div className="grid gap-3 md:grid-cols-[190px_1fr] md:items-start">
      <label className="pt-3 text-sm font-bold text-slate-800">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <textarea
        rows={3}
        value={value}
        onChange={onChange}
        className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}