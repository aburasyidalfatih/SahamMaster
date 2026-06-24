
import React, { useState, useEffect } from 'react';
import { User, Save, RefreshCw, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import { UserProgress } from '../types';

interface ProfileProps {
  progress: UserProgress;
  onUpdateProfile: (name: string) => void;
  onResetProgress: () => void;
}

const Profile: React.FC<ProfileProps> = ({ progress, onUpdateProfile, onResetProgress }) => {
  const [name, setName] = useState(progress.username || '');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setName(progress.username || 'Trader');
  }, [progress.username]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onUpdateProfile(name);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  const handleResetClick = () => {
    if (confirm("PERINGATAN: Apakah Anda yakin ingin mereset semua progress belajar? Data yang dihapus tidak bisa dikembalikan.")) {
        onResetProgress();
    }
  };

  return (
    <div className="max-w-2xl mx-auto pb-24 md:pb-10 animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl border-4 border-white">
          <span className="text-3xl font-bold text-white">
            {name ? name.charAt(0).toUpperCase() : 'T'}
          </span>
        </div>
        <h2 className="text-2xl font-black text-slate-900">Profil Pengguna</h2>
        <p className="text-slate-500">Atur identitas Anda di aplikasi ini.</p>
      </div>

      <div className="space-y-6">
        {/* Form Ubah Nama */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Informasi Pribadi
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Nama Panggilan</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
                placeholder="Masukkan nama panggilan..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 font-medium transition-all"
              />
              <p className="text-xs text-slate-400 mt-2">Nama ini akan digunakan untuk menyapa Anda dan ditampilkan di Sertifikat/Leaderboard.</p>
            </div>

            <button 
              type="submit"
              className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center transition-all shadow-md transform active:scale-95 ${isSaved ? 'bg-green-600 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
            >
              {isSaved ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" /> Tersimpan!
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" /> Simpan Perubahan
                </>
              )}
            </button>
          </form>
        </div>

        {/* Statistik Singkat */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Statistik Belajar</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <p className="text-xs text-slate-400 mb-1">Total Progress</p>
                    <p className="text-xl font-black text-slate-800">{progress.completedDays?.length || 0} / 30 Hari</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <p className="text-xs text-slate-400 mb-1">Skor Ujian</p>
                    <p className="text-xl font-black text-slate-800">{progress.examScore || 0}</p>
                </div>
            </div>
        </div>

        {/* Danger Zone */}
        <div className="border border-red-100 bg-red-50/50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-red-600 mb-2 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Zona Bahaya
          </h3>
          <p className="text-sm text-red-500/80 mb-4">
            Tindakan ini akan menghapus semua riwayat belajar, jurnal trading, dan chat AI Anda. Aplikasi akan kembali seperti baru diinstall.
          </p>
          <button 
            onClick={handleResetClick}
            className="w-full py-3 rounded-xl border-2 border-red-200 text-red-600 font-bold hover:bg-red-100 transition-colors flex items-center justify-center"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Reset Data Aplikasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
