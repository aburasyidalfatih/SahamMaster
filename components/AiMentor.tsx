import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, Sparkles, Trash2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendChatMessage } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

const DEFAULT_MSG: ChatMessage = {
  id: 'welcome',
  role: 'model',
  text: "Halo! Saya Coach SahamPro. Ada yang ingin ditanyakan tentang pasar saham Indonesia hari ini? (Contoh: 'Apa itu IHSG?', 'Bagaimana cara screening saham?', 'Analisa BBCA')",
  timestamp: new Date()
};

const AiMentor: React.FC = () => {
  // Load chat history from LocalStorage immediately
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('sahamMasterAiChat');
      if (saved) {
        // Need to parse dates back from string
        const parsed = JSON.parse(saved);
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      }
    } catch (e) {
      console.error("Failed to load chat history", e);
    }
    return [DEFAULT_MSG];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Save to LocalStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('sahamMasterAiChat', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendChatMessage(messages.concat(userMsg), input);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (confirm("Hapus semua riwayat percakapan dengan Coach?")) {
      setMessages([DEFAULT_MSG]);
      localStorage.removeItem('sahamMasterAiChat');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Adjusted height calculation to account for mobile nav
  return (
    <div className="flex flex-col h-[calc(100vh-160px)] md:h-[calc(100vh-100px)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-4 flex items-center justify-between shadow-md z-10 shrink-0">
        <div className="flex items-center">
            <div className="bg-white/20 p-2 rounded-full mr-3">
            <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
            <h2 className="text-white font-bold text-base md:text-lg flex items-center">
                AI Mentor Saham
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 ml-2 text-yellow-300" />
            </h2>
            <p className="text-blue-100 text-[10px] md:text-xs">Privasi Terjaga • Local History</p>
            </div>
        </div>
        
        <button 
            onClick={handleClearChat}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Hapus Riwayat Chat"
        >
            <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4 bg-slate-50 pb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-3 py-2 md:px-4 md:py-3 shadow-sm text-sm md:text-base ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white text-slate-800 border border-gray-100 rounded-bl-none'
              }`}
            >
              {msg.role === 'model' ? (
                 <div className="prose prose-sm max-w-none text-slate-800 dark:prose-invert break-words">
                   <ReactMarkdown>{msg.text}</ReactMarkdown>
                 </div>
              ) : (
                <p className="whitespace-pre-wrap break-words">{msg.text}</p>
              )}
              <span className={`text-[9px] md:text-[10px] block mt-1 opacity-70 ${msg.role === 'user' ? 'text-blue-100 text-right' : 'text-gray-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 border border-gray-100 shadow-sm flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              <span className="text-xs text-gray-500">Coach sedang mengetik...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input - Sticky at bottom */}
      <div className="p-3 bg-white border-t border-gray-200 shrink-0">
        <div className="relative flex items-center bg-gray-50 rounded-xl border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ketik pertanyaan..."
            className="flex-1 bg-transparent px-3 py-3 focus:outline-none resize-none h-[45px] max-h-[100px] text-sm text-gray-900 placeholder-gray-500"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-2 mr-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-2">
          Chat ini bersifat pribadi dan tersimpan di perangkat Anda.
        </p>
      </div>
    </div>
  );
};

export default AiMentor;