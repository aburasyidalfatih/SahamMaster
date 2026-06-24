import React, { useState } from 'react';
import { Edit3, ChevronRight, TrendingUp } from 'lucide-react';
import { UserProgress, Lesson } from '../../types';

interface WelcomeBannerProps {
  progress: UserProgress;
  nextLesson?: Lesson;
  onUpdateUsername: (name: string) => void;
  onStartLesson: (lesson: Lesson) => void;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ 
  progress, nextLesson, onUpdateUsername, onStartLesson 
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');

  const handleUpdate = () => {
    onUpdateUsername(tempName);
    setIsEditingName(false);
  };

  return (
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
                onBlur={handleUpdate}
                onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
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
          {nextLesson && (
            <button 
              onClick={() => onStartLesson(nextLesson)}
              className="w-full md:w-auto group bg-white text-blue-700 font-bold px-6 py-3.5 rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center transform active:scale-95"
            >
              Lanjut Belajar <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
      <div className="absolute -right-10 -bottom-10 opacity-10 transform translate-x-1/4 translate-y-1/4 rotate-12">
        <TrendingUp size={240} />
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
    </div>
  );
};

export default WelcomeBanner;
