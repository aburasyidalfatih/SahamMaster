
import React, { useState, useEffect, useRef } from 'react';
// useNavigate dihapus karena Landing Page sekarang independen tanpa routing internal
import { 
  TrendingUp, BookOpen, MessageSquare, ShieldCheck, CheckCircle, 
  ArrowRight, Zap, Trophy, AlertTriangle, 
  Clock, DollarSign, ChevronDown, ChevronUp, Lock, BrainCircuit, Activity, Sparkles,
  Gift, Calculator, FileText, Menu, X, ShoppingBag, Briefcase, GraduationCap, Baby, XCircle
} from 'lucide-react';
import { CURRICULUM } from '../constants';

const RECENT_BUYERS = [
  "Diamond Sudradjat", "Agus", "Buddy", "Agung", "Musa", "Johanes", "Theo Kurniadi",
  "Cholikul Anwar", "Arief Mustain", "Dodi I", "Mas Youyung", "Taifik", "Wahyudi",
  "Fuddy Ardhika", "Heri Is", "Abdul Wahid", "Djoni Sulaiman", "Roni", "Hendra Fauzan",
  "Thony Sanjaya", "Agus Nugroho", "Herdita", "Franz", "Andri", "Andiashaq", "Yopi",
  "Taufiq Rahman", "Neil Aldrin", "Roland"
];

// High Performance Lazy Wrapper dengan Height Prediction
// minHeight penting agar scrollbar tidak loncat-loncat (Layout Shift) saat loading
const LazySection = ({ children, className, id, minHeight = "min-h-[100px]" }: { children: React.ReactNode, className?: string, id?: string, minHeight?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Gunakan requestIdleCallback jika tersedia untuk tidak memblokir main thread saat scroll cepat
          if ('requestIdleCallback' in window) {
            // @ts-ignore
            window.requestIdleCallback(() => setIsVisible(true));
          } else {
            setIsVisible(true);
          }
          observer.disconnect(); 
        }
      },
      { 
        rootMargin: '200px', // Load 200px sebelum elemen masuk viewport
        threshold: 0
      } 
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} id={id} className={className} style={{ contentVisibility: 'auto' }}>
       {isVisible ? children : <div className={`w-full ${minHeight} bg-transparent`} />}
    </div>
  );
};

const LandingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeWeek, setActiveWeek] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  
  // State untuk menunda logic berat agar Hero muncul duluan
  const [isLowPriorityReady, setIsLowPriorityReady] = useState(false);
  
  const [socialProof, setSocialProof] = useState({ name: '', show: false, time: '' });
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false); // Close menu on mobile click
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getWeekData = (week: number) => {
    if (week === 1) return CURRICULUM.filter(l => l.day >= 1 && l.day <= 7);
    if (week === 2) return CURRICULUM.filter(l => l.day >= 8 && l.day <= 14);
    if (week === 3) return CURRICULUM.filter(l => l.day >= 15 && l.day <= 21);
    if (week === 4) return CURRICULUM.filter(l => l.day >= 22 && l.day <= 30);
    return [];
  };

  const CHECKOUT_LINK = "https://lynk.id/kelasmaster/lv6e6ko0gk58";

  const handleTrackAddToCart = () => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.fbq) {
      // @ts-ignore
      window.fbq('track', 'AddToCart', {
        content_name: 'Kelas SahamMaster 30 Hari',
        currency: 'IDR',
        value: 99000,
      });
    }
  };

  // --- CRITICAL OPTIMIZATION ---
  // Tunda semua logic javascript (Event Listener, Interval, Timer)
  // sampai Hero Section selesai dilukis (Paint) oleh browser.
  useEffect(() => {
    const timer = setTimeout(() => {
        setIsLowPriorityReady(true);
    }, 2000); // Tunda 2 detik
    return () => clearTimeout(timer);
  }, []);

  // Optimized Scroll Listener (Delayed)
  useEffect(() => {
    if (!isLowPriorityReady) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 600) {
            setShowStickyCTA(true);
          } else {
            setShowStickyCTA(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLowPriorityReady]);

  // Countdown Timer (Delayed)
  useEffect(() => {
    if (!isLowPriorityReady) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          return { minutes: 14, seconds: 59 };
        }
      });
        }, 1000);
    return () => clearInterval(timer);
  }, [isLowPriorityReady]);

  // Social Proof Logic (Delayed)
  useEffect(() => {
    if (!isLowPriorityReady) return;

    const showNotification = () => {
      const randomName = RECENT_BUYERS[Math.floor(Math.random() * RECENT_BUYERS.length)];
      const randomTime = Math.floor(Math.random() * 10) + 1; 
      
      setSocialProof({
        name: randomName,
        time: `${randomTime} menit yang lalu`,
        show: true
      });

      setTimeout(() => {
        setSocialProof(prev => ({ ...prev, show: false }));
      }, 4000);
    };

    // Start interval
    showNotification();
    const interval = setInterval(() => {
      showNotification();
    }, 12000);
    return () => clearInterval(interval);
  }, [isLowPriorityReady]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden pb-20 md:pb-0">
      {/* Navigation - Uses c-nav class from Critical CSS */}
      <nav className="c-nav shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-indigo-800 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-900/20">SM</div>
              <div>
                <span className="font-bold text-lg md:text-2xl text-slate-900 tracking-tight block leading-none">SahamMaster</span>
                <span className="text-[10px] text-blue-600 font-bold tracking-widest uppercase">Indonesia</span>
              </div>
            </div>

            {/* Desktop Menu - Login Button Removed */}
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={() => scrollToSection('ai-tech')} className="text-slate-500 hover:text-blue-700 font-medium text-sm transition-colors">Teknologi AI</button>
              <button onClick={() => scrollToSection('kurikulum')} className="text-slate-500 hover:text-blue-700 font-medium text-sm transition-colors">Kurikulum</button>
              <button onClick={() => scrollToSection('bonus')} className="text-slate-500 hover:text-blue-700 font-medium text-sm transition-colors">Bonus</button>
              <button onClick={() => scrollToSection('harga')} className="text-slate-500 hover:text-blue-700 font-medium text-sm transition-colors">Investasi</button>
            </div>

            {/* CTA Daftar */}
            <div className="hidden md:block ml-4">
                <button 
                onClick={() => {
                  handleTrackAddToCart();
                  scrollToSection('harga');
                }} 
                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-900/30 transform hover:-translate-y-0.5 text-sm flex items-center"
                >
                Daftar Sekarang
                <ArrowRight className="w-4 h-4 ml-2" />
                </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-slate-600 hover:text-blue-600 p-2 focus:outline-none"
                    aria-label="Menu"
                >
                    {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-slate-100 absolute w-full left-0 top-20 p-4 shadow-xl flex flex-col space-y-4 animate-in slide-in-from-top-5">
                <button onClick={() => scrollToSection('ai-tech')} className="text-slate-600 font-bold text-lg py-2 border-b border-slate-50">Teknologi AI</button>
                <button onClick={() => scrollToSection('kurikulum')} className="text-slate-600 font-bold text-lg py-2 border-b border-slate-50">Kurikulum</button>
                <button onClick={() => scrollToSection('bonus')} className="text-slate-600 font-bold text-lg py-2 border-b border-slate-50">Bonus Eksklusif</button>
                <button onClick={() => scrollToSection('harga')} className="text-slate-600 font-bold text-lg py-2 border-b border-slate-50">Investasi</button>
                
                <button 
                  onClick={() => {
                    handleTrackAddToCart();
                    scrollToSection('harga');
                  }} 
                  className="bg-slate-900 text-white w-full py-4 rounded-xl font-bold shadow-lg mt-2"
                >
                  Daftar Sekarang
                </button>
            </div>
        )}
      </nav>

      {/* Hero Section - CRITICAL PATH (Always Rendered Instantly) */}
      {/* Menggunakan Class Manual (c-hero) agar CSS Critical bekerja sebelum JS load */}
      <section className="c-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="c-badge">
              <AlertTriangle className="w-3 h-3 mr-2" />
              Stop Membakar Uang Anda
            </div>
            
            <h1 className="c-title">
              Kuasai Pasar Modal Indonesia <br className="hidden md:block"/>
              <span>Dalam 30 Hari.</span>
            </h1>
            
            <p className="c-desc">
              Satu-satunya platform edukasi saham dengan <strong>AI Mentor Profesional</strong> yang dilatih khusus data IDX. 
              Pahami Bandarmologi, Teknikal, dan Fundamental tanpa bahasa rumit.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto px-4 sm:px-0">
              <a 
                href={CHECKOUT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleTrackAddToCart}
                className="c-btn"
              >
                Ambil Promo Rp 99.000
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </div>

            <div className="mt-6 md:mt-4">
                <p className="text-xs text-slate-500 font-medium flex items-center justify-center">
                   <Zap className="w-4 h-4 text-yellow-500 mr-1.5 fill-yellow-500" />
                   Setelah daftar langsung bisa Belajar dan Akses Full fitur canggih
                </p>
            </div>

            {/* Trust Badges - Static Layout to prevent Layout Shift */}
            <div className="mt-12 md:mt-16 pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-left max-w-5xl mx-auto">
                <div className="flex items-center p-3 md:p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-default">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3 md:mr-4 shrink-0">
                        <Clock className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 text-sm md:text-base">30 Hari</p>
                        <p className="text-[10px] md:text-xs text-slate-500">Kurikulum Intensif</p>
                    </div>
                </div>
                <div className="flex items-center p-3 md:p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-default">
                    <div className="bg-indigo-100 p-2 rounded-lg mr-3 md:mr-4 shrink-0">
                        <BrainCircuit className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 text-sm md:text-base">IDX AI Mentor</p>
                        <p className="text-[10px] md:text-xs text-slate-500">Paham Istilah Lokal</p>
                    </div>
                </div>
                <div className="flex items-center p-3 md:p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-default">
                    <div className="bg-yellow-100 p-2 rounded-lg mr-3 md:mr-4 shrink-0">
                        <Trophy className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 text-sm md:text-base">Sertifikat</p>
                        <p className="text-[10px] md:text-xs text-slate-500">Kelulusan Resmi</p>
                    </div>
                </div>
                <div className="flex items-center p-3 md:p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-default">
                    <div className="bg-green-100 p-2 rounded-lg mr-3 md:mr-4 shrink-0">
                        <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 text-sm md:text-base">Sekali Bayar</p>
                        <p className="text-[10px] md:text-xs text-slate-500">Tanpa Langganan</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* LAZY LOADED SECTIONS - Rendered on Scroll with MinHeight to prevent layout shift */}
      
      {/* AI Technology Section */}
      <LazySection id="ai-tech" className="bg-slate-900" minHeight="min-h-[600px]">
            <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
                {/* Background Patterns Optimized */}
                <div className="absolute inset-0 bg-slate-900"></div>
                
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-6 border border-blue-500/30">
                                <Sparkles className="w-3 h-3 mr-2" />
                                Teknologi Generasi Baru
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                                Bukan Chatbot Biasa. <br/>
                                Ini <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Coach SahamPro.</span>
                            </h2>
                            <p className="text-slate-400 text-base md:text-lg mb-8 leading-relaxed">
                                Kebanyakan AI dilatih dengan data umum. AI kami dilatih khusus dengan data <strong>Pasar Modal Indonesia (IDX)</strong>.
                                Dia mengerti apa itu "Gorengan", "Bandar", "Repo", "Haka", hingga "ARB".
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="bg-blue-600/20 p-3 rounded-xl mr-4 border border-blue-500/30 shrink-0">
                                        <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-bold mb-1">Diskusi Per Materi</h3>
                                        <p className="text-slate-400 text-sm">Setiap pelajaran ada tombol diskusi. Bingung tentang Candlestick? Tanya langsung di situ.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-indigo-600/20 p-3 rounded-xl mr-4 border border-indigo-500/30 shrink-0">
                                        <Activity className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-bold mb-1">Analisa Real-Time</h3>
                                        <p className="text-slate-400 text-sm">Minta AI menganalisa BBCA, TLKM, atau GOTO. Insight berdasarkan data fundamental dan teknikal.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-emerald-600/20 p-3 rounded-xl mr-4 border border-emerald-500/30 shrink-0">
                                        <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-bold mb-1">Filter Anti-Pompom</h3>
                                        <p className="text-slate-400 text-sm">AI kami objektif. Tidak akan menyuruh Anda beli saham gorengan yang sedang didistribusi bandar.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* AI Chat Visualization */}
                        <div className="relative mt-8 md:mt-0">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-2xl opacity-30 transform rotate-3 transform-gpu"></div>
                            <div className="bg-slate-800 border border-slate-700 rounded-3xl p-4 md:p-6 shadow-2xl relative">
                                {/* Fake Chat Interface */}
                                <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shrink-0">
                                            <BrainCircuit className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm">Coach SahamPro (AI)</p>
                                            <p className="text-xs text-green-400 flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span> Online</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 font-sans text-xs md:text-sm">
                                    <div className="flex justify-end">
                                        <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-lg">
                                            <p>Coach, saham ANTM lagi rame. Katanya mau digoreng bandar ZP. Boleh HAKA gak?</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-slate-700 text-slate-200 p-4 rounded-2xl rounded-tl-none max-w-[95%] shadow-lg border border-slate-600">
                                            <p className="mb-2 font-bold text-blue-300">⚠️ Hati-hati FOMO!</p>
                                            <ul className="list-disc list-inside space-y-1 mb-2 text-slate-300">
                                                <li>Secara Teknikal, ANTM sedang di area <strong>Resistance Kuat 2200</strong>.</li>
                                                <li>Broker Summary menunjukkan ZP memang beli, tapi <strong>YP (Ritel)</strong> juga banyak masuk di pucuk.</li>
                                            </ul>
                                            <p>Saran saya: <strong>Jangan HAKA sekarang</strong>.</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-lg animate-pulse">
                                            <p>Wah makasih Coach! Hampir aja boncos.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute -bottom-4 md:-bottom-6 -left-2 md:-left-6 bg-white text-slate-900 px-3 py-1.5 md:px-4 md:py-2 rounded-xl shadow-xl border border-slate-200 flex items-center transform -rotate-3 z-20">
                                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-2" />
                                    <span className="font-bold text-[10px] md:text-xs">Diskusi 24 Jam</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
      </LazySection>

      {/* Target Audience Section */}
      <LazySection className="bg-slate-50" minHeight="min-h-[400px]">
            <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-4">Kelas Ini Didesain Khusus Untuk...</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">Kami menyederhanakan bahasa Wall Street menjadi bahasa tongkrongan agar mudah dipahami siapa saja.</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: Briefcase, title: "Karyawan", desc: "Sibuk kerja tapi pengen uangnya berkembang." },
                            { icon: Baby, title: "Ibu Rumah Tangga", desc: "Ingin bantu ekonomi keluarga dari rumah." },
                            { icon: GraduationCap, title: "Mahasiswa", desc: "Mulai investasi dini dengan modal kecil." },
                            { icon: TrendingUp, title: "Pebisnis", desc: "Putar uang kas nganggur biar jadi aset." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all text-center group cursor-default">
                                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                                    <item.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                                <p className="text-xs text-slate-500 leading-snug">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
      </LazySection>
      
      {/* Comparison Section */}
      <LazySection id="perbandingan" className="bg-white" minHeight="min-h-[600px]">
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Cara Lama vs Cara SahamMaster</h2>
                        <p className="text-slate-500 text-base md:text-lg">Kenapa 90% Trader Pemula Gagal? Karena metode belajar yang salah.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 relative">
                        {/* Connector Icon */}
                        <div className="hidden md:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full items-center justify-center shadow-xl z-20 border-4 border-slate-50 text-slate-300 font-black text-xl">
                            VS
                        </div>

                        {/* Otodidak */}
                        <div className="bg-slate-50 p-6 md:p-12 rounded-3xl md:rounded-r-none border border-slate-200">
                            <h3 className="text-xl md:text-2xl font-bold text-slate-400 mb-8 flex items-center">
                                <XCircle className="w-6 h-6 md:w-8 md:h-8 mr-3 text-red-400" />
                                Belajar Otodidak
                            </h3>
                            <ul className="space-y-6">
                                <li className="flex items-start text-slate-500 text-sm md:text-base">
                                    <XCircle className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="text-slate-700 block">Informasi Teracak</strong>
                                        Video Youtube acak-acakan, tidak ada struktur.
                                    </div>
                                </li>
                                <li className="flex items-start text-slate-500 text-sm md:text-base">
                                    <XCircle className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="text-slate-700 block">Sendirian & Bingung</strong>
                                        Tidak ada tempat bertanya yang valid saat rugi.
                                    </div>
                                </li>
                                <li className="flex items-start text-slate-500 text-sm md:text-base">
                                    <XCircle className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="text-slate-700 block">Jebakan Pom-Pom</strong>
                                        Korban cuci piring bandar di grup gratisan.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* SahamMaster */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 md:p-12 rounded-3xl md:rounded-l-none text-white shadow-2xl md:scale-[1.02] z-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                            <div className="absolute top-0 right-0 bg-yellow-400 text-blue-900 text-[10px] md:text-xs font-bold px-4 py-1.5 rounded-bl-xl">RECOMMENDED</div>
                            
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-8 flex items-center">
                                <CheckCircle className="w-6 h-6 md:w-8 md:h-8 mr-3 text-green-300" />
                                Metode SahamMaster
                            </h3>
                            <ul className="space-y-6">
                                <li className="flex items-start text-sm md:text-base">
                                    <div className="bg-white/20 p-1 rounded-full mr-3 mt-0.5 shrink-0">
                                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white" />
                                    </div>
                                    <div>
                                        <strong className="text-white block text-base md:text-lg">Kurikulum 30 Hari</strong>
                                        Step-by-step dari Nol sampai Mahir.
                                    </div>
                                </li>
                                <li className="flex items-start text-sm md:text-base">
                                    <div className="bg-white/20 p-1 rounded-full mr-3 mt-0.5 shrink-0">
                                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white" />
                                    </div>
                                    <div>
                                        <strong className="text-white block text-base md:text-lg">Mentor AI Pribadi 24/7</strong>
                                        Diskusi materi kapanpun sampai paham.
                                    </div>
                                </li>
                                <li className="flex items-start text-sm md:text-base">
                                    <div className="bg-white/20 p-1 rounded-full mr-3 mt-0.5 shrink-0">
                                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white" />
                                    </div>
                                    <div>
                                        <strong className="text-white block text-base md:text-lg">Objektif & Data-Driven</strong>
                                        Belajar analisa mandiri, bukan bergantung sinyal.
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
      </LazySection>

      {/* Curriculum Breakdown */}
      <LazySection id="kurikulum" className="bg-slate-50" minHeight="min-h-[800px]">
            <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200 scroll-mt-20">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-10 md:mb-12">
                        <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-2 block">Peta Jalan Anda</span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Kurikulum 30 Hari</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">Kami tidak menjual "mimpi kaya cepat". Kami menjual skill bertahan hidup dan berkembang di pasar modal yang kejam.</p>
                    </div>

                    {/* Week Tabs - Scrollable on mobile */}
                    <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 mb-8 overflow-x-auto pb-4 md:pb-0 px-2 scrollbar-hide">
                        {[1, 2, 3, 4].map((week) => (
                            <button
                                key={week}
                                onClick={() => setActiveWeek(week)}
                                className={`flex-none px-5 py-2.5 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-bold transition-all transform whitespace-nowrap ${
                                    activeWeek === week 
                                    ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-100' 
                                    : 'bg-white text-slate-500 border border-slate-200 hover:border-blue-300 hover:text-blue-600'
                                }`}
                            >
                                {week === 1 && "Minggu 1: Mindset & Fondasi"}
                                {week === 2 && "Minggu 2: Teknikal & Charting"}
                                {week === 3 && "Minggu 3: Bandarmologi"}
                                {week === 4 && "Minggu 4: Advanced & Career"}
                            </button>
                        ))}
                    </div>

                    {/* Lesson List */}
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {getWeekData(activeWeek).map((lesson) => (
                            <div key={lesson.day} className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex items-start md:items-center gap-4 md:gap-6">
                                    <div className={`
                                        w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-base md:text-xl border
                                        ${activeWeek === 1 ? 'bg-blue-50 text-blue-600 border-blue-100' : ''}
                                        ${activeWeek === 2 ? 'bg-purple-50 text-purple-600 border-purple-100' : ''}
                                        ${activeWeek === 3 ? 'bg-orange-50 text-orange-600 border-orange-100' : ''}
                                        ${activeWeek === 4 ? 'bg-green-50 text-green-600 border-green-100' : ''}
                                    `}>
                                        {lesson.day}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-base md:text-xl text-slate-900 group-hover:text-blue-700 transition-colors mb-1 md:mb-2">
                                            {lesson.title}
                                        </h3>
                                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none">
                                            {lesson.description}
                                        </p>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            <Lock className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center mt-10">
                        {activeWeek < 4 ? (
                            <button 
                                onClick={() => setActiveWeek(prev => prev + 1)}
                                className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors text-sm md:text-base bg-transparent border-none cursor-pointer"
                            >
                                Lihat materi minggu ke {activeWeek + 1} <ArrowRight className="w-4 h-4 ml-2" />
                            </button>
                        ) : (
                            <button 
                                onClick={() => scrollToSection('harga')}
                                className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors text-sm md:text-base"
                            >
                                Daftar Sekarang Untuk Akses Penuh <ArrowRight className="w-4 h-4 ml-2" />
                            </button>
                        )}
                    </div>
                </div>
            </section>
      </LazySection>

      {/* BONUS SECTION */}
      <LazySection id="bonus" className="bg-slate-900" minHeight="min-h-[500px]">
            <section className="py-16 md:py-24 bg-slate-900 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-12 md:mb-16">
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-yellow-400/10 text-yellow-400 text-[10px] md:text-xs font-bold mb-6 border border-yellow-400/20 uppercase tracking-widest animate-pulse shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                            <Gift className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                            Limited Time Bonus
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 md:mb-6">
                            Bukan Cuma Materi Daging. <br/>
                            Dapatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">Fitur Super Canggih</span> Sebagai Senjata Lengkap.
                        </h2>
                        <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
                            Kami berikan tools & akses eksklusif senilai <strong>Rp 2.500.000+</strong> secara GRATIS.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {/* Bonus 1 */}
                        <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700 p-6 rounded-2xl group hover:bg-slate-800 transition-all hover:border-blue-500/50 hover:shadow-lg">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                                <BrainCircuit className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg md:text-xl font-bold text-white mb-2">AI Mentor SahamPro</h3>
                                <p className="text-slate-400 text-xs md:text-sm">Asisten pribadi 24/7. Tanya analisa saham kapanpun.</p>
                            </div>
                            <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
                                <span className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-wider">Value</span>
                                <span className="text-xs md:text-sm font-bold text-slate-300 line-through decoration-red-500">Rp 750.000</span>
                            </div>
                        </div>

                        {/* Bonus 2 */}
                        <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700 p-6 rounded-2xl group hover:bg-slate-800 transition-all hover:border-indigo-500/50 hover:shadow-lg">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                                <Calculator className="w-6 h-6 md:w-8 md:h-8 text-indigo-400" />
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Trading Tools Pro</h3>
                                <p className="text-slate-400 text-xs md:text-sm">Akses Kalkulator Fee, Simulasi Compounding, dan Jurnal Trading.</p>
                            </div>
                            <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
                                <span className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-wider">Value</span>
                                <span className="text-xs md:text-sm font-bold text-slate-300 line-through decoration-red-500">Rp 500.000</span>
                            </div>
                        </div>

                        {/* Bonus 3 */}
                        <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700 p-6 rounded-2xl group hover:bg-slate-800 transition-all hover:border-emerald-500/50 hover:shadow-lg">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                                <FileText className="w-6 h-6 md:w-8 md:h-8 text-emerald-400" />
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Kamus & Cheat Sheet</h3>
                                <p className="text-slate-400 text-xs md:text-sm">Bank istilah saham lengkap & contekan pola candlestick.</p>
                            </div>
                            <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
                                <span className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-wider">Value</span>
                                <span className="text-xs md:text-sm font-bold text-slate-300 line-through decoration-red-500">Rp 250.000</span>
                            </div>
                        </div>

                        {/* Bonus 4 */}
                        <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700 p-6 rounded-2xl group hover:bg-slate-800 transition-all hover:border-yellow-500/50 hover:shadow-lg">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                                <Trophy className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Sertifikat Resmi</h3>
                                <p className="text-slate-400 text-xs md:text-sm">Bukti kelulusan ujian kompetensi trading.</p>
                            </div>
                            <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
                                <span className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-wider">Value</span>
                                <span className="text-xs md:text-sm font-bold text-slate-300 line-through decoration-red-500">Rp 500.000</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <div className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                            <p className="text-slate-300 text-xs md:text-sm font-medium">
                                <span className="text-green-400 font-bold">Total Bonus Value: Rp 2.000.000</span> (Gratis untuk 50 pendaftar hari ini)
                            </p>
                        </div>
                    </div>
                </div>
            </section>
      </LazySection>

      {/* Pricing Section */}
      <LazySection id="harga" className="bg-white" minHeight="min-h-[600px]">
            <section className="py-16 md:py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] md:w-[1000px] h-[500px] bg-blue-50 rounded-[100%] blur-[100px] -z-10 opacity-60"></div>

                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Investasi Leher ke Atas</h2>
                        <p className="text-slate-500 text-base md:text-lg">Berapa harga yang pantas untuk skill yang bisa menghasilkan uang seumur hidup?</p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 ring-4 ring-slate-50/50">
                        <div className="bg-slate-900 p-3 md:p-4 text-center">
                            <p className="text-yellow-400 font-bold tracking-widest text-[10px] md:text-sm uppercase flex items-center justify-center animate-pulse">
                                <Zap className="w-3 h-3 md:w-4 md:h-4 mr-2" /> Penawaran Berakhir Dalam: {timeLeft.minutes < 10 ? '0'+timeLeft.minutes : timeLeft.minutes}:{timeLeft.seconds < 10 ? '0'+timeLeft.seconds : timeLeft.seconds}
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Value Stack */}
                            <div className="p-6 md:p-12 border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50">
                                <h3 className="text-sm md:text-lg font-bold text-slate-400 uppercase mb-4 md:mb-6 tracking-wide">Apa yang Anda Dapat:</h3>
                                <ul className="space-y-4 md:space-y-5">
                                    <li className="flex justify-between items-center text-slate-700 text-sm md:text-base">
                                        <span className="flex items-center font-medium"><BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-3 text-blue-500 shrink-0" /> Modul Trading 30 Hari</span>
                                        <span className="font-bold text-slate-300 line-through decoration-slate-400 text-xs md:text-base">Rp 1.500.000</span>
                                    </li>
                                    <li className="flex justify-between items-center text-slate-700 text-sm md:text-base">
                                        <span className="flex items-center font-medium"><MessageSquare className="w-4 h-4 md:w-5 md:h-5 mr-3 text-blue-500 shrink-0" /> Akses AI Mentor IDX</span>
                                        <span className="font-bold text-slate-300 line-through decoration-slate-400 text-xs md:text-base">Rp 750.000</span>
                                    </li>
                                    <li className="flex justify-between items-center text-slate-700 text-sm md:text-base">
                                        <span className="flex items-center font-medium"><Zap className="w-4 h-4 md:w-5 md:h-5 mr-3 text-blue-500 shrink-0" /> Tools Pro</span>
                                        <span className="font-bold text-slate-300 line-through decoration-slate-400 text-xs md:text-base">Rp 500.000</span>
                                    </li>
                                    <li className="flex justify-between items-center text-slate-700 text-sm md:text-base">
                                        <span className="flex items-center font-medium"><Trophy className="w-4 h-4 md:w-5 md:h-5 mr-3 text-blue-500 shrink-0" /> Ujian & Sertifikat</span>
                                        <span className="font-bold text-slate-300 line-through decoration-slate-400 text-xs md:text-base">Rp 500.000</span>
                                    </li>
                                </ul>
                                <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
                                    <span className="font-bold text-slate-500 text-sm md:text-base">Total Nilai Asli</span>
                                    <span className="font-black text-xl md:text-2xl text-slate-400 line-through decoration-red-500 decoration-2">Rp 3.250.000</span>
                                </div>
                            </div>

                            {/* Final Price */}
                            <div className="p-8 md:p-12 flex flex-col justify-center items-center bg-white relative">
                                <div className="absolute top-0 right-0 p-4">
                                    <div className="bg-red-100 text-red-600 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase">Hemat 97%</div>
                                </div>
                                <p className="text-slate-500 font-medium mb-2 uppercase tracking-wide text-[10px] md:text-xs">Harga Promo Spesial</p>
                                <h3 className="text-4xl md:text-6xl font-black text-blue-600 mb-2">Rp 99.000</h3>
                                <p className="text-xs md:text-sm text-slate-400 mb-6 md:mb-8 font-medium">Sekali bayar. Akses selamanya.</p>
                                
                                <a 
                                    href={CHECKOUT_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={handleTrackAddToCart}
                                    className="w-full text-center px-8 py-4 md:py-5 text-lg font-bold text-white bg-green-500 rounded-2xl hover:bg-green-600 transition-all shadow-xl hover:shadow-2xl hover:shadow-green-500/20 transform hover:-translate-y-1 animate-pulse"
                                >
                                    Ambil Akses Sekarang
                                </a>
                                
                                <div className="mt-6 flex items-center justify-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                                    <ShieldCheck className="w-5 h-5 text-green-600" />
                                    <p className="text-[10px] md:text-xs text-slate-500 font-bold">
                                        30-Hari Garansi Uang Kembali
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-center mt-8 text-slate-500 italic text-xs md:text-sm px-4">
                        "Harga 99rb lebih murah dari sekali traktir makan teman, atau sekali Cutloss di saham gorengan."
                    </p>
                </div>
            </section>
      </LazySection>

      {/* FAQ Section */}
      <LazySection className="bg-slate-50" minHeight="min-h-[400px]">
            <section className="py-16 md:py-20 bg-slate-50 border-t border-slate-200">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-slate-900">Pertanyaan Sering Diajukan</h2>
                    <div className="space-y-4">
                        {[
                            { q: "Apakah cocok untuk pemula yang nol putul?", a: "Sangat cocok. Materi didesain khusus dari dasar (Mindset) hingga Advanced. Bahasa yang digunakan juga bahasa manusia, bukan bahasa robot." },
                            { q: "Seberapa pintar AI-nya? Apakah bisa dipercaya?", a: "AI kami (Coach SahamPro) dilatih spesifik dengan data pasar modal Indonesia. Dia mengerti konteks lokal seperti 'Bandar', 'Right Issue', 'Waran', dll. Jauh lebih relevan dibanding ChatGPT biasa." },
                            { q: "Apakah perlu modal besar untuk praktek?", a: "Tidak. Di materi hari pertama diajarkan cara mulai dengan modal Rp 100.000 saja (1 Lot saham murah)." },
                            { q: "Apakah ada grup sinyal/rekomendasi saham?", a: "TIDAK ADA. Kami mendidik Anda jadi 'Nelayan' yang bisa cari ikan sendiri. Memberi ikan (sinyal) itu menyesatkan, memberi kail (ilmu) itu menghidupkan." },
                            { q: "Berapa lama akses materinya?", a: "Akses SEUMUR HIDUP (Lifetime). Anda bisa mengulang materi kapan saja." },
                        ].map((item, idx) => (
                            <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                                <button 
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full flex justify-between items-center p-4 md:p-5 text-left bg-white hover:bg-slate-50 transition-colors"
                                >
                                    <span className="font-bold text-slate-800 text-sm md:text-base">{item.q}</span>
                                    {openFaq === idx ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                                </button>
                                {openFaq === idx && (
                                    <div className="p-4 md:p-5 pt-0 bg-white text-slate-600 leading-relaxed border-t border-slate-100 text-sm md:text-base">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
      </LazySection>

      {/* Final CTA */}
      <LazySection className="bg-slate-900" minHeight="min-h-[300px]">
            <section className="py-16 md:py-20 bg-slate-900 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/10 blur-3xl"></div>
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 leading-tight">Waktu Terbaik Mulai Investasi <br/>Adalah Kemarin.</h2>
                    <p className="text-base md:text-xl text-slate-400 mb-8 md:mb-10 max-w-2xl mx-auto">Waktu terbaik kedua adalah SEKARANG. Jangan biarkan inflasi memakan tabungan Anda.</p>
                    <a 
                        href={CHECKOUT_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleTrackAddToCart}
                        className="inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 text-lg font-bold text-blue-900 bg-white rounded-2xl hover:bg-blue-50 transition-all shadow-2xl hover:shadow-white/20 transform hover:-translate-y-1 w-full md:w-auto"
                    >
                        Gabung Kelas SahamMaster
                        <ArrowRight className="w-6 h-6 ml-2" />
                    </a>
                </div>
            </section>
      </LazySection>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center space-x-2">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xs">SM</div>
                <div>
                    <span className="font-bold text-xl text-slate-900 block leading-none">SahamMaster</span>
                    <p className="text-xs text-slate-400">Platform Edukasi Saham #1 Indonesia</p>
                </div>
            </div>
            <div className="text-sm text-slate-400">
                &copy; {new Date().getFullYear()} SahamMaster ID. All rights reserved.
            </div>
        </div>
      </footer>

      {/* Sticky Bottom CTA (Mobile Only) */}
      <div 
        className={`fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 md:hidden transition-transform duration-300 ${
            showStickyCTA ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between">
            <div>
                <p className="text-[10px] text-slate-500 line-through">Rp 3.250.000</p>
                <p className="text-lg font-black text-blue-600 leading-none">Rp 99.000</p>
            </div>
            <a 
                href={CHECKOUT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleTrackAddToCart}
                className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg text-sm flex items-center"
            >
                Ambil Promo <ArrowRight className="w-4 h-4 ml-1" />
            </a>
        </div>
      </div>

      {/* Social Proof Notification Pop-up */}
      <div 
        className={`fixed bottom-20 left-4 z-50 transition-all duration-500 transform md:bottom-4 ${
          socialProof.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white/90 backdrop-blur-md border border-slate-100 p-3 rounded-2xl shadow-xl flex items-center max-w-[280px] md:max-w-xs animate-in slide-in-from-bottom-2 fade-in">
           <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 shrink-0 relative">
              <ShoppingBag className="w-5 h-5 text-green-600" />
              <div className="absolute -top-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white animate-pulse"></div>
           </div>
           <div>
              <p className="text-xs text-slate-500 font-medium mb-0.5">{socialProof.name}</p>
              <p className="text-xs font-bold text-slate-800 flex items-center">
                 <span className="text-green-600 mr-1">Baru saja bergabung</span>
                 <span className="text-[9px] text-slate-400 font-normal ml-1">• {socialProof.time}</span>
              </p>
           </div>
        </div>
      </div>

      {/* Floating Sparkle Icon */}
      <div className="fixed bottom-0 right-0 pointer-events-none p-4 md:p-10 z-0 opacity-20">
         <Zap size={200} className="text-yellow-400 rotate-12 hidden md:block" />
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
