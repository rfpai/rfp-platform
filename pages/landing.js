import React, { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Landing() {
  const [language, setLanguage] = useState('en');

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

  const texts = {
    en: {
      heroTitle: 'RFP Intelligence Platform',
      heroSub: 'Modern tools for smarter proposals',
      heroDesc: 'Use AI to analyze and improve your technical bids with ease.',
      getStarted: 'Get Started',
      featuresLabel: 'Features',
      features: [
        { icon: '🤖', title: 'Smart RFP Analysis' },
        { icon: '⭐', title: 'Automatic Recommendations' },
        { icon: '🌐', title: 'Bilingual Interface' },
        { icon: '⚡', title: 'Fast & Secure' },
      ],
      howWorks: 'How It Works',
      steps: ['Enter details', 'Smart Analysis', 'Extract results'],
      cta: 'Start Now',
      footerAbout: 'About',
    },
    ar: {
      heroTitle: 'منصة العروض الذكية',
      heroSub: 'أدوات عصرية لعروض فنية أذكى',
      heroDesc: 'استخدم الذكاء الاصطناعي لتحليل وتحسين عروضك الفنية بسهولة.',
      getStarted: 'ابدأ الآن',
      featuresLabel: 'الميزات',
      features: [
        { icon: '🤖', title: 'تحليل عروض فني ذكي' },
        { icon: '⭐', title: 'توصيات تلقائية' },
        { icon: '🌐', title: 'واجهة ثنائية اللغة' },
        { icon: '⚡', title: 'سريع وآمن' },
      ],
      howWorks: 'كيف تعمل المنصة',
      steps: ['أدخل المعلومات', 'تحليل ذكي', 'استخرج النتائج'],
      cta: 'ابدأ الآن',
      footerAbout: 'حول المنصة',
    },
  };

  const t = texts[language];
  const isAr = language === 'ar';

  const containerStyle = {
    fontFamily: isAr ? '\'Tajawal\', sans-serif' : '\'Inter\', sans-serif',
    direction: isAr ? 'rtl' : 'ltr',
    lineHeight: 1.6,
    color: '#111',
  };

  const sectionStyle = {
    padding: '4rem 1rem',
  };

  const btnStyle = {
    padding: '0.75rem 1.5rem',
    background: '#2563eb',
    color: '#fff',
    borderRadius: '8px',
    textDecoration: 'none',
    display: 'inline-block',
  };

  return (
    <div style={containerStyle}>
      <Head>
        <title>{t.heroTitle}</title>
      </Head>
      <nav
        style={{
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <a href="/" style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
          RFP Assistant
        </a>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <a href="/landing" style={{ textDecoration: 'underline' }}>
            {isAr ? 'الواجهة' : 'Landing'}
          </a>
          <button
            onClick={() => setLanguage(isAr ? 'en' : 'ar')}
            style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              border: '1px solid',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            {isAr ? 'English' : 'العربية'}
          </button>
        </div>
      </nav>

      <section style={{ ...sectionStyle, textAlign: 'center', background: '#f4f4f4' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          {t.heroTitle}
        </h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{t.heroSub}</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>{t.heroDesc}</p>
        <a href="/" style={btnStyle}>{t.getStarted}</a>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          {t.featuresLabel}
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {t.features.map((f, idx) => (
            <div
              key={idx}
              style={{
                textAlign: 'center',
                padding: '1.5rem',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{f.icon}</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{f.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section style={{ ...sectionStyle, background: '#f9f9f9' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          {t.howWorks}
        </h2>
        <div
          style={{
            display: 'flex',
            flexDirection: isAr ? 'row-reverse' : 'row',
            justifyContent: 'space-between',
            gap: '1rem',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          {t.steps.map((s, idx) => (
            <div key={idx} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {idx + 1}
              </div>
              <p>{s}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ ...sectionStyle, textAlign: 'center' }}>
        <a href="/" style={btnStyle}>{t.cta}</a>
      </section>

      <footer style={{ background: '#111', color: '#fff', padding: '2rem 1rem', textAlign: 'center' }}>
        <p style={{ margin: 0 }}>© {new Date().getFullYear()} RFP Assistant</p>
        <p style={{ margin: '0.5rem 0' }}>
          <a href="https://github.com" style={{ color: '#fff', textDecoration: 'underline' }}>GitHub</a>
          {' | '}
          <a href="/about" style={{ color: '#fff', textDecoration: 'underline' }}>{t.footerAbout}</a>
        </p>
      </footer>
    </div>
  );
}

