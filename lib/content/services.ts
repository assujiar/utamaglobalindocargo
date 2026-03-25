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

export function getServiceByKey(key: string): ServiceData | undefined {
  return services.find((s) => s.key === key);
}
