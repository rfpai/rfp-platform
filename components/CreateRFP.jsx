"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ConversationView from "./ConversationView";
import { rfpHints } from "../data/assistant/rfpHints";
import flow from "../data/conversationFlow";

export default function CreateRFP() {
  const router = useRouter();

  const questionKeys = flow.map((q) => q.id);

  const buildHint = (key) => {
    const hint = rfpHints[key] || {};
    const label = flow.find((q) => q.id === key)?.label || "";
    return {
      prompt: hint.prompt || label,
      help: hint.help,
      intent: hint.intent,
      marketing: hint.sectorExamples?.marketing,
      pr: hint.sectorExamples?.pr,
    };
  };

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [redirecting, setRedirecting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const first = buildHint(questionKeys[0]);
    const t = setTimeout(() => {
      setMessages([{ role: "assistant", content: first, timestamp: Date.now() }]);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const key = questionKeys[index];
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

    if (index < questionKeys.length - 1) {
      const nextKey = questionKeys[index + 1];
      setIsLoading(true);
      setTimeout(() => {
        const assistantMessage = {
          role: "assistant",
          content: buildHint(nextKey),
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIndex((i) => i + 1);
        setIsLoading(false);
      }, 600);
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
    <div dir="rtl" className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4">
        <header className="sticky top-0 bg-white pb-2 mb-4 border-b shadow-sm">
          <h2 className="text-lg font-bold text-right">📋 إنشاء وثيقة طلب تقديم عروض (RFP)</h2>
        </header>
        <ConversationView messages={messages} isLoading={isLoading} />
        {!redirecting && (
          <form onSubmit={handleSend} className="flex gap-2 pt-4 border-t">
            {flow[index]?.type === "textarea" ? (
              <textarea
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring placeholder-gray-400 flex-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اكتب إجابتك هنا"
                rows={3}
              />
            ) : (
              <input
                type="text"
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring placeholder-gray-400 flex-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اكتب إجابتك هنا"
              />
            )}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              disabled={isLoading}
            >
              التالي
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
