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
 * they are based on typical operational scenarios, not verified client engagements.
 * Replace with real client stories and verified metrics when available.
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
      id: "Sebuah pabrik elektronik mengimpor komponen dari 5 supplier di China dan Taiwan. Setiap supplier mengirim terpisah, menghasilkan 5 proses customs clearance berbeda setiap bulan. Koordinasi dokumen yang terfragmentasi memperlambat inbound ke lini produksi, dan biaya clearance per-shipment menumpuk.",
      en: "An electronics manufacturer imported components from 5 suppliers in China and Taiwan. Each supplier shipped separately, creating 5 separate customs clearance processes every month. Fragmented document coordination slowed inbound flow to the production line, and per-shipment clearance costs accumulated.",
    },
    solution: {
      id: "Kami konsolidasikan pengiriman dari multiple supplier di CFS negara asal menjadi satu shipment LCL per cycle. Customs clearance ditangani sebagai satu batch dengan satu set dokumen yang sudah diverifikasi sebelum kargo tiba. Delivery langsung dari pelabuhan ke pabrik tanpa transit warehouse tambahan.",
      en: "We consolidated shipments from multiple suppliers at the origin country CFS into one LCL shipment per cycle. Customs clearance was handled as a single batch with one pre-verified document set. Delivery went directly from port to factory without additional transit warehousing.",
    },
    result: {
      id: "Proses clearance yang sebelumnya memakan 5 cycle terpisah per bulan berkurang menjadi 1 batch terkoordinasi. Waktu tunggu komponen di pelabuhan berkurang signifikan, dan lini produksi mendapat supply yang lebih predictable. Biaya handling dan clearance juga turun karena konsolidasi dokumen.",
      en: "What previously required 5 separate clearance cycles per month was reduced to 1 coordinated batch. Component dwell time at port dropped significantly, and the production line received a more predictable supply flow. Handling and clearance costs also decreased through document consolidation.",
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
      id: "Sebuah brand consumer goods perlu mendistribusikan produk ke distributor di sekitar 15 kota di Indonesia, termasuk kota di luar Jawa. Sebelumnya menggunakan 4 vendor berbeda untuk Jawa, Sumatera, Kalimantan, dan Indonesia Timur. Setiap vendor punya sistem tracking terpisah, dan visibilitas end-to-end hampir tidak ada.",
      en: "A consumer goods brand needed to distribute products to distributors in roughly 15 cities across Indonesia, including cities outside Java. They previously used 4 different vendors for Java, Sumatra, Kalimantan, and Eastern Indonesia. Each vendor had separate tracking systems, and end-to-end visibility was nearly nonexistent.",
    },
    solution: {
      id: "Satu titik koordinasi untuk semua rute. FTL untuk volume besar di Jawa, kombinasi kapal dan truk untuk luar Jawa dengan jadwal yang disinkronkan. Cross-docking di Jakarta sebagai hub konsolidasi dan redistribusi. Satu dashboard tracking untuk semua shipment terlepas dari moda dan rute.",
      en: "One coordination point for all routes. FTL for high-volume Java routes, combined vessel and truck for outer islands with synchronized scheduling. Cross-docking in Jakarta as a consolidation and redistribution hub. One tracking overview for all shipments regardless of mode and route.",
    },
    result: {
      id: "Klien menggantikan 4 vendor terpisah dengan 1 koordinator. Visibilitas pengiriman meningkat secara substansial karena semua rute termonitor dari satu titik. Lead time ke kota luar Jawa menjadi lebih predictable karena scheduling yang terkoordinasi, dan waktu yang dihabiskan tim procurement untuk follow-up vendor berkurang drastis.",
      en: "The client replaced 4 separate vendors with 1 coordinator. Shipment visibility improved substantially because all routes were monitored from one point. Lead times to outer-island cities became more predictable through coordinated scheduling, and the procurement team spent significantly less time on vendor follow-ups.",
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
      id: "Sebuah perusahaan energi perlu mengirim generator set seberat sekitar 45 ton dari pelabuhan Tanjung Priok ke lokasi proyek di Kalimantan Timur. Akses jalan di kilometer terakhir terbatas dan beberapa jembatan di rute memiliki batasan beban. Timeline proyek ketat dengan penalty clause untuk keterlambatan.",
      en: "An energy company needed to transport a generator set weighing roughly 45 tons from Tanjung Priok port to a project site in East Kalimantan. Last-mile road access was limited and several bridges along the route had weight restrictions. The project timeline was tight with penalty clauses for delays.",
    },
    solution: {
      id: "Tim kami lakukan route survey terlebih dahulu untuk mapping seluruh batasan infrastruktur. Solusi transport menggunakan kombinasi barge untuk segment laut dan low-bed trailer dengan escort vehicle untuk last mile. Izin jalan khusus dikoordinasikan dengan otoritas lokal sebelum eksekusi. Rencana cadangan disiapkan untuk segment kritis.",
      en: "Our team conducted a route survey to map all infrastructure constraints first. The transport solution combined barge for the sea segment and low-bed trailer with escort vehicle for last mile. Special road permits were coordinated with local authorities before execution. A contingency plan was prepared for critical segments.",
    },
    result: {
      id: "Equipment tiba di lokasi proyek sesuai timeline yang dijadwalkan tanpa kerusakan. Perencanaan rute yang detail menghindari masalah jembatan dan akses jalan yang bisa menyebabkan keterlambatan berminggu-minggu. Klien tidak terkena penalty clause karena delivery tepat waktu.",
      en: "The equipment arrived at the project site within the scheduled timeline with no damage. Detailed route planning avoided bridge and road access issues that could have caused weeks of delay. The client avoided penalty clauses through on-time delivery.",
    },
    isPlaceholder: true,
  },
];
