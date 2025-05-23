import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Custom404() {
  const [language, setLanguage] = useState('en');
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedLang = window.localStorage.getItem('language');
    if (storedLang) {
      setLanguage(storedLang);
    } else if (navigator.language && navigator.language.startsWith('ar')) {
      setLanguage('ar');
    }

    const storedDark = window.localStorage.getItem('darkMode');
    if (storedDark) {
      setDark(storedDark === 'true');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDark(true);
    }
  }, []);

  const isAr = language === 'ar';

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    padding: '1rem',
    background: dark ? '#222' : '#f9f9f9',
    color: dark ? '#fff' : '#000',
    fontFamily: isAr ? "'Cairo', sans-serif" : "'Inter', sans-serif",
    direction: isAr ? 'rtl' : 'ltr',
  };

  const cardStyle = {
    background: dark ? '#333' : '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    width: '100%',
  };

  const buttonStyle = {
    marginTop: '1.5rem',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    background: '#2563eb',
    color: '#fff',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  return (
    <div style={containerStyle}>
      <Head>
        <title>{isAr ? 'الصفحة غير موجودة' : 'Page Not Found'}</title>
        {isAr ? (
          <link
            href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap"
            rel="stylesheet"
          />
        ) : (
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
            rel="stylesheet"
          />
        )}
      </Head>
      <div style={cardStyle}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          {isAr ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h1>
        <p style={{ marginBottom: '1.5rem' }}>
          {isAr
            ? 'يبدو أنك وصلت إلى رابط غير صحيح.'
            : 'It seems you\u2019ve reached a page that doesn\u2019t exist.'}
        </p>
        <a href="/" style={buttonStyle}>
          {isAr ? 'العودة إلى الصفحة الرئيسية' : 'Go back to Home'}
        </a>
      </div>
    </div>
  );
}
