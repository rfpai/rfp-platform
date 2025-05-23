import React from 'react';
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [language, setLanguage] = useState('en');
  const [text, setText] = useState('');
  const [domain, setDomain] = useState('');
  const [category, setCategory] = useState('');
  const [results, setResults] = useState(null);
  const [sentences, setSentences] = useState([]);
  const [summary, setSummary] = useState('');
  const [matchedCount, setMatchedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('language');
    if (stored) {
      setLanguage(stored);
    } else if (navigator.language && navigator.language.startsWith('ar')) {
      setLanguage('ar');
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('language', language);
    }
  }, [language]);

  const translations = {
    en: {
      title: 'RFP Assistant',
      domain: 'Domain',
      category: 'Category',
      text: 'Enter text',
      analyze: 'Analyze',
      copy: 'Copy Results',
      download: 'Download PDF',
    },
    ar: {
      title: 'منصة إعداد العروض الفنية',
      domain: 'نطاق العمل',
      category: 'اختر الفئة',
      text: 'أدخل النص',
      analyze: 'تحليل',
      copy: 'نسخ النتائج',
      download: 'تحميل PDF',
    },
  };

  const t = translations[language];

  const TIP_TEXT =
    '🧠 Tip: Consider mentioning your target audience or expected outcomes.';

  const containerStyle = {
    background: darkMode ? '#222' : '#f9f9f9',
    color: darkMode ? '#fff' : '#000',
    minHeight: '100vh',
    fontFamily:
      language === 'ar' ? "'Tajawal', sans-serif" : "'Inter', sans-serif",
    direction: language === 'ar' ? 'rtl' : 'ltr',
  };

  const cardBackground = darkMode ? '#333' : '#fff';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, domain, category }),
    });
    const data = await res.json();
    const sents = text
      .split(/\n|\./)
      .map((s) => s.trim())
      .filter(Boolean);
    setSentences(sents);
    setResults(data);
    const lines = [];
    let count = 0;
    sents.forEach((s) => {
      let matched = false;
      (data.patterns || []).forEach((p) => {
        if (s.includes(p.pattern)) {
          lines.push(p.pattern);
          matched = true;
        }
      });
      if (matched) count += 1;
    });
    setMatchedCount(count);
    setSummary(lines.join('\n'));
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      handleSubmit(e);
    }
  };

  return (
    <>
      <Head>
        <title>{t.title}</title>
      </Head>
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div style={containerStyle}>
        <nav
          style={{
            background: darkMode ? '#333' : '#fff',
            padding: '1rem 2rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h1 style={{ margin: 0, fontSize: '1.25rem', flex: 1 }}>{t.title}</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              border: '1px solid',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            {darkMode ? '🌞' : '🌙'}
          </button>
          <button
            onClick={() =>
              setLanguage(language === 'en' ? 'ar' : 'en')
            }
            style={{
              marginLeft: '0.5rem',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              border: '1px solid',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            {language === 'en' ? 'العربية' : 'English'}
          </button>
        </nav>
        <main style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
          <div
            style={{
              background: cardBackground,
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              margin: '0 auto',
            }}
          >
            <form
              onSubmit={handleSubmit}
              onKeyDown={handleKeyDown}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {t.domain}
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '4px',
                    background: cardBackground,
                    color: darkMode ? '#fff' : '#000',
                  }}
                >
                  <option value="">{t.domain}</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Public Relations">Public Relations</option>
                </select>
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {t.category}
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '4px',
                    background: cardBackground,
                    color: darkMode ? '#fff' : '#000',
                  }}
                >
                  <option value="">{t.category}</option>
                  <option value="نطاق العمل">نطاق العمل</option>
                  <option value="الأهداف">الأهداف</option>
                </select>
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {t.text}
                <textarea
                  placeholder={t.text}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '4px',
                    background: cardBackground,
                    color: darkMode ? '#fff' : '#000',
                  }}
                />
              </label>
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
                {t.analyze}
              </button>
            </form>
          </div>
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid #ccc',
                  borderTop: '2px solid #2563eb',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
            </div>
          )}
          {results && (
            <>
              <p style={{ marginTop: '1rem' }}>
                {`✅ ${matchedCount} matched out of ${sentences.length} sentences analyzed.`}
              </p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => navigator.clipboard.writeText(summary)}
                  style={{ padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}
                >
                  {t.copy}
                </button>
                <button
                  onClick={() => alert('PDF download coming soon!')}
                  style={{ padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}
                >
                  {t.download}
                </button>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ color: '#16a34a', marginBottom: '0.5rem' }}>Matched Results</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {sentences
                    .filter((s) =>
                      (results.patterns || []).some((p) => s.includes(p.pattern))
                    )
                    .map((sentence, idx) => {
                      const matches = (results.patterns || []).filter((p) =>
                        sentence.includes(p.pattern)
                      );
                      return (
                        <div
                          key={`m-${idx}`}
                          style={{
                            border: '1px solid #4ade80',
                            padding: '1rem',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            background: cardBackground,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.25rem',
                          }}
                        >
                          <span style={{ fontWeight: 'bold' }}>{sentence}</span>
                          {matches.map((m) => (
                            <span key={m.id}>✅ {m.pattern}</span>
                          ))}
                        </div>
                      );
                    })}
                </div>
              </div>
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ color: '#dc2626', marginBottom: '0.5rem' }}>
                  Unmatched Results with tips
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {sentences
                    .filter(
                      (s) =>
                        !(results.patterns || []).some((p) => s.includes(p.pattern))
                    )
                    .map((sentence, idx) => (
                      <div
                        key={`u-${idx}`}
                        style={{
                          border: '1px solid #f87171',
                          padding: '1rem',
                          borderRadius: '8px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                          background: cardBackground,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.25rem',
                        }}
                      >
                        <span style={{ fontWeight: 'bold' }}>{sentence}</span>
                        <span style={{ fontSize: '0.875rem' }}>{TIP_TEXT}</span>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}
