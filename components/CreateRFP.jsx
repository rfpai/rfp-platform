"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ConversationView from "@/components/ConversationView";
import { rfpHints } from "@/data/assistant/rfpHints";

export default function CreateRFP() {
  const router = useRouter();

  const questionKeys = [
    "projectInfo",
    "background",
    "projectDescription",
    "scopeOfWork",
    "targetAudience",
    "deliverables",
    "timeline",
    "budget",
    "evaluationCriteria",
    "submissionRequirements",
    "questions",
    "attachments",
  ];

  const buildHint = (key) => {
    const hint = rfpHints[key] || {};
    return {
      prompt: hint.prompt,
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
    <div dir="rtl" className="max-w-xl mx-auto p-4 space-y-4">
      <ConversationView messages={messages} isLoading={isLoading} />
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
            disabled={isLoading}
          >
            إرسال
          </button>
        </form>
      )}
    </div>
  );
}
