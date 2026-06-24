import React, { useState } from 'react';
import { 
  BookOpen, 
  MessageSquare, 
  Settings, 
  Trophy,
  GraduationCap,
  ShoppingBag,
  User as UserIcon,
  Home,
  Lock,
  Zap,
  ChevronRight,
  Award
} from 'lucide-react';
import { CATEGORY_COLORS } from '../constants';
import { CURRICULUM } from '../data/curriculum';
import { Lesson, ViewState } from '../types';
import LessonView from './LessonView';
import AiMentor from './AiMentor';
import Tools from './Tools';
import ExamView from './ExamView';
import Leaderboard from './Leaderboard';
import ProductRecommendations from './ProductRecommendations';
import Profile from './Profile';
import Onboarding from './Onboarding';

// Extracted Components & Hooks
import { useUserProgress } from '../hooks/useUserProgress';
import Sidebar from './member/Sidebar';
import MobileNav from './member/MobileNav';
import DashboardStats from './member/DashboardStats';
import WelcomeBanner from './member/WelcomeBanner';

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

const MemberArea: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  
  const {
    progress,
    setProgress,
    showOnboarding,
    setShowOnboarding,
    showInstallBtn,
    handleInstallClick
  } = useUserProgress();

  const handleOnboardingComplete = (name: string) => {
      setProgress({ ...progress, username: name });
      setShowOnboarding(false);
  };

  const handleLessonComplete = (day: number) => {
    const currentCompleted = progress.completedDays || [];
    if (!currentCompleted.includes(day)) {
      const newCompleted = [...currentCompleted, day];
      const nextDay = Math.max(progress.currentDay || 1, day + 1);
      setProgress({
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
    setProgress({
        ...progress,
        examScore: Math.max(progress.examScore || 0, score),
        passedExam: progress.passedExam || passed,
        examDate: new Date().toISOString()
    });
  };

  const updateUsername = (newName: string) => {
      const finalName = newName.trim();
      if (finalName) {
        setProgress({ ...progress, username: finalName });
      }
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

    if (lesson.day > safeCurrentDay && !safeCompleted.includes(lesson.day)) {
      return; 
    }
    setActiveLesson({...lesson, isCompleted: safeCompleted.includes(lesson.day)});
    setView('lesson');
    window.scrollTo(0,0);
  };

  const renderContent = () => {
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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <img src="/logo.png" alt="SahamMaster" className="w-14 h-14 object-contain drop-shadow-md" />
                    <div className="flex flex-col justify-center pt-1">
                      <h1 className="text-xl font-black text-slate-900 leading-none mb-1">SahamMaster</h1>
                      <span className="text-[10px] text-blue-600 font-extrabold tracking-[0.15em] uppercase leading-none">Indonesia</span>
                    </div>
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
        const safeCurrentDay = progress.currentDay || 1;
        const nextLesson = CURRICULUM.find(l => l.day === safeCurrentDay) || CURRICULUM[CURRICULUM.length -1];

        return (
        <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-20 md:pb-0">
            <WelcomeBanner 
              progress={progress} 
              nextLesson={nextLesson} 
              onUpdateUsername={updateUsername} 
              onStartLesson={openLesson} 
            />
            
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

            <DashboardStats progress={progress} />
        </div>
        );
    } catch (renderError) {
        console.error("Render error in MemberArea:", renderError);
        return <div className="p-10 text-center text-red-500">Terjadi kesalahan tampilan. Silakan refresh halaman.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 overflow-x-hidden w-full relative">
      
      {showOnboarding && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}

      <Sidebar 
        view={view} 
        setView={setView} 
        navItems={navItems} 
        progress={progress} 
        showInstallBtn={showInstallBtn} 
        handleInstallClick={handleInstallClick} 
      />

      <MobileNav 
        view={view} 
        setView={setView} 
        navItems={navItems} 
      />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 min-h-screen max-w-[100vw] overflow-x-hidden box-border">
        {/* Mobile Header */}
        <header className="md:hidden bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 sticky top-0 z-40 flex items-center justify-between shadow-sm w-full">
             <div className="flex items-center space-x-2.5">
               <img src="/logo.png" alt="SahamMaster" className="w-11 h-11 object-contain drop-shadow-sm" />
               <div className="flex flex-col justify-center pt-0.5">
                 <h1 className="font-black text-slate-900 text-[17px] tracking-tight leading-none mb-1">SahamMaster</h1>
                 <p className="text-[9px] text-blue-600 font-extrabold tracking-[0.1em] uppercase leading-none">Indonesia</p>
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
