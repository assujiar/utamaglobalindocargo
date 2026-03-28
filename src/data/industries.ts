export interface Industry {
  slug: string;
  name: { id: string; en: string };
  description: { id: string; en: string };
  challenge: { id: string; en: string };
  solution: { id: string; en: string };
  relevantServices: string[];
  icon: string;
}

export const industries: Industry[] = [
  {
    slug: "manufacturing",
    name: { id: "Manufacturing", en: "Manufacturing" },
    description: {
      id: "Pabrik butuh bahan baku datang tepat waktu dan produk jadi keluar sesuai jadwal. Satu hari keterlambatan di inbound bisa menghentikan lini produksi. Kami koordinasi inbound raw material dan outbound finished goods agar supply chain tetap jalan.",
      en: "Factories need raw materials arriving on time and finished goods shipping on schedule. One day of inbound delay can halt a production line. We coordinate inbound raw materials and outbound finished goods to keep the supply chain moving.",
    },
    challenge: {
      id: "Koordinasi inbound bahan baku dari banyak supplier (domestik dan internasional) dengan jadwal produksi yang ketat. Keterlambatan satu komponen bisa menghentikan seluruh lini produksi.",
      en: "Coordinating inbound raw materials from multiple suppliers (domestic and international) with tight production schedules. One component delay can stop an entire production line.",
    },
    solution: {
      id: "Satu titik koordinasi untuk semua inbound dan outbound. Kami sinkronkan jadwal pengiriman dengan jadwal produksi, handle customs clearance untuk material impor, dan atur distribusi produk jadi ke multiple tujuan.",
      en: "One coordination point for all inbound and outbound. We synchronize delivery schedules with production schedules, handle customs clearance for imported materials, and manage finished goods distribution to multiple destinations.",
    },
    relevantServices: ["domestic-distribution", "international-freight", "import-dtd", "warehousing"],
    icon: "factory",
  },
  {
    slug: "commodities",
    name: { id: "Komoditas", en: "Commodities" },
    description: {
      id: "Komoditas seperti CPO, batu bara, karet, dan hasil tambang punya volume besar dan rute yang sering berubah sesuai harga pasar. Kami handle bulk shipping dan charter untuk volume tinggi.",
      en: "Commodities like CPO, coal, rubber, and mining products have large volumes and routes that shift with market prices. We handle bulk shipping and charter for high volumes.",
    },
    challenge: {
      id: "Volume besar dengan fluktuasi harga yang mempengaruhi rute dan timing pengiriman. Butuh fleksibilitas kapasitas dan kemampuan scale up/down cepat.",
      en: "Large volumes with price fluctuations affecting shipping routes and timing. Requires capacity flexibility and the ability to scale up or down quickly.",
    },
    solution: {
      id: "Blocspace allocation untuk kapasitas terjamin, charter untuk peak volume, dan jaringan carrier yang luas untuk fleksibilitas rute. Kami bantu optimize timing pengiriman sesuai kondisi pasar.",
      en: "Blocspace allocation for guaranteed capacity, charter for peak volumes, and a broad carrier network for route flexibility. We help optimize shipment timing based on market conditions.",
    },
    relevantServices: ["international-freight", "blocspace", "project-cargo"],
    icon: "mining",
  },
  {
    slug: "fmcg",
    name: { id: "FMCG", en: "FMCG" },
    description: {
      id: "Fast moving consumer goods butuh distribusi yang reliable ke ribuan titik di seluruh Indonesia. Dari gudang pusat ke distributor regional, dari distributor ke toko. Kami kelola distribusi dan warehousing untuk menjaga ketersediaan produk.",
      en: "Fast moving consumer goods need reliable distribution to thousands of points across Indonesia. From central warehouse to regional distributors, from distributors to stores. We manage distribution and warehousing to maintain product availability.",
    },
    challenge: {
      id: "Distribusi ke ribuan titik di seluruh Indonesia dengan shelf life yang terbatas. Harus sampai tepat waktu dan dalam kondisi baik, terutama untuk produk food & beverage.",
      en: "Distribution to thousands of points across Indonesia with limited shelf life. Must arrive on time and in good condition, especially for food & beverage products.",
    },
    solution: {
      id: "Jaringan distribusi domestik yang mencakup Jawa dan luar Jawa. Warehousing dengan inventory management untuk buffer stock. Cross-docking untuk distribusi cepat ke banyak titik sekaligus.",
      en: "Domestic distribution network covering Java and outer islands. Warehousing with inventory management for buffer stock. Cross-docking for rapid distribution to multiple points simultaneously.",
    },
    relevantServices: ["domestic-distribution", "warehousing", "international-freight"],
    icon: "package",
  },
  {
    slug: "ecommerce",
    name: { id: "E-Commerce", en: "E-Commerce" },
    description: {
      id: "E-commerce butuh fulfillment yang cepat dan akurat. Dari pick and pack di gudang sampai last mile delivery, setiap order harus diproses dengan efisien. Kami sediakan fulfillment center dan distribusi untuk mendukung operasi e-commerce Anda.",
      en: "E-commerce needs fast and accurate fulfillment. From pick and pack in the warehouse to last mile delivery, every order must be processed efficiently. We provide fulfillment centers and distribution to support your e-commerce operations.",
    },
    challenge: {
      id: "Volume order yang fluktuatif (terutama saat campaign/promo), kebutuhan SLA pengiriman yang ketat, dan return management. Peak season bisa berlipat ganda dari volume normal.",
      en: "Fluctuating order volumes (especially during campaigns/promos), tight delivery SLA requirements, and return management. Peak season can double normal volumes.",
    },
    solution: {
      id: "Pick and pack fulfillment di gudang Jakarta, cross-docking untuk distribusi cepat, dan blocspace untuk mengamankan kapasitas saat peak season. Scalable sesuai volume Anda.",
      en: "Pick and pack fulfillment in Jakarta warehouse, cross-docking for rapid distribution, and blocspace to secure capacity during peak season. Scalable to your volume.",
    },
    relevantServices: ["warehousing", "domestic-distribution", "blocspace"],
    icon: "cart",
  },
  {
    slug: "pharmaceutical",
    name: { id: "Farmasi", en: "Pharmaceutical" },
    description: {
      id: "Produk farmasi butuh cold chain compliance, dokumentasi ketat, dan handling yang sesuai regulasi. Satu kesalahan suhu bisa membuat seluruh batch tidak layak pakai. Kami handle temperature controlled logistics untuk farmasi.",
      en: "Pharmaceutical products need cold chain compliance, strict documentation, and regulation-compliant handling. One temperature error can render an entire batch unusable. We handle temperature controlled logistics for pharmaceuticals.",
    },
    challenge: {
      id: "Cold chain yang harus terjaga dari origin sampai destination. Regulasi ketat untuk impor obat dan bahan farmasi. Dokumentasi yang harus lengkap dan traceable.",
      en: "Cold chain that must be maintained from origin to destination. Strict regulations for importing medicines and pharmaceutical materials. Documentation that must be complete and traceable.",
    },
    solution: {
      id: "Temperature controlled cargo handling dengan monitoring suhu. Customs brokerage khusus untuk produk farmasi dengan pengetahuan regulasi BPOM. Dokumentasi lengkap dan traceable untuk setiap pengiriman.",
      en: "Temperature controlled cargo handling with temperature monitoring. Specialized customs brokerage for pharmaceutical products with BPOM regulatory knowledge. Complete and traceable documentation for every shipment.",
    },
    relevantServices: ["project-cargo", "import-dtd", "warehousing", "international-freight"],
    icon: "thermometer",
  },
  {
    slug: "energy",
    name: { id: "Energi", en: "Energy" },
    description: {
      id: "Sektor energi sering butuh equipment besar, spare parts yang urgent, dan pengiriman ke lokasi remote. Dari turbin gas sampai pipa, dari platform offshore sampai pembangkit di pedalaman. Kami handle project cargo dan special transport untuk industri energi.",
      en: "The energy sector often needs large equipment, urgent spare parts, and shipping to remote locations. From gas turbines to pipes, from offshore platforms to power plants in remote areas. We handle project cargo and special transport for the energy industry.",
    },
    challenge: {
      id: "Equipment berat dan oversized yang butuh transport khusus. Lokasi proyek yang sering remote dan sulit dijangkau. Timeline proyek yang ketat dengan penalty untuk keterlambatan.",
      en: "Heavy and oversized equipment requiring special transport. Project locations that are often remote and hard to reach. Tight project timelines with penalties for delays.",
    },
    solution: {
      id: "Project cargo planning dari survey sampai delivery. Heavy lift dan transport khusus untuk equipment besar. Charter untuk pengiriman urgent atau ke lokasi yang tidak dilayani rute reguler.",
      en: "Project cargo planning from survey to delivery. Heavy lift and special transport for large equipment. Charter for urgent shipments or to locations not served by regular routes.",
    },
    relevantServices: ["project-cargo", "blocspace", "international-freight", "domestic-distribution"],
    icon: "bolt",
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
