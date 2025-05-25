import { useState } from 'react';
import Head from 'next/head';

export default function TestAnalyze() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Analyze failed:', err);
      setResult({ error: 'Failed to analyze' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Test Analyze</title>
      </Head>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white shadow rounded-lg p-6 max-w-xl w-full space-y-4">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label htmlFor="text" className="block font-medium mb-2">
                Enter text to analyze
              </label>
              <textarea
                id="text"
                className="w-full border rounded p-3 min-h-[150px]"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
              disabled={loading}
            >
              Analyze
            </button>
          </form>

          {loading && (
            <p className="text-center text-sm text-gray-500">Analyzing...</p>
          )}

          {result && !loading && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Analysis Result</h2>
              <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
