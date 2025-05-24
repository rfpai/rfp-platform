import React, { useState, useEffect } from "react";
import flow from "../data/ai/smart_conversation_flow.json";

export default function RFPChatFlow() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [language, setLanguage] = useState("en");
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("language");
    if (stored) {
      setLanguage(stored);
    } else if (navigator.language && navigator.language.startsWith("ar")) {
      setLanguage("ar");
    }
  }, []);

  const handleInputChange = (idx, value) => {
    setAnswers((prev) => ({
      ...prev,
      [sectionIndex]: {
        ...(prev[sectionIndex] || {}),
        [idx]: value,
      },
    }));
  };

  const next = () => {
    if (sectionIndex < flow.length - 1) {
      setSectionIndex(sectionIndex + 1);
    } else {
      setSectionIndex(sectionIndex + 1);
    }
  };

  const back = () => {
    if (sectionIndex > 0) setSectionIndex(sectionIndex - 1);
  };

  const isAr = language === "ar";

  if (sectionIndex >= flow.length) {
    if (showSummary) {
      return (
        <div className="p-4" dir={isAr ? "rtl" : "ltr"}>
          <h2 className="text-xl font-bold mb-4">
            {isAr ? "الملخص" : "Summary"}
          </h2>
          {flow.map((sec, sIdx) => (
            <div key={sIdx} className="mb-4">
              <h3 className="font-semibold">{sec.rfp_section}</h3>
              <ul className="list-disc pl-4 space-y-1">
                {sec.questions.map((q, qIdx) => (
                  <li key={qIdx}>
                    <span className="font-medium">{q}</span>
                    {": "}
                    {answers[sIdx]?.[qIdx] || ""}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setShowSummary(false)}
          >
            {isAr ? "عودة" : "Back"}
          </button>
        </div>
      );
    }

    return (
      <div className="p-4 space-y-4" dir={isAr ? "rtl" : "ltr"}>
        <h2 className="text-xl font-bold">
          {isAr ? "اكتملت جميع الخطوات" : "All steps completed"}
        </h2>
        <button
          onClick={() => setShowSummary(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {isAr ? "توليد الملخص" : "Generate Summary"}
        </button>
      </div>
    );
  }

  const section = flow[sectionIndex];

  return (
    <div className="p-4 space-y-4" dir={isAr ? "rtl" : "ltr"}>
      <div>
        <h2 className="text-xl font-bold">{section.rfp_section}</h2>
        <p className="text-gray-600">{section.purpose}</p>
      </div>
      <div className="space-y-3">
        {section.questions.map((q, idx) => (
          <div key={idx} className="bg-white p-3 rounded shadow">
            <label className="block text-sm font-medium mb-1">{q}</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={answers[sectionIndex]?.[idx] || ""}
              onChange={(e) => handleInputChange(idx, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          onClick={back}
          disabled={sectionIndex === 0}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
        >
          {isAr ? "السابق" : "Back"}
        </button>
        <button
          onClick={next}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {sectionIndex === flow.length - 1 ? (isAr ? "إنهاء" : "Finish") : (isAr ? "التالي" : "Next")}
        </button>
      </div>
    </div>
  );
}
