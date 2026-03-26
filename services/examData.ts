import { ExamQuestion } from '../types';

// Dataset Soal Ujian (Sample of 20 high quality questions representing the 100 question pool)
// Dalam aplikasi nyata, ini bisa di-fetch dari database atau diperbanyak hingga 100.
export const EXAM_QUESTIONS: ExamQuestion[] = [
  // --- MINDSET ---
  {
    id: 1,
    question: "Apa musuh terbesar nilai uang Anda jika hanya disimpan di bawah bantal?",
    options: ["Deflasi", "Inflasi", "Resesi", "Stagnasi"],
    correctAnswer: 1,
    category: "Mindset"
  },
  {
    id: 2,
    question: "Membeli saham berarti...",
    options: ["Meminjamkan uang ke perusahaan", "Membeli bukti kepemilikan bisnis", "Bermain judi legal", "Menabung di bank"],
    correctAnswer: 1,
    category: "Mindset"
  },
  {
    id: 3,
    question: "Manakah yang BUKAN merupakan keuntungan investasi saham?",
    options: ["Capital Gain", "Dividen", "Pasti untung setiap hari", "Hak Suara di RUPS"],
    correctAnswer: 2,
    category: "Mindset"
  },
  
  // --- MEKANISME PASAR ---
  {
    id: 4,
    question: "Satuan pembelian saham minimal di Bursa Efek Indonesia adalah 1 Lot. Berapa lembar?",
    options: ["10 Lembar", "500 Lembar", "100 Lembar", "1000 Lembar"],
    correctAnswer: 2,
    category: "Basic"
  },
  {
    id: 5,
    question: "Jika Anda ingin membeli saham secara instan tanpa antri, Anda harus melakukan?",
    options: ["Hajar Kiri (HAKI)", "Hajar Kanan (HAKA)", "Antri di Bid", "Antri di Offer"],
    correctAnswer: 1,
    category: "Basic"
  },

  // --- FUNDAMENTAL ---
  {
    id: 6,
    question: "Rasio yang membandingkan Harga Saham dengan Laba Per Lembar Saham (EPS) disebut?",
    options: ["PBV (Price to Book Value)", "DER (Debt to Equity Ratio)", "ROE (Return on Equity)", "PER (Price Earning Ratio)"],
    correctAnswer: 3,
    category: "Fundamental"
  },
  {
    id: 7,
    question: "Saham lapis satu dengan kapitalisasi pasar besar (>100T) dan fundamental kuat disebut?",
    options: ["Bluechip", "Second Liner", "Gorengan", "Penny Stock"],
    correctAnswer: 0,
    category: "Fundamental"
  },
  {
    id: 8,
    question: "Apa istilah tanggal terakhir di mana investor masih berhak mendapatkan dividen?",
    options: ["Ex Date", "Cum Date", "Payment Date", "Recording Date"],
    correctAnswer: 1,
    category: "Fundamental"
  },

  // --- TEKNIKAL ---
  {
    id: 9,
    question: "Pola candlestick dengan ekor bawah panjang yang muncul saat downtrend disebut?",
    options: ["Shooting Star", "Doji", "Hammer", "Marubozu"],
    correctAnswer: 2,
    category: "Technical"
  },
  {
    id: 10,
    question: "Kondisi di mana garis MA Kecil (MA20) memotong MA Besar (MA200) dari bawah ke atas disebut?",
    options: ["Death Cross", "Golden Cross", "Dead Cat Bounce", "Breakout"],
    correctAnswer: 1,
    category: "Technical"
  },
  {
    id: 11,
    question: "Area harga di mana harga saham cenderung sulit turun lebih dalam disebut?",
    options: ["Resistance", "Support", "Breakout", "False Break"],
    correctAnswer: 1,
    category: "Technical"
  },
  {
    id: 12,
    question: "Indikator RSI menunjukkan angka di atas 70. Artinya pasar sedang?",
    options: ["Oversold (Jenuh Jual)", "Overbought (Jenuh Beli)", "Sideways", "Crash"],
    correctAnswer: 1,
    category: "Technical"
  },

  // --- BANDARMOLOGI & RISK MANAGEMENT ---
  {
    id: 13,
    question: "Siapakah kode broker yang biasanya diasosiasikan dengan Ritel (Semut)?",
    options: ["ZP & BK", "AK & KZ", "YP & PD", "RX & CS"],
    correctAnswer: 2,
    category: "Bandarmologi"
  },
  {
    id: 14,
    question: "Apa arti fase 'Akumulasi' dalam siklus bandarmologi?",
    options: ["Bandar sedang jualan barang ke ritel", "Bandar sedang mengumpulkan barang diam-diam", "Harga saham sedang diterbangkan", "Harga saham sedang dibanting"],
    correctAnswer: 1,
    category: "Bandarmologi"
  },
  {
    id: 15,
    question: "Berapa persen maksimal risiko modal per transaksi yang disarankan (The 2% Rule)?",
    options: ["2%", "10%", "50%", "100%"],
    correctAnswer: 0,
    category: "Risk Management"
  },
  {
    id: 16,
    question: "Strategi membeli bertahap saat harga NAIK (Average Up) disebut juga?",
    options: ["Martingale", "Pyramiding", "DCA", "Lump Sum"],
    correctAnswer: 1,
    category: "Risk Management"
  },
  
  // --- ADVANCED ---
  {
    id: 17,
    question: "Rotasi sektor biasanya berpindah dari Sektor Energi ke Sektor apa saat inflasi turun?",
    options: ["Perbankan & Properti", "Pertambangan", "Minyak", "Logam"],
    correctAnswer: 0,
    category: "Advanced"
  },
  {
    id: 18,
    question: "Dalam scalping, apa yang harus diperhatikan di Order Book untuk melakukan entry?",
    options: ["Bid yang tipis", "Offer yang tebal dimakan terus (HAKA)", "Offer yang kosong", "Bid yang sering dicabut"],
    correctAnswer: 1,
    category: "Advanced"
  },
  {
    id: 19,
    question: "Apa tindakan terbaik saat mengalami Loss Streak (Rugi Beruntun) 3x?",
    options: ["Revenge Trading (Balas Dendam)", "Top Up Modal lagi", "Stop Trading & Istirahat (Reset)", "Ganti saham gorengan"],
    correctAnswer: 2,
    category: "Psychology"
  },
  {
    id: 20,
    question: "Apa tujuan utama seorang Trader Pemula?",
    options: ["Cepat Kaya", "Bertahan Hidup & Belajar", "Pamer Cuan", "Mengalahkan IHSG"],
    correctAnswer: 1,
    category: "Mindset"
  }
];

export const getRandomQuestions = (count: number = 20): ExamQuestion[] => {
  // Fisher-Yates Shuffle
  const shuffled = [...EXAM_QUESTIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};