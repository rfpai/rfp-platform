import React, { useState } from "react";
import { useRouter } from "next/router";

export default function MarketingRequest() {
  const router = useRouter();

  const translations = {
    companyName: "اسم الشركة",
    contactPerson: "الشخص المسؤول",
    projectTitle: "عنوان المشروع",
    requestDetails: "تفاصيل الطلب",
    submit: "إرسال الطلب",
  };
  const t = (key) => translations[key] || key;

  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    projectTitle: "",
    requestDetails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form };
    try {
      await fetch("/api/create-rfp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      localStorage.setItem("rfpData", JSON.stringify(data));
      router.push("/preview");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6" dir="rtl">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-6 space-y-4 w-full max-w-lg"
      >
        <div>
          <label className="block mb-1">{t("companyName")}</label>
          <input
            type="text"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder={t("companyName")}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">{t("contactPerson")}</label>
          <input
            type="text"
            name="contactPerson"
            value={form.contactPerson}
            onChange={handleChange}
            placeholder={t("contactPerson")}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">{t("projectTitle")}</label>
          <input
            type="text"
            name="projectTitle"
            value={form.projectTitle}
            onChange={handleChange}
            placeholder={t("projectTitle")}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">{t("requestDetails")}</label>
          <textarea
            name="requestDetails"
            value={form.requestDetails}
            onChange={handleChange}
            placeholder={t("requestDetails")}
            className="w-full border border-gray-300 rounded px-4 py-2"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
        >
          {t("submit")}
        </button>
      </form>
    </div>
  );
}
