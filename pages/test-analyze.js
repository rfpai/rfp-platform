import { useState } from "react";

export default function TestAnalyze() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  async function handleAnalyze() {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await res.json();
    setResult(data);
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>اختبار التحليل الذكي</h2>
      <textarea
        rows={5}
        style={{ width: "100%", padding: 10 }}
        placeholder="اكتب نص العرض هنا..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAnalyze} style={{ marginTop: 10 }}>
        إرسال للتحليل
      </button>

      {result && (
        <pre style={{ background: "#eee", padding: 10, marginTop: 20 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
