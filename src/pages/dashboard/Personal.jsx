import React from "react";
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
} from "lucide-react";

export default function Personal() {
  const personalDetails = [
    { label: "Father Name", value: "Suhail Ahmed", icon: UserRound },
    { label: "Mother Name", value: "Saira Banu", icon: UserRound },
    { label: "DOB", value: "25/08/2004", icon: CalendarDays },
    { label: "Blood Group", value: "Nil", icon: Droplet },
    { label: "Skype ID Personal", value: "Nil", icon: MessageCircle },
    { label: "Skype ID Official", value: "Nil", icon: MessageCircle },
    { label: "Bank Acc/No", value: "Nil", icon: Landmark },
    { label: "Pancard No", value: "Nil", icon: CreditCard },
    { label: "Passport Number", value: "Nil", icon: Plane },
    { label: "Passport Validity", value: "Nil", icon: CalendarDays },
    { label: "Profile Picture", value: "Nil", icon: Image },
  ];

  return (
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

        <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700">
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
  );
}