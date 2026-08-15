import React, { useState, useEffect } from 'react';
import { X, Lock, User, Mail, Phone, KeyRound, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-[440px] rounded-[28px] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.35)] border border-slate-100 ring-1 ring-slate-900/5 overflow-hidden relative animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Top Decorative Subtle Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500"></div>

        {/* Close Button */}
        <button 
          onClick={onClose} 
          aria-label="Tutup"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100/80 hover:bg-slate-200 rounded-full p-1.5 transition-all z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="overflow-y-auto overflow-x-hidden p-6 sm:p-7 custom-scrollbar">
          <div>
            {/* Header / Logo */}
            <div className="text-center mb-5">
              <div className="inline-flex p-2 bg-gradient-to-b from-slate-50 to-slate-100 rounded-2xl border border-slate-200/80 shadow-sm mb-3">
                <img src="/logo.png" alt="SahamMaster" className="w-12 h-12 object-contain drop-shadow-sm" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                {settings?.product_name || 'SahamMaster Membership'}
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">Lengkapi data untuk membuat akun</p>
            </div>

            {/* Total Bayar Banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white rounded-2xl p-4 sm:p-5 mb-5 shadow-lg shadow-blue-600/20 border border-blue-500/30">
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
              <div className="relative z-10 flex justify-between items-center">
                <div>
                  <span className="text-blue-100/90 font-semibold text-xs tracking-wider uppercase block">Total Bayar</span>
                  <span className="text-xs text-blue-200/80 font-normal">Akses penuh seumur hidup</span>
                </div>
                <div className="text-right">
                  <span className="text-white font-black text-2xl sm:text-3xl tracking-tight block">
                    {settings ? `Rp ${(settings.price || 0).toLocaleString('id-ID')}` : 'Loading...'}
                  </span>
                </div>
              </div>
            </div>

            {/* Benefit Items Accordion-like Box */}
            <div className="mb-5 bg-slate-50/80 border border-slate-200/70 rounded-2xl p-4">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Apa yang Anda dapat:
              </p>
              <div className="space-y-2.5">
                {[
                  { icon: '📊', name: 'Modul Trading 30 Hari', price: 'Rp 1.500.000' },
                  { icon: '🤖', name: 'Akses AI Mentor IDX', price: 'Rp 750.000' },
                  { icon: '⚡', name: 'Tools Pro', price: 'Rp 500.000' },
                  { icon: '🎓', name: 'Ujian & Sertifikat', price: 'Rp 500.000' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{item.icon}</span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-700">{item.name}</span>
                    </div>
                    <span className="text-[11px] sm:text-xs text-slate-400 line-through font-medium">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-200/80 mt-3 pt-2.5 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">Total Nilai Asli</span>
                <span className="text-xs sm:text-sm font-bold text-red-500 line-through">Rp 3.250.000</span>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleFormSubmit} className="space-y-3 mb-4">
              <div className="space-y-1">
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50/60 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-sm text-slate-900 placeholder:text-slate-400 font-medium transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50/60 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-sm text-slate-900 placeholder:text-slate-400 font-medium transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="relative group">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="tel"
                    placeholder="No. WhatsApp (08xxx)"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50/60 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-sm text-slate-900 placeholder:text-slate-400 font-medium transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="relative group">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="password"
                    placeholder="Buat Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50/60 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-sm text-slate-900 placeholder:text-slate-400 font-medium transition-all"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 active:scale-[0.99] transition-all duration-200 disabled:opacity-60 text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  'Daftar & Bayar Sekarang'
                )}
              </button>
            </form>

            {/* Security Guarantee Footer */}
            <div className="pt-2 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5 font-medium">
                <Lock className="w-3.5 h-3.5 text-emerald-600" /> Data Anda aman & terenkripsi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;

