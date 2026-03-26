
import React from 'react';
import { ExternalLink, Brain, Bot, ArrowRight, Zap, Briefcase } from 'lucide-react';

const ProductRecommendations: React.FC = () => {
  const products = [
    {
      title: "MindTrade",
      subtitle: "Menguasai Psikologi Trading dalam 30 Hari",
      description: "Teknikal hanya 20%, Psikologi adalah 80%. Pelajari cara mengendalikan emosi, disiplin mental, dan membangun mindset juara agar profit konsisten.",
      url: "https://mindtrade-psikologi-trading-ai-265965172666.us-west1.run.app/",
      icon: Brain,
      color: "bg-pink-100 text-pink-600",
      borderColor: "border-pink-200",
      btnColor: "bg-pink-600 hover:bg-pink-700"
    },
    {
      title: "Strategi Sukses Trader Era AI",
      subtitle: "E-Course Eksklusif",
      description: "Jangan mau kalah dengan algoritma. Pelajari cara memanfaatkan tools AI untuk analisa pasar lebih cepat, akurat, dan otomatisasi strategi trading Anda.",
      url: "https://strategi-trader-ai-landing-page-265965172666.us-west1.run.app/",
      icon: Bot,
      color: "bg-cyan-100 text-cyan-600",
      borderColor: "border-cyan-200",
      btnColor: "bg-cyan-600 hover:bg-cyan-700"
    },
    {
      title: "InvezGo",
      subtitle: "Manajer Investasi AI",
      description: "Platform investasi cerdas yang mengelola portofolio Anda secara otomatis. Biarkan AI menganalisa peluang pasar global dan mengoptimalkan aset Anda 24/7 tanpa ribet.",
      url: "https://invezgo.com?ref=mastersaham",
      icon: Briefcase,
      color: "bg-indigo-100 text-indigo-600",
      borderColor: "border-indigo-200",
      btnColor: "bg-indigo-600 hover:bg-indigo-700"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto pb-24 md:pb-10">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 mb-2 flex items-center">
            <Zap className="w-6 h-6 text-yellow-500 mr-2 fill-yellow-500" />
            Rekomendasi Premium
        </h2>
        <p className="text-slate-500">Tingkatkan skill trading dan investasi Anda dengan tools & materi pilihan ini.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product, idx) => (
          <div key={idx} className={`bg-white rounded-2xl border ${product.borderColor} p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group`}>
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${product.color} group-hover:scale-110 transition-transform`}>
              <product.icon className="w-8 h-8" />
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-1">{product.title}</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{product.subtitle}</p>
            <p className="text-slate-600 mb-8 flex-grow leading-relaxed text-sm">
              {product.description}
            </p>
            
            <a 
              href={product.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`w-full py-3.5 px-4 rounded-xl text-white font-bold flex items-center justify-center transition-all shadow-md hover:shadow-lg transform active:scale-95 ${product.btnColor}`}
            >
              Lihat Detail <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;
