import React from 'react';
import { Award, CheckCircle } from 'lucide-react';

interface CertificateProps {
  name: string;
  score: number;
  date: string;
}

const Certificate: React.FC<CertificateProps> = ({ name, score, date }) => {
  return (
    <div id="printable-certificate" className="bg-white p-1 md:p-8 text-center overflow-x-auto">
      <div className="w-[800px] h-[600px] mx-auto bg-slate-50 border-[20px] border-double border-slate-900 p-10 relative flex flex-col items-center justify-center text-slate-900 shadow-2xl">
        
        {/* Background Pattern Watermark */}
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
            <Award size={400} />
        </div>

        {/* Header */}
        <div className="mb-8">
            <h1 className="text-5xl font-serif font-bold text-slate-900 tracking-wider mb-2">CERTIFICATE</h1>
            <p className="text-xl text-slate-500 uppercase tracking-[0.5em] font-light">OF COMPLETION</p>
        </div>

        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mb-8"></div>

        {/* Content */}
        <div className="space-y-6 z-10">
            <p className="text-lg text-slate-600 italic">This is to certify that</p>
            
            <h2 className="text-4xl font-bold font-serif text-indigo-700 border-b-2 border-slate-200 pb-2 px-10 inline-block">
                {name}
            </h2>
            
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Has successfully completed the <span className="font-bold">SahamMaster 30-Day Intensive Trading Course</span> covering Technical Analysis, Fundamental Analysis, Bandarmology, and Risk Management.
            </p>

            <div className="mt-6 flex justify-center items-center space-x-2">
                <span className="text-slate-500 font-bold">FINAL SCORE:</span>
                <span className={`text-2xl font-black px-4 py-1 rounded-full border-2 ${score >= 90 ? 'text-green-600 border-green-600' : 'text-blue-600 border-blue-600'}`}>
                    {score}/100
                </span>
            </div>
        </div>

        {/* Footer / Signature */}
        <div className="mt-16 w-full flex justify-between items-end px-16 z-10">
            <div className="text-center">
                <p className="font-bold text-lg mb-2">{date}</p>
                <div className="w-40 h-[1px] bg-slate-400 mx-auto"></div>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Date Issued</p>
            </div>

            {/* Seal */}
            <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg text-white">
                    <CheckCircle size={48} />
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-blue-800 flex items-center justify-center text-white text-[10px] font-bold tracking-widest shadow-md">
                    VERIFIED
                </div>
            </div>

            <div className="text-center">
                <p className="font-serif italic text-2xl mb-1 text-slate-800">Coach SahamPro</p>
                <div className="w-40 h-[1px] bg-slate-400 mx-auto"></div>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Head Mentor</p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Certificate;