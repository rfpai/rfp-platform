import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [language, setLanguage] = useState('en');
  const [text, setText] = useState('');
  const [domain, setDomain] = useState('');
  const [category, setCategory] = useState('');
  const [results, setResults] = useState(null);
  const [sentences, setSentences] = useState([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = window.localStorage.getItem('loggedIn');
    if (!token) {
      router.replace('/login');
    } else {
      setLoggedIn(true);
    }
  }, [router]);

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

  const t = {
    en: {
      title: 'RFP Assistant',
      domain: 'Domain',
      category: 'Category',
      text: 'Text',
      analyze: 'Analyze',
      matched: 'Matched Results',
      unmatched: 'Unmatched Results',
      tip: 'Tip: consider clarifying benefits or target audience.',
      summary: (m, t) => `${m} of ${t} sentences matched.`,
    },
    ar: {
      title: 'منصة إعداد العروض الفنية',
      domain: 'نطاق العمل',
      category: 'الفئة',
      text: 'نص التحليل',
      analyze: 'تحليل',
      matched: 'العبارات المطابقة',
      unmatched: 'العبارات غير المطابقة',
      tip: '💡 نصيحة: يفضل توضيح الفائدة أو الجمهور المستهدف.',
      summary: (m, t) => `تمت مطابقة ${m} من ${t} جملة`,
    },
  }[language];

  const containerStyle = {
    background: darkMode ? '#111' : '#f0f0f0',
    color: darkMode ? '#eee' : '#111',
    minHeight: '100vh',
    fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
    direction: language === 'ar' ? 'rtl' : 'ltr',
    transition: 'background 0.3s, color 0.3s',
  };

  const cardStyle = {
    background: darkMode ? '#1f2937' : '#ffffff',
    maxWidth: '800px',
    width: '100%',
    margin: '2rem auto',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  };

  const analyzeBtnClass = 'analyze-btn';

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
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      handleSubmit(e);
    }
  };

  const matchedSentences = sentences.filter((s) =>
    (results?.patterns || []).some((p) => s.includes(p.pattern))
  );
  const unmatchedSentences = sentences.filter(
    (s) => !(results?.patterns || []).some((p) => s.includes(p.pattern))
  );

  return (
    <>
      <Head>
        <title>{t.title}</title>
      </Head>
      <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .analyze-btn {
          background: linear-gradient(to right, #3b82f6, #2563eb);
          border: none;
          border-radius: 8px;
          color: #fff;
          padding: 0.75rem;
          cursor: pointer;
          width: 100%;
          transition: opacity 0.3s;
        }
        .analyze-btn:hover { opacity: 0.9; }
      `}</style>
      <div style={containerStyle}>
        <nav
          style={{
            background: darkMode ? '#1f2937' : '#ffffff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: '1.25rem',
              whiteSpace: 'nowrap',
              flex: 1,
            }}
          >
            {t.title}
          </h1>
          <a
            href="/landing"
            style={{
              marginRight: language === 'ar' ? 0 : '0.5rem',
              marginLeft: language === 'ar' ? '0.5rem' : 0,
              textDecoration: 'underline',
            }}
          >
            {language === 'ar' ? 'الواجهة الرئيسية' : 'Landing'}
          </a>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: '1.25rem',
              marginInlineStart: '0.5rem',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                transition: 'transform 0.3s',
                transform: darkMode ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              {darkMode ? '🌞' : '🌙'}
            </span>
          </button>
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            style={{
              marginInlineStart: '0.5rem',
              border: '1px solid',
              background: 'transparent',
              borderRadius: '6px',
              padding: '0.25rem 0.5rem',
              cursor: 'pointer',
            }}
          >
            {language === 'en' ? 'العربية' : 'English'}
          </button>
          {loggedIn && (
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.localStorage.removeItem('loggedIn');
                }
                router.push('/login');
              }}
              style={{
                marginInlineStart: '0.5rem',
                border: '1px solid',
                background: 'transparent',
                borderRadius: '6px',
                padding: '0.25rem 0.5rem',
                cursor: 'pointer',
              }}
            >
              Log out
            </button>
          )}
        </nav>

        <main style={cardStyle}>
          <form
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {t.domain}
              <input
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
              />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {t.category}
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
              />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {t.text}
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t.text}
                style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', minHeight: '100px' }}
              />
            </label>
            <button type="submit" className={analyzeBtnClass} disabled={loading}>
              {t.analyze}
            </button>
          </form>

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
            <div style={{ marginTop: '1.5rem' }}>
              <p>{t.summary(matchedCount, sentences.length)}</p>

              {matchedSentences.map((sentence, idx) => (
                <div
                  key={`m-${idx}`}
                  style={{
                    background: '#dcfce7',
                    border: '1px solid #bbf7d0',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    marginTop: '0.5rem',
                  }}
                >
                  ✅ {sentence}
                </div>
              ))}

              {unmatchedSentences.map((sentence, idx) => (
                <div
                  key={`u-${idx}`}
                  style={{
                    background: '#fee2e2',
                    border: '1px solid #fecaca',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    marginTop: '0.5rem',
                  }}
                >
                  ❌ {sentence}
                  <div
                    style={{
                      background: '#fef9c3',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      marginTop: '0.5rem',
                      fontSize: '0.875rem',
                    }}
                  >
                    {t.tip}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
