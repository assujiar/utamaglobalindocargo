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
    tagline_id: "Barang Anda harus sampai ke Jayapura besok?",
    tagline_en: "Need your goods in Jayapura by tomorrow?",
    description_id:
      "Klien kami mengirim ke 34 provinsi setiap hari. Dari paket kecil sampai muatan penuh truk, via darat, laut, atau udara. Anda tinggal kasih alamat tujuan, kami yang atur sisanya.",
    description_en:
      "Our clients ship to all 34 provinces every day. From small parcels to full truckloads, by land, sea, or air. Just give us the destination, and we handle the rest.",
    slug_id: "distribusi-domestik",
    slug_en: "domestic-distribution",
    icon: "Truck",
  },
  {
    key: "international",
    number: "02",
    name_id: "Freight Internasional",
    name_en: "International Freight",
    tagline_id: "Ekspor ke Eropa? Impor dari China? Kami sudah hapal rutenya.",
    tagline_en: "Exporting to Europe? Importing from China? We know the routes.",
    description_id:
      "Sudah 25+ tahun kami mengirim kargo ke 150+ negara. Dokumen ekspor-impor, konsolidasi, dangerous goods. Anda tidak perlu pusing soal regulasi, itu bagian kami.",
    description_en:
      "For over 25 years, we have shipped cargo to 150+ countries. Export-import docs, consolidation, dangerous goods. You do not need to worry about regulations, that is our job.",
    slug_id: "freight-internasional",
    slug_en: "international-freight",
    icon: "Globe",
  },
  {
    key: "import-dtd",
    number: "03",
    name_id: "Import DTD & Kepabeanan",
    name_en: "Import DTD & Customs",
    tagline_id: "Barang tertahan di Bea Cukai? Kami bisa bantu sekarang.",
    tagline_en: "Cargo stuck at Customs? We can help right now.",
    description_id:
      "Impor itu ribet: HS Code, bea masuk, BPOM, SNI, jalur merah. Tapi itu urusan kami sehari-hari. Dari pintu supplier di luar negeri sampai pintu gudang Anda, satu PIC yang pegang semuanya.",
    description_en:
      "Importing is complicated: HS Codes, duties, permits, red lane inspections. But that is what we do every day. From your supplier's door overseas to your warehouse door, one contact handles everything.",
    slug_id: "import-dtd-kepabeanan",
    slug_en: "import-dtd-customs",
    icon: "FileCheck",
  },
  {
    key: "charter",
    number: "04",
    name_id: "Blockspace & Charter",
    name_en: "Blockspace & Charter",
    tagline_id: "Pabrik shutdown dan butuh spare part besok pagi?",
    tagline_en: "Factory down and need spare parts by morning?",
    description_id:
      "Ketika penerbangan reguler tidak cukup, kami sewakan pesawat kargo untuk Anda. Dari 5 ton sampai 100+ ton. Pernah kami atur charter darurat Jakarta-Timika dalam 6 jam.",
    description_en:
      "When regular flights are not enough, we charter a cargo aircraft for you. From 5 tons to 100+ tons. We once arranged an emergency Jakarta-Timika charter in just 6 hours.",
    slug_id: "blockspace-charter",
    slug_en: "blockspace-charter",
    icon: "Plane",
  },
  {
    key: "warehouse",
    number: "05",
    name_id: "Pergudangan & 3PL",
    name_en: "Warehousing & 3PL",
    tagline_id: "Gudang penuh? Fulfillment kewalahan? Serahkan ke kami.",
    tagline_en: "Warehouse overflowing? Fulfillment overwhelmed? Hand it to us.",
    description_id:
      "Klien e-commerce kami memproses ribuan order per hari dari satu gudang kami. WMS terintegrasi dengan Tokopedia, Shopee, Lazada. Anda terima order, kami yang pick, pack, dan kirim.",
    description_en:
      "Our e-commerce clients process thousands of orders daily from our warehouse. WMS integrated with major marketplaces. You take the order, we pick, pack, and ship.",
    slug_id: "pergudangan-3pl",
    slug_en: "warehousing-3pl",
    icon: "Warehouse",
  },
  {
    key: "project-cargo",
    number: "06",
    name_id: "Kargo Proyek",
    name_en: "Project Cargo",
    tagline_id: "Transformator 85 ton harus sampai ke site minggu depan?",
    tagline_en: "85-ton transformer needs to reach the site next week?",
    description_id:
      "Kami mengantarkan alat berat, komponen pembangkit, dan kargo oversize yang forwarder lain tolak. Survei rute, izin khusus, escort polisi, crane 500 ton. Semua kami koordinasikan.",
    description_en:
      "We deliver heavy equipment, power plant components, and oversized cargo that other forwarders turn down. Route surveys, special permits, police escorts, 500-ton cranes. We coordinate it all.",
    slug_id: "kargo-proyek",
    slug_en: "project-cargo",
    icon: "Container",
  },
];

// ─── Service detail content ───

