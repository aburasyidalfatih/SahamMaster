import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { LeaderboardEntry } from '../types';
import { Trophy, Medal, Calendar, Wifi, WifiOff } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    let data: LeaderboardEntry[] = [];
    
    if (supabase) {
        // Try Fetch from Supabase
        const { data: dbData, error } = await supabase
            .from('exam_leaderboard')
            .select('*')
            .order('score', { ascending: false })
            .limit(50);
        
        if (!error && dbData) {
            data = dbData;
            setIsLive(true);
        } else {
            // Fallback if table doesn't exist yet or error
            console.warn("Supabase fetch failed (Using local data):", error?.message);
            setIsLive(false);
            const local = JSON.parse(localStorage.getItem('leaderboard') || '[]');
            data = local.sort((a: any, b: any) => b.score - a.score).slice(0, 50);
        }
    } else {
        // Fallback Local Storage
        setIsLive(false);
        const local = JSON.parse(localStorage.getItem('leaderboard') || '[]');
        data = local.sort((a: any, b: any) => b.score - a.score).slice(0, 50);
    }
    
    setEntries(data);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="text-center mb-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg relative">
            <Trophy className="w-8 h-8 text-yellow-600" />
            <div className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${isLive ? 'bg-green-500' : 'bg-slate-400'}`}>
                {isLive ? <Wifi className="w-3 h-3 text-white" /> : <WifiOff className="w-3 h-3 text-white" />}
            </div>
          </div>
          <h2 className="text-2xl font-black text-slate-900">Hall of Fame</h2>
          <p className="text-slate-500 mb-2">Lulusan terbaik SahamMaster Indonesia</p>
          
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border space-x-2 bg-white">
             <span className={`flex items-center ${isLive ? 'text-green-600' : 'text-slate-500'}`}>
                <span className={`w-2 h-2 rounded-full mr-2 ${isLive ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></span>
                {isLive ? 'Live Data (Global)' : 'Local Mode (Offline)'}
             </span>
          </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
            <div className="p-12 text-center">
                <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-slate-400 text-sm">Memuat data peringkat...</p>
            </div>
        ) : entries.length === 0 ? (
            <div className="p-10 text-center">
                <p className="text-slate-500">Belum ada data kelulusan. Jadilah yang pertama lulus ujian!</p>
            </div>
        ) : (
            <div className="divide-y divide-slate-100">
                {entries.map((entry, index) => {
                    let rankIcon;
                    if (index === 0) rankIcon = <Medal className="w-6 h-6 text-yellow-500" />;
                    else if (index === 1) rankIcon = <Medal className="w-6 h-6 text-slate-400" />;
                    else if (index === 2) rankIcon = <Medal className="w-6 h-6 text-orange-400" />;
                    else rankIcon = <span className="font-bold text-slate-400 w-6 text-center">{index + 1}</span>;

                    return (
                        <div key={index} className="flex items-center p-4 hover:bg-slate-50 transition">
                            <div className="w-10 flex justify-center mr-4">
                                {rankIcon}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-800">{entry.name}</h4>
                                <div className="flex items-center text-xs text-slate-400 mt-0.5">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {new Date(entry.date).toLocaleDateString()}
                                </div>
                            </div>
                            <div className={`px-4 py-1 rounded-full font-bold text-sm ${entry.score >= 90 ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                                {entry.score}
                            </div>
                        </div>
                    );
                })}
            </div>
        )}
      </div>
      
      {!isLive && (
        <p className="text-center text-xs text-slate-400 mt-4 max-w-md mx-auto">
            Catatan: Leaderboard sedang dalam mode Offline. Data hanya tersimpan di browser Anda karena belum terhubung ke database pusat. Hubungi admin untuk setup database.
        </p>
      )}
    </div>
  );
};

export default Leaderboard;