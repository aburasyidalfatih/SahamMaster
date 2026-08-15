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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-[420px] rounded-2xl sm:rounded-[28px] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.4)] border border-slate-100 ring-1 ring-slate-900/5 overflow-hidden relative animate-in zoom-in-95 duration-200 flex flex-col">
        {/* Top Decorative Subtle Accent */}
        <div className="h-1 sm:h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 shrink-0"></div>

        {/* Close Button */}
        <button 
          onClick={onClose} 
          aria-label="Tutup"
          className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 text-slate-400 hover:text-slate-700 bg-slate-100/90 hover:bg-slate-200 rounded-full p-1 sm:p-1.5 transition-all z-10 cursor-pointer"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        <div className="p-3.5 sm:p-6 overflow-y-auto max-h-[94vh] sm:max-h-none custom-scrollbar">
          <div>
            {/* Header / Logo - Compact row on mobile, centered on desktop */}
            <div className="flex sm:flex-col items-center gap-2.5 sm:gap-0 sm:text-center mb-2.5 sm:mb-4">
              <div className="p-1 sm:p-2 bg-gradient-to-b from-slate-50 to-slate-100 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm sm:mb-2.5 shrink-0">
                <img src="/logo.png" alt="SahamMaster" className="w-7 h-7 sm:w-11 sm:h-11 object-contain drop-shadow-sm" />
              </div>
              <div className="pr-6 sm:pr-0">
                <h2 className="text-sm sm:text-xl font-black text-slate-900 tracking-tight leading-tight">
                  {settings?.product_name || 'SahamMaster Membership'}
                </h2>
                <p className="text-slate-500 text-[11px] sm:text-xs sm:mt-0.5">Lengkapi data untuk membuat akun</p>
              </div>
            </div>

            {/* Total Bayar Banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 mb-2.5 sm:mb-3.5 shadow-md shadow-blue-600/20 border border-blue-500/30">
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
              <div className="relative z-10 flex justify-between items-center">
                <div>
                  <span className="text-blue-100 font-bold text-[10px] sm:text-xs tracking-wider uppercase block leading-none mb-0.5">Total Bayar</span>
                  <span className="text-[10px] sm:text-xs text-blue-200/90 font-normal leading-none">Akses penuh seumur hidup</span>
                </div>
                <div className="text-right">
                  <span className="text-white font-black text-lg sm:text-2xl tracking-tight block leading-none">
                    {settings ? `Rp ${(settings.price || 0).toLocaleString('id-ID')}` : 'Loading...'}
                  </span>
                </div>
              </div>
            </div>

            {/* Benefit Items - 2 Col on mobile, full list on desktop */}
            <div className="mb-2.5 sm:mb-3.5 bg-slate-50/80 border border-slate-200/70 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5">
              <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 sm:mb-2.5 flex items-center gap-1.5 leading-none">
                <Sparkles className="w-3 h-3 text-blue-600" /> Apa yang Anda dapat:
              </p>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 sm:block sm:space-y-2">
                {[
                  { icon: '📊', name: 'Modul Trading 30 Hari', price: 'Rp 1.500.000' },
                  { icon: '🤖', name: 'Akses AI Mentor IDX', price: 'Rp 750.000' },
                  { icon: '⚡', name: 'Tools Pro', price: 'Rp 500.000' },
                  { icon: '🎓', name: 'Ujian & Sertifikat', price: 'Rp 500.000' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-0.5 gap-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-xs sm:text-sm shrink-0">{item.icon}</span>
                      <span className="text-[10px] sm:text-xs font-semibold text-slate-700 truncate">{item.name}</span>
                    </div>
                    <span className="text-[9px] sm:text-[11px] text-slate-400 line-through font-medium shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-200/80 mt-1.5 pt-1.5 sm:mt-2.5 sm:pt-2 flex justify-between items-center leading-none">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500">Total Nilai Asli</span>
                <span className="text-[11px] sm:text-xs font-bold text-red-500 line-through">Rp 3.250.000</span>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleFormSubmit} className="space-y-1.5 sm:space-y-2.5 mb-2 sm:mb-3">
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full pl-8.5 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 outline-none text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium transition-all"
                  required
                />
              </div>

              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-8.5 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 outline-none text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium transition-all"
                  required
                />
              </div>

              <div className="relative group">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="tel"
                  placeholder="No. WhatsApp (08xxx)"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full pl-8.5 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 outline-none text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium transition-all"
                  required
                />
              </div>

              <div className="relative group">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="password"
                  placeholder="Buat Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-8.5 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 outline-none text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium transition-all"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-1.5 py-2.5 sm:py-3 px-4 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-lg sm:rounded-xl shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/35 active:scale-[0.99] transition-all duration-200 disabled:opacity-60 text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  'Daftar & Bayar Sekarang'
                )}
              </button>
            </form>

            {/* Security Guarantee Footer */}
            <div className="pt-1.5 sm:pt-2 border-t border-slate-100 text-center">
              <p className="text-[10px] sm:text-xs text-slate-400 flex items-center justify-center gap-1 font-medium leading-none">
                <Lock className="w-3 h-3 text-emerald-600" /> Data Anda aman & terenkripsi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;

