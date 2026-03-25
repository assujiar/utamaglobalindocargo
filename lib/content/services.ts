import type { ClientStoryData } from "@/components/sections/ClientStoryCard";

// ─── Base service data (used by ServiceGrid, nav, etc.) ───

export interface ServiceData {
  key: string;
  number: string;
  name_id: string;
  name_en: string;
  tagline_id: string;
  tagline_en: string;
  description_id: string;
  description_en: string;
  slug_id: string;
  slug_en: string;
  icon: string;
}

// ─── Extended service detail data (used by ServiceDetailPage) ───

export interface ServiceCapability {
  title_id: string;
  title_en: string;
  description_id: string;
  description_en: string;
  metric_id?: string;
  metric_en?: string;
}

export interface ServiceProcessStep {
  number: string;
  title_id: string;
  title_en: string;
  description_id: string;
  description_en: string;
}

export interface ServiceFAQ {
  question_id: string;
  question_en: string;
  answer_id: string;
  answer_en: string;
}

export interface ServiceStat {
  value: number;
  suffix: string;
  label_id: string;
  label_en: string;
}

export interface ServiceSEO {
  title_id: string;
  title_en: string;
  description_id: string;
  description_en: string;
}

export interface ServiceDetail {
  key: string;
  overview_id: string;
  overview_en: string;
  capabilities: ServiceCapability[];
  process: ServiceProcessStep[];
  stats: ServiceStat[];
  clientStory: ClientStoryData;
  faq: ServiceFAQ[];
  relatedServices: string[];
  seo: ServiceSEO;
}

// ─── Base service list ───

export const services: ServiceData[] = [
  {
    key: "domestic",
    number: "01",
    name_id: "Distribusi Domestik",
    name_en: "Domestic Distribution",
    tagline_id: "Menjangkau 34 provinsi di seluruh Indonesia",
    tagline_en: "Reaching all 34 provinces across Indonesia",
    description_id:
      "Jaringan distribusi terintegrasi untuk pengiriman darat, laut, dan udara ke seluruh pelosok Indonesia dengan pelacakan real-time dan jaminan ketepatan waktu.",
    description_en:
      "Integrated distribution network for land, sea, and air delivery to every corner of Indonesia with real-time tracking and on-time guarantees.",
    slug_id: "distribusi-domestik",
    slug_en: "domestic-distribution",
    icon: "Truck",
  },
  {
    key: "international",
    number: "02",
    name_id: "Freight Internasional",
    name_en: "International Freight",
    tagline_id: "Koneksi ke 150+ negara melalui jalur udara dan laut",
    tagline_en: "Connecting to 150+ countries via air and ocean",
    description_id:
      "Layanan freight forwarding internasional melalui jalur udara dan laut dengan jaringan agen global, konsolidasi kargo, dan pengelolaan dokumen ekspor-impor.",
    description_en:
      "International freight forwarding via air and ocean with a global agent network, cargo consolidation, and export-import documentation management.",
    slug_id: "freight-internasional",
    slug_en: "international-freight",
    icon: "Globe",
  },
  {
    key: "import-dtd",
    number: "03",
    name_id: "Import DTD & Kepabeanan",
    name_en: "Import DTD & Customs",
    tagline_id: "Door-to-door import dengan pengurusan kepabeanan penuh",
    tagline_en: "Door-to-door import with full customs clearance",
    description_id:
      "Layanan import door-to-door lengkap termasuk pengurusan kepabeanan, perizinan, undername import, dan koordinasi pengiriman dari negara asal hingga gudang tujuan.",
    description_en:
      "Complete door-to-door import services including customs clearance, licensing, undername import, and delivery coordination from origin country to destination warehouse.",
    slug_id: "import-dtd-kepabeanan",
    slug_en: "import-dtd-customs",
    icon: "FileCheck",
  },
  {
    key: "charter",
    number: "04",
    name_id: "Blockspace & Charter",
    name_en: "Blockspace & Charter",
    tagline_id: "Kapasitas kargo terjamin untuk kebutuhan volume besar",
    tagline_en: "Guaranteed cargo capacity for high-volume needs",
    description_id:
      "Alokasi ruang kargo tetap (blockspace) dan layanan charter pesawat untuk kebutuhan pengiriman volume besar, barang sensitif waktu, atau rute khusus.",
    description_en:
      "Fixed cargo space allocation (blockspace) and aircraft charter services for high-volume shipments, time-sensitive goods, or specialized routes.",
    slug_id: "blockspace-charter",
    slug_en: "blockspace-charter",
    icon: "Plane",
  },
  {
    key: "warehouse",
    number: "05",
    name_id: "Pergudangan & 3PL",
    name_en: "Warehousing & 3PL",
    tagline_id: "Gudang modern dengan sistem manajemen inventaris terintegrasi",
    tagline_en: "Modern warehouses with integrated inventory management",
    description_id:
      "Fasilitas pergudangan modern dengan WMS terintegrasi, layanan pick-and-pack, fulfillment e-commerce, dan distribusi last-mile sebagai solusi logistik pihak ketiga.",
    description_en:
      "Modern warehouse facilities with integrated WMS, pick-and-pack services, e-commerce fulfillment, and last-mile distribution as a third-party logistics solution.",
    slug_id: "pergudangan-3pl",
    slug_en: "warehousing-3pl",
    icon: "Warehouse",
  },
  {
    key: "project-cargo",
    number: "06",
    name_id: "Kargo Proyek",
    name_en: "Project Cargo",
    tagline_id: "Pengiriman kargo berat dan berdimensi khusus",
    tagline_en: "Heavy and oversized cargo transportation",
    description_id:
      "Penanganan khusus untuk kargo berat, berdimensi besar, dan proyek industri termasuk survei rute, perizinan khusus, dan peralatan angkut spesialis.",
    description_en:
      "Specialized handling for heavy, oversized, and industrial project cargo including route surveys, special permits, and specialist transport equipment.",
    slug_id: "kargo-proyek",
    slug_en: "project-cargo",
    icon: "Container",
  },
];

// ─── Service detail content ───

