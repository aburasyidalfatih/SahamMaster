import { Lesson, Difficulty, GlossaryTerm } from './types';

export const APP_NAME = "SahamMaster ID";

const VISUAL_PLACEHOLDER = (text: string) => `\n\n![Visual: ${text}](https://placehold.co/800x400/f8fafc/334155?text=${encodeURIComponent(text.substring(0, 60))}...)\n\n`;

export const GLOSSARY_DATA: GlossaryTerm[] = [
  { term: "ARA (Auto Reject Atas)", definition: "Batas kenaikan harga tertinggi saham dalam sehari. Jika sudah ARA, saham tidak bisa naik lagi hari itu, biasanya antrian Offer kosong.", category: "General" },
  { term: "ARB (Auto Reject Bawah)", definition: "Batas penurunan harga terendah saham dalam sehari. Jika ARB, saham tidak bisa turun lagi, biasanya antrian Bid kosong (dikunci).", category: "General" },
  { term: "Bandarmologi", definition: "Ilmu menganalisa pergerakan 'Big Player' atau institusi besar yang memiliki modal besar untuk menggerakkan harga saham.", category: "Bandarmologi" },
  { term: "Bearish", definition: "Kondisi pasar atau saham yang sedang tren TURUN (dilambangkan dengan Beruang yang mencakar ke bawah).", category: "General" },
  { term: "Bid", definition: "Kolom antrian BELI. Jika Anda ingin membeli saham dengan harga murah (nawar), Anda antri di Bid.", category: "Technical" },
  { term: "Bluechip", definition: "Saham lapis satu dengan kapitalisasi pasar besar (>100 Triliun), fundamental kuat, dan pergerakan stabil.", category: "General" },
  { term: "Breakout", definition: "Kondisi ketika harga saham berhasil menembus area Resistance (atap) dengan volume tinggi. Sinyal beli kuat.", category: "Technical" },
  { term: "Bullish", definition: "Kondisi pasar atau saham yang sedang tren NAIK (dilambangkan dengan Banteng yang menanduk ke atas).", category: "General" },
  { term: "Capital Gain", definition: "Keuntungan yang didapat dari selisih harga jual dikurangi harga beli.", category: "General" },
  { term: "Cut Loss", definition: "Menjual saham dalam posisi rugi untuk membatasi kerugian agar tidak semakin dalam.", category: "Technical" },
  { term: "Dividen", definition: "Pembagian laba perusahaan kepada pemegang saham.", category: "General" },
  { term: "Emiten", definition: "Sebutan untuk perusahaan yang sahamnya terdaftar di Bursa Efek Indonesia (Contoh: BBCA, TLKM).", category: "General" },
  { term: "HAKA (Hajar Kanan)", definition: "Membeli saham langsung di harga Offer teratas tanpa antri. Strategi agresif.", category: "Technical" },
  { term: "HAKI (Hajar Kiri)", definition: "Menjual saham langsung di harga Bid teratas tanpa antri. Strategi buang barang cepat.", category: "Technical" },
  { term: "IHSG", definition: "Indeks Harga Saham Gabungan. Indikator pergerakan rata-rata seluruh saham di Indonesia.", category: "General" },
  { term: "Lot", definition: "Satuan pembelian saham. 1 Lot = 100 Lembar.", category: "General" },
  { term: "Offer", definition: "Kolom antrian JUAL. Jika Anda ingin menjual saham, Anda antri di Offer.", category: "Technical" },
  { term: "Pom-pom", definition: "Istilah untuk influencer atau pihak yang menghasut orang lain untuk membeli saham tertentu agar harganya naik.", category: "Bandarmologi" },
  { term: "Resistance", definition: "Batas atas harga (atap) yang sulit ditembus.", category: "Technical" },
  { term: "Scalping", definition: "Gaya trading super cepat (hitungan menit) mengambil profit kecil (1-3%) berkali-kali.", category: "Technical" },
  { term: "Support", definition: "Batas bawah harga (lantai) yang menjaga harga tidak jatuh lebih dalam.", category: "Technical" },
  { term: "Suspend", definition: "Penghentian sementara perdagangan suatu saham oleh Bursa karena masalah tertentu atau pergerakan tidak wajar.", category: "General" },
  { term: "Swing Trading", definition: "Gaya trading santai dengan menahan saham beberapa hari hingga minggu mengikuti tren.", category: "Technical" },
];

