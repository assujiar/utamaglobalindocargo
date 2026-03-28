export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  metric: string;
  metricLabel: string;
  summary: string;
  challenge: string;
  solution: string;
  result: string;
  color: "dark" | "light";
  gridSpan: "tall" | "wide" | "normal";
}

export const caseStudies: CaseStudy[] = [
  {
    id: "supply-chain-alpha",
    title: "14 Negara, Satu Kendali",
    client: "Konglomerat Manufaktur ASEAN",
    industry: "Manufaktur",
    metric: "47%",
    metricLabel: "Lebih Cepat",
    summary:
      "Klien ini punya pabrik di 14 negara tapi rantai pasoknya masih dikelola seperti perusahaan satu kota. Kami ubah itu.",
    challenge:
      "Setiap gangguan di satu titik, efek dominonya terasa di mana-mana. Tim mereka butuh 72 jam cuma untuk stabilisasi kalau ada masalah. Vendor di 14 negara, tapi tidak ada yang benar-benar tahu gambaran besarnya.",
    solution:
      "Kami rancang ulang jalur distribusi mereka dari hub-and-spoke jadi jaringan yang saling backup. Kalau satu jalur bermasalah, barang otomatis dialihkan ke rute lain — dalam hitungan menit, bukan hari.",
    result:
      "Lead time turun 47%. Biaya denda pelabuhan turun 62%. 18 bulan berturut-turut tanpa kehabisan stok.",
    color: "dark",
    gridSpan: "tall",
  },
  {
    id: "customs-velocity",
    title: "Dari 6 Hari Jadi 2 Hari di Bea Cukai",
    client: "Distributor Farmasi Regional",
    industry: "Farmasi",
    metric: "3.2x",
    metricLabel: "Lebih Cepat",
    summary:
      "Proses customs mereka masih manual dan sering salah kode. Kami digitalisasi semuanya sebelum barang sampai di pelabuhan.",
    challenge:
      "Rata-rata 5.7 hari per pengiriman nyangsang di bea cukai. 23% kiriman salah kode HS — artinya denda, delay, dan tim yang frustrasi berulang kali.",
    solution:
      "Kami terapkan sistem klasifikasi otomatis dan pre-clearance. Dokumen sudah siap dan terverifikasi sebelum kontainer tiba. Tim bea cukai mereka sekarang bisa fokus ke hal lain.",
    result:
      "Waktu clearance turun dari 5.7 hari jadi 1.8 hari. Kesalahan kode turun ke 0.3%. Hemat $2.1 juta per tahun dari penalti yang hilang.",
    color: "light",
    gridSpan: "normal",
  },
  {
    id: "warehouse-singularity",
    title: "6 Gudang Setengah Kosong, Sekarang 89% Terpakai",
    client: "E-Commerce Skala Nasional",
    industry: "E-Commerce",
    metric: "89%",
    metricLabel: "Utilisasi Gudang",
    summary:
      "Gudang mereka banyak, tapi setengahnya tidak efisien. Kami tata ulang cara mereka menaruh dan merotasi barang.",
    challenge:
      "Utilisasi cuma 54% rata-rata. Di satu gudang overstock, di gudang lain kosong. Picking lambat karena penempatan SKU tidak pernah dioptimasi.",
    solution:
      "Kami bangun sistem rotasi stok antar-gudang berdasarkan data demand per wilayah. Penempatan barang ditata ulang supaya proses picking lebih pendek dan cepat.",
    result:
      "Utilisasi naik ke 89%. Biaya operasional gudang turun 34%. Fulfillment 2.8 kali lebih cepat.",
    color: "dark",
    gridSpan: "wide",
  },
  {
    id: "freight-orchestration",
    title: "340 Kontainer, 1 Dashboard",
    client: "Trading House Komoditas",
    industry: "Perdagangan",
    metric: "$4.7M",
    metricLabel: "Dihemat per Tahun",
    summary:
      "7 freight forwarder, ratusan kontainer per bulan, tapi tracking cuma ada untuk sepertiga pengiriman. Kami satukan semuanya.",
    challenge:
      "Informasi tersebar di 7 vendor berbeda. Real-time tracking cuma tersedia untuk 31% pengiriman. Sisanya? Tim mereka cuma bisa berharap dan menebak.",
    solution:
      "Satu dashboard yang menghubungkan semua carrier. Setiap kontainer terlihat posisinya, kapan berangkat, kapan sampai. Konsolidasi muatan juga kami optimalkan supaya tidak ada ruang kontainer yang terbuang.",
    result:
      "Visibilitas naik ke 99.7%. Hemat $4.7 juta dari konsolidasi yang lebih pintar. Transit time rata-rata berkurang 12 hari.",
    color: "light",
    gridSpan: "tall",
  },
  {
    id: "cold-chain-integrity",
    title: "Vaksin Harus Dingin, Tanpa Kompromi",
    client: "Perusahaan Bioteknologi SEA",
    industry: "Bioteknologi",
    metric: "99.8%",
    metricLabel: "Suhu Terjaga",
    summary:
      "Distribusi vaksin di 6 negara tropis. Satu derajat keluar batas, produk senilai miliaran harus dimusnahkan.",
    challenge:
      "18% pengiriman pernah mengalami deviasi suhu. Kerugian $3.4 juta per tahun dari produk yang harus dibuang. Monitoring manual tidak bisa mendeteksi masalah sebelum terlambat.",
    solution:
      "Kami pasang sensor IoT di setiap unit pendingin dengan monitoring real-time. Sistem kami bisa mendeteksi risiko deviasi 2 jam sebelum terjadi dan otomatis mengalihkan ke fasilitas terdekat.",
    result:
      "Suhu terjaga 99.8%. Kerugian produk turun 94%. Investasi balik modal dalam 7 bulan.",
    color: "dark",
    gridSpan: "normal",
  },
  {
    id: "last-mile-velocity",
    title: "Pengiriman 2x Lebih Cepat ke 12 Kota",
    client: "Konglomerat FMCG Nasional",
    industry: "FMCG",
    metric: "2.1x",
    metricLabel: "Lebih Cepat",
    summary:
      "Janji pengiriman 24 jam, tapi di lapangan cuma tercapai 67%. Kami redesain total jaringan last-mile mereka.",
    challenge:
      "SLA 24 jam cuma tercapai 67% di kota tier-2. Biaya last-mile makan 43% total biaya logistik. Komplain pelanggan terus naik dan tim lapangan kewalahan.",
    solution:
      "Kami bangun 48 titik micro-fulfillment di kota-kota strategis. Order otomatis dialokasikan ke titik terdekat. Rute pengiriman dioptimasi supaya tidak ada jalan bolak-balik.",
    result:
      "SLA tercapai 96%. Biaya last-mile turun 38%. Kecepatan pengiriman meningkat 2.1 kali rata-rata.",
    color: "light",
    gridSpan: "wide",
  },
];
