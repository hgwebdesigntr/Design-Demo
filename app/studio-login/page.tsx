'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudioLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/studio-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push('/studio');
    } else {
      setError('Kullanıcı adı veya şifre hatalı.');
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F5F0E8',
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '18px',
        width: '360px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      }}>
        <h1 style={{
          fontFamily: 'Georgia, serif',
          color: '#1B3A4B',
          fontSize: '22px',
          marginBottom: '8px',
          fontWeight: 400,
        }}>
          Yönetim Paneli
        </h1>
        <p style={{ color: '#2C2C2C', opacity: 0.45, fontSize: '13px', marginBottom: '28px' }}>
          Devam etmek için giriş yapın.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Kullanıcı adı"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{
              display: 'block',
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #D4C5A9',
              borderRadius: '10px',
              fontSize: '14px',
              marginBottom: '12px',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              display: 'block',
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #D4C5A9',
              borderRadius: '10px',
              fontSize: '14px',
              marginBottom: '20px',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
          />

          {error && (
            <p style={{ color: '#C4622D', fontSize: '13px', marginBottom: '16px' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              display: 'block',
              width: '100%',
              padding: '13px',
              backgroundColor: loading ? '#8fa8b5' : '#1B3A4B',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              transition: 'background-color 0.2s',
            }}
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
}
