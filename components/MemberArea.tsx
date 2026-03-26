
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  Settings, 
  Menu, 
  X,
  TrendingUp,
  Award,
  ChevronRight,
  Lock,
  Home,
  Zap,
  GraduationCap,
  Trophy,
  Download,
  Smartphone,
  Edit3,
  ShoppingBag,
  User as UserIcon
} from 'lucide-react';
import { CURRICULUM, CATEGORY_COLORS } from '../constants';
import { Lesson, ViewState, UserProgress } from '../types';
import LessonView from './LessonView';
import AiMentor from './AiMentor';
import Tools from './Tools';
import ExamView from './ExamView';
import Leaderboard from './Leaderboard';
import ProductRecommendations from './ProductRecommendations';
import Profile from './Profile';
import Onboarding from './Onboarding';

// This component contains all the logic previously in App.tsx
const MemberArea: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  
  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);
  
  // Edit Name State (Inline Dashboard)
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');

  // Onboarding State
  const [showOnboarding, setShowOnboarding] = useState(false);

  // State progress user dengan Initial Value yang Aman
  const [progress, setProgress] = useState<UserProgress>({
    completedDays: [],
    currentDay: 1,
    streak: 0,
    examScore: 0,
    passedExam: false,
    username: '' // Default kosong untuk trigger onboarding
  });

  // Load progress dengan Validasi Anti-Crash
  useEffect(() => {
    try {
        const saved = localStorage.getItem('sahamMasterProgress');
        if (saved) {
            const parsed = JSON.parse(saved);
            
            // Validasi Data (Sanitization) - Mencegah crash jika data korup/versi lama
            const sanitizedProgress: UserProgress = {
                completedDays: Array.isArray(parsed.completedDays) ? parsed.completedDays : [],
                currentDay: typeof parsed.currentDay === 'number' ? parsed.currentDay : 1,
                streak: typeof parsed.streak === 'number' ? parsed.streak : 0,
                examScore: typeof parsed.examScore === 'number' ? parsed.examScore : 0,
                passedExam: !!parsed.passedExam,
                username: parsed.username || '', // Biarkan string kosong jika belum ada
                examDate: parsed.examDate || undefined
            };

            setProgress(sanitizedProgress);

            // LOGIC ONBOARDING: Jika username kosong atau masih default 'Trader' (dari versi lama), paksa onboarding
            if (!sanitizedProgress.username || sanitizedProgress.username === 'Trader') {
                setShowOnboarding(true);
            }
        } else {
            // Pengguna baru sama sekali
            setShowOnboarding(true);
        }
    } catch (error) {
        console.error("Gagal memuat progress, menggunakan default:", error);
        setShowOnboarding(true); // Safety net
    }

    // PWA: Listen for install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    setDeferredPrompt(null);
    setShowInstallBtn(false);
  };

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('sahamMasterProgress', JSON.stringify(newProgress));
  };

  const handleOnboardingComplete = (name: string) => {
      const newProgress = { ...progress, username: name };
      saveProgress(newProgress);
      setShowOnboarding(false);
  };

  const handleLessonComplete = (day: number) => {
    const currentCompleted = progress.completedDays || [];
    if (!currentCompleted.includes(day)) {
      const newCompleted = [...currentCompleted, day];
      const nextDay = Math.max(progress.currentDay || 1, day + 1);
      saveProgress({
        ...progress,
        completedDays: newCompleted,
        currentDay: nextDay
      });
    }
    setView('curriculum');
    setActiveLesson(null);
  };

  const handleExamFinish = (score: number) => {
    const passed = score >= 70;
    saveProgress({
        ...progress,
        examScore: Math.max(progress.examScore || 0, score),
        passedExam: progress.passedExam || passed,
        examDate: new Date().toISOString()
    });
  };

  const updateUsername = (newName?: string) => {
      const finalName = (newName || tempName).trim();
      if (finalName) {
        saveProgress({ ...progress, username: finalName });
      }
      setIsEditingName(false);
  };

  const handleResetData = () => {
      localStorage.removeItem('sahamMasterProgress');
      localStorage.removeItem('sahamMasterJournal');
      localStorage.removeItem('sahamMasterAiChat');
      window.location.reload();
  };

  const openLesson = (lesson: Lesson) => {
    const safeCompleted = progress.completedDays || [];
    const safeCurrentDay = progress.currentDay || 1;

    // Logic locked handled in UI rendering
    if (lesson.day > safeCurrentDay && !safeCompleted.includes(lesson.day)) {
      return; 
    }
    setActiveLesson({...lesson, isCompleted: safeCompleted.includes(lesson.day)});
    setView('lesson');
    window.scrollTo(0,0);
  };

  // Definisi Menu Navigasi agar DRY (Don't Repeat Yourself)
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'curriculum', label: 'Belajar', icon: BookOpen },
    { id: 'exam', label: 'Ujian', icon: GraduationCap },
    { id: 'leaderboard', label: 'Rank', icon: Trophy },
    { id: 'mentor', label: 'Mentor AI', icon: MessageSquare },
    { id: 'tools', label: 'Tools', icon: Settings },
    { id: 'products', label: 'Produk Lain', icon: ShoppingBag },
    { id: 'profile', label: 'Profil', icon: UserIcon },
  ];

  const renderContent = () => {
    // Safety check untuk view
    try {
        if (view === 'lesson' && activeLesson) {
        return (
            <LessonView 
            lesson={activeLesson} 
            onBack={() => setView('curriculum')} 
            onComplete={handleLessonComplete}
            userName={progress.username || 'Member'}
            />
        );
        }

        if (view === 'mentor') return <AiMentor />;
        if (view === 'tools') return <Tools />;
        if (view === 'leaderboard') return <Leaderboard />;
        if (view === 'products') return <ProductRecommendations />;
        if (view === 'profile') return (
            <Profile 
                progress={progress} 
                onUpdateProfile={updateUsername} 
                onResetProgress={handleResetData} 
            />
        );
        
        if (view === 'exam') {
            return <ExamView onBack={() => setView('dashboard')} onFinish={handleExamFinish} userName={progress.username || 'Trader'} />;
        }

        if (view === 'curriculum') {
            const safeCompleted = progress.completedDays || [];
            const safeCurrentDay = progress.currentDay || 1;

            return (
                <div className="max-w-5xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
                    <div>
                    <h2 className="text-2xl font-bold text-slate-900">Kurikulum 30 Hari</h2>
                    <p className="text-slate-500 text-sm">Selesaikan satu per satu untuk membuka materi berikutnya.</p>
                    </div>
                    <div className="self-start md:self-auto text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full shadow-sm">
                    Progress: {safeCompleted.length} / 30 Selesai
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20 md:pb-0">
                    {CURRICULUM.map((lesson) => {
                    const isLocked = lesson.day > safeCurrentDay && !safeCompleted.includes(lesson.day);
                    const isCompleted = safeCompleted.includes(lesson.day);
                    const isCurrent = lesson.day === safeCurrentDay;

                    return (
                        <div 
                        key={lesson.day}
                        onClick={() => !isLocked && openLesson(lesson)}
                        className={`
                            relative p-5 rounded-2xl border transition-all duration-200 group flex flex-col
                            ${isLocked 
                            ? 'bg-slate-50 border-slate-200 cursor-not-allowed opacity-60 grayscale-[0.5]' 
                            : 'bg-white border-slate-200 hover:shadow-xl cursor-pointer hover:border-blue-300 hover:-translate-y-1 shadow-sm'
                            }
                            ${isCurrent ? 'ring-2 ring-blue-500 ring-offset-2 border-blue-200 shadow-lg shadow-blue-100 scale-[1.01]' : ''}
                        `}
                        >
                        <div className="flex justify-between items-start mb-3">
                            <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-lg ${CATEGORY_COLORS[lesson.category] || 'bg-gray-100'}`}>
                            {lesson.category}
                            </span>
                            {isCompleted ? (
                            <div className="bg-green-100 p-1 rounded-full">
                                <Award className="w-4 h-4 text-green-600" />
                            </div>
                            ) : isLocked ? (
                            <Lock className="w-4 h-4 text-slate-400" />
                            ) : (
                            <span className="animate-pulse flex items-center text-[10px] font-bold text-white bg-red-500 px-2 py-0.5 rounded-full shadow-sm">
                                <Zap className="w-3 h-3 mr-1 fill-white" /> NEXT
                            </span>
                            )}
                        </div>
                        <h3 className="font-bold text-slate-800 mb-2 leading-snug text-lg">Hari {lesson.day}: {lesson.title}</h3>
                        
                        <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-grow">{lesson.description}</p>
                        
                        {!isLocked && (
                            <div className="pt-4 border-t border-slate-50 flex items-center text-blue-600 text-sm font-bold opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity mt-auto">
                            Mulai Belajar <ChevronRight className="w-4 h-4 ml-1" />
                            </div>
                        )}
                        </div>
                    );
                    })}
                </div>
                </div>
            );
        }

        // Default: Dashboard
        const safeCompleted = progress.completedDays || [];
        const safeCurrentDay = progress.currentDay || 1;
        
        const completedPercent = Math.round((safeCompleted.length / 30) * 100);
        const nextLesson = CURRICULUM.find(l => l.day === safeCurrentDay) || CURRICULUM[CURRICULUM.length -1];

        return (
        <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-20 md:pb-0">
            
            {/* PWA INSTALL BANNER (Mobile Dashboard Only) */}
            {showInstallBtn && (
                <div className="md:hidden bg-gradient-to-r from-slate-900 to-blue-900 p-4 rounded-2xl shadow-lg flex items-center justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-white font-bold text-sm">Install Aplikasi</h3>
                        <p className="text-blue-200 text-xs">Akses materi lebih cepat tanpa browser.</p>
                    </div>
                    <button 
                        onClick={handleInstallClick}
                        className="relative z-10 bg-white text-blue-900 px-4 py-2 rounded-lg text-xs font-bold shadow-md hover:bg-blue-50 active:scale-95 transition-transform flex items-center"
                    >
                        <Download className="w-3 h-3 mr-1.5" /> Install
                    </button>
                    <Smartphone className="absolute -right-2 -bottom-4 w-20 h-20 text-white opacity-10 rotate-12" />
                </div>
            )}

            {/* Welcome Banner */}
            <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-3xl p-6 md:p-8 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex items-center mb-3">
                    <h1 className="text-2xl md:text-4xl font-black tracking-tight flex items-center flex-wrap">
                        Halo, 
                        {isEditingName ? (
                            <input 
                                autoFocus
                                className="bg-white/10 border-b-2 border-white/50 text-white outline-none w-40 md:w-64 ml-2 px-1 rounded"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                onBlur={() => updateUsername()}
                                onKeyDown={(e) => e.key === 'Enter' && updateUsername()}
                            />
                        ) : (
                            <span 
                                onClick={() => {
                                    setTempName(progress.username || 'Trader');
                                    setIsEditingName(true);
                                }} 
                                className="cursor-pointer underline decoration-dotted hover:text-blue-100 ml-2 decoration-white/30 flex items-center group" 
                                title="Klik untuk ganti nama"
                            >
                                {progress.username || 'Trader'}
                                <Edit3 className="w-4 h-4 md:w-6 md:h-6 ml-2 opacity-30 group-hover:opacity-100 transition-opacity" />
                            </span>
                        )}
                        ! 🚀
                    </h1>
                </div>
                
                <p className="text-blue-100 max-w-xl mb-6 text-sm md:text-lg leading-relaxed opacity-90">
                Perjalanan 1.000 mil dimulai dari satu langkah. Fokus hari ini adalah: <br/>
                <span className="font-semibold text-yellow-300 block mt-1 text-lg">"{nextLesson?.title || 'Finish'}"</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                    onClick={() => openLesson(nextLesson)}
                    className="w-full md:w-auto group bg-white text-blue-700 font-bold px-6 py-3.5 rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center transform active:scale-95"
                    >
                    Lanjut Belajar <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-10 transform translate-x-1/4 translate-y-1/4 rotate-12">
                <TrendingUp size={240} />
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            </div>
            
            {/* Exam Card Promo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div onClick={() => setView('exam')} className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-2xl shadow-lg cursor-pointer hover:scale-[1.01] transition-transform relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex items-center mb-2">
                            <GraduationCap className="w-6 h-6 text-yellow-400 mr-2" />
                            <span className="text-yellow-400 font-bold uppercase tracking-wider text-xs">Final Exam</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">Ujian Kelulusan</h3>
                        <p className="text-slate-400 text-sm mb-4">Jawab 20 soal untuk mendapatkan sertifikat.</p>
                        <span className="text-white bg-white/20 px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-sm">
                            {progress.passedExam ? 'Lihat Hasil / Ujian Ulang' : 'Mulai Ujian Sekarang'}
                        </span>
                    </div>
                    <GraduationCap className="absolute -right-4 -bottom-4 w-32 h-32 text-white opacity-5 rotate-12 group-hover:opacity-10 transition-opacity" />
                </div>
                
                <div onClick={() => setView('leaderboard')} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 cursor-pointer hover:scale-[1.01] transition-transform relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex items-center mb-2">
                            <Trophy className="w-6 h-6 text-orange-500 mr-2" />
                            <span className="text-orange-500 font-bold uppercase tracking-wider text-xs">Leaderboard</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-1">Hall of Fame</h3>
                        <p className="text-slate-500 text-sm mb-4">Lihat peringkat lulusan terbaik.</p>
                    </div>
                    <Trophy className="absolute -right-4 -bottom-4 w-32 h-32 text-orange-500 opacity-5 -rotate-12 group-hover:opacity-10 transition-opacity" />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/40">
                <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                    <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-wider">Total Progress</p>
                    <h3 className="text-xl md:text-2xl font-black text-slate-800">{completedPercent}%</h3>
                </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-1000" style={{ width: `${completedPercent}%` }}></div>
                </div>
                <p className="text-[10px] md:text-xs text-slate-400 mt-2 text-right font-medium">Keep going!</p>
            </div>

            <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/40 flex items-center justify-between">
                <div>
                    <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">Modul Selesai</p>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-800">
                    {safeCompleted.length} <span className="text-sm md:text-lg text-slate-300 font-medium">/ 30</span>
                    </h3>
                </div>
                <div className="p-3 md:p-4 bg-orange-100 text-orange-600 rounded-full">
                    <BookOpen className="w-6 h-6 md:w-8 md:h-8" />
                </div>
            </div>

            <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/40 flex items-center justify-between">
                <div>
                    <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">Status Kelulusan</p>
                    {progress.passedExam ? (
                        <h3 className="text-xl md:text-2xl font-black text-green-600">LULUS 🎓</h3>
                    ) : (
                        <h3 className="text-xl md:text-2xl font-black text-slate-300">BELUM</h3>
                    )}
                </div>
                <div className={`p-3 md:p-4 rounded-full ${progress.passedExam ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                    <Award className="w-6 h-6 md:w-8 md:h-8" />
                </div>
            </div>
            </div>
        </div>
        );
    } catch (renderError) {
        console.error("Render error in MemberArea:", renderError);
        return <div className="p-10 text-center text-red-500">Terjadi kesalahan tampilan. Silakan refresh halaman.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 overflow-x-hidden w-full relative">
      
      {/* ONBOARDING MODAL */}
      {showOnboarding && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex fixed top-0 left-0 bottom-0 z-50 w-72 bg-white border-r border-slate-200 flex-col shadow-lg shadow-slate-200/50">
        <div className="p-8">
          <div className="flex items-center space-x-3 mb-12">
             <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">SM</div>
             <div>
               <h1 className="text-xl font-bold text-slate-900 leading-none">SahamMaster</h1>
               <span className="text-xs text-slate-400 font-medium tracking-widest">INDONESIA</span>
             </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = view === item.id;
              return (
                <button 
                  key={item.id}
                  onClick={() => setView(item.id as ViewState)}
                  className={`
                    w-full flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 font-medium relative
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700 shadow-sm translate-x-1' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  {item.label}
                  {/* Badge 'NEW' untuk menu Produk Lain */}
                  {item.id === 'products' && (
                    <span className="absolute right-3 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-pulse shadow-sm">
                        BARU
                    </span>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Install App Button (Desktop) */}
          {showInstallBtn && (
            <div className="mt-6 px-4 py-4 bg-slate-900 rounded-2xl text-white relative overflow-hidden group">
                <div className="relative z-10">
                    <h3 className="font-bold text-sm mb-1">Download Aplikasi</h3>
                    <p className="text-[10px] text-slate-400 mb-3">Install di desktop untuk pengalaman lebih baik.</p>
                    <button 
                        onClick={handleInstallClick}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center"
                    >
                        <Download className="w-3 h-3 mr-2" /> Install Sekarang
                    </button>
                </div>
                <Smartphone className="absolute -right-2 -bottom-4 w-20 h-20 text-white opacity-10 rotate-12" />
            </div>
          )}
        </div>
        
        {/* Sidebar Footer */}
        <div className="mt-auto p-6 border-t border-slate-100">
           {progress.passedExam && (
               <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
                   <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                   <p className="text-xs font-bold text-green-800">Sertifikat Tersedia</p>
               </div>
           )}
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-blue-900/10 p-2 flex justify-between items-center overflow-x-auto">
          {navItems.map((item) => {
             const Icon = item.icon;
             const isActive = view === item.id;
             return (
               <button
                 key={item.id}
                 onClick={() => setView(item.id as ViewState)}
                 className={`
                   relative flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-300 min-w-[60px]
                   ${isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}
                 `}
               >
                 {/* Badge 'NEW' untuk Mobile - Red Dot */}
                 {item.id === 'products' && (
                    <span className="absolute top-1 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                 )}

                 {isActive && (
                   <span className="absolute inset-0 bg-blue-50 rounded-xl -z-10 scale-90 animate-in fade-in zoom-in duration-200"></span>
                 )}
                 <Icon className={`w-6 h-6 mb-1 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                 <span className="text-[9px] font-bold whitespace-nowrap">
                   {item.label}
                 </span>
               </button>
             )
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 min-h-screen max-w-[100vw] overflow-x-hidden box-border">
        {/* Mobile Header */}
        <header className="md:hidden bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 sticky top-0 z-40 flex items-center justify-between shadow-sm w-full">
             <div className="flex items-center">
               <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md mr-2.5">SM</div>
               <div>
                 <h1 className="font-bold text-slate-900 text-base tracking-tight leading-none">SahamMaster</h1>
                 <p className="text-[10px] text-slate-500 font-medium">Indonesia</p>
               </div>
             </div>
             <div 
                onClick={() => setView('profile')}
                className="w-8 h-8 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors"
             >
                <span className="text-xs font-bold text-slate-500">
                    {progress.username ? progress.username.charAt(0).toUpperCase() : 'T'}
                </span>
             </div>
        </header>

        {/* Content Padding */}
        <div className="p-4 md:p-10 pb-28 md:pb-10 max-w-7xl mx-auto w-full box-border">
          {renderContent()}
        </div>
      </main>

    </div>
  );
};

export default MemberArea;
