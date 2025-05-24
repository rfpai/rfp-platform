import React, { useState } from "react";

export default function CreateRFP() {
  const questions = [
    { key: "projectInfo", text: "ما هي معلومات المشروع؟" },
    { key: "background", text: "ما الخلفية عن الجهة؟" },
    { key: "projectDescription", text: "ما وصف المشروع؟" },
    { key: "scopeOfWork", text: "ما نطاق العمل؟" },
    { key: "targetAudience", text: "من هو الجمهور المستهدف؟" },
    { key: "deliverables", text: "ما المخرجات المتوقعة؟" },
    { key: "timeline", text: "ما الجدول الزمني؟" },
    { key: "budget", text: "ما الميزانية المتوقعة؟" },
    { key: "evaluationCriteria", text: "ما معايير التقييم؟" },
    { key: "submissionRequirements", text: "ما متطلبات تقديم العرض؟" },
    { key: "questions", text: "هل لديك أي أسئلة أو استفسارات؟" },
    { key: "attachments", text: "اذكر الملاحق أو المرفقات." },
  ];

  const [messages, setMessages] = useState([
    { role: "bot", text: questions[0].text },
  ]);
  const [answers, setAnswers] = useState({});
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentKey = questions[index].key;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const val = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: val }]);
    setAnswers((prev) => ({ ...prev, [currentKey]: val }));
    setInput("");
    if (index < questions.length - 1) {
      setWaiting(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: questions[index + 1].text },
        ]);
        setIndex(index + 1);
        setWaiting(false);
      }, 600);
    } else {
      setCompleted(true);
    }
  };

  const rfpData = answers;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4" dir="rtl">
      <div className="space-y-2 bg-gray-50 p-4 rounded border">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded shadow text-sm whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-white text-right border-r-4 border-blue-500"
                : "bg-blue-100 text-left border-l-4 border-gray-400"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {waiting && (
          <div className="text-gray-500 italic text-sm">...جاري التحميل</div>
        )}
      </div>

      {!completed && (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            className="flex-1 border rounded px-3 py-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب إجابتك هنا"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            إرسال
          </button>
        </form>
      )}

      {completed && (
        <div className="space-y-4">
          <pre className="bg-gray-100 p-3 rounded text-xs whitespace-pre-wrap">
            {JSON.stringify(rfpData, null, 2)}
          </pre>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => console.log(rfpData)}
          >
            عرض الوثيقة
          </button>
        </div>
      )}
    </div>
  );
}
