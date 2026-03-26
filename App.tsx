
import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// Code Splitting: Komponen di-import menggunakan lazy loading
// Browser tidak akan mendownload kode MemberArea saat user hanya membuka LandingPage
const LandingPage = lazy(() => import('./components/LandingPage'));
const MemberArea = lazy(() => import('./components/MemberArea'));

// Komponen Loading Ringan (Hanya muncul sepersekian detik saat pindah halaman)
const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
    <div className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center mb-4">
       <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
    </div>
    <div className="flex flex-col items-center">
        <h1 className="font-bold text-slate-900 text-lg mb-1">SahamMaster</h1>
        <p className="text-slate-400 text-xs animate-pulse">Memuat Halaman...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      {/* Suspense membungkus rute yang di-lazy load */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Halaman Utama (Landing Page) - Bundle terpisah */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Member Area (Aplikasi Utama) - Bundle terpisah, didownload on-demand */}
          <Route path="/akses-member-area" element={<MemberArea />} />
          
          {/* Fallback jika route tidak ditemukan */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;
