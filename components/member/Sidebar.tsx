import React from 'react';
import { Download, Smartphone, Award, LogOut } from 'lucide-react';
import { ViewState, UserProgress } from '../../types';

interface SidebarProps {
  view: ViewState;
  setView: (view: ViewState) => void;
  navItems: any[];
  progress: UserProgress;
  showInstallBtn: boolean;
  handleInstallClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  view, setView, navItems, progress, showInstallBtn, handleInstallClick 
}) => {
  return (
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
                {item.id === 'products' && (
                  <span className="absolute right-3 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-pulse shadow-sm">
                      BARU
                  </span>
                )}
              </button>
            )
          })}
        </nav>

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
      
      <div className="mt-auto p-6 border-t border-slate-100 space-y-4">
         {progress.passedExam && (
             <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
                 <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                 <p className="text-xs font-bold text-green-800">Sertifikat Tersedia</p>
             </div>
         )}
         <button
           onClick={() => {
             localStorage.removeItem('token');
             localStorage.removeItem('adminToken');
             window.location.href = '/';
           }}
           className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
         >
           <LogOut className="w-5 h-5 mr-3 text-slate-400" />
           Keluar
         </button>
      </div>
    </aside>
  );
};

export default Sidebar;
