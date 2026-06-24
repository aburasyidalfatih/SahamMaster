import React from 'react';
import { ViewState } from '../../types';

interface MobileNavProps {
  view: ViewState;
  setView: (view: ViewState) => void;
  navItems: any[];
}

const MobileNav: React.FC<MobileNavProps> = ({ view, setView, navItems }) => {
  return (
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
  );
};

export default MobileNav;