export const serviceDetails: Record<string, ServiceDetail> = {
  // ═══════════════════════════════════════════════════════════════
  // 01 — DOMESTIC DISTRIBUTION
  // ═══════════════════════════════════════════════════════════════
  domestic: {
    key: "domestic",
    overview_id: `<p>UGC Logistics mengoperasikan jaringan distribusi domestik yang mencakup seluruh 34 provinsi di Indonesia melalui kombinasi moda transportasi darat, laut, dan udara. Kami menangani pengiriman mulai dari dokumen dan paket kecil hingga muatan penuh truk (FTL) dan kontainer (FCL), dengan kapabilitas konsolidasi untuk pengiriman parsial (LTL dan LCL) yang memungkinkan efisiensi biaya tanpa mengorbankan kecepatan.</p>

<p>Untuk jalur darat di Pulau Jawa, Sumatera, dan Kalimantan, kami mengoperasikan armada truk yang dikelola langsung maupun mitra transportasi terverifikasi — mencakup truk box, wingbox, trailer, hingga kendaraan khusus berpendingin untuk produk cold chain. Pengiriman antar-pulau dilayani melalui jaringan pelayaran reguler ke pelabuhan-pelabuhan utama seperti Makassar, Balikpapan, Jayapura, Ambon, dan Sorong, serta jalur udara untuk kargo sensitif waktu ke seluruh bandara komersial di Indonesia.</p>

<p>Setiap pengiriman dilengkapi nomor tracking yang dapat dipantau secara real-time melalui portal pelanggan kami. Tim operasional kami tersebar di hub-hub strategis — Jakarta, Surabaya, Medan, Makassar, dan Balikpapan — memastikan koordinasi pengambilan dan pengantaran yang responsif. Untuk kebutuhan distribusi reguler, kami menawarkan skema kontrak dengan jadwal pickup terjadwal, tarif tetap, dan dedicated account manager.</p>`,

    overview_en: `<p>UGC Logistics operates a domestic distribution network spanning all 34 provinces of Indonesia through a combination of land, sea, and air transport modes. We handle shipments ranging from documents and small parcels to full truckloads (FTL) and full container loads (FCL), with consolidation capabilities for partial shipments (LTL and LCL) that enable cost efficiency without compromising speed.</p>

<p>For overland routes across Java, Sumatra, and Kalimantan, we operate a fleet of directly managed trucks and verified transport partners — including box trucks, wingbox trailers, flatbed trailers, and refrigerated vehicles for cold chain products. Inter-island shipments are served through regular shipping lines to major ports such as Makassar, Balikpapan, Jayapura, Ambon, and Sorong, as well as air freight for time-sensitive cargo to all commercial airports in Indonesia.</p>

<p>Every shipment is assigned a tracking number that can be monitored in real time through our customer portal. Our operations teams are based at strategic hubs — Jakarta, Surabaya, Medan, Makassar, and Balikpapan — ensuring responsive pickup and delivery coordination. For recurring distribution needs, we offer contract arrangements with scheduled pickups, fixed rates, and a dedicated account manager.</p>`,

    capabilities: [
      {
        title_id: "Air Freight (AF)",
        title_en: "Air Freight (AF)",
        description_id: "Pengiriman udara domestik ke seluruh bandara komersial di Indonesia. Cocok untuk kargo sensitif waktu, dokumen penting, dan barang bernilai tinggi.",
        description_en: "Domestic air freight to all commercial airports in Indonesia. Ideal for time-sensitive cargo, critical documents, and high-value goods.",
        metric_id: "Transit 1-2 hari ke kota besar",
        metric_en: "1-2 day transit to major cities",
      },
      {
        title_id: "Full Container Load (FCL)",
        title_en: "Full Container Load (FCL)",
        description_id: "Pengiriman kontainer penuh via laut antar pulau. Tersedia kontainer 20' dan 40' standar maupun high-cube untuk volume besar.",
        description_en: "Full container shipments via inter-island sea freight. Available in 20' and 40' standard and high-cube containers for large volumes.",
        metric_id: "20' & 40' HC tersedia",
        metric_en: "20' & 40' HC available",
      },
      {
        title_id: "Less than Container Load (LCL)",
        title_en: "Less than Container Load (LCL)",
        description_id: "Konsolidasi kargo parsial untuk pengiriman laut yang tidak memerlukan kontainer penuh. Hemat biaya untuk volume menengah.",
        description_en: "Consolidated partial cargo for sea shipments that don't require a full container. Cost-effective for medium volumes.",
        metric_id: "Konsolidasi mingguan",
        metric_en: "Weekly consolidation",
      },
      {
        title_id: "Full Truckload (FTL)",
        title_en: "Full Truckload (FTL)",
        description_id: "Truk dedikasi untuk muatan penuh — box, wingbox, trailer, hingga kendaraan berpendingin. Pickup dan delivery langsung tanpa transit.",
        description_en: "Dedicated trucks for full loads — box trucks, wingbox, trailers, and refrigerated vehicles. Direct pickup and delivery without transit.",
        metric_id: "Armada dari 4 hingga 32 ton",
        metric_en: "Fleet from 4 to 32 tons",
      },
      {
        title_id: "Less than Truckload (LTL)",
        title_en: "Less than Truckload (LTL)",
        description_id: "Konsolidasi muatan darat untuk pengiriman yang tidak memenuhi kapasitas truk penuh. Jadwal reguler untuk rute-rute utama di Jawa dan Sumatera.",
        description_en: "Overland cargo consolidation for shipments below full truck capacity. Regular schedules for major routes across Java and Sumatra.",
        metric_id: "Jadwal harian rute Jawa",
        metric_en: "Daily schedule for Java routes",
      },
    ],

    process: [
      {
        number: "01",
        title_id: "Konsultasi & Penawaran",
        title_en: "Consultation & Quotation",
        description_id: "Tim kami menganalisis kebutuhan pengiriman Anda — volume, tujuan, jenis barang — dan memberikan penawaran harga beserta rekomendasi moda terbaik.",
        description_en: "Our team analyzes your shipping needs — volume, destination, cargo type — and provides a quotation with the best mode recommendation.",
      },
      {
        number: "02",
        title_id: "Penjemputan Barang",
        title_en: "Cargo Pickup",
        description_id: "Armada kami menjemput barang di lokasi Anda sesuai jadwal yang disepakati. Untuk kontrak reguler, jadwal pickup otomatis.",
        description_en: "Our fleet picks up cargo at your location on the agreed schedule. For regular contracts, pickup schedules are automated.",
      },
      {
        number: "03",
        title_id: "Konsolidasi & Sortir",
        title_en: "Consolidation & Sorting",
        description_id: "Barang dikonsolidasi di hub terdekat, disortir berdasarkan tujuan, dan dimuat ke moda transportasi yang sesuai.",
        description_en: "Cargo is consolidated at the nearest hub, sorted by destination, and loaded onto the appropriate transport mode.",
      },
      {
        number: "04",
        title_id: "Transit & Pelacakan",
        title_en: "Transit & Tracking",
        description_id: "Selama transit, Anda dapat memantau status pengiriman secara real-time melalui nomor tracking di portal kami.",
        description_en: "During transit, you can monitor shipment status in real time via the tracking number on our portal.",
      },
      {
        number: "05",
        title_id: "Pengantaran & POD",
        title_en: "Delivery & POD",
        description_id: "Barang diantarkan ke alamat tujuan. Proof of delivery (POD) ditandatangani penerima dan tersedia secara digital.",
        description_en: "Cargo is delivered to the destination address. Proof of delivery (POD) is signed by the recipient and available digitally.",
      },
    ],

    stats: [
      { value: 34, suffix: "", label_id: "provinsi terjangkau", label_en: "provinces covered" },
      { value: 98, suffix: "%", label_id: "ketepatan waktu pengiriman", label_en: "on-time delivery rate" },
      { value: 5, suffix: "", label_id: "hub operasional strategis", label_en: "strategic operations hubs" },
    ],

    clientStory: {
      industry_id: "FMCG & Distribusi",
      industry_en: "FMCG & Distribution",
      challenge_id: "Perusahaan FMCG membutuhkan distribusi rutin ke 28 provinsi dengan jadwal yang konsisten dan kerusakan barang yang minimal, terutama untuk produk consumer goods yang sensitif terhadap suhu dan penanganan.",
      challenge_en: "An FMCG company needed routine distribution to 28 provinces with consistent schedules and minimal product damage, especially for consumer goods sensitive to temperature and handling.",
      solution_id: "UGC menerapkan skema distribusi multi-moda dengan jadwal pickup terjadwal di 3 gudang klien, konsolidasi di hub Jakarta dan Surabaya, serta pengiriman via darat (Jawa-Sumatera) dan laut (Indonesia Timur) dengan cold chain monitoring.",
      solution_en: "UGC implemented a multi-modal distribution scheme with scheduled pickups from 3 client warehouses, consolidation at Jakarta and Surabaya hubs, and delivery via land (Java-Sumatra) and sea (Eastern Indonesia) with cold chain monitoring.",
      result_id: "Efisiensi distribusi meningkat 40%, waktu transit berkurang dari rata-rata 5 hari menjadi 3 hari, dan tingkat kerusakan barang turun di bawah 0,1%.",
      result_en: "Distribution efficiency improved by 40%, average transit time reduced from 5 days to 3 days, and product damage rate fell below 0.1%.",
      display_quote_id: "Distribusi multi-pulau ke 28 provinsi dalam 72 jam — dengan zero damage rate dan pelacakan real-time di setiap titik.",
      display_quote_en: "Multi-island distribution to 28 provinces within 72 hours — with near-zero damage rate and real-time tracking at every point.",
    },

    faq: [
      {
        question_id: "Berapa lama waktu transit pengiriman antar pulau?",
        question_en: "How long is the transit time for inter-island shipments?",
        answer_id: "Waktu transit bervariasi tergantung rute dan moda. Jalur udara ke kota besar membutuhkan 1-2 hari. Jalur laut dari Jakarta ke Makassar sekitar 4-5 hari, ke Jayapura 7-10 hari. Jalur darat Jawa membutuhkan 1-3 hari tergantung jarak. Kami selalu memberikan estimasi waktu transit spesifik saat penawaran.",
        answer_en: "Transit times vary by route and mode. Air freight to major cities takes 1-2 days. Sea freight from Jakarta to Makassar is approximately 4-5 days, to Jayapura 7-10 days. Overland Java routes take 1-3 days depending on distance. We always provide specific transit time estimates with your quotation.",
      },
      {
        question_id: "Apa perbedaan FTL dan LTL, dan mana yang lebih cocok untuk saya?",
        question_en: "What is the difference between FTL and LTL, and which is right for me?",
        answer_id: "FTL (Full Truckload) berarti Anda menyewa seluruh kapasitas truk — cocok untuk volume besar atau barang yang tidak boleh dicampur. LTL (Less than Truckload) mengkonsolidasikan barang Anda dengan pengirim lain di truk yang sama — lebih hemat biaya untuk volume kecil-menengah. Kami merekomendasikan FTL jika volume Anda di atas 8 CBM atau 3 ton untuk rute yang sama.",
        answer_en: "FTL (Full Truckload) means you book the entire truck capacity — suitable for large volumes or cargo that cannot be mixed. LTL (Less than Truckload) consolidates your goods with other shippers on the same truck — more cost-effective for small to medium volumes. We recommend FTL if your volume exceeds 8 CBM or 3 tons for the same route.",
      },
      {
        question_id: "Apakah tersedia pengiriman untuk barang berpendingin (cold chain)?",
        question_en: "Do you offer cold chain shipping?",
        answer_id: "Ya, kami mengoperasikan armada truk berpendingin untuk distribusi cold chain di Pulau Jawa dan rute-rute utama lainnya. Suhu dapat diatur sesuai kebutuhan produk Anda (frozen, chilled, atau ambient controlled). Untuk pengiriman antar pulau, kami menggunakan kontainer reefer dengan monitoring suhu 24 jam.",
        answer_en: "Yes, we operate refrigerated truck fleets for cold chain distribution across Java and other major routes. Temperature can be set according to your product requirements (frozen, chilled, or ambient controlled). For inter-island shipments, we use reefer containers with 24-hour temperature monitoring.",
      },
      {
        question_id: "Bagaimana cara melacak pengiriman saya?",
        question_en: "How do I track my shipment?",
        answer_id: "Setiap pengiriman mendapat nomor tracking unik yang dapat dilacak melalui portal pelanggan di website kami atau melalui komunikasi langsung dengan account manager Anda. Status diperbarui di setiap milestone: pickup, transit hub, keberangkatan, kedatangan, dan delivery.",
        answer_en: "Every shipment receives a unique tracking number that can be tracked through our customer portal on our website or via direct communication with your account manager. Status is updated at every milestone: pickup, transit hub, departure, arrival, and delivery.",
      },
      {
        question_id: "Apakah tersedia skema kontrak untuk pengiriman rutin?",
        question_en: "Do you offer contract arrangements for regular shipments?",
        answer_id: "Ya, kami menawarkan kontrak distribusi dengan tarif tetap, jadwal pickup terjadwal (harian, mingguan, atau sesuai kebutuhan), dedicated account manager, dan laporan berkala. Kontrak memberikan kepastian harga dan prioritas kapasitas, terutama di musim puncak pengiriman.",
        answer_en: "Yes, we offer distribution contracts with fixed rates, scheduled pickups (daily, weekly, or as needed), a dedicated account manager, and periodic reports. Contracts provide price certainty and capacity priority, especially during peak shipping seasons.",
      },
    ],

    relatedServices: ["international", "warehouse"],

    seo: {
      title_id: "Distribusi Domestik ke 34 Provinsi — UGC Logistics",
      title_en: "Domestic Distribution to 34 Provinces — UGC Logistics",
      description_id: "Layanan distribusi domestik UGC Logistics mencakup pengiriman darat, laut, dan udara ke seluruh Indonesia. FTL, LTL, FCL, LCL, dan air freight dengan pelacakan real-time.",
      description_en: "UGC Logistics domestic distribution covers land, sea, and air shipments across Indonesia. FTL, LTL, FCL, LCL, and air freight with real-time tracking.",
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 02 — INTERNATIONAL FREIGHT FORWARDING
  // ═══════════════════════════════════════════════════════════════
  international: {
    key: "international",
    overview_id: `<p>Sebagai freight forwarder berlisensi IATA dan anggota WCA (World Cargo Alliance), UGC Logistics menyediakan layanan freight forwarding internasional yang mencakup ekspor dan impor melalui jalur udara dan laut ke lebih dari 150 negara. Kami bekerja dengan jaringan agen global yang terverifikasi untuk memastikan kelancaran pengiriman dari titik asal hingga tujuan akhir, termasuk pengurusan dokumen perdagangan internasional.</p>

<p>Untuk ekspor, kami menangani seluruh proses mulai dari pengambilan barang di gudang pengirim, pengurusan dokumen PEB (Pemberitahuan Ekspor Barang), stuffing kontainer atau konsolidasi kargo udara, hingga pengiriman ke pelabuhan atau bandara muat. Untuk impor, kami berkoordinasi dengan agen asal untuk memastikan pengiriman tepat waktu dan mendukung proses customs clearance di Indonesia (lihat juga layanan <a href="/id/layanan/import-dtd-kepabeanan">Import DTD & Kepabeanan</a> kami untuk penanganan impor door-to-door).</p>

<p>Kami menawarkan fleksibilitas moda: FCL dan LCL untuk kargo laut, serta general cargo dan dangerous goods (DG) handling untuk kargo udara. Tim freight kami memahami regulasi ekspor-impor Indonesia, klasifikasi HS Code, persyaratan Letter of Credit, dan ketentuan incoterms (FOB, CIF, EXW, DDP, dll.) untuk memastikan pengiriman Anda sesuai dengan ketentuan perdagangan internasional yang berlaku.</p>`,

    overview_en: `<p>As an IATA-licensed freight forwarder and WCA (World Cargo Alliance) member, UGC Logistics provides international freight forwarding services covering exports and imports via air and ocean to over 150 countries. We work with a verified global agent network to ensure smooth shipments from origin to final destination, including handling of international trade documentation.</p>

<p>For exports, we manage the entire process from cargo pickup at the shipper's warehouse, preparation of export documentation (PEB — Pemberitahuan Ekspor Barang), container stuffing or air cargo consolidation, through to delivery at the loading port or airport. For imports, we coordinate with origin agents to ensure timely shipping and support the customs clearance process in Indonesia (see also our <a href="/en/services/import-dtd-customs">Import DTD & Customs</a> service for door-to-door import handling).</p>

<p>We offer mode flexibility: FCL and LCL for ocean freight, as well as general cargo and dangerous goods (DG) handling for air freight. Our freight team understands Indonesian export-import regulations, HS Code classifications, Letter of Credit requirements, and incoterms provisions (FOB, CIF, EXW, DDP, etc.) to ensure your shipments comply with applicable international trade standards.</p>`,

    capabilities: [
      {
        title_id: "Air Freight — Ekspor & Impor",
        title_en: "Air Freight — Export & Import",
        description_id: "Pengiriman kargo udara internasional melalui maskapai penerbangan komersial dan kargo. Termasuk handling untuk general cargo, perishable, dan dangerous goods.",
        description_en: "International air cargo shipments via commercial and cargo airlines. Includes handling for general cargo, perishables, and dangerous goods.",
        metric_id: "Koneksi ke 150+ negara",
        metric_en: "Connected to 150+ countries",
      },
      {
        title_id: "Ocean Freight — FCL",
        title_en: "Ocean Freight — FCL",
        description_id: "Pengiriman kontainer penuh via laut untuk volume besar. Tersedia kontainer 20', 40' standar, 40' high-cube, open-top, dan flat-rack untuk kargo khusus.",
        description_en: "Full container shipments via ocean for large volumes. Available in 20', 40' standard, 40' high-cube, open-top, and flat-rack containers for special cargo.",
        metric_id: "Semua tipe kontainer tersedia",
        metric_en: "All container types available",
      },
      {
        title_id: "Ocean Freight — LCL",
        title_en: "Ocean Freight — LCL",
        description_id: "Konsolidasi kargo laut untuk volume yang tidak memerlukan kontainer penuh. Jadwal konsolidasi reguler ke pelabuhan-pelabuhan utama dunia.",
        description_en: "Ocean cargo consolidation for volumes that don't require a full container. Regular consolidation schedules to major world ports.",
        metric_id: "Jadwal reguler mingguan",
        metric_en: "Weekly regular schedules",
      },
      {
        title_id: "Dokumentasi & Kepatuhan",
        title_en: "Documentation & Compliance",
        description_id: "Pengurusan lengkap dokumen perdagangan internasional: Bill of Lading, Air Waybill, Certificate of Origin, Packing List, Invoice, dan dokumen kepabeanan.",
        description_en: "Complete handling of international trade documents: Bill of Lading, Air Waybill, Certificate of Origin, Packing List, Invoice, and customs documentation.",
        metric_id: "End-to-end documentation",
        metric_en: "End-to-end documentation",
      },
    ],

    process: [
      {
        number: "01",
        title_id: "Permintaan & Analisis",
        title_en: "Inquiry & Analysis",
        description_id: "Kami mempelajari detail pengiriman Anda — jenis barang, volume, negara tujuan/asal, incoterms — untuk menentukan moda dan rute optimal.",
        description_en: "We review your shipment details — cargo type, volume, destination/origin country, incoterms — to determine the optimal mode and route.",
      },
      {
        number: "02",
        title_id: "Booking & Dokumentasi",
        title_en: "Booking & Documentation",
        description_id: "Kami melakukan booking space dengan carrier, mempersiapkan seluruh dokumen ekspor/impor, dan berkoordinasi dengan agen di negara tujuan/asal.",
        description_en: "We book space with the carrier, prepare all export/import documentation, and coordinate with agents at the destination/origin country.",
      },
      {
        number: "03",
        title_id: "Pickup & Stuffing",
        title_en: "Pickup & Stuffing",
        description_id: "Barang dijemput dari lokasi Anda, kemudian dilakukan stuffing kontainer atau konsolidasi di warehouse kami sebelum dikirim ke pelabuhan/bandara.",
        description_en: "Cargo is picked up from your location, then container stuffing or consolidation is done at our warehouse before delivery to the port/airport.",
      },
      {
        number: "04",
        title_id: "Customs Clearance",
        title_en: "Customs Clearance",
        description_id: "Pengurusan kepabeanan ekspor di Indonesia dan koordinasi customs clearance di negara tujuan melalui agen kami.",
        description_en: "Export customs clearance in Indonesia and coordination of customs clearance at the destination country through our agent network.",
      },
      {
        number: "05",
        title_id: "Transit & Monitoring",
        title_en: "Transit & Monitoring",
        description_id: "Kargo dalam perjalanan dipantau secara aktif. Update status diberikan di setiap milestone — loading, departure, transshipment, arrival.",
        description_en: "Cargo in transit is actively monitored. Status updates provided at every milestone — loading, departure, transshipment, arrival.",
      },
      {
        number: "06",
        title_id: "Delivery di Tujuan",
        title_en: "Destination Delivery",
        description_id: "Agen di negara tujuan menangani customs clearance dan pengantaran ke alamat penerima sesuai incoterms yang disepakati.",
        description_en: "The agent at the destination country handles customs clearance and delivery to the consignee's address per the agreed incoterms.",
      },
    ],

    stats: [
      { value: 150, suffix: "+", label_id: "negara tujuan", label_en: "destination countries" },
      { value: 25, suffix: "+", label_id: "tahun pengalaman freight", label_en: "years of freight experience" },
      { value: 50, suffix: "+", label_id: "agen global terverifikasi", label_en: "verified global agents" },
    ],

    clientStory: {
      industry_id: "Manufaktur & Ekspor",
      industry_en: "Manufacturing & Export",
      challenge_id: "Produsen manufaktur membutuhkan pengiriman rutin komponen mesin ke 5 negara di Asia Tenggara dan Eropa dengan jadwal ketat untuk mendukung lini produksi pelanggan mereka di luar negeri.",
      challenge_en: "A manufacturer needed regular shipments of machine components to 5 countries across Southeast Asia and Europe on tight schedules to support their overseas customers' production lines.",
      solution_id: "UGC menyusun jadwal konsolidasi LCL mingguan ke 3 pelabuhan utama dan booking FCL bulanan ke 2 tujuan bervolume tinggi, dengan pengelolaan dokumen ekspor dan koordinasi agen tujuan secara terpusat.",
      solution_en: "UGC arranged weekly LCL consolidation schedules to 3 major ports and monthly FCL bookings to 2 high-volume destinations, with centralized export documentation management and destination agent coordination.",
      result_id: "Lead time pengiriman berkurang 30% berkat konsolidasi terjadwal, dan biaya freight turun 18% dibanding pengiriman per-shipment sebelumnya.",
      result_en: "Shipping lead time was reduced by 30% through scheduled consolidation, and freight costs decreased by 18% compared to the previous per-shipment approach.",
      display_quote_id: "Konsolidasi terjadwal ke 5 negara tujuan — lead time turun 30% dan biaya freight lebih efisien 18%.",
      display_quote_en: "Scheduled consolidation to 5 destination countries — lead time down 30% and freight costs 18% more efficient.",
    },

    faq: [
      {
        question_id: "Apa perbedaan FCL dan LCL untuk pengiriman laut internasional?",
        question_en: "What is the difference between FCL and LCL for international ocean freight?",
        answer_id: "FCL (Full Container Load) berarti Anda menyewa seluruh kontainer — barang Anda tidak dicampur dengan pengirim lain. LCL (Less than Container Load) mengkonsolidasikan barang Anda dengan kargo pengirim lain di kontainer yang sama. FCL lebih cepat (tidak perlu menunggu konsolidasi) dan lebih aman untuk barang sensitif, sedangkan LCL lebih hemat biaya untuk volume di bawah 15 CBM.",
        answer_en: "FCL (Full Container Load) means you book the entire container — your goods are not mixed with other shippers. LCL (Less than Container Load) consolidates your goods with other shippers' cargo in the same container. FCL is faster (no consolidation wait) and safer for sensitive goods, while LCL is more cost-effective for volumes under 15 CBM.",
      },
      {
        question_id: "Dokumen apa saja yang diperlukan untuk ekspor dari Indonesia?",
        question_en: "What documents are needed for exporting from Indonesia?",
        answer_id: "Dokumen standar ekspor meliputi: Invoice, Packing List, PEB (Pemberitahuan Ekspor Barang), Bill of Lading atau Air Waybill, dan Certificate of Origin jika diperlukan. Untuk barang tertentu mungkin diperlukan izin khusus seperti sertifikat fumigasi, sertifikat halal, atau izin dari kementerian terkait. Tim kami membantu menyiapkan seluruh dokumen ini.",
        answer_en: "Standard export documents include: Invoice, Packing List, PEB (Export Declaration), Bill of Lading or Air Waybill, and Certificate of Origin if required. Certain goods may need special permits such as fumigation certificates, halal certificates, or ministry-specific licenses. Our team assists in preparing all of these documents.",
      },
      {
        question_id: "Apakah UGC menangani pengiriman dangerous goods (barang berbahaya)?",
        question_en: "Does UGC handle dangerous goods (DG) shipments?",
        answer_id: "Ya, kami menangani pengiriman dangerous goods via udara dan laut sesuai regulasi IATA DGR dan IMDG Code. Ini mencakup klasifikasi DG yang benar, pengemasan sesuai standar, labeling, dan dokumentasi DG declaration. Tidak semua kelas DG dapat dikirim via udara — tim kami akan mengkonfirmasi kelayakan dan moda yang tepat.",
        answer_en: "Yes, we handle dangerous goods shipments via air and ocean in compliance with IATA DGR and IMDG Code regulations. This includes correct DG classification, standards-compliant packaging, labeling, and DG declaration documentation. Not all DG classes can be shipped by air — our team will confirm feasibility and the appropriate mode.",
      },
      {
        question_id: "Berapa lama waktu transit pengiriman laut internasional?",
        question_en: "What is the transit time for international ocean freight?",
        answer_id: "Transit time tergantung rute. Contoh dari Jakarta: ke Singapura 3-4 hari, ke China (Shanghai) 10-14 hari, ke Eropa (Rotterdam) 25-30 hari, ke Amerika (Los Angeles) 20-25 hari. Ini belum termasuk waktu customs clearance di kedua sisi. Untuk LCL, tambahkan 3-5 hari untuk proses konsolidasi.",
        answer_en: "Transit time depends on the route. Examples from Jakarta: to Singapore 3-4 days, to China (Shanghai) 10-14 days, to Europe (Rotterdam) 25-30 days, to USA (Los Angeles) 20-25 days. This excludes customs clearance time at both ends. For LCL, add 3-5 days for the consolidation process.",
      },
    ],

    relatedServices: ["domestic", "import-dtd"],

    seo: {
      title_id: "Freight Forwarding Internasional — Ekspor & Impor via Udara & Laut — UGC Logistics",
      title_en: "International Freight Forwarding — Export & Import via Air & Ocean — UGC Logistics",
      description_id: "Layanan freight forwarding internasional UGC Logistics ke 150+ negara. FCL, LCL, air freight, dangerous goods handling. Anggota IATA dan WCA.",
      description_en: "UGC Logistics international freight forwarding to 150+ countries. FCL, LCL, air freight, dangerous goods handling. IATA and WCA member.",
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 03 — IMPORT DTD & CUSTOMS CLEARANCE
  // ═══════════════════════════════════════════════════════════════
  "import-dtd": {
    key: "import-dtd",
    overview_id: `<p>Layanan Import Door-to-Door (DTD) UGC Logistics menangani seluruh rangkaian proses impor barang dari negara asal hingga tiba di gudang Anda di Indonesia. Kami memposisikan diri sebagai satu-satunya titik kontak yang Anda butuhkan — mulai dari koordinasi pengambilan barang di supplier luar negeri, pengiriman internasional (laut atau udara), customs clearance di pelabuhan/bandara Indonesia, hingga pengantaran ke alamat tujuan akhir.</p>

<p>Tim kepabeanan kami berpengalaman menangani klasifikasi tarif (HS Code), perhitungan bea masuk dan pajak impor (BM, PPN, PPh 22), pengurusan PIB (Pemberitahuan Impor Barang), serta perizinan khusus yang mungkin diperlukan seperti izin BPOM untuk produk farmasi, SNI untuk produk elektronik, atau izin dari Kementerian Perdagangan untuk barang tertentu. Kami juga menyediakan layanan undername import bagi perusahaan yang belum memiliki Angka Pengenal Importir (API).</p>

<p>Untuk barang yang memerlukan pemeriksaan fisik oleh Bea Cukai (jalur merah), tim kami mendampingi seluruh proses di lapangan untuk meminimalkan waktu tertahan. Kami beroperasi di seluruh pelabuhan utama Indonesia — Tanjung Priok (Jakarta), Tanjung Perak (Surabaya), Belawan (Medan), Soekarno-Hatta (bandara), serta pelabuhan lainnya sesuai kebutuhan. Setiap impor dilengkapi dengan laporan status yang transparan sehingga Anda selalu mengetahui posisi barang dan estimasi waktu tiba.</p>`,

    overview_en: `<p>UGC Logistics' Import Door-to-Door (DTD) service handles the entire import process from the origin country through to delivery at your warehouse in Indonesia. We position ourselves as the single point of contact you need — from coordinating cargo pickup at your overseas supplier, international shipping (ocean or air), customs clearance at Indonesian ports/airports, through to final-mile delivery to your designated address.</p>

<p>Our customs team has extensive experience in tariff classification (HS Codes), calculation of import duties and taxes (BM, PPN, PPh 22), preparation of PIB (Import Declaration), and obtaining special permits that may be required — such as BPOM licenses for pharmaceutical products, SNI certifications for electronics, or Ministry of Trade permits for regulated goods. We also provide undername import services for companies that do not yet hold an Importer Identification Number (API).</p>

<p>For goods subject to physical inspection by Customs (red lane), our team accompanies the entire process on-site to minimize dwell time. We operate across all major Indonesian ports — Tanjung Priok (Jakarta), Tanjung Perak (Surabaya), Belawan (Medan), Soekarno-Hatta (airport), and other ports as needed. Every import is accompanied by transparent status reports so you always know the position of your goods and the estimated arrival time.</p>`,

    capabilities: [
      {
        title_id: "Door-to-Door Import",
        title_en: "Door-to-Door Import",
        description_id: "Penanganan impor lengkap dari pintu supplier di luar negeri hingga pintu gudang Anda di Indonesia. Satu PIC, satu proses terintegrasi.",
        description_en: "Complete import handling from your overseas supplier's door to your warehouse door in Indonesia. One point of contact, one integrated process.",
        metric_id: "End-to-end tanpa perantara",
        metric_en: "End-to-end, no middlemen",
      },
      {
        title_id: "Customs Clearance",
        title_en: "Customs Clearance",
        description_id: "Pengurusan kepabeanan lengkap: klasifikasi HS Code, perhitungan bea masuk, PIB, dan pendampingan pemeriksaan fisik jika diperlukan.",
        description_en: "Complete customs handling: HS Code classification, duty calculation, Import Declaration (PIB), and physical inspection assistance when required.",
        metric_id: "Operasi di seluruh pelabuhan utama",
        metric_en: "Operations at all major ports",
      },
      {
        title_id: "Perizinan & Lisensi",
        title_en: "Permits & Licensing",
        description_id: "Pengurusan izin impor khusus: BPOM, SNI, izin Kemendag, sertifikat karantina, dan perizinan sektoral lainnya sesuai jenis barang.",
        description_en: "Special import permit handling: BPOM, SNI, Ministry of Trade permits, quarantine certificates, and other sector-specific licenses per cargo type.",
        metric_id: "Semua jenis perizinan",
        metric_en: "All permit types covered",
      },
      {
        title_id: "Undername Import",
        title_en: "Undername Import",
        description_id: "Layanan importir atas nama (undername) untuk perusahaan yang belum memiliki API atau ingin mengimpor barang di luar daftar komoditas API mereka.",
        description_en: "Consignee-of-record (undername) services for companies without an API or those importing goods outside their API commodity list.",
        metric_id: "API-U tersedia",
        metric_en: "API-U available",
      },
    ],

    process: [
      {
        number: "01",
        title_id: "Konsultasi Kebutuhan",
        title_en: "Needs Assessment",
        description_id: "Kami menganalisis barang yang akan diimpor, menentukan klasifikasi HS Code, mengidentifikasi perizinan yang diperlukan, dan memberikan estimasi total biaya impor.",
        description_en: "We analyze the goods to be imported, determine HS Code classification, identify required permits, and provide a total landed cost estimate.",
      },
      {
        number: "02",
        title_id: "Koordinasi Pengiriman",
        title_en: "Shipping Coordination",
        description_id: "Berkoordinasi dengan supplier dan agen asal untuk pickup barang, booking kapal/pesawat, dan memastikan dokumen pengiriman lengkap.",
        description_en: "Coordinate with the supplier and origin agent for cargo pickup, vessel/flight booking, and ensuring complete shipping documentation.",
      },
      {
        number: "03",
        title_id: "Pre-Clearance Preparation",
        title_en: "Pre-Clearance Preparation",
        description_id: "Selama barang dalam perjalanan, kami mempersiapkan dokumen PIB dan perizinan agar proses clearance dapat dimulai segera setelah barang tiba.",
        description_en: "While goods are in transit, we prepare PIB and permit documents so the clearance process can begin immediately upon arrival.",
      },
      {
        number: "04",
        title_id: "Customs Clearance",
        title_en: "Customs Clearance",
        description_id: "Pengurusan kepabeanan di pelabuhan/bandara: submit PIB, pembayaran bea masuk dan pajak, pendampingan pemeriksaan fisik jika jalur merah.",
        description_en: "Customs processing at port/airport: PIB submission, duty and tax payment, physical inspection assistance if assigned to red lane.",
      },
      {
        number: "05",
        title_id: "Pengantaran ke Tujuan",
        title_en: "Final Delivery",
        description_id: "Setelah release dari Bea Cukai, barang dikirim ke gudang atau alamat Anda dengan armada kami. POD disediakan secara digital.",
        description_en: "After customs release, goods are delivered to your warehouse or address by our fleet. POD is provided digitally.",
      },
    ],

    stats: [
      { value: 98, suffix: "%", label_id: "clearance tanpa hambatan", label_en: "smooth clearance rate" },
      { value: 4, suffix: "", label_id: "pelabuhan utama operasional", label_en: "major ports of operation" },
      { value: 24, suffix: "jam", label_id: "rata-rata waktu clearance jalur hijau", label_en: "average green lane clearance time" },
    ],

    clientStory: {
      industry_id: "Farmasi & Kesehatan",
      industry_en: "Pharmaceutical & Healthcare",
      challenge_id: "Importir farmasi membutuhkan impor rutin bahan baku obat dari India dan China yang memerlukan izin BPOM, sertifikat analisa, dan penanganan cold chain — dengan deadline ketat untuk mendukung jadwal produksi.",
      challenge_en: "A pharmaceutical importer needed regular imports of raw drug materials from India and China requiring BPOM permits, certificates of analysis, and cold chain handling — under tight deadlines to support production schedules.",
      solution_id: "UGC mengelola seluruh proses DTD termasuk pre-clearance preparation selama barang dalam perjalanan, pengurusan izin BPOM secara paralel, dan penggunaan kontainer reefer untuk menjaga suhu. Tim kepabeanan kami memastikan klasifikasi HS Code yang tepat untuk menghindari over-payment bea masuk.",
      solution_en: "UGC managed the entire DTD process including pre-clearance preparation during transit, parallel BPOM permit processing, and reefer container usage for temperature control. Our customs team ensured accurate HS Code classification to avoid duty overpayment.",
      result_id: "Waktu total dari supplier door ke gudang klien berkurang dari 28 hari menjadi 18 hari. Tidak ada satu pun shipment yang tertahan lebih dari 48 jam di pelabuhan selama 12 bulan berturut-turut.",
      result_en: "Total time from supplier door to client warehouse was reduced from 28 days to 18 days. Not a single shipment was held at port for more than 48 hours over 12 consecutive months.",
      display_quote_id: "Impor bahan baku farmasi dari 2 negara — total waktu impor turun dari 28 menjadi 18 hari dengan zero port detention.",
      display_quote_en: "Pharmaceutical raw material imports from 2 countries — total import time reduced from 28 to 18 days with zero port detention.",
    },

    faq: [
      {
        question_id: "Berapa total biaya impor yang harus saya siapkan selain harga barang?",
        question_en: "What are the total import costs beyond the goods' price?",
        answer_id: "Biaya impor terdiri dari: freight (biaya kirim internasional), bea masuk (persentase dari nilai CIF berdasarkan HS Code), PPN impor (11%), PPh 22 impor (2.5-7.5% tergantung status API), biaya customs clearance, dan biaya pengiriman domestik. Kami memberikan estimasi total landed cost di awal sehingga Anda dapat menganggarkan dengan tepat.",
        answer_en: "Import costs consist of: freight (international shipping cost), import duty (percentage of CIF value based on HS Code), import VAT (11%), income tax on imports/PPh 22 (2.5-7.5% depending on API status), customs clearance fees, and domestic delivery costs. We provide a total landed cost estimate upfront so you can budget accurately.",
      },
      {
        question_id: "Apa itu undername import dan kapan saya memerlukannya?",
        question_en: "What is undername import and when do I need it?",
        answer_id: "Undername import adalah layanan dimana UGC bertindak sebagai importir resmi (consignee of record) atas nama perusahaan Anda. Ini diperlukan jika: perusahaan Anda belum memiliki Angka Pengenal Importir (API), atau barang yang akan diimpor tidak tercakup dalam daftar komoditas API Anda, atau Anda ingin mengimpor dalam volume kecil tanpa harus mengurus API sendiri.",
        answer_en: "Undername import is a service where UGC acts as the official importer (consignee of record) on your company's behalf. This is needed when: your company doesn't hold an Importer Identification Number (API), the goods to be imported aren't covered by your API commodity list, or you want to import in small volumes without having to obtain your own API.",
      },
      {
        question_id: "Barang apa saja yang dilarang atau dibatasi untuk impor ke Indonesia?",
        question_en: "What goods are prohibited or restricted for import into Indonesia?",
        answer_id: "Barang yang dilarang antara lain: narkotika, senjata api, bahan peledak, dan produk yang melanggar HAKI. Barang yang dibatasi (memerlukan izin khusus) meliputi: produk farmasi (izin BPOM), makanan dan minuman (BPOM + ML), elektronik (SNI), tekstil (izin Kemendag), dan produk kehutanan (SVLK). Tim kami membantu mengidentifikasi restriksi yang berlaku untuk barang Anda.",
        answer_en: "Prohibited goods include: narcotics, firearms, explosives, and intellectual property-infringing products. Restricted goods (requiring special permits) include: pharmaceuticals (BPOM license), food and beverages (BPOM + ML), electronics (SNI), textiles (Ministry of Trade permit), and forestry products (SVLK). Our team helps identify applicable restrictions for your goods.",
      },
      {
        question_id: "Berapa lama proses customs clearance di Indonesia?",
        question_en: "How long does customs clearance take in Indonesia?",
        answer_id: "Tergantung jalur yang ditetapkan Bea Cukai: Jalur Hijau (tanpa pemeriksaan fisik) biasanya selesai dalam 1-2 hari kerja. Jalur Kuning (pemeriksaan dokumen tambahan) membutuhkan 2-3 hari kerja. Jalur Merah (pemeriksaan fisik) bisa memakan waktu 3-7 hari kerja. Dengan pre-clearance preparation yang baik, mayoritas impor kami masuk jalur hijau.",
        answer_en: "It depends on the lane assigned by Customs: Green Lane (no physical inspection) typically completes in 1-2 working days. Yellow Lane (additional document review) takes 2-3 working days. Red Lane (physical inspection) can take 3-7 working days. With proper pre-clearance preparation, the majority of our imports are assigned to green lane.",
      },
      {
        question_id: "Apakah UGC bisa membantu jika barang saya tertahan di Bea Cukai?",
        question_en: "Can UGC help if my goods are held at Customs?",
        answer_id: "Ya. Tim kepabeanan kami berpengalaman menangani kasus barang tertahan — baik karena masalah dokumen, klasifikasi HS Code, maupun perizinan. Kami mendampingi proses klarifikasi dengan pihak Bea Cukai, membantu menyiapkan dokumen tambahan yang diperlukan, dan bekerja untuk mendapatkan release secepat mungkin. Untuk barang yang sudah dalam penanganan forwarder lain, kami juga bisa mengambil alih proses clearance.",
        answer_en: "Yes. Our customs team has experience handling detained cargo cases — whether due to documentation issues, HS Code classification, or permit problems. We accompany the clarification process with Customs authorities, help prepare additional required documents, and work to secure release as quickly as possible. For goods already handled by another forwarder, we can also take over the clearance process.",
      },
    ],

    relatedServices: ["international", "domestic"],

    seo: {
      title_id: "Import Door-to-Door & Customs Clearance Indonesia — UGC Logistics",
      title_en: "Import Door-to-Door & Customs Clearance Indonesia — UGC Logistics",
      description_id: "Layanan import DTD dan kepabeanan UGC Logistics. Customs clearance, perizinan BPOM/SNI, undername import, dan pengiriman dari negara asal ke gudang Anda.",
      description_en: "UGC Logistics import DTD and customs clearance services. Customs clearance, BPOM/SNI permits, undername import, and delivery from origin country to your warehouse.",
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 04 — BLOCKSPACE & AIRCRAFT CHARTER
  // ═══════════════════════════════════════════════════════════════
  charter: {
    key: "charter",
    overview_id: `<p>Untuk kebutuhan pengiriman bervolume besar atau bersifat mendesak yang tidak dapat diakomodasi oleh jadwal penerbangan reguler, UGC Logistics menawarkan layanan blockspace dan charter pesawat. Blockspace adalah alokasi ruang kargo tetap pada penerbangan reguler yang kami amankan secara kontraktual dengan maskapai — memberikan Anda jaminan kapasitas di rute-rute dengan permintaan tinggi tanpa harus menyewa seluruh pesawat.</p>

<p>Untuk kebutuhan yang lebih besar atau rute yang tidak terlayani penerbangan kargo reguler, kami mengatur charter pesawat penuh. Kami bekerja sama dengan operator kargo udara untuk menyediakan pesawat mulai dari turboprop berkapasitas 5-8 ton hingga freighter widebody seperti B747F dengan kapasitas hingga 100+ ton. Charter cocok untuk: pengiriman darurat (mesin pengganti untuk pabrik yang shutdown), pengiriman massal musiman (produk menjelang Ramadan/Natal), atau pengiriman ke bandara terpencil yang tidak memiliki penerbangan kargo reguler.</p>

<p>Tim charter kami menangani seluruh koordinasi — negosiasi tarif dengan operator, pengurusan slot bandara, perizinan penerbangan khusus jika diperlukan, ground handling di origin dan destination, serta monitoring kargo dari loading hingga unloading. Layanan ini sering digunakan bersamaan dengan layanan <a href="/id/layanan/kargo-proyek">Kargo Proyek</a> kami untuk pengiriman peralatan industri yang mendesak.</p>`,

    overview_en: `<p>For high-volume or urgent shipments that cannot be accommodated by regular flight schedules, UGC Logistics offers blockspace and aircraft charter services. Blockspace is a fixed cargo space allocation on regular flights that we secure contractually with airlines — giving you guaranteed capacity on high-demand routes without having to charter an entire aircraft.</p>

<p>For larger needs or routes not served by regular cargo flights, we arrange full aircraft charters. We work with air cargo operators to provide aircraft ranging from turboprops with 5-8 ton capacity to widebody freighters such as the B747F with capacity exceeding 100 tons. Charters are suitable for: emergency shipments (replacement machinery for a shut-down factory), seasonal bulk shipments (products ahead of Ramadan/Christmas), or deliveries to remote airports without regular cargo flights.</p>

<p>Our charter team handles all coordination — rate negotiation with operators, airport slot arrangement, special flight permits when needed, ground handling at origin and destination, and cargo monitoring from loading through unloading. This service is frequently combined with our <a href="/en/services/project-cargo">Project Cargo</a> service for urgent industrial equipment deliveries.</p>`,

    capabilities: [
      {
        title_id: "Blockspace Allocation",
        title_en: "Blockspace Allocation",
        description_id: "Alokasi ruang kargo tetap pada penerbangan reguler. Jaminan kapasitas di rute-rute padat tanpa biaya charter penuh.",
        description_en: "Fixed cargo space allocation on regular flights. Guaranteed capacity on busy routes without full charter costs.",
        metric_id: "Kapasitas terjamin di rute utama",
        metric_en: "Guaranteed capacity on key routes",
      },
      {
        title_id: "Full Aircraft Charter",
        title_en: "Full Aircraft Charter",
        description_id: "Penyewaan pesawat kargo penuh untuk pengiriman massal atau mendesak. Tersedia dari turboprop (5 ton) hingga B747F (100+ ton).",
        description_en: "Full cargo aircraft hire for bulk or urgent shipments. Available from turboprop (5 tons) to B747F (100+ tons).",
        metric_id: "5 ton hingga 100+ ton",
        metric_en: "5 tons to 100+ tons",
      },
      {
        title_id: "Emergency & AOG Shipments",
        title_en: "Emergency & AOG Shipments",
        description_id: "Pengiriman darurat dan Aircraft on Ground (AOG) — prioritas tertinggi untuk suku cadang pesawat, mesin pabrik, atau komponen kritis lainnya.",
        description_en: "Emergency and Aircraft on Ground (AOG) shipments — top priority for aircraft spare parts, factory machinery, or other critical components.",
        metric_id: "Respon dalam hitungan jam",
        metric_en: "Response within hours",
      },
      {
        title_id: "Remote Destination Access",
        title_en: "Remote Destination Access",
        description_id: "Charter ke bandara terpencil di Indonesia Timur dan lokasi tambang/industri yang tidak terlayani penerbangan kargo reguler.",
        description_en: "Charter flights to remote airports in Eastern Indonesia and mining/industrial locations not served by regular cargo flights.",
        metric_id: "Akses ke seluruh bandara Indonesia",
        metric_en: "Access to all Indonesian airports",
      },
    ],

    process: [
      {
        number: "01",
        title_id: "Permintaan & Assessment",
        title_en: "Request & Assessment",
        description_id: "Anda memberikan detail kebutuhan: volume kargo, berat, dimensi, origin-destination, dan urgency. Tim kami mengevaluasi opsi blockspace vs charter.",
        description_en: "You provide shipment details: cargo volume, weight, dimensions, origin-destination, and urgency. Our team evaluates blockspace vs. charter options.",
      },
      {
        number: "02",
        title_id: "Sourcing & Penawaran",
        title_en: "Sourcing & Quotation",
        description_id: "Kami menghubungi operator dan maskapai untuk mendapatkan penawaran terbaik. Untuk charter, ini mencakup tipe pesawat, slot waktu, dan rute.",
        description_en: "We contact operators and airlines for the best offers. For charters, this includes aircraft type, time slots, and routing.",
      },
      {
        number: "03",
        title_id: "Konfirmasi & Persiapan",
        title_en: "Confirmation & Preparation",
        description_id: "Setelah deal dikonfirmasi, kami mengurus perizinan penerbangan, ground handling arrangement, dan koordinasi loading plan.",
        description_en: "Once the deal is confirmed, we arrange flight permits, ground handling, and coordinate the loading plan.",
      },
      {
        number: "04",
        title_id: "Loading & Departure",
        title_en: "Loading & Departure",
        description_id: "Tim kami mengawasi proses loading di bandara asal untuk memastikan penanganan kargo yang tepat dan keberangkatan sesuai jadwal.",
        description_en: "Our team supervises the loading process at the origin airport to ensure proper cargo handling and on-schedule departure.",
      },
      {
        number: "05",
        title_id: "Monitoring & Arrival",
        title_en: "Monitoring & Arrival",
        description_id: "Kargo dipantau selama penerbangan. Di bandara tujuan, tim kami atau agen kami mengkoordinasikan unloading dan pengantaran ke alamat akhir.",
        description_en: "Cargo is monitored during flight. At the destination airport, our team or agent coordinates unloading and delivery to the final address.",
      },
    ],

    stats: [
      { value: 100, suffix: "+", label_id: "ton kapasitas charter maksimum", label_en: "ton maximum charter capacity" },
      { value: 4, suffix: "jam", label_id: "respon untuk permintaan darurat", label_en: "response time for emergency requests" },
      { value: 15, suffix: "+", label_id: "operator charter dalam jaringan", label_en: "charter operators in network" },
    ],

    clientStory: {
      industry_id: "Pertambangan & Energi",
      industry_en: "Mining & Energy",
      challenge_id: "Perusahaan tambang di Papua membutuhkan pengiriman darurat komponen crusher seberat 12 ton yang harus tiba dalam 48 jam karena shutdown produksi. Tidak ada penerbangan kargo reguler ke lokasi dengan kapasitas memadai.",
      challenge_en: "A mining company in Papua needed emergency delivery of a 12-ton crusher component within 48 hours due to a production shutdown. No regular cargo flight to the location had sufficient capacity.",
      solution_id: "UGC mengaransir charter B737F dari Jakarta ke Timika dalam waktu 6 jam setelah permintaan diterima. Tim kami mengkoordinasikan ground handling khusus di kedua bandara dan pengangkutan darat dari bandara Timika ke lokasi tambang.",
      solution_en: "UGC arranged a B737F charter from Jakarta to Timika within 6 hours of receiving the request. Our team coordinated specialized ground handling at both airports and overland transport from Timika airport to the mine site.",
      result_id: "Komponen tiba di lokasi tambang dalam 36 jam sejak permintaan — 12 jam lebih cepat dari target. Downtime produksi diminimalkan, menghindari kerugian estimasi Rp 2 miliar per hari.",
      result_en: "The component arrived at the mine site within 36 hours of the request — 12 hours ahead of target. Production downtime was minimized, avoiding estimated losses of IDR 2 billion per day.",
      display_quote_id: "Charter darurat Jakarta-Timika dalam 36 jam — komponen 12 ton tiba 12 jam lebih cepat dari target, menghindari kerugian produksi.",
      display_quote_en: "Emergency charter Jakarta-Timika in 36 hours — 12-ton component arrived 12 hours ahead of target, avoiding production losses.",
    },

    faq: [
      {
        question_id: "Berapa berat minimum untuk bisa menggunakan layanan charter?",
        question_en: "What is the minimum weight for charter services?",
        answer_id: "Tidak ada berat minimum absolut — charter didasarkan pada kebutuhan, bukan hanya berat. Namun secara ekonomis, charter biasanya layak jika volume Anda melebihi 3-5 ton atau jika urgency mengharuskan pengiriman di luar jadwal penerbangan reguler. Untuk volume di bawah itu, blockspace pada penerbangan reguler biasanya lebih cost-effective.",
        answer_en: "There is no absolute minimum weight — charters are based on need, not just weight. However, economically, a charter is typically viable when your volume exceeds 3-5 tons or when urgency requires shipping outside regular flight schedules. For volumes below that, blockspace on regular flights is usually more cost-effective.",
      },
      {
        question_id: "Jenis pesawat apa saja yang tersedia untuk charter?",
        question_en: "What aircraft types are available for charter?",
        answer_id: "Tergantung kebutuhan, kami dapat mengatur: ATR 72F (kapasitas ~8 ton) untuk rute pendek, B737F (~18 ton) untuk rute domestik dan regional, A330F (~60 ton) untuk jarak menengah, hingga B747F (~100+ ton) untuk volume sangat besar. Ketersediaan tergantung pada waktu permintaan dan rute.",
        answer_en: "Depending on requirements, we can arrange: ATR 72F (~8 ton capacity) for short routes, B737F (~18 tons) for domestic and regional routes, A330F (~60 tons) for medium range, up to B747F (~100+ tons) for very large volumes. Availability depends on request timing and route.",
      },
      {
        question_id: "Berapa lama lead time yang dibutuhkan untuk mengatur charter?",
        question_en: "How much lead time is needed to arrange a charter?",
        answer_id: "Untuk charter darurat (AOG/emergency), kami bisa mengatur dalam 6-12 jam jika pesawat tersedia. Untuk charter terencana, lead time ideal adalah 5-7 hari kerja. Semakin awal Anda menghubungi kami, semakin banyak opsi yang tersedia dan semakin kompetitif tarifnya.",
        answer_en: "For emergency charters (AOG/emergency), we can arrange within 6-12 hours if aircraft are available. For planned charters, the ideal lead time is 5-7 working days. The earlier you contact us, the more options are available and the more competitive the rates.",
      },
      {
        question_id: "Apakah blockspace bisa dikontrak secara berkala?",
        question_en: "Can blockspace be contracted on a recurring basis?",
        answer_id: "Ya, kami menawarkan kontrak blockspace bulanan atau kuartalan untuk pelanggan dengan kebutuhan pengiriman reguler di rute tertentu. Kontrak memberikan jaminan kapasitas dan tarif tetap, sangat berguna di musim puncak ketika ruang kargo reguler sulit didapat.",
        answer_en: "Yes, we offer monthly or quarterly blockspace contracts for customers with regular shipping needs on specific routes. Contracts provide capacity guarantees and fixed rates, which are especially valuable during peak seasons when regular cargo space is hard to secure.",
      },
    ],

    relatedServices: ["domestic", "project-cargo"],

    seo: {
      title_id: "Blockspace & Charter Pesawat Kargo — UGC Logistics",
      title_en: "Blockspace & Aircraft Charter — UGC Logistics",
      description_id: "Layanan blockspace dan charter pesawat kargo UGC Logistics. Kapasitas terjamin, charter darurat, pengiriman ke bandara terpencil. Dari 5 hingga 100+ ton.",
      description_en: "UGC Logistics blockspace and cargo aircraft charter services. Guaranteed capacity, emergency charters, delivery to remote airports. From 5 to 100+ tons.",
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 05 — WAREHOUSING & FULFILLMENT 3PL
  // ═══════════════════════════════════════════════════════════════
  warehouse: {
    key: "warehouse",
    overview_id: `<p>UGC Logistics mengoperasikan fasilitas pergudangan modern di area strategis Jakarta yang dirancang untuk mendukung kebutuhan penyimpanan, pengelolaan inventaris, dan fulfillment sebagai penyedia layanan logistik pihak ketiga (3PL). Gudang kami dilengkapi Warehouse Management System (WMS) yang terintegrasi dengan sistem klien untuk visibilitas stok real-time, pelacakan batch/lot, dan pelaporan otomatis.</p>

<p>Layanan 3PL kami mencakup seluruh rantai fulfillment: penerimaan barang (inbound), quality check, putaway ke lokasi penyimpanan yang tepat, manajemen inventaris dengan FIFO/FEFO sesuai kebutuhan, pick-and-pack untuk pesanan individual maupun bulk, pelabelan, kitting, co-packing, hingga pengiriman keluar (outbound) baik via kurir untuk e-commerce maupun via truk untuk distribusi B2B. Kami mendukung integrasi langsung dengan platform e-commerce dan marketplace untuk automasi proses order fulfillment.</p>

<p>Fasilitas kami memenuhi standar keamanan dan kebersihan yang diperlukan untuk berbagai jenis produk — dari consumer electronics hingga produk FMCG. Area penyimpanan dikelola dengan sistem zonasi untuk memisahkan barang berdasarkan kategori, suhu, atau persyaratan handling khusus. Untuk kebutuhan distribusi yang lebih luas, layanan pergudangan kami terintegrasi dengan layanan <a href="/id/layanan/distribusi-domestik">Distribusi Domestik</a> kami sehingga barang dapat langsung didistribusikan ke seluruh Indonesia dari gudang kami.</p>`,

    overview_en: `<p>UGC Logistics operates modern warehouse facilities in strategic Jakarta locations designed to support storage, inventory management, and fulfillment needs as a third-party logistics (3PL) provider. Our warehouses are equipped with a Warehouse Management System (WMS) integrated with client systems for real-time stock visibility, batch/lot tracking, and automated reporting.</p>

<p>Our 3PL services cover the entire fulfillment chain: goods receiving (inbound), quality checks, putaway to appropriate storage locations, inventory management with FIFO/FEFO as required, pick-and-pack for individual and bulk orders, labeling, kitting, co-packing, through to outbound shipping via couriers for e-commerce or trucks for B2B distribution. We support direct integration with e-commerce platforms and marketplaces for order fulfillment automation.</p>

<p>Our facilities meet the safety and cleanliness standards required for various product types — from consumer electronics to FMCG products. Storage areas are managed with a zoning system to separate goods based on category, temperature, or special handling requirements. For broader distribution needs, our warehousing service integrates with our <a href="/en/services/domestic-distribution">Domestic Distribution</a> service so goods can be distributed directly across Indonesia from our warehouse.</p>`,

    capabilities: [
      {
        title_id: "Manajemen Inventaris & WMS",
        title_en: "Inventory Management & WMS",
        description_id: "Sistem WMS terintegrasi untuk pelacakan stok real-time, manajemen batch/lot, FIFO/FEFO, dan pelaporan inventaris otomatis.",
        description_en: "Integrated WMS for real-time stock tracking, batch/lot management, FIFO/FEFO, and automated inventory reporting.",
        metric_id: "Visibilitas stok real-time",
        metric_en: "Real-time stock visibility",
      },
      {
        title_id: "Pick, Pack & Ship",
        title_en: "Pick, Pack & Ship",
        description_id: "Fulfillment dari single-piece pick hingga bulk order. Termasuk pelabelan, kitting, co-packing, dan pengiriman via kurir atau truk.",
        description_en: "Fulfillment from single-piece picks to bulk orders. Includes labeling, kitting, co-packing, and shipping via courier or truck.",
        metric_id: "Akurasi picking 99.7%",
        metric_en: "99.7% picking accuracy",
      },
      {
        title_id: "E-Commerce Fulfillment",
        title_en: "E-Commerce Fulfillment",
        description_id: "Integrasi langsung dengan Tokopedia, Shopee, Lazada, dan platform e-commerce lainnya. Order masuk otomatis diproses untuk pengiriman same-day atau next-day.",
        description_en: "Direct integration with Tokopedia, Shopee, Lazada, and other e-commerce platforms. Incoming orders are automatically processed for same-day or next-day shipping.",
        metric_id: "Integrasi multi-marketplace",
        metric_en: "Multi-marketplace integration",
      },
      {
        title_id: "Value-Added Services",
        title_en: "Value-Added Services",
        description_id: "Layanan tambahan: quality inspection, repackaging, bundling, pelabelan barcode, assembly ringan, dan pengelolaan retur.",
        description_en: "Additional services: quality inspection, repackaging, bundling, barcode labeling, light assembly, and returns management.",
        metric_id: "Customizable per kebutuhan",
        metric_en: "Customizable per needs",
      },
    ],

    process: [
      {
        number: "01",
        title_id: "Onboarding & Setup",
        title_en: "Onboarding & Setup",
        description_id: "Kami mempelajari kebutuhan penyimpanan dan fulfillment Anda, mengkonfigurasi WMS, dan menyiapkan area gudang yang sesuai.",
        description_en: "We assess your storage and fulfillment needs, configure the WMS, and prepare the appropriate warehouse area.",
      },
      {
        number: "02",
        title_id: "Inbound & Penerimaan",
        title_en: "Inbound & Receiving",
        description_id: "Barang diterima di gudang, dilakukan quality check dan pencatatan ke WMS. Setiap item diidentifikasi dengan SKU, batch, dan lokasi penyimpanan.",
        description_en: "Goods are received at the warehouse, quality-checked, and logged into the WMS. Each item is identified by SKU, batch, and storage location.",
      },
      {
        number: "03",
        title_id: "Penyimpanan & Manajemen",
        title_en: "Storage & Management",
        description_id: "Barang disimpan sesuai zonasi yang tepat. Inventaris dikelola dengan aturan FIFO/FEFO dan dipantau melalui dashboard real-time.",
        description_en: "Goods are stored according to proper zoning. Inventory is managed with FIFO/FEFO rules and monitored through a real-time dashboard.",
      },
      {
        number: "04",
        title_id: "Order Processing & Fulfillment",
        title_en: "Order Processing & Fulfillment",
        description_id: "Saat order masuk (manual atau otomatis dari marketplace), tim gudang melakukan picking, packing, pelabelan, dan persiapan kirim.",
        description_en: "When orders come in (manual or automatic from marketplaces), the warehouse team performs picking, packing, labeling, and shipping preparation.",
      },
      {
        number: "05",
        title_id: "Outbound & Pengiriman",
        title_en: "Outbound & Shipping",
        description_id: "Pesanan diserahkan ke kurir atau dimuat ke truk distribusi. Tracking number digenerate dan diteruskan ke Anda dan customer akhir.",
        description_en: "Orders are handed to couriers or loaded onto distribution trucks. Tracking numbers are generated and forwarded to you and the end customer.",
      },
    ],

    stats: [
      { value: 99.7, suffix: "%", label_id: "akurasi picking order", label_en: "order picking accuracy" },
      { value: 24, suffix: "jam", label_id: "fulfillment same/next-day", label_en: "same/next-day fulfillment" },
      { value: 10000, suffix: "+", label_id: "SKU yang dikelola", label_en: "SKUs managed" },
    ],

    clientStory: {
      industry_id: "E-Commerce & Retail",
      industry_en: "E-Commerce & Retail",
      challenge_id: "Brand e-commerce lokal yang menjual di 4 marketplace mengalami kesulitan mengelola inventaris dan fulfillment secara manual — menyebabkan overselling, pengiriman terlambat, dan tingkat retur tinggi akibat kesalahan picking.",
      challenge_en: "A local e-commerce brand selling on 4 marketplaces struggled to manage inventory and fulfillment manually — causing overselling, late shipments, and high return rates due to picking errors.",
      solution_id: "UGC mengimplementasikan WMS yang terintegrasi dengan 4 marketplace klien, memindahkan seluruh stok ke gudang kami, dan menerapkan proses pick-pack standar dengan barcode scanning untuk eliminasi kesalahan.",
      solution_en: "UGC implemented a WMS integrated with the client's 4 marketplaces, moved all inventory to our warehouse, and applied standardized pick-pack processes with barcode scanning to eliminate errors.",
      result_id: "Kesalahan picking turun dari 3.2% menjadi 0.3%. Waktu fulfillment dari 48 jam menjadi same-day untuk order sebelum jam 2 siang. Tingkat retur akibat kesalahan pengiriman turun 85%.",
      result_en: "Picking errors dropped from 3.2% to 0.3%. Fulfillment time improved from 48 hours to same-day for orders before 2 PM. Return rate due to shipping errors decreased by 85%.",
      display_quote_id: "Fulfillment e-commerce di 4 marketplace — kesalahan picking turun 90% dan semua order diproses same-day.",
      display_quote_en: "E-commerce fulfillment across 4 marketplaces — picking errors down 90% and all orders processed same-day.",
    },

    faq: [
      {
        question_id: "Berapa kapasitas gudang yang tersedia?",
        question_en: "How much warehouse capacity is available?",
        answer_id: "Kapasitas bervariasi dan kami mengalokasikan area sesuai kebutuhan klien — bisa mulai dari 50 pallet position untuk volume kecil hingga ribuan posisi untuk operasi besar. Hubungi kami untuk diskusi kebutuhan spesifik Anda dan kami akan memberikan opsi yang sesuai.",
        answer_en: "Capacity varies and we allocate space according to client needs — starting from 50 pallet positions for small volumes to thousands of positions for large operations. Contact us to discuss your specific needs and we'll provide suitable options.",
      },
      {
        question_id: "Apakah WMS bisa diintegrasikan dengan sistem ERP kami?",
        question_en: "Can the WMS integrate with our ERP system?",
        answer_id: "Ya, WMS kami mendukung integrasi via API dengan berbagai sistem ERP dan e-commerce platform. Proses integrasi biasanya membutuhkan waktu 1-2 minggu tergantung kompleksitas. Kami juga menyediakan dashboard web untuk monitoring inventaris secara mandiri.",
        answer_en: "Yes, our WMS supports API integration with various ERP systems and e-commerce platforms. The integration process typically takes 1-2 weeks depending on complexity. We also provide a web dashboard for independent inventory monitoring.",
      },
      {
        question_id: "Bagaimana penanganan barang yang memerlukan suhu khusus?",
        question_en: "How do you handle goods requiring special temperatures?",
        answer_id: "Kami memiliki zona penyimpanan dengan kontrol suhu untuk produk yang memerlukan ambient controlled environment. Untuk kebutuhan cold storage (frozen/chilled), kami berkoordinasi dengan mitra gudang berpendingin yang terverifikasi di area yang sama.",
        answer_en: "We have storage zones with temperature control for products requiring an ambient controlled environment. For cold storage needs (frozen/chilled), we coordinate with verified cold storage partners in the same area.",
      },
      {
        question_id: "Berapa biaya layanan 3PL?",
        question_en: "What does 3PL service cost?",
        answer_id: "Biaya tergantung pada: luas area penyimpanan, volume order fulfillment per bulan, jenis value-added services yang diperlukan, dan durasi kontrak. Kami menawarkan model pay-per-use (per pallet/per order) atau fixed monthly fee tergantung volume. Hubungi kami untuk penawaran yang disesuaikan.",
        answer_en: "Cost depends on: storage area, monthly order fulfillment volume, types of value-added services needed, and contract duration. We offer pay-per-use (per pallet/per order) or fixed monthly fee models depending on volume. Contact us for a customized quotation.",
      },
      {
        question_id: "Bagaimana proses pengelolaan retur?",
        question_en: "How do you handle returns management?",
        answer_id: "Kami menangani seluruh proses reverse logistics: penerimaan barang retur, inspeksi kondisi, re-stocking untuk barang layak jual, atau segregasi untuk barang rusak. Semua dicatat dalam WMS sehingga Anda memiliki visibilitas penuh atas status retur dan kondisi inventaris.",
        answer_en: "We handle the entire reverse logistics process: receiving returned goods, condition inspection, restocking for sellable items, or segregation for damaged goods. Everything is logged in the WMS so you have full visibility of return status and inventory condition.",
      },
    ],

    relatedServices: ["domestic", "international"],

    seo: {
      title_id: "Pergudangan & Fulfillment 3PL — WMS Terintegrasi — UGC Logistics",
      title_en: "Warehousing & 3PL Fulfillment — Integrated WMS — UGC Logistics",
      description_id: "Layanan pergudangan dan fulfillment 3PL UGC Logistics. WMS terintegrasi, pick-and-pack, e-commerce fulfillment, manajemen inventaris real-time.",
      description_en: "UGC Logistics warehousing and 3PL fulfillment services. Integrated WMS, pick-and-pack, e-commerce fulfillment, real-time inventory management.",
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 06 — PROJECT CARGO & HEAVY DUTY
  // ═══════════════════════════════════════════════════════════════
  "project-cargo": {
    key: "project-cargo",
    overview_id: `<p>Layanan Project Cargo UGC Logistics dirancang untuk menangani pengiriman kargo yang tidak dapat diakomodasi oleh layanan freight standar — barang berdimensi besar (oversize), berat berlebih (overweight), atau memerlukan penanganan khusus karena bentuk, nilai, atau sensitivitas material. Kami melayani sektor industri berat termasuk pertambangan, energi, konstruksi, minyak dan gas, serta infrastruktur telekomunikasi.</p>

<p>Setiap proyek dimulai dengan survei rute (route survey) yang komprehensif: tim kami mengevaluasi kondisi jalan, kapasitas jembatan, radius belokan, overhead clearance, dan kendala fisik lainnya dari titik asal hingga tujuan. Berdasarkan survei ini, kami menyusun rencana transportasi detail yang mencakup pemilihan moda dan alat angkut (lowbed trailer, multi-axle hydraulic trailer, modular transporter), kebutuhan escort kendaraan, dan jadwal pengiriman yang memperhitungkan regulasi lalu lintas untuk kargo oversize.</p>

<p>Kami mengurus seluruh perizinan yang diperlukan — Surat Izin Muatan Khusus dari Dinas Perhubungan, izin kepolisian untuk escort, dan izin dari otoritas jalan tol atau pelabuhan. Untuk kebutuhan lifting dan rigging di lokasi, kami berkoordinasi dengan penyedia crane dan heavy-lift equipment. Layanan ini sering dikombinasikan dengan <a href="/id/layanan/blockspace-charter">Blockspace & Charter</a> kami ketika komponen perlu diterbangkan dan kemudian ditransportasikan via darat ke lokasi proyek.</p>`,

    overview_en: `<p>UGC Logistics' Project Cargo service is designed to handle shipments that cannot be accommodated by standard freight services — oversized, overweight, or requiring special handling due to shape, value, or material sensitivity. We serve heavy industrial sectors including mining, energy, construction, oil and gas, and telecommunications infrastructure.</p>

<p>Every project begins with a comprehensive route survey: our team evaluates road conditions, bridge capacities, turning radii, overhead clearances, and other physical constraints from origin to destination. Based on this survey, we develop a detailed transport plan covering mode and equipment selection (lowbed trailers, multi-axle hydraulic trailers, modular transporters), vehicle escort requirements, and delivery schedules that account for traffic regulations for oversized cargo.</p>

<p>We handle all required permits — Special Load Permits from the Department of Transportation, police escort permits, and authorization from toll road or port authorities. For on-site lifting and rigging needs, we coordinate with crane and heavy-lift equipment providers. This service is frequently combined with our <a href="/en/services/blockspace-charter">Blockspace & Charter</a> service when components need to be flown in and then transported overland to the project site.</p>`,

    capabilities: [
      {
        title_id: "Kargo Oversize & Overweight",
        title_en: "Oversized & Overweight Cargo",
        description_id: "Pengiriman barang dengan dimensi dan berat melebihi standar: generator, transformator, boiler, tower section, pipa besar, dan komponen pabrik.",
        description_en: "Shipment of goods exceeding standard dimensions and weight: generators, transformers, boilers, tower sections, large pipes, and factory components.",
        metric_id: "Hingga 200+ ton per unit",
        metric_en: "Up to 200+ tons per unit",
      },
      {
        title_id: "Route Survey & Planning",
        title_en: "Route Survey & Planning",
        description_id: "Survei rute komprehensif sebelum pengiriman: evaluasi jalan, jembatan, radius belokan, overhead clearance, dan penyusunan rencana transportasi detail.",
        description_en: "Comprehensive pre-shipment route surveys: road evaluation, bridges, turning radii, overhead clearance, and detailed transport plan development.",
        metric_id: "Analisis rute end-to-end",
        metric_en: "End-to-end route analysis",
      },
      {
        title_id: "Perizinan & Escort",
        title_en: "Permits & Escort",
        description_id: "Pengurusan izin muatan khusus, koordinasi escort kepolisian, dan izin dari otoritas jalan tol dan pelabuhan.",
        description_en: "Special load permit processing, police escort coordination, and authorization from toll road and port authorities.",
        metric_id: "Seluruh perizinan ditangani",
        metric_en: "All permits handled",
      },
      {
        title_id: "Heavy Lift & Rigging",
        title_en: "Heavy Lift & Rigging",
        description_id: "Koordinasi crane dan peralatan heavy-lift untuk loading, unloading, dan positioning di lokasi proyek. Termasuk perencanaan lift plan dan safety assessment.",
        description_en: "Crane and heavy-lift equipment coordination for loading, unloading, and positioning at the project site. Includes lift plan development and safety assessment.",
        metric_id: "Crane hingga 500 ton",
        metric_en: "Cranes up to 500 tons",
      },
      {
        title_id: "Multimodal Project Logistics",
        title_en: "Multimodal Project Logistics",
        description_id: "Kombinasi moda transportasi — laut (tongkang, vessel), darat (lowbed, hydraulic trailer), dan udara (charter) — untuk pengiriman proyek yang kompleks.",
        description_en: "Combined transport modes — sea (barge, vessel), land (lowbed, hydraulic trailer), and air (charter) — for complex project shipments.",
        metric_id: "Darat, laut, udara terintegrasi",
        metric_en: "Land, sea, air integrated",
      },
    ],

    process: [
      {
        number: "01",
        title_id: "Site Assessment & Survei Rute",
        title_en: "Site Assessment & Route Survey",
        description_id: "Tim kami mengunjungi lokasi asal dan tujuan, mengevaluasi kondisi rute, dan mengidentifikasi kendala teknis yang perlu diatasi.",
        description_en: "Our team visits origin and destination sites, evaluates route conditions, and identifies technical constraints that need to be addressed.",
      },
      {
        number: "02",
        title_id: "Engineering & Transport Plan",
        title_en: "Engineering & Transport Plan",
        description_id: "Berdasarkan survei, kami menyusun rencana transportasi detail — pemilihan alat angkut, konfigurasi securing, jadwal, dan contingency plan.",
        description_en: "Based on the survey, we develop a detailed transport plan — equipment selection, securing configuration, schedule, and contingency planning.",
      },
      {
        number: "03",
        title_id: "Perizinan & Koordinasi",
        title_en: "Permitting & Coordination",
        description_id: "Pengurusan seluruh izin yang diperlukan dan koordinasi dengan kepolisian, otoritas jalan, pelabuhan, dan stakeholder lainnya.",
        description_en: "Processing all required permits and coordinating with police, road authorities, ports, and other stakeholders.",
      },
      {
        number: "04",
        title_id: "Mobilisasi & Loading",
        title_en: "Mobilization & Loading",
        description_id: "Mobilisasi alat angkut dan crane ke lokasi. Loading dilakukan sesuai lift plan yang telah disusun dengan pengawasan safety officer.",
        description_en: "Equipment and crane mobilization to the site. Loading is performed according to the lift plan under safety officer supervision.",
      },
      {
        number: "05",
        title_id: "Transport & Escort",
        title_en: "Transport & Escort",
        description_id: "Pengiriman dengan escort kendaraan dan monitoring real-time. Kecepatan dan rute diatur sesuai izin dan kondisi lapangan.",
        description_en: "Transport with vehicle escort and real-time monitoring. Speed and routing follow permit conditions and field conditions.",
      },
      {
        number: "06",
        title_id: "Unloading & Positioning",
        title_en: "Unloading & Positioning",
        description_id: "Di lokasi tujuan, barang diturunkan dan diposisikan sesuai kebutuhan klien menggunakan crane atau alat berat yang sesuai.",
        description_en: "At the destination, cargo is unloaded and positioned per client requirements using appropriate cranes or heavy equipment.",
      },
    ],

    stats: [
      { value: 200, suffix: "+", label_id: "ton kapasitas per unit", label_en: "ton capacity per unit" },
      { value: 500, suffix: "", label_id: "ton kapasitas crane", label_en: "ton crane capacity" },
      { value: 30, suffix: "+", label_id: "tahun pengalaman project cargo", label_en: "years of project cargo experience" },
    ],

    clientStory: {
      industry_id: "Pertambangan & Energi",
      industry_en: "Mining & Energy",
      challenge_id: "Perusahaan energi perlu mengirim 3 unit transformator masing-masing seberat 85 ton dari pelabuhan Tanjung Priok ke site pembangkit listrik di Jawa Barat — melewati jalan provinsi dengan beberapa jembatan berkapasitas terbatas.",
      challenge_en: "An energy company needed to transport 3 transformer units, each weighing 85 tons, from Tanjung Priok port to a power plant site in West Java — traversing provincial roads with several weight-limited bridges.",
      solution_id: "UGC melakukan survei rute selama 2 minggu, mengidentifikasi 4 jembatan yang memerlukan bypass atau penguatan sementara. Kami menggunakan multi-axle hydraulic trailer untuk mendistribusikan beban, mengurus izin dari 3 kabupaten, dan mengkoordinasikan escort polisi untuk 3 trip pengiriman malam hari.",
      solution_en: "UGC conducted a 2-week route survey, identifying 4 bridges requiring bypasses or temporary reinforcement. We used multi-axle hydraulic trailers to distribute the load, obtained permits from 3 districts, and coordinated police escorts for 3 overnight delivery trips.",
      result_id: "Ketiga transformator tiba di site tanpa kerusakan, tepat waktu sesuai jadwal commissioning klien. Total waktu pengiriman 15 hari dari port hingga positioning — 5 hari lebih cepat dari estimasi awal.",
      result_en: "All three transformers arrived on-site undamaged, on schedule for the client's commissioning timeline. Total delivery time was 15 days from port to positioning — 5 days ahead of the initial estimate.",
      display_quote_id: "3 transformator 85 ton dari pelabuhan ke site pembangkit — tiba tanpa kerusakan, 5 hari lebih cepat dari target.",
      display_quote_en: "Three 85-ton transformers from port to power plant site — delivered undamaged, 5 days ahead of target.",
    },

    faq: [
      {
        question_id: "Berapa dimensi dan berat maksimum yang bisa ditangani?",
        question_en: "What are the maximum dimensions and weight you can handle?",
        answer_id: "Secara teknis tidak ada batas absolut — kami menyesuaikan solusi dengan kebutuhan. Kami rutin menangani kargo hingga 200+ ton per unit via darat. Untuk berat lebih dari itu, kami menggunakan modular transporter yang kapasitasnya bisa dikonfigurasi. Dimensi tergantung pada rute — kami melakukan survei untuk menentukan feasibility.",
        answer_en: "There is technically no absolute limit — we tailor solutions to requirements. We routinely handle cargo up to 200+ tons per unit via road. For heavier loads, we use modular transporters with configurable capacity. Dimensions depend on the route — we conduct surveys to determine feasibility.",
      },
      {
        question_id: "Berapa lama waktu yang dibutuhkan dari perencanaan hingga pengiriman?",
        question_en: "How long does the process take from planning to delivery?",
        answer_id: "Tergantung kompleksitas proyek. Untuk kargo oversize standar dengan rute yang sudah dikenal, 2-3 minggu dari perencanaan hingga delivery. Untuk proyek kompleks yang memerlukan route survey, modifikasi jalan, atau multiple permits, bisa memakan waktu 4-8 minggu. Kami merekomendasikan untuk menghubungi kami sedini mungkin.",
        answer_en: "It depends on project complexity. For standard oversized cargo on familiar routes, 2-3 weeks from planning to delivery. For complex projects requiring route surveys, road modifications, or multiple permits, it can take 4-8 weeks. We recommend contacting us as early as possible.",
      },
      {
        question_id: "Apakah UGC menyediakan asuransi untuk project cargo?",
        question_en: "Does UGC provide insurance for project cargo?",
        answer_id: "Kami memfasilitasi asuransi all-risk untuk project cargo melalui mitra asuransi kami. Mengingat nilai barang yang biasanya tinggi dan risiko pengiriman yang spesifik, kami sangat merekomendasikan asuransi untuk setiap pengiriman project cargo. Premi dihitung berdasarkan nilai barang, rute, dan metode pengiriman.",
        answer_en: "We facilitate all-risk insurance for project cargo through our insurance partners. Given the typically high value of goods and specific shipping risks, we strongly recommend insurance for every project cargo shipment. Premiums are calculated based on cargo value, route, and shipping method.",
      },
      {
        question_id: "Apakah bisa mengirim ke lokasi proyek yang terpencil atau off-road?",
        question_en: "Can you deliver to remote or off-road project sites?",
        answer_id: "Ya. Tim kami berpengalaman mengirim ke lokasi tambang, pembangkit listrik, dan site konstruksi di area terpencil di seluruh Indonesia. Survei rute kami mencakup evaluasi kondisi jalan non-aspal, kebutuhan temporary road construction, dan akses yang mungkin memerlukan alat berat tambahan.",
        answer_en: "Yes. Our team has experience delivering to mining sites, power plants, and construction sites in remote areas across Indonesia. Our route survey covers evaluation of unpaved road conditions, temporary road construction needs, and access that may require additional heavy equipment.",
      },
    ],

    relatedServices: ["charter", "domestic"],

    seo: {
      title_id: "Project Cargo & Heavy Lift Indonesia — Kargo Berat & Oversize — UGC Logistics",
      title_en: "Project Cargo & Heavy Lift Indonesia — Heavy & Oversized Cargo — UGC Logistics",
      description_id: "Layanan project cargo dan heavy lift UGC Logistics. Pengiriman kargo oversize dan overweight, survei rute, perizinan khusus, crane dan heavy-lift equipment.",
      description_en: "UGC Logistics project cargo and heavy lift services. Oversized and overweight cargo transport, route surveys, special permits, crane and heavy-lift equipment.",
    },
  },
};

// ─── Helper functions ───

export function getServiceByKey(key: string): ServiceData | undefined {
  return services.find((s) => s.key === key);
}

export function getServiceDetail(key: string): ServiceDetail | undefined {
  return serviceDetails[key];
}
