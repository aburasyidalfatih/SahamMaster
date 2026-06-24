import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ArrowRight, Lock, Copy } from 'lucide-react';
import { trackEvent } from './MetaPixel';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  useEffect(() => {
    if (isOpen && !settings) {
      fetch('/api/public/checkout-settings')
        .then(res => res.json())
        .then(data => {
          setSettings(data);
        })
        .catch(err => console.error(err));
    }
    
    if (isOpen) {
      trackEvent('InitiateCheckout');
    }
  }, [isOpen, settings]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      alert('Semua kolom wajib diisi');
      return;
    }
    if (formData.password.length < 6) {
      alert('Password minimal 6 karakter');
      return;
    }

    setLoading(true);

    const fd = new FormData();
    fd.append('name', formData.name);
    fd.append('email', formData.email);
    fd.append('phone', formData.phone);
    fd.append('password', formData.password);

    try {
      const res = await fetch('/checkout', {
        method: 'POST',
        body: fd
      });
      const data = await res.json();
      
      if (data.redirect_url) {
        // Track Conversion
        trackEvent('Lead', { email: formData.email });
        if (settings?.price) {
           trackEvent('Purchase', { currency: 'IDR', value: Number(settings.price) });
        }
        
        // Slight delay to ensure pixel fires before redirect
        setTimeout(() => {
          window.location.href = data.redirect_url;
        }, 300);
      } else {
        alert(data.error || 'Terjadi kesalahan');
        setLoading(false);
      }
    } catch (err) {
      alert('Gagal terhubung ke server');
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential })
      });
      const data = await res.json();
      
      if (data.invoice_url) {
        trackEvent('Lead', { email: 'google-auth@example.com' });
        if (settings?.price) trackEvent('Purchase', { currency: 'IDR', value: Number(settings.price) });
        
        setTimeout(() => {
          window.location.href = data.invoice_url;
        }, 300);
      } else {
        alert(data.error || 'Terjadi kesalahan');
        setLoading(false);
      }
    } catch (err) {
      alert('Gagal terhubung ke server');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-white rounded-full p-1 z-10">
          <X className="w-6 h-6" />
        </button>

        <div className="overflow-y-auto overflow-x-hidden p-6 md:p-8 custom-scrollbar">
            <div>
              <div className="text-center mb-6">
                <img src="/logo.png" alt="SahamMaster" className="w-16 h-16 object-contain mx-auto mb-3 drop-shadow-md" />
                <h2 className="text-2xl font-black text-slate-900">{settings?.product_name || 'SahamMaster Membership'}</h2>
                <p className="text-slate-500 text-sm mt-1">Lengkapi data untuk membuat akun</p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex justify-between items-center">
                <span className="text-slate-600 font-semibold text-sm">Total Bayar</span>
                <span className="text-blue-700 font-black text-xl">
                  {settings ? `Rp ${(settings.price || 0).toLocaleString('id-ID')}` : 'Loading...'}
                </span>
              </div>
              
              {settings?.google_client_id ? (
                <GoogleOAuthProvider clientId={settings.google_client_id}>
                  <div className="mb-6">
                    <div className="flex justify-center w-full">
                      <GoogleLogin 
                        onSuccess={handleGoogleSuccess} 
                        onError={() => alert('Login Google Gagal')}
                        text="continue_with"
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
                        <span className="bg-white px-3 text-slate-400 font-medium tracking-wider">Atau isi form manual</span>
                      </div>
                    </div>
                  </div>
                </GoogleOAuthProvider>
              ) : null}

              <form onSubmit={handleProcess} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Nama *</label>
                  <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Nama Anda (Bebas)" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Email Aktif *</label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Untuk login & invoice" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">No. WhatsApp *</label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="text" placeholder="08xxxxxxxxxx" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Buat Password *</label>
                  <input required name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Minimal 6 karakter" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <button disabled={loading || !settings} type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2">
                  {loading ? 'Memproses...' : 'Lanjutkan Pembayaran'}
                  {!loading && <ArrowRight className="w-5 h-5" />}
                </button>
              </form>
              <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Data Anda aman & terenkripsi
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
