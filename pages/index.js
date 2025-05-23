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
        {results && <pre>{JSON.stringify(results, null, 2)}</pre>}
      </main>
    </>
  );
}
