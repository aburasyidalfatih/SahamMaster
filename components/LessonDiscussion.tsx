
import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { askMentorAboutLesson } from '../services/geminiService';
import { MessageSquare, Send, User, Bot, Loader2, AlertCircle, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Discussion {
  id: number;
  lesson_day: number;
  question: string;
  answer: string;
  user_name?: string; 
  created_at: string;
}

interface LessonDiscussionProps {
  lessonDay: number;
  lessonTitle: string;
  userName: string;
}

const LessonDiscussion: React.FC<LessonDiscussionProps> = ({ lessonDay, lessonTitle, userName }) => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch discussions from Supabase
  const fetchDiscussions = async () => {
    if (!supabase) {
        setIsLoading(false);
        return;
    }

    try {
      const { data, error } = await supabase
        .from('lesson_discussions')
        .select('*')
        .eq('lesson_day', lessonDay)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDiscussions(data || []);
    } catch (err: any) {
      console.warn("Could not fetch discussions:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, [lessonDay]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    // Gunakan nama dari props, atau fallback ke 'Member SahamMaster' jika kosong
    const finalUserName = userName && userName.trim() !== '' ? userName : 'Member SahamMaster';

    try {
      // 1. Get Answer from AI
      const answer = await askMentorAboutLesson(lessonTitle, question);

      // 2. Save to Supabase (if connected)
      if (supabase) {
        const payload = {
            lesson_day: lessonDay,
            question: question,
            answer: answer,
            user_name: finalUserName // KIRIM NAMA USER KE DB
        };

        const { error: dbError } = await supabase
          .from('lesson_discussions')
          .insert([payload]);
        
        if (dbError) {
            console.error("DB Save Error:", dbError);
            if (dbError.message.includes('relation "lesson_discussions" does not exist')) {
                setError("Database belum disetup. Harap jalankan script SQL.");
            } else if (dbError.message.includes('column "user_name" of relation "lesson_discussions" does not exist')) {
                 // Fallback: Jika kolom user_name belum dibuat di DB, coba insert tanpa nama agar tidak error
                 console.warn("Kolom user_name tidak ditemukan, menyimpan tanpa nama.");
                 const { error: retryError } = await supabase.from('lesson_discussions').insert([{
                     lesson_day: lessonDay,
                     question: question,
                     answer: answer
                 }]);
                 if (!retryError) fetchDiscussions();
            } else {
                setError("Gagal menyimpan ke database.");
            }
        } else {
            fetchDiscussions();
        }
      } else {
          // Fallback local state if no Supabase
          const newDiscussion: Discussion = {
              id: Date.now(),
              lesson_day: lessonDay,
              question: question,
              answer: answer,
              user_name: finalUserName,
              created_at: new Date().toISOString()
          };
          setDiscussions([newDiscussion, ...discussions]);
      }

      setQuestion('');
    } catch (err) {
      console.error(err);
      setError("Gagal mengirim pertanyaan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-12 border-t border-slate-200 pt-10">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
             <MessageSquare className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-xl font-bold text-slate-800">Diskusi Materi</h3>
            <p className="text-sm text-slate-500">
                Diskusi publik. Pertanyaan Anda akan tampil dengan nama <strong>{userName || 'Member'}</strong>.
            </p>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mb-10 relative">
        <div className="relative">
            <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={`Tanya Coach SahamPro sebagai ${userName || 'Member'}...`}
            className="w-full pl-5 pr-14 py-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm text-slate-700 bg-white"
            disabled={isSubmitting}
            />
            <button
            type="submit"
            disabled={!question.trim() || isSubmitting}
            className="absolute right-2 top-2 bottom-2 bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
        </div>
        {error && (
            <div className="flex items-center text-red-500 text-sm mt-2">
                <AlertCircle className="w-4 h-4 mr-1" />
                {error}
            </div>
        )}
      </form>

      {/* Discussion List */}
      <div className="space-y-6">
        {isLoading ? (
             <div className="text-center py-10">
                 <Loader2 className="w-8 h-8 animate-spin text-slate-300 mx-auto mb-2" />
                 <p className="text-slate-400 text-sm">Memuat diskusi...</p>
             </div>
        ) : discussions.length === 0 ? (
            <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                <p className="text-slate-400 italic">Belum ada diskusi. Jadilah yang pertama bertanya dengan nama Anda!</p>
            </div>
        ) : (
            discussions.map((item) => {
                // Cek apakah ini komentar user sendiri (Case insensitive comparison untuk UX)
                const isMe = item.user_name && userName && item.user_name.toLowerCase() === userName.toLowerCase();
                
                return (
                <div key={item.id} className={`rounded-2xl border p-5 shadow-sm transition-shadow ${isMe ? 'bg-blue-50/50 border-blue-200' : 'bg-white border-slate-200 hover:shadow-md'}`}>
                    {/* Question */}
                    <div className="flex items-start space-x-3 mb-4">
                        <div className={`p-2 rounded-full flex-shrink-0 ${isMe ? 'bg-blue-200 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                            <User className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <p className={`text-sm font-bold mb-1 ${isMe ? 'text-blue-700' : 'text-slate-900'}`}>
                                    {item.user_name || 'Member SahamMaster'} {isMe && <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded ml-2">YOU</span>}
                                </p>
                                <span className="text-[10px] text-slate-400">
                                    {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit' })}
                                </span>
                            </div>
                            <p className="text-slate-700 font-medium">{item.question}</p>
                        </div>
                    </div>

                    {/* Answer */}
                    <div className="flex items-start space-x-3 ml-4 pl-4 border-l-2 border-indigo-100 bg-indigo-50/50 p-4 rounded-r-xl rounded-bl-xl">
                        <div className="bg-indigo-600 p-1.5 rounded-full flex-shrink-0 mt-1 shadow-sm">
                            <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-bold text-indigo-700 mb-1 uppercase tracking-wider flex items-center">
                                Coach SahamPro 
                                <span className="bg-indigo-200 text-indigo-800 text-[9px] px-1.5 py-0.5 rounded ml-2">AI BOT</span>
                            </p>
                            <div className="prose prose-sm prose-indigo max-w-none text-slate-700">
                                <ReactMarkdown>{item.answer}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
            )})
        )}
      </div>
    </div>
  );
};

export default LessonDiscussion;
