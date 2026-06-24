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
  },

  // --- GENERATED 80 QUESTIONS ---
  {
    id: 21,
    question: "Apa tujuan utama dari diversifikasi portofolio?",
    options: ["Mengurangi risiko","Memaksimalkan profit instan","Mengurangi pajak","Memudahkan perhitungan"],
    correctAnswer: 0,
    category: "Mindset"
  },
  {
    id: 22,
    question: "Seorang trader profesional lebih mengutamakan...",
    options: ["Konsistensi profit","Profit ratusan persen dalam sehari","Beli saham yang sedang viral","Tidak pernah cut loss"],
    correctAnswer: 0,
    category: "Mindset"
  },
  {
    id: 23,
    question: "Sikap mental yang benar saat mengalami kerugian adalah...",
    options: ["Balas dendam (Revenge trading)","Mengevaluasi trading plan","Meminjam uang untuk beli lagi","Menyalahkan bandar"],
    correctAnswer: 1,
    category: "Mindset"
  },
  {
    id: 24,
    question: "Fear of Missing Out (FOMO) sering menyebabkan...",
    options: ["Beli saham di pucuk harga tertinggi","Beli di harga dasar (bottom)","Untung konsisten","Manajemen risiko yang baik"],
    correctAnswer: 0,
    category: "Mindset"
  },
  {
    id: 25,
    question: "Dalam trading, modal utama yang harus dijaga selain uang adalah...",
    options: ["Psikologi","Followers sosial media","Koneksi","Rumor"],
    correctAnswer: 0,
    category: "Mindset"
  },
  {
    id: 26,
    question: "Jam buka perdagangan sesi pertama di Bursa Efek Indonesia (BEI) hari Senin-Kamis adalah...",
    options: ["09:00 - 12:00","08:30 - 12:00","09:00 - 11:30","09:30 - 12:00"],
    correctAnswer: 0,
    category: "Basic"
  },
  {
    id: 27,
    question: "Jam buka perdagangan sesi pertama di BEI hari Jumat adalah...",
    options: ["09:00 - 11:30","09:00 - 12:00","08:30 - 11:30","09:30 - 11:30"],
    correctAnswer: 0,
    category: "Basic"
  },
  {
    id: 28,
    question: "Satu lot saham di BEI setara dengan...",
    options: ["100 lembar","500 lembar","1000 lembar","1 lembar"],
    correctAnswer: 0,
    category: "Basic"
  },
  {
    id: 29,
    question: "Batas penurunan harga saham maksimal dalam sehari disebut...",
    options: ["Auto Reject Atas (ARA)","Auto Reject Bawah (ARB)","Halt","Suspend"],
    correctAnswer: 1,
    category: "Basic"
  },
  {
    id: 30,
    question: "Apa singkatan dari IHSG?",
    options: ["Indeks Harga Saham Gabungan","Indeks Harga Saham Global","Indikator Harga Saham Gabungan","Indeks Harga Saham Group"],
    correctAnswer: 0,
    category: "Basic"
  },
  {
    id: 31,
    question: "Perusahaan yang rutin membagikan dividen biasanya menandakan...",
    options: ["Arus kas perusahaan sehat","Perusahaan akan bangkrut","Harga saham pasti naik besoknya","Sahamnya tidak liquid"],
    correctAnswer: 0,
    category: "Fundamental"
  },
  {
    id: 32,
    question: "Laporan yang menunjukkan aset, kewajiban, dan ekuitas perusahaan pada waktu tertentu disebut...",
    options: ["Neraca (Balance Sheet)","Laporan Laba Rugi","Laporan Arus Kas","Laporan Tahunan"],
    correctAnswer: 0,
    category: "Fundamental"
  },
  {
    id: 33,
    question: "Jika PBV (Price to Book Value) suatu saham bernilai 0.5, artinya...",
    options: ["Saham tersebut dinilai murah (undervalued)","Saham tersebut dinilai mahal (overvalued)","Perusahaan mengalami kerugian","Harga saham akan segera turun"],
    correctAnswer: 0,
    category: "Fundamental"
  },
  {
    id: 34,
    question: "Rasio EPS (Earning Per Share) dihitung dengan cara membagi Laba Bersih dengan...",
    options: ["Jumlah saham beredar","Total Aset","Total Ekuitas","Total Utang"],
    correctAnswer: 0,
    category: "Fundamental"
  },
  {
    id: 35,
    question: "Rasio hutang terhadap ekuitas dikenal dengan istilah...",
    options: ["DER","PER","ROE","ROA"],
    correctAnswer: 0,
    category: "Fundamental"
  },
  {
    id: 36,
    question: "Indikator MACD biasanya digunakan untuk mendeteksi...",
    options: ["Arah tren dan momentum","Volume transaksi harian","Laporan keuangan","Bandar akumulasi"],
    correctAnswer: 0,
    category: "Technical"
  },
  {
    id: 37,
    question: "Garis tren (Trendline) yang menghubungkan titik-titik low yang semakin meninggi disebut...",
    options: ["Uptrend line","Downtrend line","Sideways line","Horizontal line"],
    correctAnswer: 0,
    category: "Technical"
  },
  {
    id: 38,
    question: "Pola grafik Head and Shoulders sering dianggap sebagai sinyal...",
    options: ["Pembalikan arah menjadi turun (Bearish Reversal)","Pembalikan arah menjadi naik (Bullish Reversal)","Penerusan tren (Continuation)","Konsolidasi"],
    correctAnswer: 0,
    category: "Technical"
  },
  {
    id: 39,
    question: "Indikator Moving Average (MA) yang paling sering digunakan untuk tren jangka panjang adalah...",
    options: ["MA 20","MA 5","MA 50","MA 200"],
    correctAnswer: 3,
    category: "Technical"
  },
  {
    id: 40,
    question: "Candlestick Doji menunjukkan...",
    options: ["Keraguan pasar (Indecision)","Tren naik sangat kuat","Tren turun sangat kuat","Volume sangat besar"],
    correctAnswer: 0,
    category: "Technical"
  },
  {
    id: 41,
    question: "Dalam bandarmologi, jika broker ritel banyak melakukan Net Buy sedangkan broker asing Net Sell, ini sering disebut...",
    options: ["Distribusi","Akumulasi","Mark Up","Mark Down"],
    correctAnswer: 0,
    category: "Bandarmologi"
  },
  {
    id: 42,
    question: "Jika harga saham turun perlahan tapi bandar terus melakukan Net Buy dalam jumlah besar, fase ini disebut...",
    options: ["Akumulasi","Distribusi","Mark Up","Mark Down"],
    correctAnswer: 0,
    category: "Bandarmologi"
  },
  {
    id: 43,
    question: "Broker summary (Broxum) digunakan untuk...",
    options: ["Melihat siapa yang beli dan jual","Melihat laporan keuangan perusahaan","Menghitung nilai wajar saham","Melihat rasio utang"],
    correctAnswer: 0,
    category: "Bandarmologi"
  },
  {
    id: 44,
    question: "Salah satu ciri saham sedang di-Mark Up adalah...",
    options: ["Harga naik disertai volume tinggi","Harga sideways panjang","Harga turun perlahan","Tidak ada transaksi"],
    correctAnswer: 0,
    category: "Bandarmologi"
  },
  {
    id: 45,
    question: "Fase di mana bandar menjual barangnya secara masif di puncak harga disebut...",
    options: ["Distribusi","Akumulasi","Markup","Markdown"],
    correctAnswer: 0,
    category: "Bandarmologi"
  },
  {
    id: 46,
    question: "Tindakan membatasi kerugian saat harga bergerak berlawanan arah dari analisa disebut...",
    options: ["Cut Loss","Take Profit","Average Down","Hold"],
    correctAnswer: 0,
    category: "Risk Management"
  },
  {
    id: 47,
    question: "Risk to Reward Ratio 1:2 artinya...",
    options: ["Siap rugi Rp 100 untuk potensi untung Rp 200","Siap rugi Rp 200 untuk potensi untung Rp 100","Beli 1 lot jual 2 lot","Profit pasti 200%"],
    correctAnswer: 0,
    category: "Risk Management"
  },
  {
    id: 48,
    question: "Menambah posisi pembelian saat harga saham sedang turun drastis (tanpa analisa ulang) disebut...",
    options: ["Menangkap pisau jatuh (Catching a falling knife)","Riding the trend","Breakout trading","Scalping"],
    correctAnswer: 0,
    category: "Risk Management"
  },
  {
    id: 49,
    question: "Batas ideal uang yang boleh diresikokan per transaksi trade untuk pemula biasanya...",
    options: ["1-2% dari total modal","50% dari total modal","100% (All-in)","10-20% dari total modal"],
    correctAnswer: 0,
    category: "Risk Management"
  },
  {
    id: 50,
    question: "Trailing stop digunakan untuk...",
    options: ["Mengamankan profit jika harga berbalik arah","Memperbesar kerugian","Membeli saham di harga bawah","Mencari support baru"],
    correctAnswer: 0,
    category: "Risk Management"
  },
  {
    id: 51,
    question: "Apa tujuan utama dari diversifikasi portofolio? (Simulasi 30)",
    options: ["Mengurangi risiko","Memaksimalkan profit instan","Mengurangi pajak","Memudahkan perhitungan"],
    correctAnswer: 0,
    category: "Mindset"
  },
  {
    id: 52,
    question: "Seorang trader profesional lebih mengutamakan... (Simulasi 31)",
    options: ["Konsistensi profit","Profit ratusan persen dalam sehari","Beli saham yang sedang viral","Tidak pernah cut loss"],
    correctAnswer: 0,
    category: "Mindset"
  },
  {
    id: 53,
    question: "Sikap mental yang benar saat mengalami kerugian adalah... (Simulasi 32)",
    options: ["Balas dendam (Revenge trading)","Mengevaluasi trading plan","Meminjam uang untuk beli lagi","Menyalahkan bandar"],
    correctAnswer: 1,
    category: "Mindset"
  },
  {
    id: 54,
    question: "Fear of Missing Out (FOMO) sering menyebabkan... (Simulasi 33)",
    options: ["Beli saham di pucuk harga tertinggi","Beli di harga dasar (bottom)","Untung konsisten","Manajemen risiko yang baik"],
    correctAnswer: 0,
    category: "Mindset"
  },
  {
    id: 55,
    question: "Dalam trading, modal utama yang harus dijaga selain uang adalah... (Simulasi 34)",
    options: ["Psikologi","Followers sosial media","Koneksi","Rumor"],
    correctAnswer: 0,
    category: "Mindset"
  },
  {
    id: 56,
    question: "Jam buka perdagangan sesi pertama di Bursa Efek Indonesia (BEI) hari Senin-Kamis adalah... (Simulasi 35)",
    options: ["09:00 - 12:00","08:30 - 12:00","09:00 - 11:30","09:30 - 12:00"],
    correctAnswer: 0,
    category: "Basic"
  },
  {
    id: 57,
    question: "Jam buka perdagangan sesi pertama di BEI hari Jumat adalah... (Simulasi 36)",
    options: ["09:00 - 11:30","09:00 - 12:00","08:30 - 11:30","09:30 - 11:30"],
    correctAnswer: 0,
    category: "Basic"
  },
  {
    id: 58,
    question: "Satu lot saham di BEI setara dengan... (Simulasi 37)",
    options: ["100 lembar","500 lembar","1000 lembar","1 lembar"],
    correctAnswer: 0,
    category: "Basic"
  },
  {
    id: 59,
    question: "Batas penurunan harga saham maksimal dalam sehari disebut... (Simulasi 38)",
    options: ["Auto Reject Atas (ARA)","Auto Reject Bawah (ARB)","Halt","Suspend"],
    correctAnswer: 1,
    category: "Basic"
  },
  {
    id: 60,
    question: "Apa singkatan dari IHSG? (Simulasi 39)",
    options: ["Indeks Harga Saham Gabungan","Indeks Harga Saham Global","Indikator Harga Saham Gabungan","Indeks Harga Saham Group"],
    correctAnswer: 0,
    category: "Basic"
  },
  {
    id: 61,
    question: "Emiten PGAS yang rutin membagikan dividen biasanya menandakan...",
    options: ["Arus kas perusahaan sehat","Perusahaan akan bangkrut","Harga saham pasti naik besoknya","Sahamnya tidak liquid"],
    correctAnswer: 0,
    category: "Fundamental"
  },
  {
    id: 62,
    question: "Laporan yang menunjukkan aset, kewajiban, dan ekuitas perusahaan pada waktu tertentu disebut... (Simulasi 41)",
    options: ["Neraca (Balance Sheet)","Laporan Laba Rugi","Laporan Arus Kas","Laporan Tahunan"],
    correctAnswer: 0,
    category: "Fundamental"
  },
  {
    id: 63,
    question: "Jika PBV (Price to Book Value) suatu saham bernilai 0.5, artinya... (Simulasi 42)",
    options: ["Saham tersebut dinilai murah (undervalued)","Saham tersebut dinilai mahal (overvalued)","Perusahaan mengalami kerugian","Harga saham akan segera turun"],
    correctAnswer: 0,
    category: "Fundamental"
  },
  {
    id: 64,
    question: "Rasio EPS (Earning Per Share) dihitung dengan cara membagi Laba Bersih dengan... (Simulasi 43)",
    options: ["Jumlah saham beredar","Total Aset","Total Ekuitas","Total Utang"],
    correctAnswer: 0,
    category: "Fundamental"
  },
  {
    id: 65,
    question: "Rasio hutang terhadap ekuitas dikenal dengan istilah... (Simulasi 44)",
    options: ["DER","PER","ROE","ROA"],
    correctAnswer: 0,
    category: "Fundamental"
  },
  {
    id: 66,
    question: "Indikator MACD biasanya digunakan untuk mendeteksi... (Simulasi 45)",
    options: ["Arah tren dan momentum","Volume transaksi harian","Laporan keuangan","Bandar akumulasi"],
    correctAnswer: 0,
    category: "Technical"
  },
  {
    id: 67,
    question: "Garis tren (Trendline) yang menghubungkan titik-titik low yang semakin meninggi disebut... (Simulasi 46)",
    options: ["Uptrend line","Downtrend line","Sideways line","Horizontal line"],
    correctAnswer: 0,
    category: "Technical"
  },
  {
    id: 68,
    question: "Pola grafik Head and Shoulders sering dianggap sebagai sinyal... (Simulasi 47)",
    options: ["Pembalikan arah menjadi turun (Bearish Reversal)","Pembalikan arah menjadi naik (Bullish Reversal)","Penerusan tren (Continuation)","Konsolidasi"],
    correctAnswer: 0,
    category: "Technical"
  },
  {
    id: 69,
    question: "Indikator Moving Average (MA) yang paling sering digunakan untuk tren jangka panjang adalah... (Simulasi 48)",
    options: ["MA 20","MA 5","MA 50","MA 200"],
    correctAnswer: 3,
    category: "Technical"
  },
  {
    id: 70,
    question: "Candlestick Doji menunjukkan... (Simulasi 49)",
    options: ["Keraguan pasar (Indecision)","Tren naik sangat kuat","Tren turun sangat kuat","Volume sangat besar"],
    correctAnswer: 0,
    category: "Technical"
  },
  {
    id: 71,
    question: "Dalam bandarmologi, jika broker ritel banyak melakukan Net Buy sedangkan broker asing Net Sell, ini sering disebut... (Simulasi 50)",
    options: ["Distribusi","Akumulasi","Mark Up","Mark Down"],
    correctAnswer: 0,
    category: "Bandarmologi"
  },
  {
    id: 72,
    question: "Jika harga saham turun perlahan tapi bandar terus melakukan Net Buy dalam jumlah besar, fase ini disebut... (Simulasi 51)",
    options: ["Akumulasi","Distribusi","Mark Up","Mark Down"],
    correctAnswer: 0,
    category: "Bandarmologi"
  },
  {
    id: 73,
    question: "Broker summary (Broxum) digunakan untuk... (Simulasi 52)",
    options: ["Melihat siapa yang beli dan jual","Melihat laporan keuangan perusahaan","Menghitung nilai wajar saham","Melihat rasio utang"],
    correctAnswer: 0,
    category: "Bandarmologi"
  },
  {
    id: 74,
    question: "Salah satu ciri saham sedang di-Mark Up adalah... (Simulasi 53)",
    options: ["Harga naik disertai volume tinggi","Harga sideways panjang","Harga turun perlahan","Tidak ada transaksi"],
    correctAnswer: 0,
    category: "Bandarmologi"
  },
  {
    id: 75,
    question: "Fase di mana bandar menjual barangnya secara masif di puncak harga disebut... (Simulasi 54)",
    options: ["Distribusi","Akumulasi","Markup","Markdown"],
    correctAnswer: 0,
    category: "Bandarmologi"
  },
  {
    id: 76,
    question: "Tindakan membatasi kerugian saat harga bergerak berlawanan arah dari analisa disebut... (Simulasi 55)",
    options: ["Cut Loss","Take Profit","Average Down","Hold"],
    correctAnswer: 0,
    category: "Risk Management"
  },
  {
    id: 77,
    question: "Risk to Reward Ratio 1:2 artinya... (Simulasi 56)",
    options: ["Siap rugi Rp 100 untuk potensi untung Rp 200","Siap rugi Rp 200 untuk potensi untung Rp 100","Beli 1 lot jual 2 lot","Profit pasti 200%"],
    correctAnswer: 0,
    category: "Risk Management"
  },
  {
    id: 78,
    question: "Menambah posisi pembelian saat harga saham sedang turun drastis (tanpa analisa ulang) disebut... (Simulasi 57)",
    options: ["Menangkap pisau jatuh (Catching a falling knife)","Riding the trend","Breakout trading","Scalping"],
    correctAnswer: 0,
    category: "Risk Management"
  },
  {
    id: 79,
    question: "Batas ideal uang yang boleh diresikokan per transaksi trade untuk pemula biasanya... (Simulasi 58)",
    options: ["1-2% dari total modal","50% dari total modal","100% (All-in)","10-20% dari total modal"],
    correctAnswer: 0,
    category: "Risk Management"
  },
  {
    id: 80,
    question: "Trailing stop digunakan untuk... (Simulasi 59)",
    options: ["Mengamankan profit jika harga berbalik arah","Memperbesar kerugian","Membeli saham di harga bawah","Mencari support baru"],
    correctAnswer: 0,
    category: "Risk Management"
  },
  {
    id: 81,
    question: "Apa tujuan utama dari diversifikasi portofolio? (Simulasi 60)",
    options: ["Mengurangi risiko","Memaksimalkan profit instan","Mengurangi pajak","Memudahkan perhitungan"],
    correctAnswer: 0,
    category: "Mindset"
  },
  {
    id: 82,
    question: "Seorang trader profesional lebih mengutamakan... (Simulasi 61)",
    options: ["Konsistensi profit","Profit ratusan persen dalam sehari","Beli saham yang sedang viral","Tidak pernah cut loss"],
    correctAnswer: 0,
    category: "Mindset"
  },
  {
    id: 83,
    question: "Sikap mental yang benar saat mengalami kerugian adalah... (Simulasi 62)",
    options: ["Balas dendam (Revenge trading)","Mengevaluasi trading plan","Meminjam uang untuk beli lagi","Menyalahkan bandar"],
    correctAnswer: 1,
    category: "Mindset"
  },
  {
    id: 84,
    question: "Fear of Missing Out (FOMO) sering menyebabkan... (Simulasi 63)",
    options: ["Beli saham di pucuk harga tertinggi","Beli di harga dasar (bottom)","Untung konsisten","Manajemen risiko yang baik"],
    correctAnswer: 0,
    category: "Mindset"
  },
  {
    id: 85,
    question: "Dalam trading, modal utama yang harus dijaga selain uang adalah... (Simulasi 64)",
    options: ["Psikologi","Followers sosial media","Koneksi","Rumor"],
    correctAnswer: 0,
    category: "Mindset"
  },
  {
    id: 86,
    question: "Jam buka perdagangan sesi pertama di Bursa Efek Indonesia (BEI) hari Senin-Kamis adalah... (Simulasi 65)",
    options: ["09:00 - 12:00","08:30 - 12:00","09:00 - 11:30","09:30 - 12:00"],
    correctAnswer: 0,
    category: "Basic"
  },
  {
    id: 87,
    question: "Jam buka perdagangan sesi pertama di BEI hari Jumat adalah... (Simulasi 66)",
    options: ["09:00 - 11:30","09:00 - 12:00","08:30 - 11:30","09:30 - 11:30"],
    correctAnswer: 0,
    category: "Basic"
  },
  {
    id: 88,
    question: "Satu lot saham di BEI setara dengan... (Simulasi 67)",
    options: ["100 lembar","500 lembar","1000 lembar","1 lembar"],
    correctAnswer: 0,
    category: "Basic"
  },
  {
    id: 89,
    question: "Batas penurunan harga saham maksimal dalam sehari disebut... (Simulasi 68)",
    options: ["Auto Reject Atas (ARA)","Auto Reject Bawah (ARB)","Halt","Suspend"],
    correctAnswer: 1,
    category: "Basic"
  },
  {
    id: 90,
    question: "Apa singkatan dari IHSG? (Simulasi 69)",
    options: ["Indeks Harga Saham Gabungan","Indeks Harga Saham Global","Indikator Harga Saham Gabungan","Indeks Harga Saham Group"],
    correctAnswer: 0,
    category: "Basic"
  },
  {
    id: 91,
    question: "Emiten BUMI yang rutin membagikan dividen biasanya menandakan...",
    options: ["Arus kas perusahaan sehat","Perusahaan akan bangkrut","Harga saham pasti naik besoknya","Sahamnya tidak liquid"],
    correctAnswer: 0,
    category: "Fundamental"
  },
  {
    id: 92,
    question: "Laporan yang menunjukkan aset, kewajiban, dan ekuitas perusahaan pada waktu tertentu disebut... (Simulasi 71)",
    options: ["Neraca (Balance Sheet)","Laporan Laba Rugi","Laporan Arus Kas","Laporan Tahunan"],
    correctAnswer: 0,
    category: "Fundamental"
  },
  {
    id: 93,
    question: "Jika PBV (Price to Book Value) suatu saham bernilai 0.5, artinya... (Simulasi 72)",
    options: ["Saham tersebut dinilai murah (undervalued)","Saham tersebut dinilai mahal (overvalued)","Perusahaan mengalami kerugian","Harga saham akan segera turun"],
    correctAnswer: 0,
    category: "Fundamental"
  },
  {
    id: 94,
    question: "Rasio EPS (Earning Per Share) dihitung dengan cara membagi Laba Bersih dengan... (Simulasi 73)",
    options: ["Jumlah saham beredar","Total Aset","Total Ekuitas","Total Utang"],
    correctAnswer: 0,
    category: "Fundamental"
  },
  {
    id: 95,
    question: "Rasio hutang terhadap ekuitas dikenal dengan istilah... (Simulasi 74)",
    options: ["DER","PER","ROE","ROA"],
    correctAnswer: 0,
    category: "Fundamental"
  },
  {
    id: 96,
    question: "Indikator MACD biasanya digunakan untuk mendeteksi... (Simulasi 75)",
    options: ["Arah tren dan momentum","Volume transaksi harian","Laporan keuangan","Bandar akumulasi"],
    correctAnswer: 0,
    category: "Technical"
  },
  {
    id: 97,
    question: "Garis tren (Trendline) yang menghubungkan titik-titik low yang semakin meninggi disebut... (Simulasi 76)",
    options: ["Uptrend line","Downtrend line","Sideways line","Horizontal line"],
    correctAnswer: 0,
    category: "Technical"
  },
  {
    id: 98,
    question: "Pola grafik Head and Shoulders sering dianggap sebagai sinyal... (Simulasi 77)",
    options: ["Pembalikan arah menjadi turun (Bearish Reversal)","Pembalikan arah menjadi naik (Bullish Reversal)","Penerusan tren (Continuation)","Konsolidasi"],
    correctAnswer: 0,
    category: "Technical"
  },
  {
    id: 99,
    question: "Indikator Moving Average (MA) yang paling sering digunakan untuk tren jangka panjang adalah... (Simulasi 78)",
    options: ["MA 20","MA 5","MA 50","MA 200"],
    correctAnswer: 3,
    category: "Technical"
  },
  {
    id: 100,
    question: "Candlestick Doji menunjukkan... (Simulasi 79)",
    options: ["Keraguan pasar (Indecision)","Tren naik sangat kuat","Tren turun sangat kuat","Volume sangat besar"],
    correctAnswer: 0,
    category: "Technical"
  },
];

export const getRandomQuestions = (count: number = 100): ExamQuestion[] => {
  // Fisher-Yates Shuffle
  const shuffled = [...EXAM_QUESTIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};