export const serviceDetails: Record<string, ServiceDetail> = {
  // ═══════════════════════════════════════════════════════════════
  // 01  - DOMESTIC DISTRIBUTION
  // ═══════════════════════════════════════════════════════════════
  domestic: {
    key: "domestic",
    overview_id: `<p>Bayangkan Anda punya pelanggan di Makassar yang butuh stok minggu depan, distributor di Medan yang menunggu kiriman bulanan, dan toko retail di Jayapura yang sudah kehabisan barang. Semuanya harus sampai tepat waktu, dalam kondisi sempurna, dan Anda harus bisa memantau semuanya tanpa harus menelepon satu per satu.</p>

<p>Itulah yang kami kerjakan setiap hari untuk ratusan perusahaan di Indonesia. Jaringan kami mencakup seluruh 34 provinsi, via darat (truk box, wingbox, trailer, kendaraan berpendingin), laut (kontainer FCL dan LCL ke pelabuhan Makassar, Balikpapan, Jayapura, Ambon, Sorong), dan udara (ke seluruh bandara komersial). Mau kirim satu paket atau satu truk penuh, kami punya solusinya.</p>

<p>Yang membedakan kami: Anda punya satu account manager yang tahu persis situasi pengiriman Anda. Bukan call center, tapi orang yang bisa Anda hubungi langsung. Ditambah tracking real-time di setiap titik, dan tim operasional di 5 hub strategis (Jakarta, Surabaya, Medan, Makassar, Balikpapan) yang siap merespons kalau ada perubahan mendadak. Untuk pengiriman rutin, kami tawarkan kontrak dengan jadwal pickup tetap dan tarif yang sudah disepakati, supaya Anda bisa fokus ke bisnis, bukan logistik.</p>`,

    overview_en: `<p>Picture this: you have a client in Makassar who needs stock next week, a distributor in Medan waiting for a monthly shipment, and a retail store in Jayapura that just ran out of inventory. Everything has to arrive on time, in perfect condition, and you need to track it all without making a dozen phone calls.</p>

<p>That is what we do every day for hundreds of companies across Indonesia. Our network covers all 34 provinces via land (box trucks, wingbox trailers, flatbed trailers, refrigerated vehicles), sea (FCL and LCL containers to ports like Makassar, Balikpapan, Jayapura, Ambon, Sorong), and air (to every commercial airport in the country). Whether you are shipping a single parcel or a full truckload, we have the solution.</p>

<p>What sets us apart: you get one dedicated account manager who actually knows your shipping situation. Not a call center, but a real person you can reach directly. Add real-time tracking at every checkpoint, plus operations teams at 5 strategic hubs (Jakarta, Surabaya, Medan, Makassar, Balikpapan) ready to respond if anything changes. For recurring shipments, we offer contracts with fixed pickup schedules and agreed-upon rates, so you can focus on your business instead of logistics.</p>`,

    capabilities: [
      {
        title_id: "Air Freight (AF)",
        title_en: "Air Freight (AF)",
        description_id: "Pelanggan Anda butuh barangnya besok? Kirim via udara ke seluruh bandara komersial Indonesia. Paling sering dipakai untuk spare part mendesak, dokumen kontrak, dan barang bernilai tinggi.",
        description_en: "Your customer needs it tomorrow? Ship by air to any commercial airport in Indonesia. Most commonly used for urgent spare parts, contract documents, and high-value goods.",
        metric_id: "Transit 1-2 hari ke kota besar",
        metric_en: "1-2 day transit to major cities",
      },
      {
        title_id: "Full Container Load (FCL)",
        title_en: "Full Container Load (FCL)",
        description_id: "Volume besar, satu kontainer sendiri. Barang Anda tidak dicampur dengan siapapun. Tersedia 20' dan 40' (standar dan high-cube) untuk pengiriman antar pulau.",
        description_en: "Large volume, your own container. Your goods are not mixed with anyone else's. Available in 20' and 40' (standard and high-cube) for inter-island shipping.",
        metric_id: "20' & 40' HC tersedia",
        metric_en: "20' & 40' HC available",
      },
      {
        title_id: "Less than Container Load (LCL)",
        title_en: "Less than Container Load (LCL)",
        description_id: "Belum cukup banyak untuk satu kontainer? Tidak masalah. Kami konsolidasikan barang Anda dengan pengirim lain supaya biaya kirim tetap masuk akal.",
        description_en: "Not enough to fill a container? No problem. We consolidate your goods with other shippers so the shipping cost stays reasonable.",
        metric_id: "Konsolidasi mingguan",
        metric_en: "Weekly consolidation",
      },
      {
        title_id: "Full Truckload (FTL)",
        title_en: "Full Truckload (FTL)",
        description_id: "Satu truk khusus untuk Anda. Dari box truck 4 ton sampai trailer 32 ton, termasuk kendaraan berpendingin untuk cold chain. Langsung jemput, langsung antar, tanpa transit.",
        description_en: "A dedicated truck just for you. From 4-ton box trucks to 32-ton trailers, including refrigerated vehicles for cold chain. Picked up and delivered directly, no transit stops.",
        metric_id: "Armada dari 4 hingga 32 ton",
        metric_en: "Fleet from 4 to 32 tons",
      },
      {
        title_id: "Less than Truckload (LTL)",
        title_en: "Less than Truckload (LTL)",
        description_id: "Kiriman Anda tidak cukup satu truk penuh? Gabung dengan muatan lain di rute yang sama. Jadwal harian untuk Jawa, reguler untuk Sumatera dan rute utama lainnya.",
        description_en: "Your shipment does not fill a full truck? Share space with other cargo on the same route. Daily schedules for Java, regular runs for Sumatra and other main routes.",
        metric_id: "Jadwal harian rute Jawa",
        metric_en: "Daily schedule for Java routes",
      },
    ],

    process: [
      {
        number: "01",
        title_id: "Ceritakan Kebutuhan Anda",
        title_en: "Tell Us What You Need",
        description_id: "Hubungi kami, jelaskan mau kirim apa, ke mana, dan kapan. Kami carikan moda terbaik dan kasih penawaran harga. Biasanya dalam hitungan jam.",
        description_en: "Reach out, tell us what you are shipping, where, and when. We find the best mode and send you a quote. Usually within hours.",
      },
      {
        number: "02",
        title_id: "Kami Jemput di Tempat Anda",
        title_en: "We Pick Up at Your Location",
        description_id: "Armada kami datang ke gudang atau kantor Anda sesuai jadwal. Untuk pelanggan kontrak, pickup-nya otomatis tanpa perlu telepon lagi.",
        description_en: "Our fleet comes to your warehouse or office on schedule. For contract clients, pickups are automatic, no need to call each time.",
      },
      {
        number: "03",
        title_id: "Kami Sortir & Konsolidasi",
        title_en: "We Sort & Consolidate",
        description_id: "Di hub kami, barang disortir berdasarkan tujuan dan dimuat ke truk, kontainer, atau pesawat yang tepat. Proses ini yang bikin pengiriman efisien.",
        description_en: "At our hub, cargo is sorted by destination and loaded onto the right truck, container, or aircraft. This is what makes shipping efficient.",
      },
      {
        number: "04",
        title_id: "Anda Pantau dari HP",
        title_en: "You Track from Your Phone",
        description_id: "Setiap pengiriman punya nomor tracking. Anda bisa cek status real-time di portal kami. Atau tanya langsung ke account manager Anda.",
        description_en: "Every shipment gets a tracking number. Check real-time status on our portal. Or just ask your account manager directly.",
      },
      {
        number: "05",
        title_id: "Sampai & Terbukti",
        title_en: "Delivered & Confirmed",
        description_id: "Barang sampai di tujuan, penerima tanda tangan POD (Proof of Delivery), dan buktinya langsung tersedia secara digital di sistem kami.",
        description_en: "Cargo arrives at destination, recipient signs POD (Proof of Delivery), and the confirmation is immediately available digitally in our system.",
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
      challenge_id: "Sebuah perusahaan FMCG kehilangan pelanggan di Indonesia Timur karena pengiriman yang tidak konsisten. Produk mereka sensitif terhadap suhu, dan setiap keterlambatan berarti stok expired di toko.",
      challenge_en: "An FMCG company was losing customers in Eastern Indonesia due to inconsistent delivery. Their products were temperature-sensitive, and every delay meant expired stock on store shelves.",
      solution_id: "Kami rancang jadwal distribusi tetap: pickup terjadwal dari 3 gudang mereka, konsolidasi di hub Jakarta dan Surabaya, lalu kirim via darat (Jawa-Sumatera) dan laut (Indonesia Timur) dengan cold chain monitoring di setiap titik.",
      solution_en: "We designed a fixed distribution schedule: scheduled pickups from their 3 warehouses, consolidation at our Jakarta and Surabaya hubs, then delivery via land (Java-Sumatra) and sea (Eastern Indonesia) with cold chain monitoring at every point.",
      result_id: "Transit turun dari 5 hari jadi 3 hari. Kerusakan barang turun di bawah 0,1%. Dan yang paling penting, pelanggan mereka di 28 provinsi mulai pesan lebih banyak karena stok selalu tersedia.",
      result_en: "Transit dropped from 5 days to 3 days. Product damage fell below 0.1%. And most importantly, their customers across 28 provinces started ordering more because stock was always available.",
      display_quote_id: "Dari 5 hari jadi 3 hari ke 28 provinsi. Kerusakan nyaris nol. Pelanggan mereka mulai pesan lebih banyak.",
      display_quote_en: "From 5 days down to 3 across 28 provinces. Near-zero damage. Their customers started ordering more.",
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
        answer_id: "FTL (Full Truckload) berarti Anda menyewa seluruh kapasitas truk  - cocok untuk volume besar atau barang yang tidak boleh dicampur. LTL (Less than Truckload) mengkonsolidasikan barang Anda dengan pengirim lain di truk yang sama  - lebih hemat biaya untuk volume kecil-menengah. Kami merekomendasikan FTL jika volume Anda di atas 8 CBM atau 3 ton untuk rute yang sama.",
        answer_en: "FTL (Full Truckload) means you book the entire truck capacity  - suitable for large volumes or cargo that cannot be mixed. LTL (Less than Truckload) consolidates your goods with other shippers on the same truck  - more cost-effective for small to medium volumes. We recommend FTL if your volume exceeds 8 CBM or 3 tons for the same route.",
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
      title_id: "Distribusi Domestik ke 34 Provinsi  - UGC Logistics",
      title_en: "Domestic Distribution to 34 Provinces  - UGC Logistics",
      description_id: "Layanan distribusi domestik UGC Logistics mencakup pengiriman darat, laut, dan udara ke seluruh Indonesia. FTL, LTL, FCL, LCL, dan air freight dengan pelacakan real-time.",
      description_en: "UGC Logistics domestic distribution covers land, sea, and air shipments across Indonesia. FTL, LTL, FCL, LCL, and air freight with real-time tracking.",
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 02  - INTERNATIONAL FREIGHT FORWARDING
  // ═══════════════════════════════════════════════════════════════
  international: {
    key: "international",
    overview_id: `<p>Klien kami ada yang rutin ekspor komponen mesin ke 5 negara di Eropa. Ada yang impor bahan baku dari China setiap bulan. Ada juga yang baru pertama kali kirim barang ke luar negeri dan bingung mulai dari mana. Tiga situasi berbeda, tapi semuanya butuh satu hal yang sama: partner freight yang benar-benar paham rutenya.</p>

<p>Dengan lisensi IATA dan keanggotaan WCA (World Cargo Alliance), kami punya jaringan agen terverifikasi di 150+ negara. Artinya: di negara tujuan ada orang kami yang memastikan barang Anda tidak stuck. Untuk ekspor, kami urus semuanya dari pickup di gudang Anda, dokumen PEB, stuffing kontainer, sampai barang naik ke kapal atau pesawat. Untuk impor, kami koordinasi dengan agen asal supaya pengiriman tepat waktu (butuh handling sampai gudang Anda? Lihat layanan <a href="/id/layanan/import-dtd-kepabeanan">Import DTD & Kepabeanan</a> kami).</p>

<p>Yang sering bikin pusing soal pengiriman internasional itu bukan kirimnya, tapi dokumennya. HS Code, Letter of Credit, Certificate of Origin, incoterms (FOB, CIF, EXW, DDP). Tim kami mengurus ini setiap hari, jadi Anda tidak perlu jadi ahli perdagangan internasional. Anda mau kirim apa, ke mana, dan kapan. Sisanya kami yang pegang.</p>`,

    overview_en: `<p>One of our clients regularly exports machine components to 5 countries in Europe. Another imports raw materials from China every month. A third was shipping internationally for the first time and had no idea where to start. Three different situations, but all of them needed the same thing: a freight partner who genuinely knows the routes.</p>

<p>With our IATA license and WCA (World Cargo Alliance) membership, we have verified agents in 150+ countries. That means: there is someone on our side in the destination country making sure your cargo does not get stuck. For exports, we handle everything from pickup at your warehouse, export documentation (PEB), container stuffing, all the way to the cargo boarding the vessel or aircraft. For imports, we coordinate with origin agents for timely shipping (need handling all the way to your warehouse? See our <a href="/en/services/import-dtd-customs">Import DTD & Customs</a> service).</p>

<p>The headache with international shipping is rarely the shipping itself. It is the paperwork. HS Codes, Letters of Credit, Certificates of Origin, incoterms (FOB, CIF, EXW, DDP). Our team processes these daily, so you do not need to become an international trade expert. Just tell us what you are shipping, where, and when. We take care of the rest.</p>`,

    capabilities: [
      {
        title_id: "Air Freight  - Ekspor & Impor",
        title_en: "Air Freight  - Export & Import",
        description_id: "Pengiriman kargo udara internasional melalui maskapai penerbangan komersial dan kargo. Termasuk handling untuk general cargo, perishable, dan dangerous goods.",
        description_en: "International air cargo shipments via commercial and cargo airlines. Includes handling for general cargo, perishables, and dangerous goods.",
        metric_id: "Koneksi ke 150+ negara",
        metric_en: "Connected to 150+ countries",
      },
      {
        title_id: "Ocean Freight  - FCL",
        title_en: "Ocean Freight  - FCL",
        description_id: "Pengiriman kontainer penuh via laut untuk volume besar. Tersedia kontainer 20', 40' standar, 40' high-cube, open-top, dan flat-rack untuk kargo khusus.",
        description_en: "Full container shipments via ocean for large volumes. Available in 20', 40' standard, 40' high-cube, open-top, and flat-rack containers for special cargo.",
        metric_id: "Semua tipe kontainer tersedia",
        metric_en: "All container types available",
      },
      {
        title_id: "Ocean Freight  - LCL",
        title_en: "Ocean Freight  - LCL",
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
        description_id: "Kami mempelajari detail pengiriman Anda  - jenis barang, volume, negara tujuan/asal, incoterms  - untuk menentukan moda dan rute optimal.",
        description_en: "We review your shipment details  - cargo type, volume, destination/origin country, incoterms  - to determine the optimal mode and route.",
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
        description_id: "Kargo dalam perjalanan dipantau secara aktif. Update status diberikan di setiap milestone  - loading, departure, transshipment, arrival.",
        description_en: "Cargo in transit is actively monitored. Status updates provided at every milestone  - loading, departure, transshipment, arrival.",
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
      challenge_id: "Produsen komponen mesin ini ekspor ke 5 negara, tapi setiap pengiriman diarrange terpisah. Hasilnya: lead time panjang, biaya freight tinggi, dan pelanggan di luar negeri komplain karena jadwal produksi mereka terganggu.",
      challenge_en: "This machine component manufacturer exported to 5 countries, but every shipment was arranged separately. Result: long lead times, high freight costs, and overseas customers complaining about disrupted production schedules.",
      solution_id: "Kami susun jadwal konsolidasi LCL mingguan ke 3 pelabuhan utama dan FCL bulanan ke 2 tujuan bervolume tinggi. Semua dokumen ekspor kami kelola terpusat, dan agen di setiap negara tujuan sudah kami briefing.",
      solution_en: "We built a weekly LCL consolidation schedule to 3 major ports and monthly FCL bookings to 2 high-volume destinations. All export documentation managed centrally, with destination agents fully briefed.",
      result_id: "Lead time turun 30%. Biaya freight turun 18%. Dan pelanggan mereka di luar negeri berhenti komplain karena suku cadang selalu datang tepat waktu.",
      result_en: "Lead time dropped 30%. Freight costs fell 18%. And their overseas customers stopped complaining because parts always arrived on schedule.",
      display_quote_id: "Lead time turun 30%, biaya freight turun 18%. Pelanggan mereka di 5 negara berhenti komplain.",
      display_quote_en: "Lead time down 30%, freight costs down 18%. Their customers in 5 countries stopped complaining.",
    },

    faq: [
      {
        question_id: "Apa perbedaan FCL dan LCL untuk pengiriman laut internasional?",
        question_en: "What is the difference between FCL and LCL for international ocean freight?",
        answer_id: "FCL (Full Container Load) berarti Anda menyewa seluruh kontainer  - barang Anda tidak dicampur dengan pengirim lain. LCL (Less than Container Load) mengkonsolidasikan barang Anda dengan kargo pengirim lain di kontainer yang sama. FCL lebih cepat (tidak perlu menunggu konsolidasi) dan lebih aman untuk barang sensitif, sedangkan LCL lebih hemat biaya untuk volume di bawah 15 CBM.",
        answer_en: "FCL (Full Container Load) means you book the entire container  - your goods are not mixed with other shippers. LCL (Less than Container Load) consolidates your goods with other shippers' cargo in the same container. FCL is faster (no consolidation wait) and safer for sensitive goods, while LCL is more cost-effective for volumes under 15 CBM.",
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
        answer_id: "Ya, kami menangani pengiriman dangerous goods via udara dan laut sesuai regulasi IATA DGR dan IMDG Code. Ini mencakup klasifikasi DG yang benar, pengemasan sesuai standar, labeling, dan dokumentasi DG declaration. Tidak semua kelas DG dapat dikirim via udara  - tim kami akan mengkonfirmasi kelayakan dan moda yang tepat.",
        answer_en: "Yes, we handle dangerous goods shipments via air and ocean in compliance with IATA DGR and IMDG Code regulations. This includes correct DG classification, standards-compliant packaging, labeling, and DG declaration documentation. Not all DG classes can be shipped by air  - our team will confirm feasibility and the appropriate mode.",
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
      title_id: "Freight Forwarding Internasional  - Ekspor & Impor via Udara & Laut  - UGC Logistics",
      title_en: "International Freight Forwarding  - Export & Import via Air & Ocean  - UGC Logistics",
      description_id: "Layanan freight forwarding internasional UGC Logistics ke 150+ negara. FCL, LCL, air freight, dangerous goods handling. Anggota IATA dan WCA.",
      description_en: "UGC Logistics international freight forwarding to 150+ countries. FCL, LCL, air freight, dangerous goods handling. IATA and WCA member.",
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 03  - IMPORT DTD & CUSTOMS CLEARANCE
  // ═══════════════════════════════════════════════════════════════
  "import-dtd": {
    key: "import-dtd",
    overview_id: `<p>Anda tahu yang paling bikin stres soal impor? Bukan menunggu kapalnya. Tapi menunggu barang keluar dari pelabuhan. HS Code salah? Kena denda. Izin kurang? Barang ditahan berminggu-minggu. Bea masuk dihitung lebih? Uang Anda yang terbuang. Ini bukan teori, ini yang kami lihat terjadi pada importir yang mencoba urus sendiri.</p>

<p>Tim kepabeanan kami sudah menangani ribuan PIB (Pemberitahuan Impor Barang). Kami tahu persis HS Code mana yang sering jadi masalah, izin apa yang dibutuhkan untuk produk farmasi (BPOM), elektronik (SNI), atau barang tertentu (izin Kemendag), dan bagaimana menghitung bea masuk supaya Anda tidak overpay. Belum punya API? Kami sediakan layanan undername import.</p>

<p>Yang kami janjikan: dari pintu supplier di luar negeri sampai pintu gudang Anda, satu orang yang pegang. Supplier di China dispatch barang? Kami yang koordinasi. Barang kena jalur merah di pelabuhan? Tim kami yang dampingi pemeriksaan fisiknya langsung. Kami beroperasi di Tanjung Priok, Tanjung Perak, Belawan, Soekarno-Hatta, dan pelabuhan lain sesuai kebutuhan. Setiap tahap ada update status, jadi Anda selalu tahu barang ada di mana.</p>`,

    overview_en: `<p>You know what is most stressful about importing? It is not waiting for the ship. It is waiting for your goods to clear the port. Wrong HS Code? You get fined. Missing permit? Your cargo sits for weeks. Overpaid duties? That is money you will never get back. This is not theory. This is what we see happen to importers who try to handle it themselves.</p>

<p>Our customs team has processed thousands of PIB (Import Declarations). We know exactly which HS Codes cause problems, what permits are needed for pharmaceuticals (BPOM), electronics (SNI), or regulated goods (Ministry of Trade), and how to calculate duties so you do not overpay. Do not have an API (Importer Identification Number) yet? We offer undername import services.</p>

<p>Our promise: from your supplier's door overseas to your warehouse door in Indonesia, one person owns the entire process. Supplier in China dispatches goods? We coordinate it. Cargo gets assigned red lane at the port? Our team is there in person for the physical inspection. We operate at Tanjung Priok, Tanjung Perak, Belawan, Soekarno-Hatta, and other ports as needed. Every step comes with a status update, so you always know where your goods are.</p>`,

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
      challenge_id: "Importir farmasi ini impor bahan baku obat dari India dan China. Masalahnya: izin BPOM lama, barang harus cold chain, dan setiap hari keterlambatan berarti lini produksi mereka berhenti. Sebelumnya, rata-rata 28 hari dari supplier sampai gudang.",
      challenge_en: "This pharmaceutical importer brought in drug raw materials from India and China. The problem: BPOM permits took forever, goods needed cold chain, and every day of delay meant their production line stopped. Previously, it took an average of 28 days from supplier to warehouse.",
      solution_id: "Kami mulai urus dokumen clearance dan izin BPOM selagi barang masih di perjalanan, bukan setelah barang sampai. Kontainer reefer untuk jaga suhu. Dan yang paling penting: kami pastikan klasifikasi HS Code-nya tepat supaya mereka tidak bayar bea masuk lebih dari seharusnya.",
      solution_en: "We started processing clearance documents and BPOM permits while goods were still in transit, not after arrival. Reefer containers for temperature control. And most importantly: we ensured accurate HS Code classification so they would not overpay on import duties.",
      result_id: "28 hari jadi 18 hari. Selama 12 bulan berturut-turut, tidak ada satu pun shipment yang stuck di pelabuhan lebih dari 48 jam. Lini produksi mereka tidak pernah berhenti lagi karena keterlambatan bahan baku.",
      result_en: "28 days down to 18 days. For 12 consecutive months, not a single shipment was held at port for more than 48 hours. Their production line never stopped again due to raw material delays.",
      display_quote_id: "28 hari jadi 18 hari. 12 bulan tanpa satu pun shipment tertahan. Produksi tidak pernah terganggu lagi.",
      display_quote_en: "28 days down to 18. 12 months with zero port delays. Production never disrupted again.",
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
        answer_id: "Ya. Tim kepabeanan kami berpengalaman menangani kasus barang tertahan  - baik karena masalah dokumen, klasifikasi HS Code, maupun perizinan. Kami mendampingi proses klarifikasi dengan pihak Bea Cukai, membantu menyiapkan dokumen tambahan yang diperlukan, dan bekerja untuk mendapatkan release secepat mungkin. Untuk barang yang sudah dalam penanganan forwarder lain, kami juga bisa mengambil alih proses clearance.",
        answer_en: "Yes. Our customs team has experience handling detained cargo cases  - whether due to documentation issues, HS Code classification, or permit problems. We accompany the clarification process with Customs authorities, help prepare additional required documents, and work to secure release as quickly as possible. For goods already handled by another forwarder, we can also take over the clearance process.",
      },
    ],

    relatedServices: ["international", "domestic"],

    seo: {
      title_id: "Import Door-to-Door & Customs Clearance Indonesia  - UGC Logistics",
      title_en: "Import Door-to-Door & Customs Clearance Indonesia  - UGC Logistics",
      description_id: "Layanan import DTD dan kepabeanan UGC Logistics. Customs clearance, perizinan BPOM/SNI, undername import, dan pengiriman dari negara asal ke gudang Anda.",
      description_en: "UGC Logistics import DTD and customs clearance services. Customs clearance, BPOM/SNI permits, undername import, and delivery from origin country to your warehouse.",
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 04  - BLOCKSPACE & AIRCRAFT CHARTER
  // ═══════════════════════════════════════════════════════════════
  charter: {
    key: "charter",
    overview_id: `<p>Ceritanya selalu mirip: pabrik Anda shutdown karena satu komponen mesin rusak. Suku cadang ada di Jakarta, tapi site Anda di Timika. Penerbangan kargo reguler? Kapasitasnya tidak cukup, jadwalnya tidak cocok. Setiap jam yang lewat, kerugiannya bertambah. Di sinilah kami masuk.</p>

<p>Blockspace berarti kami sudah mengamankan ruang kargo di penerbangan reguler secara kontraktual. Jadi di rute-rute padat, kapasitas Anda sudah terjamin tanpa harus sewa seluruh pesawat. Tapi kalau volumenya besar atau rutenya tidak dilayani penerbangan reguler, kami arrangekan charter pesawat penuh. Mulai dari turboprop (5-8 ton) untuk rute pendek, sampai B747F (100+ ton) untuk volume masif. Klien tambang kami pernah butuh kirim komponen crusher 12 ton ke Timika, dan kami atur charter B737F dalam 6 jam setelah telepon pertama.</p>

<p>Kami urus semuanya: negosiasi tarif operator, slot bandara, izin penerbangan khusus, ground handling di kedua sisi, dan monitoring real-time dari loading sampai unloading. Layanan ini sering dikombinasikan dengan <a href="/id/layanan/kargo-proyek">Kargo Proyek</a> kami kalau barangnya perlu handling khusus di darat setelah mendarat.</p>`,

    overview_en: `<p>The story is always similar: your factory is shut down because one machine component broke. The replacement part is in Jakarta, but your site is in Timika. Regular cargo flights? Not enough capacity, wrong schedule. Every hour that passes, the losses add up. This is where we come in.</p>

<p>Blockspace means we have already secured cargo space on regular flights through contracts with airlines. So on high-demand routes, your capacity is guaranteed without chartering an entire aircraft. But when the volume is large or the route is not served by regular flights, we arrange a full aircraft charter. From turboprops (5-8 tons) for short routes to B747F (100+ tons) for massive volumes. One of our mining clients needed to send a 12-ton crusher component to Timika, and we arranged a B737F charter within 6 hours of the first phone call.</p>

<p>We handle everything: operator rate negotiation, airport slots, special flight permits, ground handling on both ends, and real-time monitoring from loading to unloading. This service is frequently combined with our <a href="/en/services/project-cargo">Project Cargo</a> service when cargo needs specialized ground handling after landing.</p>`,

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
        description_id: "Pengiriman darurat dan Aircraft on Ground (AOG)  - prioritas tertinggi untuk suku cadang pesawat, mesin pabrik, atau komponen kritis lainnya.",
        description_en: "Emergency and Aircraft on Ground (AOG) shipments  - top priority for aircraft spare parts, factory machinery, or other critical components.",
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
      challenge_id: "Crusher di site tambang Papua tiba-tiba rusak. Produksi berhenti total. Kerugiannya? Rp 2 miliar per hari. Komponen pengganti seberat 12 ton ada di Jakarta, tapi tidak ada penerbangan kargo reguler yang kapasitasnya cukup ke Timika.",
      challenge_en: "The crusher at a Papua mining site suddenly broke. Production halted completely. The cost? IDR 2 billion per day in losses. A 12-ton replacement component sat in Jakarta, but no regular cargo flight to Timika had enough capacity.",
      solution_id: "Enam jam setelah telepon pertama, pesawat B737F sudah di-booking. Tim kami urus ground handling di kedua bandara dan transportasi darat dari bandara Timika ke lokasi tambang.",
      solution_en: "Six hours after the first phone call, a B737F was booked. Our team arranged ground handling at both airports and overland transport from Timika airport to the mine site.",
      result_id: "Komponen sampai di site dalam 36 jam, 12 jam lebih cepat dari deadline. Pabrik kembali beroperasi, dan klien menghindari kerugian miliaran rupiah.",
      result_en: "The component reached the site in 36 hours, 12 hours ahead of the deadline. The plant was back up, and the client avoided billions in losses.",
      display_quote_id: "Telepon jam 8 pagi. Pesawat B737F ter-booking jam 2 siang. Komponen 12 ton sampai di Papua dalam 36 jam.",
      display_quote_en: "Call at 8 AM. B737F booked by 2 PM. 12-ton component delivered to Papua in 36 hours.",
    },

    faq: [
      {
        question_id: "Berapa berat minimum untuk bisa menggunakan layanan charter?",
        question_en: "What is the minimum weight for charter services?",
        answer_id: "Tidak ada berat minimum absolut  - charter didasarkan pada kebutuhan, bukan hanya berat. Namun secara ekonomis, charter biasanya layak jika volume Anda melebihi 3-5 ton atau jika urgency mengharuskan pengiriman di luar jadwal penerbangan reguler. Untuk volume di bawah itu, blockspace pada penerbangan reguler biasanya lebih cost-effective.",
        answer_en: "There is no absolute minimum weight  - charters are based on need, not just weight. However, economically, a charter is typically viable when your volume exceeds 3-5 tons or when urgency requires shipping outside regular flight schedules. For volumes below that, blockspace on regular flights is usually more cost-effective.",
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
      title_id: "Blockspace & Charter Pesawat Kargo  - UGC Logistics",
      title_en: "Blockspace & Aircraft Charter  - UGC Logistics",
      description_id: "Layanan blockspace dan charter pesawat kargo UGC Logistics. Kapasitas terjamin, charter darurat, pengiriman ke bandara terpencil. Dari 5 hingga 100+ ton.",
      description_en: "UGC Logistics blockspace and cargo aircraft charter services. Guaranteed capacity, emergency charters, delivery to remote airports. From 5 to 100+ tons.",
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 05  - WAREHOUSING & FULFILLMENT 3PL
  // ═══════════════════════════════════════════════════════════════
  warehouse: {
    key: "warehouse",
    overview_id: `<p>Kalau Anda jualan di Tokopedia, Shopee, dan Lazada sekaligus, Anda pasti tahu pusingnya: stok harus sinkron di 3 platform, order harus diproses same-day, dan satu kesalahan picking bisa berujung retur dan review buruk. Salah satu klien kami pernah di posisi ini. Sekarang, semua fulfillment-nya jalan otomatis dari gudang kami.</p>

<p>Begini cara kerjanya: barang Anda masuk ke gudang kami, dicek kualitasnya, dan dicatat di WMS (Warehouse Management System) yang langsung terhubung ke marketplace dan sistem Anda. Order masuk otomatis dari Tokopedia, Shopee, atau Lazada. Tim gudang kami pick, pack, label, dan serahkan ke kurir. Anda tidak perlu sentuh satu kardus pun. Untuk order B2B, kami juga handle muat truk dan distribusi langsung.</p>

<p>Gudang kami di Jakarta dilengkapi sistem zonasi: barang consumer electronics terpisah dari FMCG, produk yang butuh suhu terkontrol punya area sendiri. Picking accuracy kami 99.7% (itu artinya dari 1000 order, rata-rata hanya 3 yang salah). Dan karena gudang kami terintegrasi langsung dengan layanan <a href="/id/layanan/distribusi-domestik">Distribusi Domestik</a>, barang bisa langsung didistribusikan ke seluruh Indonesia tanpa perlu pindah-pindah gudang.</p>`,

    overview_en: `<p>If you sell on multiple marketplaces, you know the pain: inventory has to sync across platforms, orders need same-day processing, and one picking mistake leads to returns and bad reviews. One of our clients was stuck in exactly this situation. Now, their entire fulfillment runs automatically from our warehouse.</p>

<p>Here is how it works: your goods arrive at our warehouse, get quality-checked, and are logged into our WMS (Warehouse Management System) which connects directly to your marketplaces and systems. Orders flow in automatically from Tokopedia, Shopee, Lazada, or wherever you sell. Our warehouse team picks, packs, labels, and hands off to the courier. You do not need to touch a single box. For B2B orders, we also handle truck loading and direct distribution.</p>

<p>Our Jakarta warehouse uses a zoning system: consumer electronics are separated from FMCG, temperature-sensitive products have their own area. Our picking accuracy is 99.7% (that means out of 1,000 orders, only about 3 have errors on average). And because our warehouse integrates directly with our <a href="/en/services/domestic-distribution">Domestic Distribution</a> service, goods can be distributed across Indonesia without needing to move between warehouses.</p>`,

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
      challenge_id: "Brand e-commerce ini jualan di 4 marketplace sekaligus. Masalahnya: stok sering overselling, order diproses 48 jam, dan 3 dari 100 paket isinya salah. Review buruk mulai menumpuk, dan retur naik terus.",
      challenge_en: "This e-commerce brand sold on 4 marketplaces simultaneously. The problem: frequent overselling, 48-hour order processing, and 3 out of every 100 packages shipped with wrong items. Bad reviews piled up, and returns kept climbing.",
      solution_id: "Kami pindahkan semua stok ke gudang kami, hubungkan WMS langsung ke 4 marketplace mereka, dan terapkan barcode scanning di setiap tahap pick-and-pack. Order masuk otomatis, diproses tanpa sentuhan manual.",
      solution_en: "We moved all their inventory to our warehouse, connected our WMS directly to their 4 marketplaces, and implemented barcode scanning at every pick-and-pack stage. Orders flow in automatically, processed without manual intervention.",
      result_id: "Kesalahan picking turun dari 3.2% jadi 0.3%. Semua order sebelum jam 2 siang diproses same-day. Retur karena salah kirim turun 85%. Dan pemiliknya akhirnya bisa fokus ke marketing, bukan packing.",
      result_en: "Picking errors dropped from 3.2% to 0.3%. Every order before 2 PM ships same-day. Returns from wrong shipments fell 85%. And the owner finally had time to focus on marketing instead of packing.",
      display_quote_id: "Dari 48 jam jadi same-day. Kesalahan turun 90%. Pemiliknya sekarang fokus ke marketing, bukan packing.",
      display_quote_en: "From 48 hours to same-day. Errors down 90%. The owner now focuses on marketing, not packing.",
    },

    faq: [
      {
        question_id: "Berapa kapasitas gudang yang tersedia?",
        question_en: "How much warehouse capacity is available?",
        answer_id: "Kapasitas bervariasi dan kami mengalokasikan area sesuai kebutuhan klien  - bisa mulai dari 50 pallet position untuk volume kecil hingga ribuan posisi untuk operasi besar. Hubungi kami untuk diskusi kebutuhan spesifik Anda dan kami akan memberikan opsi yang sesuai.",
        answer_en: "Capacity varies and we allocate space according to client needs  - starting from 50 pallet positions for small volumes to thousands of positions for large operations. Contact us to discuss your specific needs and we'll provide suitable options.",
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
      title_id: "Pergudangan & Fulfillment 3PL  - WMS Terintegrasi  - UGC Logistics",
      title_en: "Warehousing & 3PL Fulfillment  - Integrated WMS  - UGC Logistics",
      description_id: "Layanan pergudangan dan fulfillment 3PL UGC Logistics. WMS terintegrasi, pick-and-pack, e-commerce fulfillment, manajemen inventaris real-time.",
      description_en: "UGC Logistics warehousing and 3PL fulfillment services. Integrated WMS, pick-and-pack, e-commerce fulfillment, real-time inventory management.",
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 06  - PROJECT CARGO & HEAVY DUTY
  // ═══════════════════════════════════════════════════════════════
  "project-cargo": {
    key: "project-cargo",
    overview_id: `<p>Forwarder biasa menolak barang Anda karena terlalu berat, terlalu besar, atau terlalu ribet? Itu justru spesialisasi kami. Transformator 85 ton, boiler pembangkit listrik, tower section telekomunikasi, pipa 20 meter. Kalau forwarder standar bilang "tidak bisa", kemungkinan besar kami bisa.</p>

<p>Setiap pengiriman project cargo dimulai dari survei rute yang detail: tim kami cek langsung kondisi jalan, kapasitas setiap jembatan di rute, radius belokan, overhead clearance, dan semua kendala fisik yang mungkin terjadi. Salah satu proyek kami melibatkan 3 unit transformator 85 ton dari Tanjung Priok ke Jawa Barat. Kami menemukan 4 jembatan yang kapasitasnya kurang, dan menyiapkan solusi bypass untuk masing-masing. Ketiga transformator sampai tanpa kerusakan, 5 hari lebih cepat dari target.</p>

<p>Kami urus semua yang Anda tidak mau pusing: izin muatan khusus dari Dishub, escort polisi, izin tol dan pelabuhan, sewa crane sampai 500 ton untuk loading dan unloading. Tim kami sudah terbiasa beroperasi di lokasi tambang terpencil, site pembangkit listrik, dan proyek konstruksi di seluruh Indonesia. Butuh komponen diterbangkan dulu sebelum ditransportasikan darat? Kombinasikan dengan layanan <a href="/id/layanan/blockspace-charter">Blockspace & Charter</a> kami.</p>`,

    overview_en: `<p>Other forwarders turn down your cargo because it is too heavy, too big, or too complicated? That is exactly our specialty. 85-ton transformers, power plant boilers, telecom tower sections, 20-meter pipes. If a standard forwarder says "we cannot do it," chances are we can.</p>

<p>Every project cargo shipment starts with a detailed route survey: our team physically checks road conditions, bridge capacities along the route, turning radii, overhead clearances, and every possible physical constraint. One of our projects involved 3 transformer units weighing 85 tons each, from Tanjung Priok to West Java. We found 4 bridges with insufficient capacity and prepared bypass solutions for each one. All three transformers arrived undamaged, 5 days ahead of schedule.</p>

<p>We handle everything you do not want to deal with: special load permits from the Department of Transportation, police escorts, toll road and port authorizations, crane rental up to 500 tons for loading and unloading. Our team routinely operates at remote mining sites, power plant locations, and construction projects across Indonesia. Need the component flown in first before ground transport? Combine this with our <a href="/en/services/blockspace-charter">Blockspace & Charter</a> service.</p>`,

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
        description_id: "Kombinasi moda transportasi  - laut (tongkang, vessel), darat (lowbed, hydraulic trailer), dan udara (charter)  - untuk pengiriman proyek yang kompleks.",
        description_en: "Combined transport modes  - sea (barge, vessel), land (lowbed, hydraulic trailer), and air (charter)  - for complex project shipments.",
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
        description_id: "Berdasarkan survei, kami menyusun rencana transportasi detail  - pemilihan alat angkut, konfigurasi securing, jadwal, dan contingency plan.",
        description_en: "Based on the survey, we develop a detailed transport plan  - equipment selection, securing configuration, schedule, and contingency planning.",
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
      challenge_id: "Tiga transformator, masing-masing 85 ton, harus sampai dari Tanjung Priok ke site pembangkit di Jawa Barat. Masalahnya: rute melewati jalan provinsi dengan beberapa jembatan yang kapasitasnya di bawah 85 ton. Forwarder sebelumnya mundur setelah melihat rutenya.",
      challenge_en: "Three transformers, 85 tons each, had to get from Tanjung Priok port to a power plant site in West Java. The problem: the route crossed provincial roads with several bridges rated below 85 tons. The previous forwarder backed out after seeing the route.",
      solution_id: "Tim kami survei rute 2 minggu, temukan 4 jembatan bermasalah, dan siapkan solusi bypass untuk masing-masing. Pakai multi-axle hydraulic trailer untuk distribusi beban, urus izin dari 3 kabupaten, dan koordinasi escort polisi untuk 3 trip pengiriman malam.",
      solution_en: "Our team spent 2 weeks surveying the route, found 4 problematic bridges, and prepared bypass solutions for each. Used multi-axle hydraulic trailers to distribute the load, secured permits from 3 districts, and coordinated police escorts for 3 overnight delivery trips.",
      result_id: "Ketiga transformator sampai tanpa goresan, 5 hari lebih cepat dari jadwal commissioning. Forwarder yang mundur tadi sekarang merujuk klien project cargo-nya ke kami.",
      result_en: "All three transformers arrived without a scratch, 5 days ahead of the commissioning schedule. The forwarder who backed out now refers their project cargo clients to us.",
      display_quote_id: "3 x 85 ton. 4 jembatan bermasalah. Forwarder lain mundur. Kami selesaikan 5 hari lebih cepat.",
      display_quote_en: "3 x 85 tons. 4 problematic bridges. Other forwarder backed out. We finished 5 days early.",
    },

    faq: [
      {
        question_id: "Berapa dimensi dan berat maksimum yang bisa ditangani?",
        question_en: "What are the maximum dimensions and weight you can handle?",
        answer_id: "Secara teknis tidak ada batas absolut  - kami menyesuaikan solusi dengan kebutuhan. Kami rutin menangani kargo hingga 200+ ton per unit via darat. Untuk berat lebih dari itu, kami menggunakan modular transporter yang kapasitasnya bisa dikonfigurasi. Dimensi tergantung pada rute  - kami melakukan survei untuk menentukan feasibility.",
        answer_en: "There is technically no absolute limit  - we tailor solutions to requirements. We routinely handle cargo up to 200+ tons per unit via road. For heavier loads, we use modular transporters with configurable capacity. Dimensions depend on the route  - we conduct surveys to determine feasibility.",
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
      title_id: "Project Cargo & Heavy Lift Indonesia  - Kargo Berat & Oversize  - UGC Logistics",
      title_en: "Project Cargo & Heavy Lift Indonesia  - Heavy & Oversized Cargo  - UGC Logistics",
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
