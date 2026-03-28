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
    title: "Restrukturisasi Rantai Pasok Multinasional",
    client: "Konglomerat Manufaktur ASEAN",
    industry: "Manufaktur Berat",
    metric: "47%",
    metricLabel: "Reduksi Lead Time",
    summary:
      "Transformasi arsitektur distribusi 14 negara dari model hub-and-spoke menjadi jaringan mesh adaptif.",
    challenge:
      "Fragmentasi vendor di 14 titik negara menciptakan bottleneck berulang. Setiap gangguan rantai pasok menghasilkan efek domino yang memakan waktu 72 jam untuk stabilisasi.",
    solution:
      "Implementasi orkestrasi rantai pasok terpadu dengan routing algoritmik real-time. Jaringan mesh adaptif mengeliminasi single-point-of-failure dan memungkinkan re-routing otomatis dalam hitungan menit.",
    result:
      "Lead time tereduksi 47%. Biaya demurrage turun 62%. Zero stockout selama 18 bulan berturut-turut.",
    color: "dark",
    gridSpan: "tall",
  },
  {
    id: "customs-velocity",
    title: "Akselerasi Kepabeanan Zero-Delay",
    client: "Distributor Farmasi Regional",
    industry: "Farmasi & Healthcare",
    metric: "3.2x",
    metricLabel: "Percepatan Clearance",
    summary:
      "Digitalisasi end-to-end proses kepabeanan dari deklarasi manual menjadi pre-clearance algoritmik.",
    challenge:
      "Proses kepabeanan manual memakan rata-rata 5.7 hari per shipment. Kesalahan klasifikasi HS Code terjadi pada 23% pengiriman, mengakibatkan penalti dan keterlambatan kritis.",
    solution:
      "Mesin kepatuhan regulasi dengan klasifikasi HS Code otomatis berbasis AI dan pre-clearance yang memproses dokumentasi sebelum kontainer tiba di pelabuhan tujuan.",
    result:
      "Clearance time tereduksi dari 5.7 hari menjadi 1.8 hari. Error rate klasifikasi turun ke 0.3%. Penghematan penalti $2.1M per tahun.",
    color: "light",
    gridSpan: "normal",
  },
  {
    id: "warehouse-singularity",
    title: "Konvergensi Pergudangan Dinamis",
    client: "E-Commerce Enterprise Tier-1",
    industry: "Retail & E-Commerce",
    metric: "89%",
    metricLabel: "Utilisasi Ruang",
    summary:
      "Transformasi 6 gudang statis menjadi jaringan fulfillment dinamis dengan alokasi ruang algoritmik.",
    challenge:
      "Utilisasi rata-rata hanya 54% di 6 lokasi gudang. Maldistribusi inventaris menyebabkan overstock di satu lokasi dan stockout di lokasi lain secara simultan.",
    solution:
      "Sistem alokasi ruang dinamis yang merotasi inventaris antar-gudang berdasarkan prediksi demand regional. Slotting algoritmik mengoptimalkan penempatan SKU untuk minimalisasi pick-path.",
    result:
      "Utilisasi ruang melonjak ke 89%. Biaya operasional gudang turun 34%. Kecepatan fulfillment meningkat 2.8x.",
    color: "dark",
    gridSpan: "wide",
  },
  {
    id: "freight-orchestration",
    title: "Orkestrasi Armada Kontainer Intercontinental",
    client: "Trading House Komoditas Global",
    industry: "Perdagangan Komoditas",
    metric: "$4.7M",
    metricLabel: "Penghematan Tahunan",
    summary:
      "Konsolidasi manajemen 340+ kontainer/bulan dari 7 freight forwarder ke platform komando tunggal.",
    challenge:
      "Koordinasi dengan 7 freight forwarder independen menciptakan informational blackhole. Visibility real-time terhadap posisi kontainer hanya tersedia untuk 31% shipment.",
    solution:
      "Platform komando tunggal yang mengintegrasikan seluruh carrier ke dalam satu dashboard visibility. Algoritma konsolidasi mengoptimalkan pemanfaatan kapasitas kontainer secara otomatis.",
    result:
      "Visibility meningkat ke 99.7%. Penghematan $4.7M dari optimisasi konsolidasi. Rata-rata transit time tereduksi 12 hari.",
    color: "light",
    gridSpan: "tall",
  },
  {
    id: "cold-chain-integrity",
    title: "Integritas Cold Chain Farmasi Transnasional",
    client: "Perusahaan Bioteknologi Asia Tenggara",
    industry: "Bioteknologi & Life Sciences",
    metric: "99.8%",
    metricLabel: "Compliance Suhu",
    summary:
      "Pembangunan jaringan cold chain end-to-end untuk distribusi vaksin dan biofarmasi di 6 negara tropis.",
    challenge:
      "Deviasi suhu terjadi pada 18% shipment, menyebabkan kerugian $3.4M per tahun dari produk yang harus dimusnahkan. Monitoring manual tidak mampu mendeteksi excursion secara real-time.",
    solution:
      "Implementasi IoT sensor array dengan telemetri suhu real-time di setiap unit pendingin. Algoritma prediktif mendeteksi risiko deviasi 2 jam sebelum terjadi dan memicu re-routing otomatis ke fasilitas terdekat.",
    result:
      "Compliance suhu mencapai 99.8%. Kerugian produk turun 94%. ROI tercapai dalam 7 bulan implementasi.",
    color: "dark",
    gridSpan: "normal",
  },
  {
    id: "last-mile-velocity",
    title: "Akselerasi Last-Mile Metropolitas",
    client: "Konglomerat FMCG Nasional",
    industry: "FMCG & Consumer Goods",
    metric: "2.1x",
    metricLabel: "Percepatan Delivery",
    summary:
      "Redesain total jaringan last-mile delivery untuk 12 kota metropolitan dari model hub tunggal ke micro-fulfillment terdistribusi.",
    challenge:
      "SLA delivery 24 jam hanya tercapai 67% di kota-kota tier-2. Biaya last-mile mengkonsumsi 43% total biaya logistik. Customer complaint rate terus meningkat.",
    solution:
      "Jaringan micro-fulfillment center di 48 titik strategis dengan dynamic routing yang mengalokasikan order ke node terdekat secara otomatis. Batch optimization mengurangi empty miles.",
    result:
      "SLA compliance melonjak ke 96%. Biaya last-mile tereduksi 38%. Delivery speed meningkat 2.1x rata-rata.",
    color: "light",
    gridSpan: "wide",
  },
];
