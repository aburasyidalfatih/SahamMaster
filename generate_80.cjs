const fs = require('fs');

const baseQuestions = [
  // Mindset
  { q: "Apa tujuan utama dari diversifikasi portofolio?", o: ["Mengurangi risiko", "Memaksimalkan profit instan", "Mengurangi pajak", "Memudahkan perhitungan"], c: 0, cat: "Mindset" },
  { q: "Seorang trader profesional lebih mengutamakan...", o: ["Konsistensi profit", "Profit ratusan persen dalam sehari", "Beli saham yang sedang viral", "Tidak pernah cut loss"], c: 0, cat: "Mindset" },
  { q: "Sikap mental yang benar saat mengalami kerugian adalah...", o: ["Balas dendam (Revenge trading)", "Mengevaluasi trading plan", "Meminjam uang untuk beli lagi", "Menyalahkan bandar"], c: 1, cat: "Mindset" },
  { q: "Fear of Missing Out (FOMO) sering menyebabkan...", o: ["Beli saham di pucuk harga tertinggi", "Beli di harga dasar (bottom)", "Untung konsisten", "Manajemen risiko yang baik"], c: 0, cat: "Mindset" },
  { q: "Dalam trading, modal utama yang harus dijaga selain uang adalah...", o: ["Psikologi", "Followers sosial media", "Koneksi", "Rumor"], c: 0, cat: "Mindset" },
  
  // Basic
  { q: "Jam buka perdagangan sesi pertama di Bursa Efek Indonesia (BEI) hari Senin-Kamis adalah...", o: ["09:00 - 12:00", "08:30 - 12:00", "09:00 - 11:30", "09:30 - 12:00"], c: 0, cat: "Basic" },
  { q: "Jam buka perdagangan sesi pertama di BEI hari Jumat adalah...", o: ["09:00 - 11:30", "09:00 - 12:00", "08:30 - 11:30", "09:30 - 11:30"], c: 0, cat: "Basic" },
  { q: "Satu lot saham di BEI setara dengan...", o: ["100 lembar", "500 lembar", "1000 lembar", "1 lembar"], c: 0, cat: "Basic" },
  { q: "Batas penurunan harga saham maksimal dalam sehari disebut...", o: ["Auto Reject Atas (ARA)", "Auto Reject Bawah (ARB)", "Halt", "Suspend"], c: 1, cat: "Basic" },
  { q: "Apa singkatan dari IHSG?", o: ["Indeks Harga Saham Gabungan", "Indeks Harga Saham Global", "Indikator Harga Saham Gabungan", "Indeks Harga Saham Group"], c: 0, cat: "Basic" },
  
  // Fundamental
  { q: "Perusahaan yang rutin membagikan dividen biasanya menandakan...", o: ["Arus kas perusahaan sehat", "Perusahaan akan bangkrut", "Harga saham pasti naik besoknya", "Sahamnya tidak liquid"], c: 0, cat: "Fundamental" },
  { q: "Laporan yang menunjukkan aset, kewajiban, dan ekuitas perusahaan pada waktu tertentu disebut...", o: ["Neraca (Balance Sheet)", "Laporan Laba Rugi", "Laporan Arus Kas", "Laporan Tahunan"], c: 0, cat: "Fundamental" },
  { q: "Jika PBV (Price to Book Value) suatu saham bernilai 0.5, artinya...", o: ["Saham tersebut dinilai murah (undervalued)", "Saham tersebut dinilai mahal (overvalued)", "Perusahaan mengalami kerugian", "Harga saham akan segera turun"], c: 0, cat: "Fundamental" },
  { q: "Rasio EPS (Earning Per Share) dihitung dengan cara membagi Laba Bersih dengan...", o: ["Jumlah saham beredar", "Total Aset", "Total Ekuitas", "Total Utang"], c: 0, cat: "Fundamental" },
  { q: "Rasio hutang terhadap ekuitas dikenal dengan istilah...", o: ["DER", "PER", "ROE", "ROA"], c: 0, cat: "Fundamental" },

  // Technical
  { q: "Indikator MACD biasanya digunakan untuk mendeteksi...", o: ["Arah tren dan momentum", "Volume transaksi harian", "Laporan keuangan", "Bandar akumulasi"], c: 0, cat: "Technical" },
  { q: "Garis tren (Trendline) yang menghubungkan titik-titik low yang semakin meninggi disebut...", o: ["Uptrend line", "Downtrend line", "Sideways line", "Horizontal line"], c: 0, cat: "Technical" },
  { q: "Pola grafik Head and Shoulders sering dianggap sebagai sinyal...", o: ["Pembalikan arah menjadi turun (Bearish Reversal)", "Pembalikan arah menjadi naik (Bullish Reversal)", "Penerusan tren (Continuation)", "Konsolidasi"], c: 0, cat: "Technical" },
  { q: "Indikator Moving Average (MA) yang paling sering digunakan untuk tren jangka panjang adalah...", o: ["MA 20", "MA 5", "MA 50", "MA 200"], c: 3, cat: "Technical" },
  { q: "Candlestick Doji menunjukkan...", o: ["Keraguan pasar (Indecision)", "Tren naik sangat kuat", "Tren turun sangat kuat", "Volume sangat besar"], c: 0, cat: "Technical" },
  
  // Bandarmologi
  { q: "Dalam bandarmologi, jika broker ritel banyak melakukan Net Buy sedangkan broker asing Net Sell, ini sering disebut...", o: ["Distribusi", "Akumulasi", "Mark Up", "Mark Down"], c: 0, cat: "Bandarmologi" },
  { q: "Jika harga saham turun perlahan tapi bandar terus melakukan Net Buy dalam jumlah besar, fase ini disebut...", o: ["Akumulasi", "Distribusi", "Mark Up", "Mark Down"], c: 0, cat: "Bandarmologi" },
  { q: "Broker summary (Broxum) digunakan untuk...", o: ["Melihat siapa yang beli dan jual", "Melihat laporan keuangan perusahaan", "Menghitung nilai wajar saham", "Melihat rasio utang"], c: 0, cat: "Bandarmologi" },
  { q: "Salah satu ciri saham sedang di-Mark Up adalah...", o: ["Harga naik disertai volume tinggi", "Harga sideways panjang", "Harga turun perlahan", "Tidak ada transaksi"], c: 0, cat: "Bandarmologi" },
  { q: "Fase di mana bandar menjual barangnya secara masif di puncak harga disebut...", o: ["Distribusi", "Akumulasi", "Markup", "Markdown"], c: 0, cat: "Bandarmologi" },

  // Risk Management
  { q: "Tindakan membatasi kerugian saat harga bergerak berlawanan arah dari analisa disebut...", o: ["Cut Loss", "Take Profit", "Average Down", "Hold"], c: 0, cat: "Risk Management" },
  { q: "Risk to Reward Ratio 1:2 artinya...", o: ["Siap rugi Rp 100 untuk potensi untung Rp 200", "Siap rugi Rp 200 untuk potensi untung Rp 100", "Beli 1 lot jual 2 lot", "Profit pasti 200%"], c: 0, cat: "Risk Management" },
  { q: "Menambah posisi pembelian saat harga saham sedang turun drastis (tanpa analisa ulang) disebut...", o: ["Menangkap pisau jatuh (Catching a falling knife)", "Riding the trend", "Breakout trading", "Scalping"], c: 0, cat: "Risk Management" },
  { q: "Batas ideal uang yang boleh diresikokan per transaksi trade untuk pemula biasanya...", o: ["1-2% dari total modal", "50% dari total modal", "100% (All-in)", "10-20% dari total modal"], c: 0, cat: "Risk Management" },
  { q: "Trailing stop digunakan untuk...", o: ["Mengamankan profit jika harga berbalik arah", "Memperbesar kerugian", "Membeli saham di harga bawah", "Mencari support baru"], c: 0, cat: "Risk Management" }
];

