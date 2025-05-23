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
          <input
            placeholder="Domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
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
