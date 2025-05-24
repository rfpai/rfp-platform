import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = window.localStorage.getItem('loggedIn');
    if (token) {
      router.replace('/');
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@rfp.com' && password === '123456') {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('loggedIn', 'true');
      }
      router.replace('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid #ccc', padding: '2rem', borderRadius: '8px' }}>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ display: 'block', marginTop: '0.25rem', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', width: '100%' }} />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ display: 'block', marginTop: '0.25rem', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', width: '100%' }} />
          </label>
          <button type="submit" style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid', background: '#2563eb', color: '#fff', cursor: 'pointer' }}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}