let generatedQuestions = [];
let id = 21; // Since original has 1-20

const tickers = ["BBCA", "BBRI", "TLKM", "ASII", "BOTO", "BUMI", "GOTO", "AMMN", "BMRI", "BBNI", "ADRO", "PGAS"];

for (let i = 0; i < 80; i++) {
  const base = baseQuestions[i % baseQuestions.length];
  let qText = base.q;
  if (i >= baseQuestions.length) {
      const ticker = tickers[Math.floor(Math.random() * tickers.length)];
      if (base.cat === "Fundamental" && qText.includes("Perusahaan")) {
          qText = qText.replace("Perusahaan", "Emiten " + ticker);
      } else if (base.cat === "Technical" && qText.includes("saham")) {
          qText = qText.replace("saham", "saham " + ticker);
      } else {
          qText = qText + ` (Simulasi ${i})`;
      }
  }

  generatedQuestions.push({
      id: id++,
      question: qText,
      options: base.o,
      correctAnswer: base.c,
      category: base.cat
  });
}

let output = `\n  // --- GENERATED 80 QUESTIONS ---\n`;
for (const q of generatedQuestions) {
  output += `  {
    id: ${q.id},
    question: ${JSON.stringify(q.question)},
    options: ${JSON.stringify(q.options)},
    correctAnswer: ${q.correctAnswer},
    category: ${JSON.stringify(q.category)}
  },\n`;
}

// Read examData.ts
let content = fs.readFileSync('services/examData.ts', 'utf8');

// We need to inject the 80 questions before the closing bracket of the array `];`
// And also change `getRandomQuestions(count: number = 20)` to `getRandomQuestions(count: number = 100)`

content = content.replace(/];/, output + '];');
content = content.replace(/count: number = 20/g, 'count: number = 100');

fs.writeFileSync('services/examData.ts', content);
console.log("Successfully updated examData.ts with 100 questions");
