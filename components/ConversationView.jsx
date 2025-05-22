import React from "react";

export default function ConversationView({ messages = [], isLoading = false }) {
  const formatTime = (date) =>
    new Date(date).toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="space-y-3 bg-gray-50 p-4 rounded border">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-3 rounded-md shadow-sm text-sm whitespace-pre-wrap ${
            msg.role === "user"
              ? "bg-white text-right border-r-4 border-blue-500"
              : "bg-blue-100 text-left border-l-4 border-gray-400"
          }`}
        >
          <div className="text-xs text-gray-500 mb-1">
            {msg.role === "user" ? "أنت" : "المساعد"} – {formatTime(msg.timestamp || Date.now())}
          </div>
          {msg.content}
        </div>
      ))}
      {isLoading && (
        <div className="text-gray-500 italic text-sm">⏳ جاري التحليل...</div>
      )}
    </div>
  );
}

