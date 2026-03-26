import React, { useState, useEffect } from 'react';
import { ExamQuestion } from '../types';
import { getRandomQuestions } from '../services/examData';
import Certificate from './Certificate';
import { Clock, AlertTriangle, CheckCircle, XCircle, Printer, ArrowRight, Home, Share2 } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface ExamViewProps {
  onBack: () => void;
  onFinish: (score: number) => void;
  userName: string;
}

const ExamView: React.FC<ExamViewProps> = ({ onBack, onFinish, userName }) => {
  const [stage, setStage] = useState<'intro' | 'test' | 'result'>('intro');
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]); // Array of selected option indexes
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds
  const [score, setScore] = useState(0);

  // Load questions on mount
  useEffect(() => {
    setQuestions(getRandomQuestions(20)); // Get 20 random questions
  }, []);

  // Timer Logic
  useEffect(() => {
    if (stage === 'test' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (stage === 'test' && timeLeft === 0) {
      handleSubmitExam();
    }
  }, [stage, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleStart = () => {
    setStage('test');
    setAnswers(new Array(questions.length).fill(-1));
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmitExam = async () => {
    // Calculate Score
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / questions.length) * 100);
    setScore(finalScore);
    setStage('result');
    onFinish(finalScore);

    // Save to Leaderboard (Supabase or Local)
    const entry = {
        name: userName || 'Anonim',
        score: finalScore,
        date: new Date().toISOString()
    };

    if (supabase) {
        await supabase.from('exam_leaderboard').insert([entry]);
    } else {
        const localLB = JSON.parse(localStorage.getItem('leaderboard') || '[]');
        localLB.push(entry);
        localStorage.setItem('leaderboard', JSON.stringify(localLB));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // --- RENDER: INTRO ---
  if (stage === 'intro') {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4 text-center">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-4">Ujian Kelulusan Trader</h1>
            <p className="text-slate-600 mb-8 leading-relaxed">
                Anda akan mengerjakan <strong>20 Soal Pilihan Ganda</strong> yang mencakup Mindset, Fundamental, Teknikal, dan Bandarmologi.
                <br /><br />
                Waktu pengerjaan: <strong>20 Menit</strong>.
                <br />
                Syarat Lulus: Nilai min. <strong>70</strong>.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button onClick={onBack} className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition">
                    Kembali Belajar
                </button>
                <button onClick={handleStart} className="px-8 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                    Mulai Ujian Sekarang
                </button>
            </div>
        </div>
      </div>
    );
  }

  // --- RENDER: RESULT ---
  if (stage === 'result') {
    const isPassed = score >= 70;
    
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        {isPassed ? (
            <div className="space-y-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="bg-green-50 border border-green-200 p-6 rounded-2xl">
                    <h2 className="text-3xl font-bold text-green-700 mb-2">Selamat! Anda Lulus! 🎉</h2>
                    <p className="text-green-600">Nilai Anda: <span className="font-black text-2xl">{score}/100</span></p>
                </div>
                
                {/* Certificate Preview */}
                <div className="overflow-hidden rounded-xl shadow-2xl border border-slate-200">
                     <Certificate name={userName || "Trader SahamMaster"} score={score} date={new Date().toLocaleDateString('id-ID')} />
                </div>

                <div className="flex flex-col md:flex-row justify-center gap-4 print:hidden">
                    <button onClick={handlePrint} className="flex items-center justify-center px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 shadow-lg">
                        <Printer className="w-5 h-5 mr-2" /> Cetak / Simpan PDF
                    </button>
                    <button onClick={onBack} className="flex items-center justify-center px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50">
                        <Home className="w-5 h-5 mr-2" /> Kembali ke Dashboard
                    </button>
                </div>
                <p className="text-xs text-slate-400 print:hidden">Tips: Atur layout print ke 'Landscape' untuk hasil terbaik.</p>
            </div>
        ) : (
            <div className="max-w-lg mx-auto text-center mt-20">
                 <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle className="w-12 h-12 text-red-500" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Mohon Maaf, Belum Lulus</h2>
                <p className="text-slate-500 mb-6">Nilai Anda: <span className="font-bold text-red-500">{score}</span>. Syarat lulus minimal 70.</p>
                <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
                    <p className="text-sm text-slate-600">Jangan menyerah! Review kembali materi yang belum dikuasai dan coba lagi.</p>
                </div>
                <button onClick={() => setStage('intro')} className="w-full px-6 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg">
                    Coba Ujian Lagi
                </button>
                <button onClick={onBack} className="mt-4 text-slate-400 hover:text-slate-600 text-sm font-medium">
                    Kembali ke Materi
                </button>
            </div>
        )}
      </div>
    );
  }

  // --- RENDER: TEST ---
  const currentQ = questions[currentQIndex];
  const progressPercent = ((currentQIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 min-h-screen flex flex-col">
       {/* Top Bar */}
       <div className="flex justify-between items-center mb-6">
          <div className="flex items-center text-slate-500 font-medium">
             <span className="bg-slate-100 px-3 py-1 rounded-lg text-xs font-bold mr-2">Soal {currentQIndex + 1}/{questions.length}</span>
          </div>
          <div className={`flex items-center font-mono font-bold text-lg ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-blue-600'}`}>
              <Clock className="w-5 h-5 mr-2" />
              {formatTime(timeLeft)}
          </div>
       </div>

       {/* Progress Bar */}
       <div className="w-full bg-slate-100 h-2 rounded-full mb-8">
           <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
       </div>

       {/* Question Card */}
       <div className="flex-grow">
           <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-snug">
               {currentQ.question}
           </h2>

           <div className="space-y-4">
               {currentQ.options.map((opt, idx) => (
                   <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between group
                            ${answers[currentQIndex] === idx 
                                ? 'border-blue-500 bg-blue-50 text-blue-800 shadow-md' 
                                : 'border-slate-100 bg-white hover:border-blue-200 hover:bg-slate-50 text-slate-600'}
                        `}
                   >
                       <span className="font-medium">{opt}</span>
                       {answers[currentQIndex] === idx && <CheckCircle className="w-5 h-5 text-blue-500" />}
                   </button>
               ))}
           </div>
       </div>

       {/* Footer Navigation */}
       <div className="mt-10 flex justify-between pt-6 border-t border-slate-100">
           <button 
                onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQIndex === 0}
                className="px-6 py-3 rounded-xl font-bold text-slate-500 disabled:opacity-30 hover:bg-slate-50 transition"
            >
               Sebelumnya
           </button>

           {currentQIndex === questions.length - 1 ? (
               <button 
                    onClick={handleSubmitExam}
                    disabled={answers.includes(-1)} // Disable if not all answered? Optional. Let's allow skip but warn? No, force answer for simplicity here
                    className="px-8 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                    Selesai & Nilai <CheckCircle className="w-5 h-5 ml-2" />
                </button>
           ) : (
                <button 
                    onClick={() => setCurrentQIndex(prev => Math.min(questions.length - 1, prev + 1))}
                    className="px-8 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg flex items-center"
                >
                    Lanjut <ArrowRight className="w-5 h-5 ml-2" />
                </button>
           )}
       </div>
    </div>
  );
};

export default ExamView;