// 30 Days Curriculum tailored for Indonesian Market (IDX) - HIGH IMPACT COPYWRITING VERSION
export const CURRICULUM: Lesson[] = [
  // ==============================
  // Week 1: Mindset & Foundation (The Awakening)
  // ==============================
  {
    day: 1,
    title: "Mindset Sultan: Mesin Uang Otomatis vs Kerja Rodi",
    category: "Mindset",
    description: "Membongkar rahasia kenapa orang kaya makin kaya. Pahami perbedaan fundamental antara menabung, berjudi, dan berinvestasi saham agar uang bekerja untuk Anda saat Anda tidur.",
    keyPoints: ["Inflasi: The Silent Killer", "Saham = Bukti Kepemilikan Bisnis", "Investor vs Trader vs Gambler"],
    isCompleted: false,
    content: `
# Selamat Datang di Dunia Uang, Calon Sultan! 🇮🇩

Halo! Keputusan lo membuka materi hari pertama ini adalah langkah krusial buat masa depan dompet lo. Banyak orang kerja keras seumur hidup tapi tabungannya tergerus, kenapa? Karena mereka gak ngerti cara kerja uang.

### Bab 1: Musuh Tak Terlihat (Inflasi) 💸
Pernah sadar gak?
*   Tahun 2010: Uang Rp 100.000 bisa buat belanja seminggu penuh di supermarket.
*   Hari ini: Rp 100.000 cuma dapet minyak goreng, beras 5kg, sama telur sepiring. Lewat.

Itu namanya **INFLASI**. Nilai uang lo turun terus setiap tahun sekitar 3-5%.
Kalau lo cuma simpen uang di celengan atau bank (bunga 0-1%), uang lo sebenernya **HILANG** pelan-pelan. Lo butuh kendaraan yang larinya lebih kencang dari inflasi. Kendaraan itu namanya **SAHAM** (Rata-rata return IHSG 12-15% per tahun jangka panjang).

### Bab 2: Apa itu Saham Sebenarnya? 🏢
Gak usah ribet pakai bahasa buku kuliah. Gini logikanya:

Bayangkan lo sama 4 temen lo mau buka **Warkop Sultan** dengan modal Rp 100 Juta.
Lo setor Rp 20 Juta.
Artinya? Lo punya **20%** hak kepemilikan atas Warkop itu.
Kertas bukti setor lo itu disebut **SAHAM**.

Keuntungannya apa?
1.  **Dividen (Bagi Hasil)**: Kalau Warkop untung Rp 50 Juta setahun, lo berhak dapet 20%-nya (Rp 10 Juta). Masuk kantong tanpa kerja (Passive Income).
2.  **Capital Gain (Kenaikan Harga)**: 5 tahun lagi Warkopnya jadi terkenal banget. Ada orang mau beli kepemilikan lo seharga Rp 100 Juta (Padahal modal lo cuma 20 Juta). Lo untung 5x lipat!

Di Bursa Efek Indonesia (IDX), konsepnya sama persis. Bedanya, warungnya ganti jadi **Bank BCA (BBCA), Telkomsel (TLKM), Indomie (ICBP)**, dll. Lo bisa jadi bos Indomie cuma dengan modal ratusan ribu perak!

### Bab 3: Peta Jalan (Investor vs Trader) 🗺️
Jangan salah kostum. Tentukan identitas lo dari sekarang:

1.  **Investor (Si Petani)** 🌱
    *   **Gaya:** Beli saham perusahaan bagus, simpan bertahun-tahun (Tidur nyenyak).
    *   **Fokus:** Kualitas bisnis. "Apakah bank ini bakal bangkrut 10 tahun lagi?"
    *   **Contoh:** Lo Beli BBCA buat dana pensiun.
2.  **Trader (Si Pedagang)** 🏪
    *   **Gaya:** Beli pagi, jual sore (atau seminggu lagi). Cari selisih harga jangka pendek.
    *   **Fokus:** Grafik harga (Teknikal). "Grafiknya lagi nanjak atau nukik?"
    *   **Contoh:** Lo beli ANTM karena harga emas lagi naik, minggu depan dijual.
3.  **Gambler (Si Penjudi - JANGAN DITIRU)** 🎲
    *   **Gaya:** Denger kata temen/influencer, langsung HAKA (Hajar Kanan) pake uang pinjol.
    *   **Ending:** Nangis di pojokan.

### Tugas Hari Ini ✅
1.  Renungkan: Lo tipe yang mana? Mau santai kayak Investor atau agresif kayak Trader? (Pemula disarankan jadi Investor dulu sambil belajar trading).
2.  Siapkan KTP & NPWP (kalau ada) buat materi besok. Kita bakal buka rekening saham!
`
  },
  {
    day: 2,
    title: "Membuka Gerbang Harta: Memilih Sekuritas & RDN Anti-Ribet",
    category: "Mindset",
    description: "Langkah teknis pertama memiliki 'Bank Pribadi'. Kupas tuntas cara kerja RDN, struktur pasar modal, dan trik memilih sekuritas dengan fee termurah.",
    keyPoints: ["Struktur Pasar Modal (BEI, KPEI, KSEI)", "RDN vs Rekening Pribadi", "Fee Beli & Jual"],
    isCompleted: false,
    content: `
# Senjata Perang: Aplikasi & Rekening Saham ⚔️

Mau beli saham BBCA? Gak bisa datang ke kantor BCA bawa duit cash terus bilang "Mbak, beli sahamnya dong". Satpamnya bakal bingung.
Lo butuh perantara namanya **SEKURITAS (Broker)**.

### Bab 1: Peta Pasar Modal Indonesia 🇮🇩
Biar gak bingung siapa boss-nya:

${VISUAL_PLACEHOLDER("Diagram Alur: OJK (Pengawas) -> BEI/IDX (Mall-nya) -> KPEI & KSEI (Kasir & Gudang) -> Sekuritas (Toko) -> Investor (Kita)")}

*   **OJK**: Polisi-nya. Mengawasi biar gak ada tipu-tipu.
*   **BEI (Bursa Efek Indonesia)**: Mall-nya. Tempat lapak jualan saham digelar.
*   **KPEI & KSEI**: Ini "Back Office". KPEI ngurusin duit, KSEI ngurusin barang (saham) biar tersimpan aman secara digital.
*   **Sekuritas**: Aplikasi di HP lo (Ajaib, Stockbit/Bibit, IPOT, Mirae). Lo cuma berurusan sama ini.

### Bab 2: Apa itu RDN? (Rekening Dana Nasabah) 💳
Ini rekening bank KHUSUS buat investasi.
*   Atas nama **LO SENDIRI**.
*   Gak ada kartu ATM-nya.
*   Fungsinya cuma buat nampung duit top-up buat beli saham, dan nampung hasil penjualan saham.
*   **Aman gak?** Aman banget. Kalau Sekuritas bangkrut, duit di RDN tetep aman karena ada di Bank (BCA/Mandiri/dll), bukan di kantong Sekuritas.

### Bab 3: Fee Transaksi (Pajak Jual Beli) 🧾
Broker hidup dari mana? Dari fee setiap kali lo klik tombol Buy atau Sell.
*   **Fee Beli**: Sekitar **0.15%**. (Lo beli 1 juta, kepotong Rp 1.500).
*   **Fee Jual**: Sekitar **0.25%**. (Lebih mahal karena ada pajak PPh Final 0.1% ke negara).

> **Rumus Cuan:** Saham lo harus naik minimal **0.5% - 0.6%** baru lo balik modal (Break Even Point).
> Jadi jangan scalping naik 1 tik (0.2%) langsung dijual, itu mah kerja bakti buat broker!

### Tugas Hari Ini ✅
1.  Download salah satu aplikasi sekuritas resmi OJK (Stockbit, Ajaib, IPOT, atau Mirae Asset).
2.  Lakukan registrasi online (KYC). Siapkan KTP dan foto selfie.
3.  Tunggu email konfirmasi RDN jadi (biasanya 1-2 hari kerja).
`
  },
  {
    day: 3,
    title: "Bahasa Matrix: Membaca Bid, Offer, dan Transaksi Misterius",
    category: "Technical",
    description: "Menguasai 'Papan Skor' pasar saham. Pelajari psikologi di balik antrian Bid/Offer, satuan Lot, dan kenapa harga saham bisa lompat-lompat.",
    keyPoints: ["Satuan Lot", "Fraksi Harga", "Bid vs Offer Strategy", "Jam Bursa"],
    isCompleted: false,
    content: `
# Membaca Bahasa Matriks (Order Book) 📟

Saat lo buka aplikasi saham, lo bakal liat angka warna-warni gerak cepet banget. Jangan panik. Itu namanya **Order Book**. Mari kita bedah.

### Bab 1: Aturan Main Dasar
1.  **LOT**: Satuan beli saham. Lo gak bisa beli 1 lembar. Minimal 1 Lot.
    *   **1 LOT = 100 Lembar**.
    *   Contoh: Harga BBRI Rp 5.000. Modal minimal = 5.000 x 100 = **Rp 500.000**.
2.  **Jam Perdagangan (WIB)**:
    *   Senin-Kamis: Sesi I (09:00-12:00) & Sesi II (13:30-16:00).
    *   Jumat: Sesi I (09:00-11:30) & Sesi II (14:00-16:00).
    *   Sabtu/Minggu/Tanggal Merah: Libur (Pasar Tutup).

### Bab 2: Bid vs Offer (Permintaan vs Penawaran)
Ini adalah inti dari pergerakan harga.

${VISUAL_PLACEHOLDER("Tampilan Order Book Aplikasi: Kolom Bid (Hijau) di Kiri & Offer (Merah) di Kanan")}

*   **BID (Kolom Kiri/Hijau)**: Antrian Pembeli.
    *   Orang-orang yang mau beli tapi nawar murah.
    *   Semakin atas, semakin mahal nawarnya (Prioritas dapet barang).
*   **OFFER (Kolom Kanan/Merah)**: Antrian Penjual.
    *   Orang-orang yang majang dagangan.
    *   Semakin atas, semakin murah jualnya (Prioritas barang laku).

**Istilah Gaul Trader:**
1.  **HAKA (Hajar Kanan)**: Beli langsung di harga Offer paling atas. Gak pake antri. Barang langsung dapet. -> *Dilakukan kalau yakin harga mau terbang.*
2.  **HAKI (Hajar Kiri)**: Jual langsung di harga Bid paling atas. Gak pake antri. Barang langsung laku/jadi duit. -> *Dilakukan kalau panik atau mau take profit cepet.*
3.  **Jemur**: Pasang antrian beli di harga bawah (Bid), berharap ada yang ngebuang barang.

### Bab 3: Fraksi Harga (Tangga Harga)
Harga saham naik/turun ada aturannya, gak sembarangan.
*   Harga < Rp 200: Naik/Turun Rp 1.
*   Harga Rp 200 - Rp 500: Naik/Turun Rp 2.
*   Harga Rp 500 - Rp 2.000: Naik/Turun Rp 5.
*   Harga Rp 2.000 - Rp 5.000: Naik/Turun Rp 10.
*   Harga > Rp 5.000: Naik/Turun Rp 25.

### Tugas Hari Ini ✅
1.  Buka aplikasi (kalau akun belum jadi, pakai mode Virtual/Demo).
2.  Cari saham **BBCA**. Lihat Order Book-nya.
3.  Coba hitung: Kalau lo mau beli 10 Lot BBCA dengan cara HAKA, butuh modal berapa? (Harga Offer teratas x 100 x 10).
`
  },
  {
    day: 4,
    title: "Bedah Laporan Keuangan: Membedakan Emas vs Sampah dalam 5 Menit",
    category: "Fundamental",
    description: "Cara membaca 'Raport' perusahaan tanpa pusing. Fokus pada 3 angka kunci untuk mengetahui apakah perusahaan sehat atau sekarat.",
    keyPoints: ["Revenue vs Net Profit", "EPS (Earning Per Share)", "Market Cap (Bluechip vs Gorengan)"],
    isCompleted: false,
    content: `
# Dokter Saham: Cek Kesehatan Perusahaan 🩺

Analisis Fundamental itu menjawab pertanyaan: **"Saham APA yang layak gue beli?"**
Ingat, membeli saham = membeli bisnis. Lo gak mau kan beli bisnis yang mau bangkrut?

### Bab 1: Tiga Pilar Laporan Keuangan (Simplified)
Gak perlu jadi akuntan. Cukup cek 3 angka ini di menu *Key Stats* atau *Financials*:

1.  **Revenue (Pendapatan/Omzet)** 💰
    *   *Pertanyaan:* "Jualan lo laku gak?"
    *   *Cari:* Grafiknya harus **NAIK** terus tiap tahun. Kalau turun, berarti produknya mulai ditinggalkan.
2.  **Net Profit (Laba Bersih)** 💵
    *   *Pertanyaan:* "Setelah bayar gaji, listrik, utang, sisa duit lo berapa?"
    *   *Cari:* Wajib **POSITIF** dan **BERTUMBUH**. Hati-hati sama perusahaan yang Revenuenya naik tapi Profitnya turun (berarti boros/efisiensi buruk).
3.  **Net Profit Margin (NPM)** %
    *   *Pertanyaan:* "Dari duit 100 ribu, untung bersihnya berapa?"
    *   *Cari:* Di atas 10% itu bagus. Di atas 20% itu istimewa (Bisnis kuat, gak perang harga).

### Bab 2: Market Cap (Berat Badan Saham)
Ini buat nentuin "Kelas" sahamnya. Rumusnya: *Harga Saham x Jumlah Saham Beredar*.

1.  **First Liner (Bluechip / Big Cap)** 🐘
    *   Market Cap > Rp 100 Triliun. (Contoh: BBCA, BBRI, BMRI, TLKM, ASII).
    *   **Sifat:** Jalannya lambat tapi stabil. Susah digoreng bandar. Anti badai.
    *   **Cocok buat:** Pemula, Nabung Saham, Dana Pensiun.
2.  **Second Liner (Mid Cap)** 🐎
    *   Market Cap Rp 10 T - 100 T. (Contoh: MAPI, ACES, PWON).
    *   **Sifat:** Lari lebih kencang dari Bluechip, tapi kalau jatuh lumayan sakit.
3.  **Third Liner (Small Cap / Gorengan)** kancil
    *   Market Cap < Rp 10 Triliun.
    *   **Sifat:** Gesit banget. Bisa naik 20% sehari, besoknya turun 20%. Rawan dimanipulasi bandar.
    *   **Cocok buat:** Trader berpengalaman. Pemula minggir dulu.

### Studi Kasus: Unilever (UNVR) vs Bank BCA (BBCA) 📊
*   Cek chart 5 tahun terakhir.
*   **BBCA**: Laba naik terus -> Harga saham naik terus (Uptrend).
*   **UNVR**: Laba stagnan/turun -> Harga saham turun terus (Downtrend).
*   *Pelajaran:* Harga saham jangka panjang SELALU mengikuti kinerja laba perusahaan.

### Tugas Hari Ini ✅
1.  Cari kode saham **GOTO** dan **BBRI** di aplikasi.
2.  Bandingkan **Net Profit** tahunan mereka. Mana yang hijau (untung), mana yang merah (rugi)?
3.  Tulis di catatan: Kenapa lo lebih milih salah satunya?
`
  },
  {
    day: 5,
    title: "Seni Menawar: Teknik Valuasi PER & PBV untuk Saham Diskon",
    category: "Fundamental",
    description: "Jangan beli barang bagus di harga mahal! Pelajari cara menghitung 'Harga Wajar' agar tidak terjebak membeli saham di pucuk.",
    keyPoints: ["PER (Price Earning Ratio)", "PBV (Price to Book Value)", "Undervalued vs Overvalued"],
    isCompleted: false,
    content: `
# Barang Bagus, Harga Murah? (Valuasi) 🏷️

Oke, perusahaannya untung gede (Laba bagus). Tapi apakah layak beli SEKARANG?
Jangan sampe lo beli iPhone 15 tapi harganya Rp 50 juta. Itu namanya **Overvalued** (Kemahalan). Kita cari yang **Undervalued** (Salah Harga/Diskon).

### Bab 1: PBV (Price to Book Value)
Rasio Harga Saham dibanding Modal Bersih (Kekayaan) perusahaan.
*   **PBV = 1x**: Harga wajar (Fair). Lo beli uang 1000 seharga 1000.
*   **PBV < 1x**: Diskon! (Undervalued). Lo beli uang 1000 seharga 800 perak.
*   **PBV > 1x**: Premium (Mahal).

*Catatan:* Saham bank bagus (BBCA) wajar punya PBV 4x-5x karena kualitasnya premium. Saham batubara (ADRO, PTBA) biasanya wajar di PBV 1x-1.5x. Bandingkan dengan sesama sektornya (Apple to Apple).

### Bab 2: PER (Price to Earning Ratio)
Berapa tahun modal lo balik kalau cuma ngarepin laba perusahaan?
*   Rumus: Harga Saham / Laba per Lembar (EPS).
*   **Analogi Warung Bakso:**
    *   Warung A: Untung 10 juta/tahun. Dijual seharga 50 juta. (PER = 5x). -> Balik modal 5 tahun.
    *   Warung B: Untung 10 juta/tahun. Dijual seharga 200 juta. (PER = 20x). -> Balik modal 20 tahun.
*   Lo pilih mana? Warung A kan? Karena lebih cepat balik modal (Lebih Murah).
*   **Rule of Thumb:** Cari saham dengan PER di bawah 10x atau 15x (Tergantung sektor).

### Bab 3: Jebakan Valuasi Murah (Value Trap) ⚠️
Hati-hati! Ada saham yang PBV 0.3x (Murah banget) dan PER 3x, TAPI harganya turun terus. Kenapa?
*   Mungkin perusahaannya mau bangkrut.
*   Mungkin manajemennya korup.
*   Mungkin sektornya udah mati (Sunset Industry).
*   *Pelajaran:* Murah aja gak cukup. Harus **Murah + Laba Bertumbuh + Manajemen Bagus**.

### Tugas Hari Ini ✅
1.  Bandingkan Valuasi 2 Saham Batubara: **ADRO** vs **PTBA**.
2.  Catat PER dan PBV masing-masing hari ini.
3.  Mana yang secara teori lebih murah?
`
  },
  {
    day: 6,
    title: "Gaji Ke-13: Strategi Panen Dividen & Menghindari Jebakan Batman",
    category: "Fundamental",
    description: "Cara mendapatkan transferan tunai rutin dari perusahaan raksasa. Waspada strategi Dividend Trap yang sering memakan korban pemula.",
    keyPoints: ["Dividend Yield", "Cum Date & Ex Date", "Dividend Trap Strategy"],
    isCompleted: false,
    content: `
# Tidur Pun Dibayar: The Power of Dividend 💤

Salah satu kenikmatan jadi investor saham adalah dapet bagi hasil keuntungan perusahaan, yang disebut **Dividen**. Ini kayak dapet THR atau Gaji ke-13, padahal lo cuma diem aja.

### Bab 1: Istilah Wajib Tau
1.  **Dividend Payout Ratio (DPR)**: Berapa persen laba yang dibagiin?
    *   Misal Laba 1 Triliun. DPR 50%. Berarti 500 Miliar dibagi ke pemegang saham, 500 Miliar disimpen buat modal ekspansi (Laba Ditahan).
2.  **Dividend Yield (%)**: Tingkat bunga yang lo dapet.
    *   Rumus: (Nominal Dividen / Harga Saham Lo) x 100%.
    *   Contoh: Harga saham 1000. Dividen 100 perak. Yield = 10%. (Jauh lebih gede dari Deposito yang cuma 3%!).
    *   *Raja Dividen di Indo:* Biasanya saham Batubara (ITMG, PTBA, ADRO) dan Bank Daerah (BJBR, BJTM). Yield bisa 10-20%!

### Bab 2: Kalender Dividen (Timeline) 🗓️
Jangan asal beli! Waktu adalah kunci.
1.  **Cum Date (Hari Penentuan)**: Hari TERAKHIR lo wajib punya sahamnya kalau mau dapet dividen. Lo beli sore pas tutup pasar pun tetep dapet.
2.  **Ex Date (Hari Basi)**: Hari dimana lo beli saham, udah GAK dapet dividen. Biasanya sehari setelah Cum Date.
3.  **Payment Date**: Hari duit masuk ke RDN lo. Tinggal jajan!

### Bab 3: Awas Jebakan Batman (Dividend Trap) 🦇
Ini kesalahan klasik pemula.
*   **Skenario:** Saham A mau bagi dividen gede (Yield 15%).
*   **Kejadian:** Pas *Cum Date*, harga saham naik tinggi (pada rebutan).
*   **Tragedi:** Besok paginya pas *Ex Date*, harga saham langsung **ANJLOK** sedalam dividennya (misal turun 15% atau ARB).
*   **Hasil:** Dapet dividen sih, tapi harga sahamnya nyangkut dalam. Sama aja bohong.
*   *Tips:* Kalau mau incar dividen, beli dari jauh-jauh hari (sebulan sebelum RUPS). Jangan beli pas Cum Date!

### Tugas Hari Ini ✅
Cek di aplikasi sekuritas atau Google: "Jadwal Dividen Saham Indonesia Hari Ini". Ada yang mau bagi-bagi duit gak dalam waktu dekat?
`
  },
  {
    day: 7,
    title: "Mental Baja: Mengalahkan Fear, Greed, dan FOMO",
    category: "Mindset",
    description: "Musuh terbesar bukan pasar, tapi diri sendiri. Teknik psikologi untuk tetap tenang saat market crash dan tidak serakah saat market terbang.",
    keyPoints: ["Fear & Greed", "FOMO (Fear of Missing Out)", "Jangan Pakai Uang Panas"],
    isCompleted: false,
    content: `
# Minggu 1 Selesai: Cek Mental Dulu! 🧠

Selamat! Lo udah lulus TK Saham. Lo udah ngerti fundamental, valuasi, dan mekanisme pasar.
Tapi ingat: **90% Trader gagal bukan karena bodoh, tapi karena TIDAK DISIPLIN.**

### Bab 1: Dua Setan di Pundak Trader 👿
1.  **Greed (Serakah / FOMO)** 🤑
    *   *Gejala:* Liat saham gorengan naik 20% sehari. Temen pamer cuan di Instastory. Hati panas.
    *   *Tindakan Bodoh:* Langsung HAKA di pucuk tanpa analisa.
    *   *Akibat:* Harga berbalik turun. Nyangkut di pucuk pohon cemara.
2.  **Fear (Ketakutan)** 😨
    *   *Gejala:* Harga saham bagus lagi diskon (merah), fundamental oke. Tapi takut "Gimana kalau turun lagi?".
    *   *Tindakan Bodoh:* Gak berani beli (Wait and see terus). Atau malah Cut Loss di dasar lembah (Panic Selling).
    *   *Akibat:* Harga rebound naik. Nyesel seumur hidup.

### Bab 2: Dosa Besar Investor Pemula
1.  **Pakai Uang Panas**: Uang SPP anak, uang dapur, uang pinjol. **HARAM HUKUMNYA.**
    *   Psikologi lo bakal hancur. Saham turun dikit lo bakal stres setengah mati karena uangnya mau dipake besok.
    *   Gunakan **Uang Dingin**: Uang yang kalau ilang, lo cuma nangis semalam tapi besok tetep bisa makan.
2.  **Tidak Punya Plan**: Beli dulu, mikir nanti. "Liat nanti aja deh". Ini resep bencana.
3.  **Average Down di Saham Busuk**: Udah rugi, malah beli lagi biar harga rata-rata turun. Padahal perusahaannya mau bangkrut. Itu namanya gali kubur sendiri.

### Bab 3: Persiapan Minggu 2 (Teknikal)
Minggu depan kita akan belajar jadi "Peramal". Kita akan baca grafik, garis trend, dan pola harga.
Fundamental menjawab "Apa yang dibeli". Teknikal menjawab "Kapan harus beli". Kombinasi keduanya adalah kunci cuan maksimal.

### Tugas Akhir Pekan ✅
*   Isi saldo RDN lo dengan nominal kecil dulu (Rp 100rb - 1 Juta) buat "Uang Belajar". Anggap biaya kuliah. Siap hilang.
*   Istirahat. Pasar tutup. Nikmati hidup.
`
  },
  
  // ==============================
  // Week 2: Technical Analysis (The Sniper Scope)
  // ==============================
  {
    day: 8,
    title: "Candlestick Mastery: Membaca Emosi & Perang Harga di Pasar",
    category: "Technical",
    description: "Grafik saham bukan sekadar garis. Pelajari kisah pertarungan antara Pembeli (Bull) dan Penjual (Bear) dalam satu batang lilin.",
    keyPoints: ["Anatomi Candle (OHLC)", "Bullish vs Bearish", "Arti Ekor (Shadow) Panjang"],
    isCompleted: false,
    content: `
# Membaca Jejak Perang (Candlestick) 🕯️

Analisis Teknikal itu sebenernya ilmu **Psikologi Massa**. Kita baca grafik untuk tau: *Orang-orang lagi pada optimis (beli) atau panik (jual)?*
Alat utamanya bukan garis biasa, tapi **Japanese Candlestick**.

### Bab 1: Anatomi Satu Lilin
Satu batang lilin menceritakan kisah satu hari (kalau pakai Timeframe Daily). Dia ngasih tau 4 angka sakti (OHLC):
*   **O (Open)**: Harga pas pasar buka jam 09:00.
*   **H (High)**: Harga tertinggi yang disentuh hari itu.
*   **L (Low)**: Harga terendah yang disentuh hari itu.
*   **C (Close)**: Harga final pas pasar tutup jam 16:00.

${VISUAL_PLACEHOLDER("Gambar Candlestick Hijau vs Merah lengkap dengan keterangan Body dan Ekor (Shadow)")}

### Bab 2: Warna Warni Kehidupan
*   **Hijau (Bullish / Banteng)** 🐂: Harga TUTUP lebih TINGGI dari Buka.
    *   *Artinya:* Pembeli menang. Semangat belanja tinggi. Harga didorong naik.
*   **Merah (Bearish / Beruang)** 🐻: Harga TUTUP lebih RENDAH dari Buka.
    *   *Artinya:* Penjual menang. Banyak yang buang barang. Harga ditekan turun.

### Bab 3: Rahasia di Balik Ekor (Shadow)
Jangan cuma liat body (batang) lilinnya. Liat ekornya (garis tipis di atas/bawah).
*   **Ekor Bawah Panjang (Hammer)** 🔨:
    *   *Cerita:* Pagi-pagi harga dibanting murah banget, TAPI siangnya dilawan sama pembeli sampai naik lagi ke atas.
    *   *Sinyal:* Ada **Daya Beli Kuat** di bawah. Penolakan untuk turun. Potensi harga bakal naik besoknya. (Bullish Reversal).
*   **Ekor Atas Panjang (Shooting Star)** ☄️:
    *   *Cerita:* Pagi-pagi harga naik tinggi, TAPI sorenya diguyur jualan sampai tutup di bawah.
    *   *Sinyal:* Pembeli nyerah. Penjual ngamuk. Potensi harga bakal turun.

### Tugas Hari Ini ✅
1.  Buka chart saham **ANTM** atau **BBRI**.
2.  Cari bentuk candle dengan **Ekor Bawah Panjang** (Hammer).
3.  Cek apa yang terjadi besoknya? Apakah harga naik? (Biasanya iya).
`
  },
  {
    day: 9,
    title: "Trend Following: Cara Santai Cuan Mengikuti Arus Raksasa",
    category: "Technical",
    description: "Prinsip No.1 Trading: The Trend is Your Friend. Deteksi arah pasar (Uptrend/Downtrend) dan jangan pernah melawan arus sungai.",
    keyPoints: ["Market Structure (HH, HL, LH, LL)", "Menggambar Trendline", "Kapan Trend Patah?"],
    isCompleted: false,
    content: `
# The Trend is Your Friend 🌊

Ibarat berenang di sungai, kalau ngikut arus lo bakal cepet sampai tanpa capek. Kalau lawan arus? Lo bakal kehabisan tenaga dan tenggelam.
Di saham juga sama. Jangan beli saham yang trennya lagi turun (Downtrend) cuma karena "keliatan murah". Itu namanya nangkep pisau jatuh.

### Bab 1: Tiga Jenis Arus
1.  **Uptrend (Naik / Bullish)** 🚀
    *   *Ciri:* Puncak gunungnya makin tinggi (**Higher High**) & Lembahnya juga makin tinggi (**Higher Low**).
    *   *Strategi:* Cari kesempatan **BELI** pas harga lagi koreksi (istirahat) dikit.
2.  **Downtrend (Turun / Bearish)** 📉
    *   *Ciri:* Puncak makin rendah (**Lower High**), Lembah makin dalam (**Lower Low**).
    *   *Strategi:* **JANGAN BELI**. Biarin aja jatoh dulu sampai mentok. Cash is King.
3.  **Sideways (Datar / Galau)** 😐
    *   *Ciri:* Harga main ping-pong di situ-situ aja. Gak bikin high baru, gak bikin low baru.
    *   *Strategi:* Beli di bawah (Support), Jual di atas (Resistance). Main Tek-tok.

### Bab 2: Cara Menggambar Trendline (Garis Ajaib) 📏
Ambil penggaris (Tools Trendline di chart).
*   **Uptrend**: Hubungkan pantat-pantat (lembah) candle dari bawah ke atas. Selama harga masih di atas garis ini, aman.
*   **Downtrend**: Hubungkan kepala-kepala (puncak) candle dari atas ke bawah. Selama harga belum jebol garis ini ke kanan, jangan masuk.

${VISUAL_PLACEHOLDER("Grafik Saham Uptrend dengan garis trendline diagonal ke atas menghubungkan titik terendah (Higher Lows)")}

### Bab 3: Patah Tren (Trend Reversal) 💔
Kapan Uptrend berakhir?
Saat harga jebol garis trendline ke bawah DAN gagal bikin Higher High baru.
Itu sinyal **JUAL SEMUA**. Pesta sudah berakhir.

### Tugas Hari Ini ✅
1.  Cari saham yang lagi **UPTREND** jelas (Garisnya nanjak dari kiri bawah ke kanan atas).
2.  Cari saham yang lagi **DOWNTREND** parah.
3.  Rasakan bedanya secara visual. Mata lo harus terlatih liat ini dalam 3 detik.
`
  },
  {
    day: 10,
    title: "Support & Resistance: Titik Sakti Entry & Exit Presisi",
    category: "Technical",
    description: "Mengetahui di mana 'Lantai' untuk membeli dan 'Atap' untuk menjual. Rahasia agar tidak membeli di pucuk dan menjual di dasar.",
    keyPoints: ["Psikologi Support/Resistance", "Support Become Resistance (Flip)", "Strategi Buy on Support vs Breakout"],
    isCompleted: false,
    content: `
# Konsep Paling Penting: Lantai & Atap 🏠

Support & Resistance (SnR) adalah area di mana "Perang Harga" sering terjadi.

### Bab 1: Definisi Simpel
1.  **Support (Lantai)**: Area harga di mana harga susah tembus ke bawah.
    *   *Kenapa?* Karena di harga segitu, banyak orang mikir "Wah murah nih!", jadi pada antri **BELI**. Permintaan naik > Harga mantul naik.
    *   *Aksi:* Area terbaik buat **BELI (Buy on Weakness)**.
2.  **Resistance (Atap)**: Area harga di mana harga susah tembus ke atas.
    *   *Kenapa?* Karena di harga segitu, orang yang beli di bawah mikir "Udah untung nih, jual ah!". Pada antri **JUAL**. Penawaran naik > Harga mantul turun.
    *   *Aksi:* Area terbaik buat **JUAL (Take Profit)**.

### Bab 2: Role Reversal (Tukar Nasib) 🔄
Ini ajaibnya.
Kalau **ATAP (Resistance)** berhasil dijebol ke atas (Breakout), maka atap itu akan berubah fungsi menjadi **LANTAI (Support)** baru yang kuat.
Bayangkan lo naik tangga ke lantai 2. Plafon lantai 1 sekarang jadi pijakan kaki lo di lantai 2.

${VISUAL_PLACEHOLDER("Ilustrasi Rumah Tingkat: Harga jebol plafon (Resistance), lalu plafon itu jadi lantai (Support) untuk tingkat berikutnya")}

### Bab 3: Strategi Entry (Kapan Masuk?)
1.  **Buy on Support**: Pas harga turun nyentuh lantai, tunggu konfirmasi candle hijau (mantul), baru beli. Stoploss di bawah lantai dikit. (Low Risk).
2.  **Buy on Breakout**: Pas harga ngejebol atap dengan **Volume Besar**. Artinya tenaga beli kenceng banget sampai atapnya jebol. Harga bakal lari kencang. (High Risk, High Return).

### Awas False Break (Nge-Prank) ⚠️
Kadang harga jebol Resistance dikit, eh sorenya masuk lagi ke dalem. Itu namanya False Break. Bandar lagi ngejebak trader breakout.
*Kuncinya:* Liat **VOLUME**. Kalau jebol tapi volume sepi, 90% itu tipuan. Jangan dikejar.
`
  },
  {
    day: 11,
    title: "Moving Average: Garis Ajaib Penunjuk Arah & Kapan Harus Kabur",
    category: "Technical",
    description: "Indikator sejuta umat yang wajib dipasang. Pelajari sinyal Golden Cross untuk beli dan Death Cross untuk menyelamatkan aset.",
    keyPoints: ["MA20, MA50, MA200", "Golden Cross", "Death Cross", "Dynamic Support"],
    isCompleted: false,
    content: `
# Indikator Paling Populer: Moving Average (MA) 📈

Kalau Support/Resistance klasik itu garis lurus statis, **Moving Average (MA)** itu garis yang meliuk-liuk ngikutin rata-rata harga. Ini alat bantu biar lo gak bias liat tren.

### Bab 1: Settingan Wajib Trader
Di aplikasi chart, pasang indikator ini:
1.  **MA 20 (Garis Merah)**: Rata-rata harga sebulan (20 hari bursa). Buat liat tren jangka pendek.
2.  **MA 200 (Garis Hitam)**: Rata-rata harga setahun. Ini "Tembok Beton".
    *   Harga di ATAS MA200 = **Major Uptrend** (Saham Sehat). ✅
    *   Harga di BAWAH MA200 = **Major Downtrend** (Saham Sakit). ❌

### Bab 2: Sinyal Beli & Jual (Crossover)
1.  **Golden Cross (Sinyal Emas)** ✨
    *   Garis Kecil (MA20) memotong Garis Besar (MA50/MA200) dari **BAWAH ke ATAS**.
    *   *Artinya:* Momentum jangka pendek lagi kenceng banget mengalahkan tren jangka panjang. Awal fase Bullish. **GAS BELI.**
2.  **Death Cross (Sinyal Kematian)** ☠️
    *   Garis Kecil memotong Garis Besar dari **ATAS ke BAWAH**.
    *   *Artinya:* Tren naik udah abis. Badai datang. **JUAL SEMUA & KABUR.**

${VISUAL_PLACEHOLDER("Chart dengan Garis MA20 dan MA50 yang bersilangan (Golden Cross)")}

### Bab 3: MA sebagai Lantai Dinamis
Pas tren lagi naik kuat (Strong Uptrend), harga biasanya gak nyentuh garis trendline bawah, tapi dia "numpang" di garis MA20.
Setiap kali harga turun nyentuh MA20, dia mantul lagi.
*Strategi:* Pasang jaring beli di titik MA20.

### Tugas Hari Ini ✅
Cek saham **IHSG** (Composite) hari ini. Apakah posisinya di atas garis MA200 atau di bawah? Itu menentukan nasib pasar saham Indonesia lagi baik atau buruk.
`
  },
  {
    day: 12,
    title: "Volume Analysis: Detektor Kebohongan Pergerakan Harga",
    category: "Technical",
    description: "Harga bisa menipu, tapi Volume tidak. Deteksi apakah kenaikan harga itu valid atau hanya pancingan bandar sebelum dibanting.",
    keyPoints: ["Price vs Volume Logic", "Volume Spikes", "Divergence Volume", "Breakout Validation"],
    isCompleted: false,
    content: `
# Volume: Detektor Kebohongan 🕵️‍♂️

Harga bisa dimanipulasi bandar (digambar chart-nya), tapi **Volume** (jumlah lot yang transaksi) susah dibohongi karena butuh duit beneran.
Bayangin mobil nanjak (Harga Naik). Kalau gasnya ditekan dalem (Volume Gede), nanjaknya kuat. Kalau gak digas (Volume Kecil), nanjaknya ngeden, bentar lagi mundur.

### Bab 1: Rumus Logika Volume
1.  **Harga Naik + Volume Besar** = ✅ Valid. Tren Kuat. "Market setuju harga naik". Ikut Beli.
2.  **Harga Naik + Volume Kecil** = ⚠️ Rapuh. "Gak ada yang minat sebenernya". Hati-hati, rawan jatuh tiba-tiba.
3.  **Harga Turun + Volume Besar** = 🆘 Panic Selling. "Semua orang kabur". Jangan ditangkep, biarin jatuh dulu.
4.  **Harga Turun + Volume Kecil** = 💤 Wajar. Koreksi sehat. "Cuma ritel profit taking dikit, bandar masih hold". Pantau buat serok.

### Bab 2: Volume Spike (Tiang Listrik) ⚡
Liat grafik volume di bawah chart. Kalau rata-rata tiangnya pendek, tiba-tiba muncul **Satu Tiang Tinggi Banget**...
*   Itu tandanya **BIG PLAYER** (Gajah/Bandar) baru aja masuk atau keluar.
*   Kalau tiang tinggi itu warnanya Hijau (Pas harga naik), berarti **Akumulasi Besar-besaran**. Ikuti!

### Bab 3: Validasi Breakout
Ingat materi Lantai & Atap (Day 10)?
Kunci Breakout yang sukses adalah **VOLUME**.
*   Jebol Resistance + Volume Meledak = **Real Breakout**. (Buy).
*   Jebol Resistance + Volume Sepi = **False Break**. (Don't Buy).

### Tugas Hari Ini ✅
Cari saham yang hari ini naik tinggi (Top Gainer). Cek volumenya. Apakah tiang volumenya lebih tinggi dari rata-rata hari kemarin? Kalau iya, itu saham kuat.
`
  },
  {
    day: 13,
    title: "Chart Patterns: Mencontek Pola Masa Depan (Cup & Handle, Double Bottom)",
    category: "Technical",
    description: "Sejarah selalu berulang. Kenali pola-pola grafik legendaris yang memberi sinyal probabilitas tinggi arah harga selanjutnya.",
    keyPoints: ["Reversal Patterns (M & W)", "Continuation Patterns (Flags, Pennant)", "Cup and Handle"],
    isCompleted: false,
    content: `
# Membaca Awan di Langit (Chart Patterns) ☁️

Manusia punya kebiasaan yang berulang. Karena pasar digerakkan manusia, grafik juga membentuk pola-pola tertentu yang bisa diprediksi.

### Bab 1: Pola Pembalikan (Reversal) 🔄
Tanda tren mau berubah arah. Hati-hati di sini.
1.  **Double Top (Huruf M)**:
    *   Harga coba naik jebol atap 2 kali, gagal terus. Tandanya pembeli capek.
    *   *Sinyal:* Siap-siap terjun bebas. **JUAL.**
2.  **Double Bottom (Huruf W)**:
    *   Harga coba turun jebol lantai 2 kali, gak tembus-tembus. Tandanya lantai kuat.
    *   *Sinyal:* Siap-siap terbang. **BELI.**
3.  **Head & Shoulders**:
    *   Pola Bahu Kiri - Kepala - Bahu Kanan. Ini sinyal maut tren naik bakal berakhir. Kalau "Leher" (Neckline) jebol, harga bakal longsor sedalam tinggi kepalanya.

${VISUAL_PLACEHOLDER("Gambar Pola Double Bottom (W) sebagai sinyal beli dan Double Top (M) sebagai sinyal jual")}

### Bab 2: Pola Lanjut (Continuation) ➡️
Tanda harga cuma istirahat bentar (ambil napas) buat lanjut lari.
1.  **Bullish Flag (Bendera)**:
    *   Harga naik tiang tegak -> Konsolidasi miring turun dikit (kain bendera) -> Lanjut naik lagi setinggi tiang.
2.  **Cup and Handle (Cangkir Kopi)**:
    *   Bentuk mangkok (Cup) lalu bikin gagang kecil (Handle).
    *   Ini pola favorit trader Swing. Kalau gagangnya ditembus, target kenaikannya lumayan jauh.

### Tips Penting
Jangan sok tau nebak pola yang belum jadi.
Tunggu sampai pola itu **TERKONFIRMASI** (Breakout dari leher pola/garis konfirmasi), baru entry. Lebih baik telat dikit daripada salah tebak.
`
  },
  {
    day: 14,
    title: "Anti Bangkrut: Seni Cut Loss & Position Sizing Profesional",
    category: "Risk Management",
    description: "Teknikal jago tapi gak bisa atur duit = Bangkrut. Belajar Stop Loss dan The 2% Rule agar Anda bisa bertahan selamanya di pasar.",
    keyPoints: ["The 2% Rule", "Risk Reward Ratio 1:2", "Stop Loss vs Trailing Stop"],
    isCompleted: false,
    content: `
# Pengaman Nyawa: Money Management 🛡️

Minggu ke-2 selesai! Lo udah jago baca chart. TAPI... trader jago teknikal pun bisa miskin kalau gak punya **Money Management**.
Ini ilmu "Anti Bangkrut".

### Bab 1: The 2% Rule (Aturan 2 Persen)
Jangan pernah meresikokan lebih dari 2% total modal lo dalam SATU kali transaksi.
*   Modal Lo: Rp 10 Juta.
*   Risiko Maksimal per Trade: Rp 200.000.

Gimana hitungnya?
Lo mau beli saham ABCD di harga 1000. Cut Loss di 950 (Rugi 50 perak atau 5%).
*   Max Rugi: 200.000
*   Rugi per saham: 50
*   Jumlah lembar yang boleh dibeli: 200.000 / 50 = 4.000 lembar (40 Lot).
*   **Total Belanja:** 40 Lot x 1000 = Rp 4 Juta.

Jadi dari 10 juta modal, lo cuma pake 4 juta di saham ini. Kalau apes kena Cut Loss, modal lo cuma berkurang jadi Rp 9.8 Juta. Masih aman buat perang lagi.

### Bab 2: Risk Reward Ratio (R:R) ⚖️
Jangan dagang kalau ruginya gede, untungnya kecil. Judi itu namanya.
Cari peluang minimal **1:2**.
*   Risiko Rugi (Jarak ke Stoploss): 3%.
*   Potensi Untung (Jarak ke Target): 6% atau lebih.

Kalau potensi untung cuma 2% tapi risiko rugi 5%, **SKIP**. Jangan diambil. Cari chart lain.

### Bab 3: Stop Loss vs Trailing Stop
*   **Stop Loss (SL)**: Titik lo nyerah & ngaku salah. Jual rugi biar gak makin boncos. Wajib dipasang di awal.
*   **Trailing Stop (TS)**: Kunci keuntungan. Pas harga naik, naikin juga titik stop loss lo pelan-pelan.
    *   Contoh: Beli 1000. SL awal 950.
    *   Harga naik ke 1100 -> Geser SL ke 1050 (Kunci profit).
    *   Harga naik ke 1200 -> Geser SL ke 1150.
    *   Pas harga balik arah ke 1150, kejual otomatis. Lo tetep cuan gede!

### Tugas Akhir Pekan ✅
Hitung ulang portofolio lo. Apakah ada satu saham yang isinya lebih dari 50% modal lo? Kalau ada, hati-hati. Diversifikasi itu penting.
`
  },
  
  // ==============================
  // Week 3: Bandarmologi (The Dark Arts - Unique Selling Point)
  // ==============================
  {
    day: 15,
    title: "Mengenal Bandar: Siapa Penggerak Pasar Sebenarnya?",
    category: "Bandarmologi",
    description: "Di IDX, harga tidak bergerak sendiri. Kenali 'The Invisible Hand' (Market Maker) yang memiliki modal triliunan untuk menyetir harga.",
    keyPoints: ["Konsep Market Maker", "Broker Ritel vs Broker Institusi", "Asing vs Domestik"],
    isCompleted: false,
    content: `
# Follow The Giant (Bandarmologi) 🐋

Di Wall Street, data pembeli itu rahasia. Di Indonesia? Kita dikasih tau transparan lewat **Kode Broker**! (Walau sekarang ditutup pas jam bursa, sorenya tetep bisa diintip).
Manfaatkan ini. Kita mau jadi "Kutu" yang nemplok di punggung Gajah.

### Bab 1: Siapa itu Bandar?
Bandar (Market Maker) adalah pihak yang punya:
1.  **Modal Triliunan**.
2.  **Barang (Saham) Banyak**.
Mereka bisa nyetir harga mau dibawa naik atau turun. Tugas kita bukan ngelawan mereka, tapi **NEBENG**.

### Bab 2: Membaca Kode Broker (Broker Summary)
Tiap sore, cek data transaksi (Broxsum):
*   **Broker Ritel (Semut)**: YP (Mirae), PD (Indo Premier), CC (Mandiri), XC (Ajaib), NI (BNI), XL (Stockbit).
    *   *Ciri:* Transaksi sering tapi kecil-kecil. Suka panikan.
*   **Broker Bandar/Institusi (Gajah)**: ZP, KZ, AK, BK, RX, CS, ML. (Biasanya broker asing).
    *   *Ciri:* Sekali beli langsung miliaran. Tahan banting. Punya rencana jangka panjang.

### Bab 3: Logika Dasar Bandarmologi
Lihat Top 3 Buyer vs Top 3 Seller.
*   **Skenario 1 (Akumulasi):** Buyer-nya cuma 1-2 broker (Bandar), Seller-nya buanyak banget broker ritel.
    *   *Artinya:* Bandar lagi nyedot barang dari ritel yang panik. **POSITIVE (Bullish).**
*   **Skenario 2 (Distribusi):** Seller-nya cuma 1-2 broker (Bandar), Buyer-nya buanyak broker ritel.
    *   *Artinya:* Bandar lagi jualan/cuci piring, ritel disuruh bayar bill-nya. **NEGATIVE (Bearish).** Kabur!

### Tugas Hari Ini ✅
Cek Top Gainer hari ini. Buka menu Broker Summary.
Siapa Top Buyer-nya? Apakah broker kode YP/PD/CC (Ritel) atau ZP/BK/AK (Institusi)?
`
  },
  {
    day: 16,
    title: "Kode Broker: Membedakan Akumulasi Raksasa vs Distribusi Senyap",
    category: "Bandarmologi",
    description: "Belajar membaca Broker Summary. Bedakan saat Bandar sedang 'menghisap' barang (Akumulasi) atau sedang 'membuang' barang (Distribusi).",
    keyPoints: ["Fase Akumulasi (Sideways)", "Fase Mark-Up (Terbang)", "Fase Distribusi (Pucuk)", "Fase Mark-Down (Longsor)"],
    isCompleted: false,
    content: `
# Jangan Jadi Korban Cuci Piring 🍽️

Saham gorengan (Second/Third liner) itu siklusnya jelas banget. Jangan masuk di fase yang salah.

### Fase 1: Akumulasi (Pengumpulan) 🤫
*   **Kondisi:** Harga saham dibikin **BOSAN**. Sideways berbulan-bulan. Volume tipis.
*   **Tujuan:** Biar ritel (kita) frustasi "Kok gak naik-naik sih!", terus Cut Loss.
*   **Aksi Bandar:** Nampungin barang buangan ritel diem-diem.
*   **Strategi Kita:** Cicil beli, tapi harus sabar tingkat dewa.

### Fase 2: Mark-Up (Penerbangan) 🚀
*   **Kondisi:** Barang udah 90% di tangan Bandar. Tiba-tiba harga naik kenceng + Volume meledak.
*   **Katalis:** Muncul berita bagus, influencer mulai pom-pom.
*   **Tujuan:** Mancing ritel FOMO buat ngejar harga.
*   **Strategi Kita:** **RIDE THE WAVE.** Ikut beli pas breakout awal. Ini fase panen.

### Fase 3: Distribusi (Jualan Halus) 🤝
*   **Kondisi:** Harga udah di pucuk tinggi. Volatilitas tinggi (naik turun kenceng di atas).
*   **Broker Summary:** Bandar mulai jadi Top Seller, Ritel jadi Top Buyer.
*   **Tujuan:** Bandar mindahin barang ke tangan ritel yang baru masuk karena serakah.
*   **Strategi Kita:** **JUAL SEMUA.** Jangan serakah pengen jual di ujung jarum. Profit is Profit.

### Fase 4: Mark-Down (Banting Harga) 📉
*   **Kondisi:** Bandar udah cabut total. Harga terjun bebas (ARB berhari-hari).
*   **Korban:** Ritel yang nyangkut di pucuk mendadak jadi "Investor Jangka Panjang".
*   **Strategi Kita:** Tontonin aja. Jangan coba-coba nangkep pisau jatuh.

### Tugas Hari Ini ✅
Cari satu saham yang chart-nya lagi terjun bebas (ARB). Cek chart 3 bulan ke belakang. Bisakah lo identifikasi mana fase Akumulasi dan Mark-up nya?
`
  },
  {
    day: 17,
    title: "Combo Maut: Menggabungkan Teknikal & Data Bandar",
    category: "Bandarmologi",
    description: "Jurus mabuk paling presisi. Teknikal bilang 'Beli', tapi Bandarmologi bilang 'Jual', mana yang harus diikuti agar tidak terjebak?",
    keyPoints: ["Volume Confirmation", "Fake Breakout Detection", "Foreign Flow di Bluechip"],
    isCompleted: false,
    content: `
# The Ultimate Combo: Jurus Mabuk 🥋

Teknikal bilang "Beli", tapi Bandarmologi bilang "Jual". Ikut mana?
Gabungin keduanya biar Win Rate lo naik drastis!

### Skenario 1: The Perfect Storm (Gaspol) 🌪️
1.  **Teknikal**: Harga Breakout Resistance (Jebol Atap). Candle Marubozu Hijau tebal.
2.  **Bandarmologi**: Pas breakout itu, yang HAKA adalah broker "Big Player" (ZP, AK, BK). Terjadi **AKUMULASI MASIF**.
3.  **Keputusan**: **ALL IN / GAS POL!** Ini sinyal valid banget. Probabilitas naik > 80%.

### Skenario 2: Bull Trap (Jebakan Banteng) 🐂
1.  **Teknikal**: Harga Breakout Resistance. Keliatannya bagus.
2.  **Bandarmologi**: Pas breakout, Top Buyer-nya YP, PD, XC (Ritel semua). Bandar malah jualan (Top Seller) memanfaatkan kenaikan harga.
3.  **Analisa**: Ini **BREAKOUT PALSU**. Bandar naikin harga cuma buat mancing ritel masuk biar mereka bisa jualan di harga atas.
4.  **Keputusan**: **JANGAN MASUK.** Besok biasanya dibanting balik ke bawah.

### Tips Khusus: Saham Bluechip (BBCA, BBRI, TLKM)
Jangan liat Broker Summary YP/PD. Liatnya **FOREIGN FLOW (Asing)**.
*   Kalau chart Uptrend + Asing Net Buy terus-terusan = **Hold Keras**.
*   Kalau chart Uptrend tapi Asing Net Sell terus = Hati-hati, mungkin mau koreksi.

### Tugas Hari Ini ✅
Cek saham **BBRI**.
1.  Liat chart-nya (Teknikal).
2.  Liat data Foreign Flow (Asing) 1 minggu terakhir.
3.  Apakah sejalan (Asing beli, harga naik) atau berlawanan?
`
  },
  {
    day: 18,
    title: "Indikator Sakti: RSI & Stochastic untuk Timing Sempurna",
    category: "Technical",
    description: "Ibarat Speedometer, pelajari cara membaca kapan pasar sedang 'Kepanasan' (Overbought) dan kapan saatnya 'Serok Bawah' (Oversold).",
    keyPoints: ["RSI Overbought (>70)", "RSI Oversold (<30)", "Bullish Divergence"],
    isCompleted: false,
    content: `
# Speedometer Saham: Kapan Harus Ngerem? 🏎️

Indikator Oscillator (RSI / Stochastic) fungsinya kayak speedometer mobil.
Kita bisa tau mesinnya lagi **Kepanasan (Overbought)** atau **Kedinginan (Oversold)**.

### Bab 1: Area Jenuh (RSI 0 - 100)
1.  **Overbought (Jenuh Beli) - Area > 70** 🔥
    *   *Kondisi:* Harga udah naik ketinggian dan kecepetan. Pembeli udah mulai abis bensin.
    *   *Sinyal:* **Rawan Koreksi Turun.** Jangan HAKA di sini. Siap-siap Take Profit.
2.  **Oversold (Jenuh Jual) - Area < 30** ❄️
    *   *Kondisi:* Harga udah turun kedaleman. Penjual udah abis barangnya.
    *   *Sinyal:* **Potensi Mantul (Rebound).** Mulai cicil beli (Nyerok) di sini cukup aman.

### Bab 2: Divergence (Sinyal Sakti Mandraguna) ✨
Ini kondisi langka tapi akuratnya minta ampun. Terjadi saat pergerakan Harga gak kompak sama Indikator.

**Bullish Divergence (Sinyal Beli Kuat):**
*   **Harga Saham TURUN** (bikin Low baru yang lebih rendah).
*   TAPI... **Indikator RSI malah NAIK** (bikin Low yang lebih tinggi).
*   *Artinya:* Penurunan harga itu palsu / udah lemah. Bandar lagi ngerem diem-diem.
*   *Prediksi:* Harga bakal berbalik arah terbang ke atas!

${VISUAL_PLACEHOLDER("Chart Bullish Divergence: Harga turun (Lower Low), tapi garis RSI menanjak naik (Higher Low)")}

### Tugas Hari Ini ✅
Buka chart saham **UNVR** atau **GOTO** (yang lagi downtrend).
Pasang indikator RSI. Cari apakah ada momen Divergence di masa lalu yang bikin harganya mantul naik?
`
  },
  {
    day: 19,
    title: "Screening 10 Menit: Mencari Mutiara Terpendam Setiap Malam",
    category: "Technical",
    description: "Ada 800+ saham, jangan cek satu-satu! Teknik screening cepat untuk menemukan saham yang akan meledak besok pagi.",
    keyPoints: ["Filter Liquiditas", "Filter Trend (MA)", "Top Gainer / Top Volume"],
    isCompleted: false,
    content: `
# Cara Nemu Saham Bagus dalam 10 Menit 🧐

Ada 800+ saham di Indonesia. Gak mungkin lo cek satu-satu tiap malem kan? Mata bisa jereng.
Lo butuh saringan (**Screener**) untuk membuang sampah dan menyisakan berlian.

### Bab 1: Syarat Wajib (Filter Dasar)
Pakai fitur Screener di Stockbit/TradingView, masukin filter ini:
1.  **Liquiditas (Wajib)**: Rata-rata transaksi harian > Rp 10 Miliar.
    *   *Kenapa?* Biar lo gampang beli dan gampang jual. Jangan beli saham kuburan yang sepi, nanti lo nyangkut gak bisa keluar (Bid kosong).
2.  **Trend**: Harga > MA 60.
    *   *Kenapa?* Kita cuma mau saham yang lagi Uptrend (Naik daun). Saham downtrend buang aja.

### Bab 2: Teknik Screening Harian
Setelah filter dasar, cari kandidat buat besok:
1.  **Screening Top Gainer**: Cek saham apa yang hari ini naik kenceng + Volume Gede. Masukin Watchlist. Biasanya besok masih lanjut naik (efek inersia).
2.  **Screening Akumulasi**: Cari saham yang harganya belum naik banyak, tapi **Bandar/Asing Net Buy** terus seminggu terakhir. Ini "Tabungan Meledak".
3.  **Open = Low**: Saham yang pas buka pasar harganya gak pernah turun di bawah harga pembukaan. Ini tanda **Strong Buy** hari itu.

### Bab 3: Bikin Watchlist 📝
Jangan beli apa yang lo liat pas pasar buka (itu impulsif).
Beli apa yang udah lo analisa semalam.
*   Pilih 3-5 kandidat terbaik.
*   Tentukan titik beli (Buy Area) dan titik buang (Cut Loss).
*   Besok tinggal eksekusi robot.

### Tugas Hari Ini ✅
Buka fitur Screener. Cari saham dengan kriteria: **Transaksi > 10M** DAN **Harga di atas MA20** DAN **RSI di bawah 60**. Catat 3 kodenya!
`
  },
  {
    day: 20,
    title: "Trading Plan: Skenario Perang agar Tidak Dibantai Pasar",
    category: "Risk Management",
    description: "Gagal merencana = Merencana gagal. Cara membuat dokumen taktik harian: Entry, Target Profit, dan Cut Loss sebelum pasar dibuka.",
    keyPoints: ["Entry Area", "Target Price (TP1 & TP2)", "Cut Loss Point (Harga & %)"],
    isCompleted: false,
    content: `
# Jangan Perang Tanpa Peta 🗺️

Jangan pernah pencet tombol BUY kalau lo belum punya coretan Trading Plan.
Pas pasar udah jalan, harga naik turun cepet, emosi lo bakal diaduk-aduk. Rencana inilah jangkar lo biar gak gila.

### Bab 1: Format Trading Plan
Tulis di Notes HP lo tiap malem/pagi sebelum jam 9. Formatnya harus lengkap:

**Saham: ANTM (Aneka Tambang)**
*   **Alasan Beli (Why?)**: Breakout 2000 + Volume Gede + Bandar ZP akumulasi 50 Miliar kemarin.
*   **Area Beli (Buy)**: 2000 - 2020.
    *   *Disiplin:* Kalau harga lari ke 2050 (telat), **SKIP**. Jangan dikejar (Don't chase the bus).
*   **Target Jual (TP)**:
    *   TP1: 2100 (Jual 50% muatan). Amankan modal.
    *   TP2: 2200 (Jual sisanya, let profit run).
*   **Cut Loss (CL)**: Jika Closing di bawah 1950. (Titik nyerah).

### Bab 2: Eksekusi Robot 🤖
Pas jam bursa, lo jadi robot. Hilangkan perasaan.
*   Harga nyentuh 1950? **JUAL.** Gak pake nego. "Nanti juga naik lagi" adalah kata-kata terakhir trader yang bangkrut.
*   Harga nyentuh 2100? **JUAL SETENGAH.** Hati tenang, cuan udah di tangan.

### Bab 3: Review
Sorenya, cek lagi plan lo.
*   Apakah lo patuh sama plan?
*   Kalau rugi, apakah karena analisanya salah, atau karena lo gak disiplin Cut Loss?

### Tugas Hari Ini ✅
Bikin Trading Plan untuk 1 saham favorit lo buat besok pagi. Tulis lengkap Buy, TP, dan CL nya.
`
  },
  {
    day: 21,
    title: "Ujian Praktek: Simulasi Trading & Evaluasi Win Rate",
    category: "Risk Management",
    description: "Saatnya terjun tanpa parasut (pakai uang virtual). Ukur seberapa tajam analisa Anda sebelum mempertaruhkan tabungan asli.",
    keyPoints: ["Trading Journal", "Evaluasi Win Rate", "Disiplin Eksekusi"],
    isCompleted: false,
    content: `
# Ujian Praktek (Simulasi) 🎮

Minggu 3 kelar! Senjata lo udah lengkap: Teknikal, Bandarmologi, Money Management.
Sekarang saatnya **Paper Trading**. Trading boongan tapi pake data asli.

### Bab 1: Cara Paper Trading
Gak perlu uang asli.
1.  Pilih saham besok pagi.
2.  Bikin Trading Plan lengkap.
3.  Pantau seharian.
4.  Sorenya catet: "Gue untung atau rugi kalau tadi beneran beli?"

### Bab 2: Trading Journal (Guru Terbaik) 📔
Trader pro pasti punya jurnal. Bikin Excel isinya:
*   **Tanggal**
*   **Nama Saham**
*   **Setup**: (Misal: Breakout MA20, RSI Divergence, dll).
*   **Buy Price & Sell Price**.
*   **Profit/Loss (%)**.
*   **Catatan Dosa**: "Tadi gue telat Cut Loss karena ngelamun", atau "Tadi gue jual kecepetan padahal masih naik".

### Bab 3: Evaluasi Mingguan
Setelah seminggu, hitung statistik lo:
*   **Win Rate**: Berapa kali menang vs kalah? (Misal 6 Menang, 4 Kalah = WR 60%).
*   **Avg Win vs Avg Loss**: Pas menang rata-rata dapet 5%, pas kalah rata-rata rugi 2%. Ini BAGUS.
*   Kalau Win Rate lo di atas 50% dan Reward > Risk, lo siap trading pake uang beneran dengan modal lebih gede!

### Tugas Akhir Pekan ✅
Buat template Trading Journal di Excel atau Google Sheets. Mulai isi minggu depan.
`
  },

  // ==============================
  // Week 4: Advanced Strategy & Career (The Professional)
  // ==============================
  {
    day: 22,
    title: "Scalping 101: Teknik Copet Cuan Cepat (Hit & Run)",
    category: "Technical",
    description: "Strategi berisiko tinggi untuk pemberani. Cara membaca Tape Reading, Running Trade, dan Bid-Offer dalam hitungan detik.",
    keyPoints: ["Tape Reading (Baca Bid/Offer)", "Running Trade Logic", "One Tick Profit Rule", "Fake Bid Trap"],
    isCompleted: false,
    content: `
# Formula 1: Scalping (Fast Trade) 🏎️

Scalping itu kayak balapan F1. Cepat, berisiko tinggi, butuh fokus 100%.
Target: Cuan bungkus 1-3% dalam hitungan menit/jam. Sehari bisa 10x transaksi.

### Bab 1: Persiapan Tempur Scalper 🛡️
Jangan harap bisa scalping pake HP kentang di sinyal E. Lo butuh:
1.  **Internet Kencang & Stabil**: Delay 1 detik bisa bikin boncos.
2.  **Device yang Layak**: Laptop/PC lebih disarankan buat liat Order Book, Chart 1-menit, dan Running Trade sekaligus.
3.  **Sekuritas Anti-Lag**: Cari sekuritas yang servernya kuat pas pembukaan pasar dan punya fitur **Fast Order**.

### Bab 2: The Art of Tape Reading (Membaca Pita) 📼
Scalper jarang liat chart daily. Mereka baca **Order Book** dan **Running Trade**.
1.  **Ketebalan Bid/Offer**:
    *   Jika Offer tebal dimakanin terus (dihajar kanan) dengan cepat -> **IKUT BELI**.
    *   Jika Bid tebal tapi harga gak naik-naik (cuma diganjel doang) -> **HATI-HATI**, itu palsu (Fake Bid).
2.  **Running Trade Speed**:
    *   Kalau kode saham muncul beruntun cepet banget kayak hujan deras -> Ada momentum. Lirik chart-nya.
    *   Kalau munculnya satu-satu pelan -> Skip, saham tidur.

### Bab 3: Jebakan Batman (Fake Bid) 🦇
Bandar sering nipu mata.
*   **Skenario:** Lo liat Bid (Antrian Beli) tebal banget (Misal 50.000 Lot). Lo pikir "Wah aman nih, ada yang jagain". Lo ikutan antri di situ.
*   **Kejadian:** Tiba-tiba dalam 1 detik, 50.000 lot itu **HILANG** (Dicabut/Withdraw). Harga langsung longsor.
*   *Pelajaran:* Jangan percaya ganjalan. Percaya pada **HAKA** (Action beli).

### Bab 4: Rule of Thumb
*   **One Tick Profit**: Jangan serakah. Beli 200, jual 202 atau 204. Bungkus.
*   **Cut Loss Kilat**: Kalau harga turun 2-3 tick dari harga beli, langsung buang. Jangan jadi investor dadakan.

*Peringatan:* Scalping sangat TIDAK DISARANKAN buat pemula. Pake modal kecil banget dulu (misal 500rb) buat latihan mental.
`
  },
  {
    day: 23,
    title: "Swing Trading: Gaya Santai Cuan Lebar untuk Orang Sibuk",
    category: "Technical",
    description: "Gak punya waktu mantau pasar? Strategi 'Beli Sore Jual Minggu Depan'. Santai tapi profit bisa lebih besar dari Scalper.",
    keyPoints: ["Buy on Weakness (BoW)", "Buy on Breakout", "Screening Akhir Pekan", "Set and Forget"],
    isCompleted: false,
    content: `
# Santai Tapi Cuan: Swing Trading 🏄

Ini gaya trading paling enak buat karyawan/pebisnis sibuk. Gak perlu liat running trade tiap detik.
Kita "mengayun" (Swing) ngikutin tren. Beli, simpen seminggu-dua minggu, jual pas di pucuk ayunan.

### Bab 1: Dua Mazhab Swing
1.  **Buy on Weakness (BoW) - Diskon Hunter** 🛒
    *   *Caranya:* Cari saham **UPTREND** yang lagi koreksi (turun) ke area Support atau MA20.
    *   *Syarat:* Pas turun, Volume-nya harus KECIL (Kering). Artinya penjual udah abis.
    *   *Trigger:* Beli pas muncul candle hijau pertama (mantul).
2.  **Buy on Breakout - Momentum Rider** 🚀
    *   *Caranya:* Beli pas harga ngejebol Resistance Kuat.
    *   *Syarat:* Volume harus MELEDAK besar.
    *   *Resiko:* Sering kena False Break (Tipuan).

### Bab 2: Workflow Swing Trader Sibuk
*   **Weekend / Malam Hari (30 Menit)**:
    *   Buka Chart Weekly & Daily. Cari saham yang trennya rapi.
    *   Tentukan area beli (Buy Limit) dan Stop Loss.
*   **Pagi (08:30 - 08:55)**:
    *   Pasang **Automatic Order** di aplikasi sekuritas.
    *   *Contoh:* "Beli BBRI jika harga <= 5400. Jual Rugi (Stop Loss) jika harga <= 5200. Jual Untung (Take Profit) jika harga >= 6000."
*   **Siang - Sore**:
    *   Kerja fokus. Gak usah liatin HP. Biarkan sistem bekerja otomatis.
    *   Cuan masuk sendiri ke RDN.

### Bab 3: Kuncinya Adalah SABAR
Kadang sahamnya diem dulu 3-4 hari, baru lari di hari ke-5.
Swing trader gagal karena **Gatal Tangan**. Baru beli pagi, siang gak naik langsung dijual pindah saham lain. Akhirnya biaya fee broker numpuk, cuan kagak dapet.
`
  },
  {
    day: 24,
    title: "Rotasi Sektor: Membaca Peta Aliran Uang Besar (Big Fund Flow)",
    category: "Fundamental",
    description: "Uang tidak hilang, hanya berpindah. Cara mendeteksi perpindahan dana institusi dari Sektor Bank -> Komoditas -> Properti.",
    keyPoints: ["Business Cycle", "IHSG Drivers", "Correlation Analysis", "Laggard Sector"],
    isCompleted: false,
    content: `
# Uang Itu Berputar (Rotasi Sektor) 🔄

Di bursa, duit itu gak ilang, cuma pindah kantong (Rotasi).
Big Fund (Bandar Gede) suka mindahin duit antar sektor tergantung kondisi ekonomi makro.

### Bab 1: Peta Sektor Utama & Siklusnya 🗺️
1.  **Perbankan (Finance - BBCA, BBRI)**: Jantung IHSG.
    *   *Momentum:* Awal pemulihan ekonomi & saat suku bunga mulai naik.
2.  **Energi & Komoditas (Mining - ADRO, ITMG)**:
    *   *Momentum:* Saat Inflasi tinggi atau ada Perang (Harga minyak/batubara dunia naik).
    *   *Contoh:* Boom Komoditas 2022.
3.  **Consumer Goods (ICBP, UNVR)**: Sektor Defensif.
    *   *Momentum:* Saat ekonomi lesu/resesi. Orang tetep butuh makan & sabun. Investor cari tempat aman.
4.  **Properti & Tech (BSDE, GOTO)**: Sektor Bunga Sensitif.
    *   *Momentum:* Saat suku bunga bank TURUN (Kredit murah).

### Bab 2: Strategi Rotasi (Pindah Kapal)
Jangan masuk ke sektor yang pestanya udah bubar.
*   **Contoh Kasus:** Tahun 2022 Batubara pesta pora. Tahun 2023 harga batubara anjlok.
*   Kalau lo maksa "Investasi Jangka Panjang" di saham batubara pucuk 2022, tahun 2023 lo nangis darah.
*   **Antisipasi:** Liat sektor mana yang udah naik tinggi (Overbought), dan sektor mana yang masih di bawah tapi mulai ada akumulasi (Laggard). Pindahin duit lo ke sana sebelum terlambat.

### Bab 3: Intermarket Analysis (Ilmu Dukun) 🔮
*   **USD/IDR Naik (Rupiah Melemah)**: Bagus buat emiten Ekportir (Dapet Dolar), Jelek buat emiten Importir (Bahan baku mahal).
*   **Bond Yield Naik**: Biasanya jelek buat pasar saham (Asing cabut ke Obligasi).

### Tugas Hari Ini ✅
Cek performa sektoral (IDXENERGY, IDXFINANCE, IDXPROP) di Google/Aplikasi. Sektor mana yang bulan ini performanya paling tinggi (Leading)? Sektor mana yang minus (Lagging)?
`
  },
  {
    day: 25,
    title: "Average Up vs Down: Seni Melipatgandakan Keuntungan",
    category: "Risk Management",
    description: "Kapan harus nambah muatan? Bedakan strategi 'Pyramiding' para profesional dengan 'Nangkep Pisau' ala pemula.",
    keyPoints: ["Pyramiding Strategy (Avg Up)", "Martingale (Avg Down)", "Position Sizing Rules"],
    isCompleted: false,
    content: `
# Menambah Muatan: Gaspol atau Rem? 🛑

Banyak pemula kebalik: Saham rugi ditambahin (biar impas), saham untung buru-buru dijual (takut rugi). **SALAH BESAR.**
Itu namanya "Memelihara kerugian, memotong keuntungan".

### Bab 1: Average Down (Jalan Neraka Trader) 🔥
Beli lagi pas harga turun biar harga rata-rata jadi murah.
*   **Larangan Keras:** Bagi Trader, haram melakukan Avg Down di saham yang jebol Support (Downtrend). Lo sama aja kayak nangkep pisau jatuh. Tangan berdarah.
*   **Pengecualian:** Boleh dilakukan HANYA jika lo Investor Fundamental yang yakin valuasi perusahaan sangat murah dan bisnisnya tidak bangkrut.

### Bab 2: Average Up (Pyramiding - Jalan Sultan) 🏰
Beli lagi pas harga **NAIK** dan lo udah posisi untung.
*   *Kenapa?* Karena analisa lo terbukti **BENAR**. Pasar setuju sama lo. Trend is your friend.
*   *Teknik Piramida Terbalik:*
    1.  Beli Awal: 100 Lot di harga 1000. (Harga naik ke 1100).
    2.  Tambah: 50 Lot di harga 1100. (Harga naik ke 1200).
    3.  Tambah: 20 Lot di harga 1200.
*   *Kunci:* Belian tambahan harus LEBIH KECIL dari belian awal. Biar harga rata-rata (Avg Price) lo gak naik terlalu tinggi.

### Bab 3: Kapan Harus Stop?
Saat tren mulai patah atau kena target profit. Jangan nambah terus di pucuk.
Ingat: **Let The Profit Run.** Biarkan keuntungan lo yang bekerja, bukan emosi lo.

### Tugas Hari Ini ✅
Cek portofolio lo. Ada gak saham rugi yang lo tambah terus muatannya? Renungkan: Apakah itu investasi atau cuma ego gak mau ngaku salah?
`
  },
  {
    day: 26,
    title: "Bangkit dari Loss Streak: Protokol Reset Mental",
    category: "Mindset",
    description: "Lagi boncos beruntun? Stop! Jangan Revenge Trading. Panduan praktis memulihkan psikologi dan modal setelah dihajar pasar.",
    keyPoints: ["Revenge Trading Loop", "The 3-Loss Rule", "Reset Protocol", "Dopamine Detox"],
    isCompleted: false,
    content: `
# Pas Lagi Apes (Loss Streak) 🌧️

Lo pasti bakal ngalamin ini: Beli A Cutloss, Beli B Cutloss, Beli C Cutloss lagi. Rasanya pengen banting laptop. Merasa pasar curang. Merasa diri paling bodoh.

### Bab 1: Bahaya Revenge Trading (Balas Dendam) 😡
Saat rugi, otak reptil kita aktif. Kita pengen "Balikin modal cepet".
*   *Tindakan:* Lo maksa masuk pasar pake lot GEDE (All in) di saham gorengan, berharap sekali menang balik modal semua.
*   *Hasil:* Lo trading pake emosi, bukan analisa. Biasanya bakal rugi makin dalem sampai modal abis (Margin Call). Ini lingkaran setan.

### Bab 2: Protokol Reset Mental (Emergency Brake) 🧘‍♂️
Kalau udah rugi 3x berturut-turut dalam sehari/seminggu:
1.  **STOP TRADING**. Tutup aplikasi. Log out. Haram buka chart 2-3 hari.
2.  **Dopamine Detox**. Otak lo lagi kecanduan judi. Pergi olahraga, jalan-jalan, main game, lupakan saham. Dinginkan kepala.
3.  **Evaluasi Jurnal**. Cek pas weekend dengan kepala dingin. Pasar emang lagi crash (IHSG merah darah) atau strategi lo yang ngaco?
4.  **Mulai Kecil**. Pas balik lagi, pake lot 1/10 dari biasa. Cari "Winning Feeling" dulu. Rasain profit (walau receh Rp 50.000). Kalau PD udah balik, baru normalin lot.

### Bab 3: Penerimaan (Acceptance)
Rugi (Loss) adalah **Biaya Bisnis**. Kayak toko baju ada baju yang gak laku, ya diobral rugi.
Trader profesional bukan orang yang gak pernah rugi, tapi orang yang ruginya terukur (kecil) dan untungnya besar.

Ingat: **Pasar bakal ada selamanya. Modal lo yang belum tentu ada kalau dipaksain.**
`
  },
  {
    day: 27,
    title: "Racikan Portofolio: Menyeimbangkan Bluechip & Saham Gorengan",
    category: "Risk Management",
    description: "Jangan taruh semua telur di satu keranjang. Formula alokasi aset ideal (Core vs Satellite) untuk pertumbuhan aset yang stabil.",
    keyPoints: ["Core Stock (50%)", "Satellite Stock (30%)", "Cash is King (20%)", "Rebalancing"],
    isCompleted: false,
    content: `
# Menu Makanan Sehat Portofolio 🍱

Jangan taruh semua duit lo di 1 saham (All in). Kalau saham itu kena kasus korupsi atau disuspend 5 tahun, tamat riwayat lo.
Tapi jangan juga beli 20 saham (Toserba), pusing ngurusnya. Cukup 3-6 saham.

### Bab 1: The Core & Satellite Strategy
Racikan ideal buat pemula-menengah:

1.  **Core Stock (Nasi) - 50-60%**:
    *   *Isi:* Saham Bluechip (BBCA, TLKM, BMRI, ASII, ICBP).
    *   *Sifat:* Aman, anti badai, dividen rutin, likuiditas tinggi. Tidur nyenyak.
    *   *Tujuan:* Menjaga nilai aset jangka panjang & compounding.
2.  **Satellite Stock (Lauk Pauk) - 30%**:
    *   *Isi:* Saham Second Liner / Swing Trading yang lagi Uptrend (MAPI, ACES, dll).
    *   *Sifat:* Lincah, potensi cuan gede (Multibagger), tapi risiko lebih tinggi.
    *   *Tujuan:* Booster profit portofolio (Alpha).
3.  **Cash is King (Air Minum) - 10-20%**:
    *   *Wajib:* Sisain duit cash di RDN. Jangan dibeliin semua (Full Power).
    *   *Guna:* Peluru cadangan. Buat serok barang diskon kalau tiba-tiba pasar crash (IHSG diskon gede).

### Bab 2: Rebalancing (Cuci Gudang Rutin)
Sebulan sekali atau per kuartal, cek portofolio.
*   Saham yang udah naik tinggi banget -> Jual sebagian (Trim Profit), pindahin duitnya ke saham yang masih murah atau tambah Cash.
*   Saham yang fundamentalnya memburuk -> Buang (Weeding). Ganti yang lebih segar.

### Tugas Hari Ini ✅
Coba gambar diagram pie portofolio impian lo. Berapa persen buat BBCA? Berapa persen buat trading? Berapa persen cash?
`
  },
  {
    day: 28,
    title: "Upgrade Gear: Tools & Data Intelijen Pro Trader",
    category: "Mindset",
    description: "Mau perang serius? Gak bisa cuma modal HP. Rekomendasi aplikasi charting, bot telegram, dan sumber data yang dipakai profesional.",
    keyPoints: ["TradingView Chart", "RTI Business Data", "Stockbit Pro Features", "PC Setup"],
    isCompleted: false,
    content: `
# Upgrade Senjata Lo! 🛠️

Kalau mau perang serius lawan bandar, gak bisa cuma modal bambu runcing (HP kentang). Lo butuh tools pro untuk melihat apa yang ritel lain tidak lihat.

### Bab 1: Charting Platform (Peta Perang) 🗺️
1.  **TradingView**: Wajib punya (Web/App).
    *   *Kelebihan:* Chart-nya paling enak, indikator lengkap (ribuan), bisa gambar-gambar leluasa, dan sinkron HP-Laptop.
    *   *Tips:* Versi gratisan udah cukup kok buat pemula.
2.  **Aplikasi Sekuritas di PC (OLT)**:
    *   Mirae (HOTS), IPOT on Windows. Fiturnya jauh lebih lengkap dibanding versi HP. Bisa liat Multi-Chart, Running Trade kenceng, dan set layout sesuka hati.

### Bab 2: Intelijen (Data & Berita) 🕵️
1.  **RTI Business**: Kitab suci investor Indo.
    *   *Guna:* Cek Fundamental (Key Stats), Jadwal Dividen/RUPS, Kepemilikan (Masyarakat > 50% tanda bahaya), dan Performa 5 tahun. Gratis & Wajib install di HP.
2.  **Stockbit**:
    *   *Stream:* Forum diskusi (Twitter-nya saham). Hati-hati banyak pom-pom, ambil infonya, buang opininya.
    *   *Financials:* Visualisasi laporan keuangan yang enak banget dibaca.
3.  **Telegram Bot**: Banyak bot saham gratis buat cek chart instan (Contoh: Chartbot, Ipotbot).

### Tips Pilih Sekuritas Utama
Jangan cuma cari fee murah. Cari yang:
1.  **Anti Lag**: Pas pasar lagi rame pagi-pagi, servernya down gak? Kalau sering down, ganti.
2.  **Fitur Smart Order**: Punya fitur *Trailing Stop* & *Stop Loss Otomatis* gak? Ini penyelamat hidup buat trader sambilan yang gak bisa pantau monitor 24/7.
`
  },
  {
    day: 29,
    title: "Roadmap to Full Time Trader: Realita Resign & Trading for Living",
    category: "Mindset",
    description: "Mimpi resign dan trading di Bali? Baca realitanya dulu. Syarat modal minimal dan mental baja sebelum memutuskan menjadi trader penuh waktu.",
    keyPoints: ["The 5% Rule Math", "Dana Darurat Wajib", "Realita Kesepian", "Multiple Streams of Income"],
    isCompleted: false,
    content: `
# Mimpi Resign & Trading for Living? 🏖️

Banyak yang ngayal: "Ah mau resign aja dari kantor, trading saham di Bali sambil ngopi liat pantai."
Realitanya? Gak seindah itu ferguso. Trading for Living itu BRUTAL dan KESEPIAN.

### Bab 1: Matematika Full Time Trader (FTT) 🧮
Berapa modal yang lo butuhin buat resign? Jangan asal tebak.
*   **Biaya Hidup Lo Sebulan**: Misal Rp 10 Juta.
*   **Target Cuan Realistis**: 5% per bulan (Ini udah level dewa konsisten segini).
*   **Hitungan Modal Minimal**: 10 Juta / 5% = **Rp 200 Juta**.

*TAPI TUNGGU DULU!* Itu kalau lo profit terus. Gimana kalau pasar lagi Crash dan lo rugi 2 bulan berturut-turut? Lo makan apa? Istri lo makan apa?
*   **Saran Aman**: Punya modal **3x - 5x** dari hitungan di atas (Rp 600 Juta - 1 Miliar) + Dana Darurat Cash 12 bulan biaya hidup di bank (bukan di saham).

### Bab 2: Tekanan Mental (The Psychology)
Saat trading jadi satu-satunya sumber nasi, psikologi lo berubah drastis.
*   Rugi dikit stres (karena mikir besok gak makan).
*   Pasar sepi stres (gak ada pemasukan).
*   Akhirnya maksa trading (Overtrading) dan malah boncos.
*   *Fun Fact:* FTT itu sepi. Gak ada temen kantor buat ghibah. Cuma lo dan layar monitor.

### Bab 3: Roadmap yang Benar
Jangan buru-buru resign.
1.  **Fase 1 (Part Time):** Kerja kantor + Trading santai (Swing/Invest). Kumpulin modal.
2.  **Fase 2 (Validasi):** Kalau hasil trading lo udah **2x lipat gaji kantor** secara KONSISTEN selama minimal 2 tahun (melewati fase Bullish dan Bearish).
3.  **Fase 3 (Multiple Streams):** Jangan cuma andalin trading. Dividen, Bisnis lain, atau Konten. Biar kalau trading lagi rugi, dapur tetep ngebul.

Nikmati prosesnya. Jangan matikan sumber air utama sebelum sumur cadangan lo penuh.
`
  },
  {
    day: 30,
    title: "Wisuda & Langkah Nyata: Membangun Kekayaan Generasi",
    category: "Mindset",
    description: "Garis finish hanyalah permulaan. Action plan konkret untuk 3 bulan ke depan, membangun compounding interest, dan salam perpisahan.",
    keyPoints: ["Continuous Learning", "Compounding Interest Magic", "Circle Positif", "Final Message"],
    isCompleted: false,
    content: `
# Wisuda! Perjalanan Baru Dimulai 🎓

Selamat Bro/Sist! Lo udah namatin kurikulum **30 Hari SahamMaster**.
Dari yang nol putul, sekarang lo udah ngerti RDN, Candlestick, Bandarmologi, Money Management, sampe Psikologi Trading. Lo udah masuk golongan 1% penduduk Indonesia yang melek pasar modal.

### Apa Selanjutnya? (Action Plan)
Trading itu kayak belajar naik sepeda atau berenang. Teori 30 hari ini gak guna kalau gak **PRAKTEK**.
1.  **Mulai Kecil**: Top up RDN pakai "Uang Belajar" (Uang yang lo ikhlas kalau hilang). Fokus belajar mental dulu, bukan cari kaya cepat.
2.  **Adaptasi**: Pasar itu dinamis. Strategi yang berhasil tahun lalu belum tentu berhasil tahun ini. Terus belajar (Update ilmu).
3.  **Cari Circle Positif**: Gabung komunitas yang edukatif. Jauhi grup yang isinya cuma "Min beli apa pagi ini?" (Grup Pom-pom).

### Keajaiban Dunia Ke-8: Compounding Interest 📈
Jangan target "Cepat Kaya" dalam semalam. Targetkan: **BERTAHAN HIDUP & TUMBUH.**
*   Modal Awal: Rp 10 Juta.
*   Rutin Nabung Saham (Top Up): Rp 1 Juta/bulan.
*   Growth Portofolio: 15% per tahun (Konservatif).
*   **Dalam 20 Tahun:** Uang lo jadi **Rp 1,5 Miliar**.

Saham adalah kendaraan maraton, bukan lari sprint.

### Pesan Terakhir
Jangan pernah menyerah saat rugi. Setiap master pernah jadi pemula yang boncos. Bedanya, master bangkit dan belajar dari kesalahannya.

Good luck, Trader! Semoga portofolio lo ijo royo-royo kayak hutan Amazon!
Sampai jumpa di puncak kesuksesan!

**Salam Cuan! 🚀🇮🇩**
`
  }
];

export const CATEGORY_COLORS = {
  Mindset: "bg-blue-100 text-blue-800",
  Technical: "bg-purple-100 text-purple-800",
  Fundamental: "bg-green-100 text-green-800",
  Bandarmologi: "bg-orange-100 text-orange-800",
  "Risk Management": "bg-red-100 text-red-800",
};