import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [domain, setDomain] = useState('');
  const [category, setCategory] = useState('');
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, domain, category }),
    });
    const data = await res.json();
    setResults(data);
  };

  return (
    <>
      <Head>
        <title>منصة RFP الذكية</title>
      </Head>
      <main>
        <form onSubmit={handleSubmit}>
          <select value={domain} onChange={(e) => setDomain(e.target.value)}>
            <option value="">Select Domain</option>
            <option value="Marketing">Marketing</option>
            <option value="Public Relations">Public Relations</option>
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">اختر الفئة</option>
            <option value="نطاق العمل">نطاق العمل</option>
            <option value="الأهداف">الأهداف</option>
          </select>
          <textarea
            placeholder="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Analyze</button>
        </form>
        {results && (
          <div>
            {(results.patterns || []).map((item) => {
              const existsInText = text.includes(item.pattern);
              const borderColor = existsInText ? '#4ade80' : '#f87171';
              const icon = existsInText ? '✅' : '❌';
              return (
                <div
                  key={item.id}
                  style={{
                    border: `2px solid ${borderColor}`,
                    padding: '1rem',
                    borderRadius: '4px',
                    marginTop: '1rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>{icon}</span>
                  <span style={{ fontWeight: 'bold' }}>{item.pattern}</span>
                  <span style={{ fontSize: '0.875rem', color: '#555' }}>
                    ID: {item.id} | Category: {item.category}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
