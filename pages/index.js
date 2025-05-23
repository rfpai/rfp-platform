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
        <title>منصة إعداد العروض الفنية</title>
      </Head>
      <div
        style={{
          background: '#f9f9f9',
          minHeight: '100vh',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <nav
          style={{
            background: '#fff',
            padding: '1rem 2rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <h1 style={{ margin: 0, fontSize: '1.25rem' }}>
            منصة إعداد العروض الفنية
          </h1>
        </nav>
        <main style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' }}>
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '4px' }}
            >
              <option value="">Select Domain</option>
              <option value="Marketing">Marketing</option>
              <option value="Public Relations">Public Relations</option>
            </select>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '4px' }}
            >
              <option value="">اختر الفئة</option>
              <option value="نطاق العمل">نطاق العمل</option>
              <option value="الأهداف">الأهداف</option>
            </select>
            <textarea
              placeholder="Text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '4px' }}
            />
            <button
              type="submit"
              style={{
                padding: '0.75rem',
                background: '#2563eb',
                color: '#fff',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Analyze
            </button>
          </form>
          {results && (
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {(results.patterns || []).map((item) => {
                const existsInText = text.includes(item.pattern);
                const borderColor = existsInText ? '#4ade80' : '#f87171';
                const icon = existsInText ? '✅' : '❌';
                return (
                  <div
                    key={item.id}
                    style={{
                      border: `1px solid ${borderColor}`,
                      padding: '1rem',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                      background: '#fff',
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
      </div>
    </>
  );
}
