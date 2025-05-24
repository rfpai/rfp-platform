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
              : "bg-blue-100 text-left border-l-4 border-gray-400 fade-in"
          }`}
        >
          <div className="text-xs text-gray-500 mb-1">
            {msg.role === "user" ? "أنت" : "المساعد"} – {formatTime(msg.timestamp || Date.now())}
          </div>
          {typeof msg.content === "string" ? (
            msg.content
          ) : (
            <div className="space-y-1">
              <p className="font-semibold text-gray-800">{msg.content.prompt}</p>
              {msg.content.help && (
                <p className="text-gray-600 text-sm">{msg.content.help}</p>
              )}
              {msg.content.intent && (
                <p className="text-xs text-gray-500">🎯 {msg.content.intent}</p>
              )}
              {msg.content.marketing && (
                <p className="text-xs text-green-700">
                  {msg.content.marketing}
                </p>
              )}
              {msg.content.pr && (
                <p className="text-xs text-purple-700">{msg.content.pr}</p>
              )}
            </div>
          )}
        </div>
      ))}
      {isLoading && (
        <div className="text-gray-500 italic text-sm">⏳ جاري التحليل...</div>
      )}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

