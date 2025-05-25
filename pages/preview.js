import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
// Use a relative import since aliasing via `@` is not configured
import RFPPreview from "../components/RFPPreview";
import html2pdf from "html2pdf.js";

const templates = {
  projectInfo: (v) => `يتضمن هذا القسم معلومات أساسية عن المشروع: ${v}`,
  background: (v) => `توضح الخلفية ماهية الجهة صاحبة الطلب وخبراتها: ${v}`,
  projectDescription: (v) => `وصف تفصيلي للمشروع وأهدافه الرئيسية: ${v}`,
  scopeOfWork: (v) => `نطاق العمل المتوقع من الوكالة يشمل: ${v}`,
  targetAudience: (v) => `الفئة المستهدفة من هذا المشروع هي: ${v}`,
  deliverables: (v) => `المخرجات المتوقعة بنهاية المشروع تتضمن: ${v}`,
  timeline: (v) => `الجدول الزمني المقترح لتنفيذ المشروع هو: ${v}`,
  budget: (v) => `الميزانية التقديرية للمشروع: ${v}`,
  evaluationCriteria: (v) => `سيتم تقييم العروض بناءً على المعايير التالية: ${v}`,
  submissionRequirements: (v) => `يجب تقديم العروض وفق المتطلبات التالية: ${v}`,
  questions: (v) => `الاستفسارات أو الأسئلة المطروحة من قبل الجهة: ${v}`,
  attachments: (v) => `الملاحق والمرفقات الداعمة للطلب: ${v}`,
};

const formatRfp = (data) => {
  const formatted = {};
  Object.keys(templates).forEach((key) => {
    const val = data?.[key] || "";
    formatted[key] = templates[key](val);
  });
  return formatted;
};

export default function PreviewPage() {
  const router = useRouter();
  const [rfpData, setRfpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null);

  const downloadPdf = () => {
    if (!contentRef.current) return;
    html2pdf().from(contentRef.current).save("rfp.pdf");
  };

  useEffect(() => {
    const stored = localStorage.getItem("rfpData");
    if (stored) setRfpData(formatRfp(JSON.parse(stored)));
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center" dir="rtl">
      <Head>
        <title>معاينة وثيقة RFP</title>
      </Head>

      {loading ? (
        <div className="text-center text-gray-600 mt-20">جاري التحميل...</div>
      ) : rfpData ? (
        <RFPPreview data={rfpData} contentRef={contentRef} />
      ) : (
        <div className="text-center text-gray-600 mt-20">
          لا توجد بيانات لعرض الوثيقة.
        </div>
      )}

      {rfpData && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={downloadPdf}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
          >
            تحميل كـ PDF
          </button>
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => router.push("/create-rfp")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          العودة للتعديل
        </button>
      </div>
    </div>
  );
}
