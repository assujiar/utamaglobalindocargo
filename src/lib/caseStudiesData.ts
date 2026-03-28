export interface CaseStudy {
  id: string;
  title: string;
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
    title: "Distribusi 14 Negara dalam Satu Jaringan Terpadu",
    industry: "Manufacturing",
    metric: "47%",
    metricLabel: "Reduksi Lead Time",
    summary:
      "Konsolidasi distribusi multi-negara dengan vendor berbeda di setiap titik ke dalam satu jaringan yang saling ter-backup.",
    challenge:
      "Setiap gangguan di satu negara memicu efek domino ke rantai pasok lainnya. Stabilisasi membutuhkan rata-rata 72 jam. Tidak ada satu pihak pun yang memiliki gambaran menyeluruh dari seluruh operasi.",
    solution:
      "Kami rancang ulang jalur distribusi dari hub-and-spoke menjadi jaringan yang memungkinkan re-routing otomatis. Ketika satu jalur terganggu, barang dialihkan ke rute alternatif tanpa intervensi manual.",
    result:
      "Lead time berkurang 47%. Biaya demurrage turun 62%. Tidak ada stockout selama 18 bulan berturut-turut sejak implementasi.",
    color: "dark",
    gridSpan: "tall",
  },
  {
    id: "customs-velocity",
    title: "Clearance Time dari 6 Hari Menjadi Kurang dari 2 Hari",
    industry: "Pharmaceutical",
    metric: "3.2x",
    metricLabel: "Percepatan Clearance",
    summary:
      "Digitalisasi seluruh alur bea cukai dari proses manual menjadi pre-clearance sebelum barang tiba di pelabuhan.",
    challenge:
      "Rata-rata 5.7 hari per pengiriman tertahan di bea cukai. Kesalahan klasifikasi HS Code terjadi pada 23% pengiriman — mengakibatkan penalti berulang dan keterlambatan distribusi.",
    solution:
      "Sistem klasifikasi otomatis dan pre-clearance yang memproses seluruh dokumentasi sebelum kontainer tiba. Tim bea cukai klien bisa fokus ke pengawasan strategis, bukan administrasi harian.",
    result:
      "Waktu clearance turun dari 5.7 hari menjadi 1.8 hari. Error rate klasifikasi turun ke 0.3%. Penghematan $2.1M per tahun dari eliminasi penalti.",
    color: "light",
    gridSpan: "normal",
  },
  {
    id: "warehouse-singularity",
    title: "Utilisasi Gudang dari 54% Naik ke 89%",
    industry: "E-Commerce & Retail",
    metric: "89%",
    metricLabel: "Utilisasi Gudang",
    summary:
      "Penataan ulang penempatan dan rotasi stok di enam gudang berdasarkan data demand aktual per wilayah.",
    challenge:
      "Utilisasi rata-rata hanya 54% di 6 lokasi. Overstock dan stockout terjadi bersamaan di lokasi berbeda. Proses picking lambat karena penempatan SKU tidak pernah dioptimasi.",
    solution:
      "Sistem rotasi stok antar-gudang berdasarkan prediksi demand per wilayah. Penempatan SKU ditata ulang untuk meminimalkan jarak picking. Inventory visibility real-time di seluruh lokasi.",
    result:
      "Utilisasi gudang naik ke 89%. Biaya operasional turun 34%. Kecepatan fulfillment meningkat 2.8x.",
    color: "dark",
    gridSpan: "wide",
  },
  {
    id: "freight-orchestration",
    title: "340+ Kontainer per Bulan dalam Satu Dashboard",
    industry: "Commodities Trading",
    metric: "$4.7M",
    metricLabel: "Efisiensi Biaya / Tahun",
    summary:
      "Integrasi tujuh freight forwarder berbeda ke dalam satu platform visibility dengan optimasi konsolidasi otomatis.",
    challenge:
      "Informasi tersebar di 7 vendor tanpa integrasi. Real-time visibility hanya tersedia untuk 31% pengiriman. Tim operasional menghabiskan lebih banyak waktu mencari informasi daripada mengambil keputusan.",
    solution:
      "Satu dashboard terintegrasi yang menghubungkan seluruh carrier. Setiap kontainer terpantau posisi dan ETD/ETA-nya. Konsolidasi muatan dioptimalkan untuk memaksimalkan kapasitas kontainer.",
    result:
      "Visibility naik ke 99.7%. Efisiensi biaya $4.7M per tahun dari optimasi konsolidasi. Transit time rata-rata berkurang 12 hari.",
    color: "light",
    gridSpan: "tall",
  },
  {
    id: "cold-chain-integrity",
    title: "Cold Chain Compliance 99.8% untuk Distribusi Vaksin",
    industry: "Biotech & Life Sciences",
    metric: "99.8%",
    metricLabel: "Temperature Compliance",
    summary:
      "Pembangunan jaringan cold chain end-to-end untuk distribusi biofarmasi di 6 negara tropis dengan toleransi suhu ketat.",
    challenge:
      "Deviasi suhu terjadi pada 18% pengiriman. Kerugian $3.4M per tahun dari produk yang harus dimusnahkan. Monitoring manual tidak mampu mendeteksi masalah sebelum kerusakan sudah terjadi.",
    solution:
      "IoT sensor di setiap unit pendingin dengan telemetri real-time. Sistem prediktif mendeteksi risiko deviasi 2 jam sebelum terjadi dan memicu re-routing otomatis ke fasilitas cold storage terdekat.",
    result:
      "Temperature compliance mencapai 99.8%. Kerugian produk turun 94%. Investasi kembali dalam 7 bulan.",
    color: "dark",
    gridSpan: "normal",
  },
  {
    id: "last-mile-velocity",
    title: "SLA Delivery dari 67% Naik ke 96% di 12 Kota",
    industry: "FMCG & Consumer Goods",
    metric: "2.1x",
    metricLabel: "Percepatan Delivery",
    summary:
      "Redesain jaringan last-mile dari model hub tunggal ke micro-fulfillment terdistribusi di 48 titik strategis.",
    challenge:
      "SLA 24 jam hanya tercapai 67% di kota tier-2. Biaya last-mile mengonsumsi 43% total biaya logistik. Volume komplain meningkat dan menggerus reputasi brand di pasar lokal.",
    solution:
      "Jaringan 48 titik micro-fulfillment di lokasi strategis. Order otomatis dialokasikan ke titik terdekat. Rute pengiriman dioptimasi untuk mengurangi jarak tempuh dan idle time.",
    result:
      "SLA compliance naik ke 96%. Biaya last-mile turun 38%. Kecepatan delivery meningkat 2.1x rata-rata.",
    color: "light",
    gridSpan: "wide",
  },
];
