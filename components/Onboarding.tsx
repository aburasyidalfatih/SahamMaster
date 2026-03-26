
import React, { useState } from 'react';
import { User, ArrowRight, Sparkles } from 'lucide-react';

interface OnboardingProps {
  onComplete: (name: string) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    
    if (!cleanName) {
      setError('Nama panggilan wajib diisi ya!');
      return;
    }
    
    if (cleanName.length < 3) {
      setError('Nama terlalu pendek, minimal 3 huruf.');
      return;
    }

    onComplete(cleanName);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-slate-900 flex items-center justify-center p-4">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[80px]"></div>
      </div>

      <div className="relative bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3">
                <User className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 mb-2">Selamat Datang! <span className="inline-block animate-wave origin-bottom-right">👋</span></h1>
            <p className="text-slate-500 text-sm">Sebelum mulai belajar jadi Trader Profesional, kami harus panggil Anda siapa?</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Nama Panggilan</label>
                <div className="relative">
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError('');
                        }}
                        placeholder="Contoh: Sultan, Boss, Budi..."
                        className="w-full pl-5 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none text-lg font-bold text-slate-800 placeholder-slate-300 transition-all"
                        autoFocus
                    />
                    {name.length > 2 && (
                         <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 animate-in fade-in">
                             <Sparkles className="w-5 h-5" />
                         </div>
                    )}
                </div>
                {error && <p className="text-red-500 text-xs font-bold mt-2 ml-1 flex items-center animate-pulse">{error}</p>}
            </div>

            <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-500/30 transform transition hover:-translate-y-1 flex items-center justify-center text-lg"
            >
                Mulai Petualangan <ArrowRight className="w-5 h-5 ml-2" />
            </button>
        </form>

        <p className="text-center text-[10px] text-slate-400 mt-6">
            Nama ini akan digunakan untuk Sertifikat dan Leaderboard.
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
