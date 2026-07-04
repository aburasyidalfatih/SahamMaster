import React, { useState, useEffect } from 'react';
import { X, Lock, User, Mail, Phone, KeyRound } from 'lucide-react';
import { trackEvent } from './MetaPixel';


interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      alert('Semua field wajib diisi');
      return;
    }
    setLoading(true);
    
    // Generate unique event ID for Meta CAPI deduplication
    const leadEventId = 'evt_lead_' + Date.now();
    
    try {
      const res = await fetch('/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          password,
          event_id: leadEventId,
          utm_source: sessionStorage.getItem('utm_source') || '',
          utm_medium: sessionStorage.getItem('utm_medium') || '',
          utm_campaign: sessionStorage.getItem('utm_campaign') || '',
          utm_content: sessionStorage.getItem('utm_content') || ''
        })
      });
      const data = await res.json();
      
      if (data.redirect_url) {
        trackEvent('Lead', { email: email.trim() }, leadEventId);
        window.location.href = data.redirect_url;
      } else if (data.invoice_url) {
        trackEvent('Lead', { email: email.trim() }, leadEventId);
        window.location.href = data.invoice_url;
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

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5 flex justify-between items-center">
                <span className="text-slate-600 font-semibold text-sm">Total Bayar</span>
                <span className="text-blue-700 font-black text-xl">
                  {settings ? `Rp ${(settings.price || 0).toLocaleString('id-ID')}` : 'Loading...'}
                </span>
              </div>

              {/* Benefit Items */}
              <div className="mb-5 border border-slate-100 rounded-xl p-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Apa yang Anda dapat:</p>
                <div className="space-y-3">
                  {[
                    { icon: '📊', name: 'Modul Trading 30 Hari', price: 'Rp 1.500.000' },
                    { icon: '🤖', name: 'Akses AI Mentor IDX', price: 'Rp 750.000' },
                    { icon: '⚡', name: 'Tools Pro', price: 'Rp 500.000' },
                    { icon: '🎓', name: 'Ujian & Sertifikat', price: 'Rp 500.000' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                      </div>
                      <span className="text-xs text-slate-400 line-through">{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-100 mt-3 pt-3 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500">Total Nilai Asli</span>
                  <span className="text-sm font-bold text-red-400 line-through">Rp 3.250.000</span>
                </div>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleFormSubmit} className="space-y-3 mb-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                    required
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                    required
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    placeholder="No. WhatsApp (08xxx)"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                    required
                  />
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    placeholder="Buat Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                    required
                    minLength={6}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 text-sm"
                >
                  {loading ? 'Memproses...' : 'Daftar & Bayar Sekarang'}
                </button>
              </form>


              <p className="text-center text-xs text-slate-400 mt-6 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Data Anda aman & terenkripsi
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
