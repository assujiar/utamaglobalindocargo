export interface SubService {
  name: { id: string; en: string };
  description: { id: string; en: string };
}

export interface ServiceCategory {
  slug: string;
  name: { id: string; en: string };
  shortDescription: { id: string; en: string };
  description: { id: string; en: string };
  subServices: SubService[];
  bestFor: { id: string[]; en: string[] };
  process: { id: string[]; en: string[] };
  icon: string;
}

export const services: ServiceCategory[] = [
  {
    slug: "domestic-distribution",
    name: {
      id: "Distribusi Domestik",
      en: "Domestic Distribution",
    },
    shortDescription: {
      id: "Pengiriman darat, laut, dan udara ke seluruh Indonesia. FTL, LTL, FCL, LCL, dan airfreight domestik.",
      en: "Land, sea, and air shipping across Indonesia. FTL, LTL, FCL, LCL, and domestic airfreight.",
    },
    description: {
      id: "Indonesia itu 17.000 pulau. Mengirim barang dari Surabaya ke Makassar beda ceritanya dengan Jakarta ke Bandung. Kami menangani distribusi domestik dengan memilih moda yang tepat untuk setiap rute: truk untuk Jawa, kapal untuk antar-pulau, pesawat untuk yang urgent. Satu tim yang koordinasi, dari pengambilan sampai pengiriman.",
      en: "Indonesia spans 17,000 islands. Shipping from Surabaya to Makassar is a different story than Jakarta to Bandung. We handle domestic distribution by selecting the right mode for each route: trucks for Java, vessels for inter-island, aircraft for urgent cargo. One team coordinating from pickup to delivery.",
    },
    subServices: [
      {
        name: { id: "Full Truck Load (FTL)", en: "Full Truck Load (FTL)" },
        description: {
          id: "Satu truk eksklusif untuk kargo Anda. Tanpa konsolidasi dengan shipper lain. Cocok untuk volume besar atau barang yang butuh penanganan khusus.",
          en: "One truck exclusively for your cargo. No consolidation with other shippers. Suited for large volumes or goods requiring special handling.",
        },
      },
      {
        name: { id: "Less Than Truck Load (LTL)", en: "Less Than Truck Load (LTL)" },
        description: {
          id: "Pengiriman darat dengan konsolidasi. Opsi ekonomis untuk volume yang tidak memenuhi satu truk penuh.",
          en: "Consolidated trucking. An economical option for volumes that don't fill a full truck.",
        },
      },
      {
        name: { id: "FCL Domestik", en: "Domestic FCL" },
        description: {
          id: "Kontainer penuh (20 ft atau 40 ft) untuk pengiriman antar-pulau di Indonesia. Kapasitas eksklusif untuk kargo Anda.",
          en: "Full container (20 ft or 40 ft) for inter-island shipments within Indonesia. Exclusive capacity for your cargo.",
        },
      },
      {
        name: { id: "LCL Domestik", en: "Domestic LCL" },
        description: {
          id: "Pengiriman kontainer konsolidasi untuk volume di bawah satu kontainer. Fleksibel dan lebih hemat biaya.",
          en: "Consolidated container shipment for volumes below one container. Flexible and more cost-effective.",
        },
      },
      {
        name: { id: "Airfreight Domestik", en: "Domestic Airfreight" },
        description: {
          id: "Pengiriman udara domestik untuk kargo yang butuh kecepatan atau bernilai tinggi. Dari dan ke bandara utama di seluruh Indonesia.",
          en: "Domestic air transport for time-sensitive or high-value cargo. To and from major airports across Indonesia.",
        },
      },
    ],
    bestFor: {
      id: [
        "Distribusi produk FMCG ke seluruh Indonesia",
        "Pengiriman bahan baku antar pabrik",
        "Distribusi e-commerce ke luar Pulau Jawa",
        "Transfer antar gudang dalam satu jaringan",
      ],
      en: [
        "FMCG product distribution across Indonesia",
        "Raw material shipment between factories",
        "E-commerce distribution outside Java",
        "Inter-warehouse transfers within one network",
      ],
    },
    process: {
      id: [
        "Analisis rute dan pemilihan moda terbaik",
        "Booking kapasitas truk, kapal, atau pesawat",
        "Pengambilan kargo di lokasi Anda",
        "Transit dan monitoring real-time",
        "Pengiriman ke tujuan akhir",
      ],
      en: [
        "Route analysis and best mode selection",
        "Truck, vessel, or aircraft capacity booking",
        "Cargo pickup at your location",
        "Transit and real-time monitoring",
        "Final delivery to destination",
      ],
    },
    icon: "truck",
  },
  {
    slug: "international-freight",
    name: {
      id: "International Freight Forwarding",
      en: "International Freight Forwarding",
    },
    shortDescription: {
      id: "Ekspor dan impor via laut dan udara. FCL, LCL, dan airfreight untuk rute internasional.",
      en: "Export and import via sea and air. FCL, LCL, and airfreight for international routes.",
    },
    description: {
      id: "Freight forwarding internasional melibatkan dokumen ekspor-impor, koordinasi dengan shipping line, monitoring transit, dan penanganan di port tujuan. Kami mengelola keseluruhan alur dengan disiplin, dari booking dan dokumentasi sampai kargo tiba di pelabuhan tujuan.",
      en: "International freight forwarding involves export-import documentation, shipping line coordination, transit monitoring, and destination port handling. We manage the full flow with discipline, from booking and documentation through to cargo arrival at the destination port.",
    },
    subServices: [
      {
        name: { id: "FCL Export", en: "FCL Export" },
        description: {
          id: "Ekspor kontainer penuh dari Indonesia ke pelabuhan luar negeri. Koordinasi dengan shipping line dan pengurusan dokumen ekspor.",
          en: "Full container export from Indonesia to overseas ports. Coordination with shipping lines and export documentation.",
        },
      },
      {
        name: { id: "LCL Export", en: "LCL Export" },
        description: {
          id: "Ekspor konsolidasi untuk volume di bawah satu kontainer. Kargo Anda digabung dengan shipper lain di CFS.",
          en: "Consolidated export for volumes below one container. Your cargo is grouped with other shippers at the CFS.",
        },
      },
      {
        name: { id: "Airfreight Export", en: "Airfreight Export" },
        description: {
          id: "Pengiriman udara ekspor untuk kargo urgent atau bernilai tinggi. Booking di maskapai kargo reguler atau charter.",
          en: "Air export for urgent or high-value cargo. Booking on regular cargo airlines or charter.",
        },
      },
      {
        name: { id: "FCL Import", en: "FCL Import" },
        description: {
          id: "Impor kontainer penuh ke Indonesia. Koordinasi dari port asal sampai kargo tiba di pelabuhan Indonesia.",
          en: "Full container import to Indonesia. Coordination from origin port to cargo arrival at Indonesian ports.",
        },
      },
      {
        name: { id: "LCL Import", en: "LCL Import" },
        description: {
          id: "Impor konsolidasi untuk volume yang tidak memenuhi satu kontainer.",
          en: "Consolidated import for volumes that don't fill one container.",
        },
      },
      {
        name: { id: "Airfreight Import", en: "Airfreight Import" },
        description: {
          id: "Impor via udara untuk kargo yang butuh kecepatan atau penanganan khusus.",
          en: "Air import for cargo that needs speed or special handling.",
        },
      },
    ],
    bestFor: {
      id: [
        "Ekspor produk manufacturing ke pasar global",
        "Impor bahan baku dari supplier internasional",
        "Pengiriman urgent via udara",
        "Supply chain management multi-negara",
      ],
      en: [
        "Manufacturing product export to global markets",
        "Raw material import from international suppliers",
        "Urgent shipments via air",
        "Multi-country supply chain management",
      ],
    },
    process: {
      id: [
        "Konsultasi rute dan estimasi biaya",
        "Booking space di shipping line atau airline",
        "Pengurusan dokumen ekspor/impor",
        "Monitoring transit dari origin ke destination",
        "Koordinasi arrival dan handover di port tujuan",
      ],
      en: [
        "Route consultation and cost estimation",
        "Space booking with shipping line or airline",
        "Export/import document processing",
        "Transit monitoring from origin to destination",
        "Arrival coordination and handover at destination port",
      ],
    },
    icon: "globe",
  },
  {
    slug: "import-dtd",
    name: {
      id: "Import Door-to-Door & Customs Brokerage",
      en: "Import Door-to-Door & Customs Brokerage",
    },
    shortDescription: {
      id: "Impor dari pintu supplier sampai pintu gudang Anda. Termasuk customs clearance dan pengurusan bea cukai.",
      en: "Import from supplier's door to your warehouse door. Including customs clearance and brokerage.",
    },
    description: {
      id: "Kompleksitas impor ada di dokumen dan customs. Satu dokumen salah, kargo bisa tertahan berminggu-minggu. Layanan door-to-door kami menangani alur lengkap: pickup di supplier, freight, customs clearance yang disiapkan sesuai spesifik kargo Anda, sampai delivery ke gudang. Customs brokerage juga tersedia sebagai layanan terpisah.",
      en: "The complexity of importing lies in the documentation and customs. One wrong document can hold your cargo for weeks. Our door-to-door service handles the full flow: supplier pickup, freight, customs clearance prepared to the specifics of your cargo, and delivery to your warehouse. Customs brokerage is also available as a standalone service.",
    },
    subServices: [
      {
        name: { id: "FCL Import Door-to-Door", en: "FCL Import Door-to-Door" },
        description: {
          id: "Impor kontainer penuh dari supplier sampai gudang Anda. Semua proses ditangani satu tim, dari booking sampai delivery.",
          en: "Full container import from supplier to your warehouse. All processes handled by one team, from booking to delivery.",
        },
      },
      {
        name: { id: "LCL Import Door-to-Door", en: "LCL Import Door-to-Door" },
        description: {
          id: "Impor konsolidasi door-to-door untuk volume yang lebih kecil.",
          en: "Consolidated door-to-door import for smaller volumes.",
        },
      },
      {
        name: { id: "Airfreight Import Door-to-Door", en: "Airfreight Import Door-to-Door" },
        description: {
          id: "Impor udara lengkap dari pickup di supplier sampai delivery ke lokasi Anda.",
          en: "Complete air import from supplier pickup to delivery at your location.",
        },
      },
      {
        name: { id: "Customs Brokerage", en: "Customs Brokerage" },
        description: {
          id: "Layanan pengurusan bea cukai independen. Klasifikasi HS, persiapan dokumen, dan pre-clearance untuk mempercepat proses impor.",
          en: "Independent customs clearance service. HS classification, document preparation, and pre-clearance to speed up the import process.",
        },
      },
    ],
    bestFor: {
      id: [
        "Importir yang butuh kepastian proses dari awal sampai akhir",
        "Perusahaan yang sering mengalami kendala customs clearance",
        "Bisnis yang ingin mengurangi vendor untuk proses impor",
        "Pengiriman urgent yang tidak boleh tertunda di bea cukai",
      ],
      en: [
        "Importers who need process certainty from start to finish",
        "Companies that frequently face customs clearance issues",
        "Businesses looking to reduce vendors in their import process",
        "Urgent shipments that cannot afford customs delays",
      ],
    },
    process: {
      id: [
        "Koordinasi dengan supplier di negara asal",
        "Pengambilan kargo dan pengurusan dokumen ekspor",
        "Freight ke Indonesia (laut atau udara)",
        "Customs clearance dan pembayaran bea masuk",
        "Delivery ke gudang atau lokasi Anda",
      ],
      en: [
        "Coordination with supplier at origin country",
        "Cargo pickup and export document processing",
        "Freight to Indonesia (sea or air)",
        "Customs clearance and duty payment",
        "Delivery to your warehouse or location",
      ],
    },
    icon: "customs",
  },
  {
    slug: "warehousing",
    name: {
      id: "Warehousing & Fulfillment",
      en: "Warehousing & Fulfillment",
    },
    shortDescription: {
      id: "Penyimpanan, bonded warehouse, pick and pack, dan cross-docking. Gudang di area Jakarta.",
      en: "Storage, bonded warehouse, pick and pack, and cross-docking. Warehouses in the Jakarta area.",
    },
    description: {
      id: "Gudang bukan cuma tempat simpan barang. Kami kelola inventory, proses order fulfillment, dan atur distribusi dari satu titik. Untuk barang impor, bonded warehouse memungkinkan Anda menunda pembayaran bea masuk sampai barang benar-benar dibutuhkan.",
      en: "A warehouse isn't just a storage space. We manage inventory, process order fulfillment, and coordinate distribution from one point. For imported goods, our bonded warehouse lets you defer duty payment until the goods are actually needed.",
    },
    subServices: [
      {
        name: { id: "General Warehousing", en: "General Warehousing" },
        description: {
          id: "Penyimpanan dan manajemen inventory di gudang standar. Cocok untuk barang umum yang butuh tempat penyimpanan dengan sistem terkelola.",
          en: "Storage and inventory management in standard warehouses. Suited for general goods that need managed storage.",
        },
      },
      {
        name: { id: "Bonded Warehouse", en: "Bonded Warehouse" },
        description: {
          id: "Fasilitas bonded untuk barang impor dengan penundaan pembayaran bea dan pajak. Cash flow lebih baik untuk importir.",
          en: "Bonded facility for imported goods with deferred duty and tax payment. Better cash flow for importers.",
        },
      },
      {
        name: { id: "Pick & Pack Fulfillment", en: "Pick & Pack Fulfillment" },
        description: {
          id: "Picking, packing, dan labeling untuk pesanan e-commerce dan distribusi retail. Dari gudang langsung ke customer.",
          en: "Picking, packing, and labeling for e-commerce orders and retail distribution. Directly from warehouse to customer.",
        },
      },
      {
        name: { id: "Cross-Docking", en: "Cross-Docking" },
        description: {
          id: "Transfer cepat dari kendaraan inbound ke outbound dengan waktu penyimpanan minimal. Cocok untuk distribusi yang butuh kecepatan.",
          en: "Rapid transfer from inbound to outbound vehicles with minimal storage time. Ideal for distribution that needs speed.",
        },
      },
    ],
    bestFor: {
      id: [
        "E-commerce yang butuh fulfillment center",
        "Importir yang ingin mengoptimalkan cash flow dengan bonded warehouse",
        "Distributor yang butuh hub distribusi di Jakarta",
        "Bisnis seasonal yang butuh fleksibilitas kapasitas gudang",
      ],
      en: [
        "E-commerce businesses needing a fulfillment center",
        "Importers wanting to optimize cash flow with bonded warehouse",
        "Distributors needing a distribution hub in Jakarta",
        "Seasonal businesses needing flexible warehouse capacity",
      ],
    },
    process: {
      id: [
        "Penerimaan barang dan quality check",
        "Penyimpanan dengan sistem inventory terkelola",
        "Order processing dan picking",
        "Packing, labeling, dan dispatch",
        "Pelaporan inventory berkala",
      ],
      en: [
        "Goods receipt and quality check",
        "Storage with managed inventory system",
        "Order processing and picking",
        "Packing, labeling, and dispatch",
        "Regular inventory reporting",
      ],
    },
    icon: "warehouse",
  },
  {
    slug: "project-cargo",
    name: {
      id: "Project Cargo & Special Handling",
      en: "Project Cargo & Special Handling",
    },
    shortDescription: {
      id: "Muatan berat, oversized, barang berbahaya, dan kargo bersuhu terkontrol. Penanganan khusus untuk kebutuhan khusus.",
      en: "Heavy lift, oversized, dangerous goods, and temperature controlled cargo. Special handling for special needs.",
    },
    description: {
      id: "Tidak semua kargo bisa masuk kontainer standar. Mesin pabrik yang beratnya puluhan ton, bahan kimia yang butuh sertifikasi khusus, produk farmasi yang harus tetap dingin. Setiap project cargo punya tantangan unik, dan kami susun rencana pengiriman yang sesuai: dari survey di site, pemilihan equipment, sampai izin khusus yang diperlukan.",
      en: "Not all cargo fits in a standard container. Factory machinery weighing tens of tons, chemicals requiring special certification, pharmaceutical products that must stay cold. Every project cargo has unique challenges, and we build a shipping plan to match: from site surveys, equipment selection, to special permits required.",
    },
    subServices: [
      {
        name: { id: "Heavy Lift & Oversize Cargo", en: "Heavy Lift & Oversize Cargo" },
        description: {
          id: "Penanganan kargo berukuran besar atau berat berlebih yang butuh transport khusus. Survey, rigging, dan perencanaan rute termasuk dalam layanan.",
          en: "Handling of oversized or overweight cargo requiring specialized transport. Survey, rigging, and route planning are included.",
        },
      },
      {
        name: { id: "Dangerous Goods Handling", en: "Dangerous Goods Handling" },
        description: {
          id: "Pengiriman bahan berbahaya sesuai regulasi IATA dan IMDG. Klasifikasi, pengemasan, labeling, dan dokumentasi yang compliant.",
          en: "Hazardous materials transport compliant with IATA and IMDG regulations. Classification, packaging, labeling, and compliant documentation.",
        },
      },
      {
        name: { id: "Temperature Controlled Cargo", en: "Temperature Controlled Cargo" },
        description: {
          id: "Cold chain logistics untuk produk yang memerlukan kontrol suhu, termasuk farmasi dan perishable goods.",
          en: "Cold chain logistics for products requiring temperature control, including pharmaceuticals and perishable goods.",
        },
      },
      {
        name: { id: "Breakbulk & Out-of-Gauge", en: "Breakbulk & Out-of-Gauge" },
        description: {
          id: "Kargo non-kontainer dan muatan dengan dimensi tidak standar. Solusi custom untuk setiap tipe muatan.",
          en: "Non-containerized cargo and loads with non-standard dimensions. Custom solutions for each type of load.",
        },
      },
    ],
    bestFor: {
      id: [
        "Proyek konstruksi dan infrastruktur yang butuh alat berat",
        "Industri kimia dan energi dengan DG requirements",
        "Farmasi yang butuh cold chain compliance",
        "Manufacturing yang impor mesin atau equipment besar",
      ],
      en: [
        "Construction and infrastructure projects needing heavy equipment",
        "Chemical and energy industries with DG requirements",
        "Pharmaceuticals needing cold chain compliance",
        "Manufacturing importing large machinery or equipment",
      ],
    },
    process: {
      id: [
        "Site survey dan analisis kebutuhan",
        "Perencanaan transport dan pemilihan equipment",
        "Pengurusan izin dan sertifikasi",
        "Eksekusi pengiriman dengan monitoring ketat",
        "Delivery dan handover di lokasi tujuan",
      ],
      en: [
        "Site survey and needs analysis",
        "Transport planning and equipment selection",
        "Permit and certification processing",
        "Shipment execution with close monitoring",
        "Delivery and handover at destination",
      ],
    },
    icon: "crane",
  },
  {
    slug: "blocspace",
    name: {
      id: "Blocspace & Charter",
      en: "Blocspace & Charter",
    },
    shortDescription: {
      id: "Kapasitas terjamin di kapal atau pesawat. Alokasi blocspace dan charter untuk volume besar atau kebutuhan khusus.",
      en: "Guaranteed capacity on vessels or aircraft. Blocspace allocation and charter for large volumes or special needs.",
    },
    description: {
      id: "Di musim ramai, space di kapal dan pesawat kargo bisa penuh berminggu-minggu sebelumnya. Blocspace allocation menjamin kapasitas Anda di jadwal reguler. Untuk proyek besar atau kebutuhan mendesak, charter pesawat atau kapal memberikan kontrol penuh atas jadwal dan kapasitas.",
      en: "During peak season, space on cargo vessels and aircraft can be fully booked weeks in advance. Blocspace allocation guarantees your capacity on regular schedules. For large projects or urgent needs, aircraft or vessel charter gives you full control over schedule and capacity.",
    },
    subServices: [
      {
        name: { id: "Blocspace Allocation", en: "Blocspace Allocation" },
        description: {
          id: "Reservasi kapasitas di kapal atau pesawat pada jadwal reguler. Space terjamin untuk pengiriman rutin Anda.",
          en: "Reserved capacity on scheduled vessels or flights. Guaranteed space for your regular shipments.",
        },
      },
      {
        name: { id: "Airfreight Charter", en: "Airfreight Charter" },
        description: {
          id: "Penyewaan pesawat kargo khusus untuk pengiriman besar atau urgent. Jadwal sepenuhnya sesuai kebutuhan Anda.",
          en: "Dedicated cargo aircraft chartering for large or urgent shipments. Schedule entirely based on your needs.",
        },
      },
      {
        name: { id: "Sea Freight Charter", en: "Sea Freight Charter" },
        description: {
          id: "Charter kapal penuh atau sebagian untuk proyek khusus atau kargo volume tinggi.",
          en: "Full or partial vessel charter for special projects or high-volume cargo.",
        },
      },
    ],
    bestFor: {
      id: [
        "Shipper dengan volume konsisten yang butuh jaminan space",
        "Proyek besar yang butuh kapasitas dedicated",
        "Pengiriman urgent yang tidak bisa menunggu jadwal reguler",
        "Peak season planning untuk retailer dan distributor",
      ],
      en: [
        "Shippers with consistent volume needing guaranteed space",
        "Large projects requiring dedicated capacity",
        "Urgent shipments that can't wait for regular schedules",
        "Peak season planning for retailers and distributors",
      ],
    },
    process: {
      id: [
        "Analisis kebutuhan kapasitas dan frekuensi",
        "Negosiasi rate dan alokasi dengan carrier",
        "Konfirmasi booking dan jadwal",
        "Monitoring utilisasi dan penyesuaian",
        "Review berkala dan optimasi",
      ],
      en: [
        "Capacity and frequency needs analysis",
        "Rate negotiation and carrier allocation",
        "Booking confirmation and scheduling",
        "Utilization monitoring and adjustment",
        "Regular review and optimization",
      ],
    },
    icon: "ship",
  },
];

export function getServiceBySlug(slug: string): ServiceCategory | undefined {
  return services.find((s) => s.slug === slug);
}
