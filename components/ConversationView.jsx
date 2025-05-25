import React from "react";

export default function ConversationView({ messages = [], isLoading = false }) {
  const formatTime = (date) =>
    new Date(date).toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="space-y-3">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`mb-4 p-4 rounded-xl shadow text-sm whitespace-pre-wrap ${
            msg.role === "user"
              ? "bg-blue-50 text-right"
              : "bg-gray-100 text-right fade-in"
          }`}
        >
          <div className="text-xs text-gray-500 mb-1">
            {msg.role === "user" ? "أنت" : "المساعد"} – {formatTime(msg.timestamp || Date.now())}
          </div>
          {typeof msg.content === "string" ? (
            msg.content
          ) : (
            <div className="space-y-1">
              <p className="font-semibold text-blue-700">{msg.content.prompt}</p>
              {msg.content.help && (
                <p className="text-gray-700 text-sm">{msg.content.help}</p>
              )}
              {msg.content.intent && (
                <p className="text-xs text-gray-500">🎯 {msg.content.intent}</p>
              )}
              {(msg.content.marketing || msg.content.pr) && (
                <div className="text-xs text-gray-600 space-y-0.5">
                  <p className="font-medium">🧠 مثال:</p>
                  {msg.content.marketing && <p>- {msg.content.marketing}</p>}
                  {msg.content.pr && <p>- {msg.content.pr}</p>}
                </div>
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

