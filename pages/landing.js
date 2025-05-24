import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Landing() {
  const router = useRouter();
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

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('loggedIn');
    }
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>Landing</title>
      </Head>
      <div style={{ padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
        <nav style={{ marginBottom: '1rem' }}>
          {loggedIn && (
            <button
              onClick={handleLogout}
              style={{
                border: '1px solid',
                background: 'transparent',
                borderRadius: '6px',
                padding: '0.25rem 0.5rem',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          )}
        </nav>
        <h1>Welcome to the Landing Page 🎉</h1>
        <p>This page is protected. Only logged-in users can see this.</p>
      </div>
    </>
  );
}
