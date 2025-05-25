import React, { useState } from "react";
import { useRouter } from "next/router";

export default function MarketingRequest() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [requestDetails, setRequestDetails] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { companyName, contactPerson, projectTitle, requestDetails };
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
          <label className="block mb-1">اسم الشركة</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="اسم الشركة"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">الشخص المسؤول</label>
          <input
            type="text"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            placeholder="الشخص المسؤول"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">عنوان المشروع</label>
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="عنوان المشروع"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">تفاصيل الطلب</label>
          <textarea
            value={requestDetails}
            onChange={(e) => setRequestDetails(e.target.value)}
            placeholder="تفاصيل الطلب"
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
        >
          إرسال الطلب
        </button>
      </form>
    </div>
  );
}
