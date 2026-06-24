import React from 'react';
import { TrendingUp, BookOpen, Award } from 'lucide-react';
import { UserProgress } from '../../types';

interface DashboardStatsProps {
  progress: UserProgress;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ progress }) => {
  const safeCompleted = progress.completedDays || [];
  const completedPercent = Math.round((safeCompleted.length / 30) * 100);

  return (
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
  );
};

export default DashboardStats;
