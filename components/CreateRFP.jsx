"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function CreateRFP() {
  const router = useRouter();

  const questions = [
    { key: "projectInfo", text: "ما هي معلومات المشروع؟" },
    { key: "background", text: "ما هي خلفية الجهة؟" },
    { key: "projectDescription", text: "ما هو وصف المشروع؟" },
    { key: "scopeOfWork", text: "ما نطاق العمل؟" },
    { key: "targetAudience", text: "من هو الجمهور المستهدف؟" },
    { key: "deliverables", text: "ما المخرجات المتوقعة؟" },
    { key: "timeline", text: "ما الجدول الزمني؟" },
    { key: "budget", text: "ما الميزانية؟" },
    { key: "evaluationCriteria", text: "ما معايير التقييم؟" },
    { key: "submissionRequirements", text: "ما متطلبات تقديم العرض؟" },
    { key: "questions", text: "هل لديك أي أسئلة أو استفسارات؟" },
    { key: "attachments", text: "اذكر الملاحق أو المرفقات." },
  ];

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState("");

  const handleNext = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const key = questions[index].key;
    const value = input.trim();
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    setInput("");

    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      try {
        localStorage.setItem("rfpData", JSON.stringify(updated));
      } catch {
        // ignore
      }
      router.push("/preview");
    }
  };

  return (
    <div dir="rtl" className="max-w-xl mx-auto p-4">
      <div className="bg-white p-6 rounded shadow space-y-4">
        <div className="font-semibold text-lg">{questions[index].text}</div>
        <form onSubmit={handleNext} className="space-y-4">
          <textarea
            className="w-full border rounded p-3 min-h-[120px] resize-y"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب إجابتك هنا"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded self-start"
          >
            {index === questions.length - 1 ? "إنهاء" : "التالي"}
          </button>
        </form>
      </div>
    </div>
  );
}
