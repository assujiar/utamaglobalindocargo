export interface CaseStudy {
  slug: string;
  title: { id: string; en: string };
  industry: string;
  service: string;
  challenge: { id: string; en: string };
  solution: { id: string; en: string };
  result: { id: string; en: string };
  isPlaceholder: true;
}

/**
 * Case study data.
 * All entries are marked as placeholders (isPlaceholder: true) because
 * they are based on typical scenarios, not verified client engagements.
 * Replace with real client stories when available.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "manufacturing-import-consolidation",
    title: {
      id: "Konsolidasi Impor untuk Manufaktur Elektronik",
      en: "Import Consolidation for Electronics Manufacturing",
    },
    industry: "manufacturing",
    service: "import-dtd",
    challenge: {
      id: "Perusahaan manufaktur elektronik mengimpor komponen dari 5 supplier di China dan Taiwan. Setiap supplier kirim terpisah, dan koordinasi customs clearance untuk banyak shipment bersamaan memperlambat proses produksi.",
      en: "An electronics manufacturer imported components from 5 suppliers in China and Taiwan. Each supplier shipped separately, and coordinating customs clearance for multiple simultaneous shipments slowed production.",
    },
    solution: {
      id: "Kami konsolidasikan pengiriman dari multiple supplier menjadi satu shipment via LCL, handle customs clearance sebagai satu batch, dan delivery langsung ke pabrik. Satu set dokumen, satu proses clearance.",
      en: "We consolidated shipments from multiple suppliers into one LCL shipment, handled customs clearance as a single batch, and delivered directly to the factory. One set of documents, one clearance process.",
    },
    result: {
      id: "[PLACEHOLDER: Hasil aktual akan diisi setelah verifikasi klien. Contoh skenario: waktu clearance berkurang dari 7 hari menjadi 3 hari kerja per batch.]",
      en: "[PLACEHOLDER: Actual results to be filled after client verification. Example scenario: clearance time reduced from 7 days to 3 business days per batch.]",
    },
    isPlaceholder: true,
  },
  {
    slug: "fmcg-national-distribution",
    title: {
      id: "Distribusi Nasional Produk Consumer Goods",
      en: "National Distribution for Consumer Goods",
    },
    industry: "fmcg",
    service: "domestic-distribution",
    challenge: {
      id: "Brand consumer goods perlu mendistribusikan produk ke distributor di 15 kota di Indonesia, termasuk kota di luar Jawa. Sebelumnya menggunakan 4 vendor berbeda untuk Jawa, Sumatera, Kalimantan, dan Indonesia Timur.",
      en: "A consumer goods brand needed to distribute products to distributors in 15 cities across Indonesia, including cities outside Java. Previously used 4 different vendors for Java, Sumatra, Kalimantan, and Eastern Indonesia.",
    },
    solution: {
      id: "Satu titik koordinasi untuk semua rute. FTL untuk volume besar di Jawa, kombinasi kapal dan truk untuk luar Jawa. Cross-docking di Jakarta untuk konsolidasi dan redistribusi.",
      en: "One coordination point for all routes. FTL for large volumes in Java, combined vessel and truck for outer islands. Cross-docking in Jakarta for consolidation and redistribution.",
    },
    result: {
      id: "[PLACEHOLDER: Hasil aktual akan diisi setelah verifikasi klien. Contoh skenario: jumlah vendor berkurang dari 4 menjadi 1, visibilitas tracking meningkat.]",
      en: "[PLACEHOLDER: Actual results to be filled after client verification. Example scenario: vendor count reduced from 4 to 1, tracking visibility improved.]",
    },
    isPlaceholder: true,
  },
  {
    slug: "energy-project-cargo",
    title: {
      id: "Transport Equipment Pembangkit Listrik",
      en: "Power Plant Equipment Transport",
    },
    industry: "energy",
    service: "project-cargo",
    challenge: {
      id: "Perusahaan energi perlu mengirim generator set seberat 45 ton dari pelabuhan Tanjung Priok ke lokasi proyek di Kalimantan Timur. Akses jalan terakhir terbatas dan jembatan di rute memiliki batasan beban.",
      en: "An energy company needed to transport a 45-ton generator set from Tanjung Priok port to a project site in East Kalimantan. Last-mile road access was limited and bridges along the route had weight restrictions.",
    },
    solution: {
      id: "Survey rute terlebih dahulu untuk identifikasi batasan. Kombinasi barge untuk transport laut dan low-bed trailer dengan escort untuk last mile. Koordinasi izin jalan khusus dengan otoritas lokal.",
      en: "Route survey to identify restrictions first. Combined barge for sea transport and low-bed trailer with escort for last mile. Special road permit coordination with local authorities.",
    },
    result: {
      id: "[PLACEHOLDER: Hasil aktual akan diisi setelah verifikasi klien. Contoh skenario: pengiriman selesai dalam timeline proyek tanpa kerusakan.]",
      en: "[PLACEHOLDER: Actual results to be filled after client verification. Example scenario: delivery completed within project timeline with no damage.]",
    },
    isPlaceholder: true,
  },
];
