import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Loader2 } from 'lucide-react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [clientId, setClientId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/public/checkout-settings')
      .then(res => res.json())
      .then(data => {
        if (data.google_client_id) {
          setClientId(data.google_client_id);
        }
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Mohon isi email dan password.');
      return;
    }

    setLoading(true);

    try {
      // 1. Coba login sebagai Admin
      const adminResponse = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password })
      });

      if (adminResponse.ok) {
        const adminData = await adminResponse.json();
        if (adminData.token) {
          localStorage.setItem('adminToken', adminData.token);
          window.location.href = '/admin/';
          return;
        }
      }

      // 2. Jika bukan admin, coba login sebagai Member
      const memberRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password })
      });
      
      if (memberRes.ok) {
        const memberData = await memberRes.json();
        if (memberData.token) {
          localStorage.setItem('token', memberData.token);
          navigate('/akses-member-area');
          return;
        }
      }

      setError('Email atau password salah.');
      setLoading(false);

    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan pada server. Silakan coba lagi.');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential })
      });
      const data = await res.json();
      
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        navigate('/akses-member-area');
      } else {
        setError(data.error || 'Gagal login dengan Google');
        setLoading(false);
      }
    } catch (err) {
      setError('Gagal terhubung ke server');
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Saham Kelas Master
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Masuk ke dashboard Anda
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100 ring-1 ring-black/5">
          {clientId && (
            <GoogleOAuthProvider clientId={clientId}>
              <div className="mb-6">
                <div className="flex justify-center w-full">
                  <GoogleLogin 
                    onSuccess={handleGoogleLogin} 
                    onError={() => setError('Login Google Gagal')}
                    text="signin_with"
                    theme="filled_blue"
                    width="100%"
                    shape="pill"
                  />
                </div>
                <div className="relative mt-5">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-3 text-slate-400 font-medium tracking-wider">Atau login dengan email</span>
                  </div>
                </div>
              </div>
            </GoogleOAuthProvider>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Alamat Email
              </label>
              <div className="mt-1">
                <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1">
                <input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" />
              </div>
            </div>

            <div>
              <button type="submit" disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70">
                {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
        <p className="mt-8 text-center text-xs text-slate-500">
          &copy; 2026 Saham Kelas Master. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
