"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import ConversationView from "@/components/ConversationView";

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
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: questions[0].text,
      timestamp: Date.now(),
    },
  ]);
  const [redirecting, setRedirecting] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const key = questions[index].key;
    const value = input.trim();
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    const userMessage = {
      role: "user",
      content: value,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    if (index < questions.length - 1) {
      const nextQ = questions[index + 1].text;
      const assistantMessage = {
        role: "assistant",
        content: nextQ,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIndex(index + 1);
    } else {
      try {
        localStorage.setItem("rfpData", JSON.stringify(updated));
      } catch {
        // ignore errors
      }

      const assistantMessage = {
        role: "assistant",
        content: "جاري التوجيه إلى صفحة المعاينة...",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setRedirecting(true);
      setTimeout(() => {
        router.push("/preview");
      }, 800);
    }
  };

  return (
    <div dir="rtl" className="max-w-xl mx-auto p-4 space-y-4">
      <ConversationView messages={messages} />
      {!redirecting && (
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
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
    </div>
  );
}
