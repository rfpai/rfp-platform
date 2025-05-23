import React from "react";
import { useState } from "react";
import ConversationView from "@/components/ConversationView";

export default function RFPAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input,
          locale: "ar",
        }),
      });

      const data = await response.json();

      let botReply = "🤖 لم يتم التعرف على القسم.";

      if (data.results && data.results.length > 0) {
        const match = data.results[0];
        botReply = `📂 القسم: ${match.section_title}\n🔍 النوع: ${match.type}\n✅ مثال مطابق: ${match.matched_example}`;
      }

      const assistantMessage = {
        role: "assistant",
        content: botReply,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("❌ فشل التحليل:", error);
    }

    setInput("");
    setIsLoading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-bold mb-2">مساعد إعداد العرض الفني</h2>
      <ConversationView messages={messages} isLoading={isLoading} />
      <div className="flex gap-2 mt-4">
        <input
          className="flex-1 border rounded px-4 py-2"
          placeholder="اكتب جملة من العرض الفني..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isLoading}
        >
          إرسال
        </button>
      </div>
    </div>
  );
}

