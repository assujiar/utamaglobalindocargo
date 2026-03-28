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
    title: "Konsolidasi Distribusi Multi-Negara",
    industry: "Manufacturing",
    metric: "~40%",
    metricLabel: "Reduksi Lead Time",
    summary:
      "Distribusi ke belasan negara dengan vendor berbeda di setiap titik, dikonsolidasi ke dalam satu jaringan koordinasi.",
    challenge:
      "Gangguan di satu negara berdampak ke negara lain karena tidak ada koordinasi terpusat. Waktu stabilisasi saat ada masalah bisa memakan beberapa hari.",
    solution:
      "Jalur distribusi dirancang ulang dengan rute alternatif yang bisa diaktifkan saat jalur utama terganggu, tanpa harus koordinasi manual satu per satu.",
    result:
      "Lead time berkurang sekitar 40%. Biaya demurrage turun signifikan. Ketersediaan stok jauh lebih stabil dibanding sebelumnya.",
    color: "dark",
    gridSpan: "tall",
  },
  {
    id: "customs-velocity",
    title: "Percepatan Proses Customs Clearance",
    industry: "Pharmaceutical",
    metric: "~3x",
    metricLabel: "Lebih Cepat",
    summary:
      "Proses bea cukai yang sebelumnya manual dan rawan kesalahan, didigitalisasi supaya dokumen siap sebelum barang tiba.",
    challenge:
      "Proses clearance rata-rata hampir seminggu per pengiriman. Kesalahan klasifikasi HS Code cukup sering terjadi, mengakibatkan penalti dan keterlambatan.",
    solution:
      "Klasifikasi HS dan dokumentasi disiapkan lebih awal dengan sistem yang terstandarisasi. Verifikasi dilakukan sebelum kontainer berangkat, bukan setelah tiba.",
    result:
      "Waktu clearance turun dari hampir seminggu menjadi kurang dari 2 hari. Kesalahan klasifikasi turun drastis. Penalti berkurang signifikan.",
    color: "light",
    gridSpan: "normal",
  },
  {
    id: "warehouse-singularity",
    title: "Optimasi Utilisasi Multi-Gudang",
    industry: "E-Commerce & Retail",
    metric: "~85%",
    metricLabel: "Utilisasi Gudang",
    summary:
      "Beberapa gudang dengan utilisasi rendah dan distribusi stok tidak merata, ditata ulang berdasarkan data demand per wilayah.",
    challenge:
      "Utilisasi gudang rata-rata hanya sekitar separuh kapasitas. Di satu lokasi overstock, di lokasi lain justru kosong. Picking lambat karena penempatan barang tidak terstruktur.",
    solution:
      "Rotasi stok antar-gudang disesuaikan dengan pola demand regional. Penempatan SKU ditata ulang untuk mempersingkat jarak picking.",
    result:
      "Utilisasi naik ke sekitar 85%. Biaya operasional gudang turun sekitar sepertiga. Waktu fulfillment jauh lebih cepat.",
    color: "dark",
    gridSpan: "wide",
  },
  {
    id: "freight-orchestration",
    title: "Integrasi Multi-Carrier ke Satu Platform",
    industry: "Commodities Trading",
    metric: "7→1",
    metricLabel: "Vendor Terkonsolidasi",
    summary:
      "Koordinasi dengan banyak freight forwarder yang sebelumnya terpisah-pisah, disatukan dalam satu dashboard visibility.",
    challenge:
      "Informasi tersebar di beberapa vendor tanpa integrasi. Tracking real-time hanya tersedia untuk sebagian kecil pengiriman. Tim operasional lebih banyak mencari informasi daripada mengambil keputusan.",
    solution:
      "Satu dashboard yang menghubungkan seluruh carrier. Posisi dan estimasi setiap kontainer bisa dipantau. Konsolidasi muatan dioptimalkan supaya kapasitas kontainer lebih terpakai.",
    result:
      "Visibility meningkat drastis. Biaya pengiriman turun karena konsolidasi yang lebih efisien. Transit time rata-rata berkurang.",
    color: "light",
    gridSpan: "tall",
  },
  {
    id: "cold-chain-integrity",
    title: "Monitoring Cold Chain untuk Produk Sensitif",
    industry: "Biotech & Life Sciences",
    metric: ">99%",
    metricLabel: "Suhu Terjaga",
    summary:
      "Distribusi produk biofarmasi di beberapa negara tropis dengan monitoring suhu real-time di setiap titik pengiriman.",
    challenge:
      "Deviasi suhu terjadi cukup sering dan baru terdeteksi setelah produk rusak. Kerugian dari produk yang harus dimusnahkan cukup besar setiap tahunnya.",
    solution:
      "Sensor IoT dipasang di setiap unit pendingin dengan monitoring real-time. Sistem memberikan peringatan dini saat ada risiko deviasi, sehingga bisa ditangani sebelum produk rusak.",
    result:
      "Compliance suhu naik ke lebih dari 99%. Kerugian produk turun secara signifikan. Investasi kembali dalam waktu kurang dari setahun.",
    color: "dark",
    gridSpan: "normal",
  },
  {
    id: "last-mile-velocity",
    title: "Redesain Jaringan Last-Mile di Beberapa Kota",
    industry: "FMCG & Consumer Goods",
    metric: "~2x",
    metricLabel: "Lebih Cepat",
    summary:
      "Jaringan last-mile yang sebelumnya terpusat di satu hub, dipecah ke banyak titik fulfillment supaya lebih dekat ke tujuan.",
    challenge:
      "SLA delivery sering tidak tercapai, terutama di kota-kota di luar ibukota. Biaya last-mile terlalu tinggi dibanding total biaya logistik.",
    solution:
      "Titik fulfillment diperbanyak di lokasi-lokasi strategis. Order dialokasikan ke titik terdekat secara otomatis. Rute dioptimasi untuk mengurangi jarak tempuh.",
    result:
      "SLA compliance naik signifikan. Biaya last-mile turun sekitar sepertiga. Kecepatan pengiriman meningkat sekitar 2 kali lipat.",
    color: "light",
    gridSpan: "wide",
  },
];
