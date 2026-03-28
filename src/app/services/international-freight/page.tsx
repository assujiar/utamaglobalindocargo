import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import type { SubService } from "@/components/services/ServicePageLayout";

export const metadata: Metadata = {
  title: "International Freight Forwarding | Utama Globalindo Cargo",
  description:
    "Ekspor dan impor via laut dan udara: FCL, LCL, dan Airfreight untuk rute internasional.",
};

const subServices: SubService[] = [
  {
    name: "FCL Export",
    shortName: "FCL Export",
    description:
      "Pengiriman kontainer penuh dari Indonesia ke negara tujuan. Kami urus dari booking space di shipping line, koordinasi stuffing di gudang atau pabrik Anda, dokumentasi ekspor, sampai barang berangkat dari pelabuhan asal.",
    keyPoints: [
      "Booking space di berbagai shipping line untuk tarif dan jadwal terbaik",
      "Koordinasi stuffing di lokasi Anda atau di gudang kami",
      "Pengurusan dokumen ekspor: PEB, Invoice, Packing List, CoO, dll.",
      "Kontainer 20ft, 40ft, 40ft HC, reefer, open top, flat rack",
      "Monitoring shipment dari pelabuhan asal sampai tujuan",
    ],
    bestFor: [
      "Eksportir komoditas (CPO, karet, batu bara, nikel, dll.)",
      "Manufaktur yang ekspor produk jadi ke pasar internasional",
      "Perusahaan furniture, tekstil, atau consumer goods dengan buyer luar negeri",
      "Pengiriman volume besar yang perlu kontainer eksklusif",
    ],
  },
  {
    name: "LCL Export",
    shortName: "LCL Export",
    description:
      "Ekspor dengan volume kurang dari satu kontainer. Muatan Anda dikonsolidasikan di CFS bersama eksportir lain yang menuju negara/pelabuhan tujuan sama. Biaya lebih efisien dibanding booking satu kontainer penuh.",
    keyPoints: [
      "Minimum volume mulai dari 1 CBM",
      "Konsolidasi di CFS Jakarta, Surabaya, dan pelabuhan utama lainnya",
      "Jadwal sailing reguler ke port-port utama Asia, Eropa, Amerika",
      "Dokumentasi ekspor ditangani lengkap",
      "Tracking dari CFS asal sampai CFS tujuan",
    ],
    bestFor: [
      "Eksportir baru yang volume-nya belum cukup satu kontainer",
      "Pengiriman sampel atau trial order ke buyer baru",
      "UKM ekspor yang kirim ke beberapa negara dalam volume kecil",
      "Perusahaan yang ekspornya musiman atau tidak reguler",
    ],
  },
  {
    name: "Airfreight Export",
    shortName: "AF Export",
    description:
      "Ekspor via udara untuk barang yang sensitif waktu atau bernilai tinggi. Transit time biasanya 2-5 hari tergantung tujuan. Kami koordinasi dari pickup, packaging sesuai standar IATA, dokumentasi, sampai barang diterima di bandara tujuan.",
    keyPoints: [
      "Akses ke airline cargo utama dari bandara Soekarno-Hatta dan lainnya",
      "Opsi direct flight atau transit sesuai urgensi dan budget",
      "Packaging sesuai standar IATA untuk kargo udara",
      "Pengurusan dokumen: AWB, PEB, dan sertifikat yang diperlukan",
      "Door-to-airport atau door-to-door (dengan agent di negara tujuan)",
    ],
    bestFor: [
      "Produk fashion atau seasonal yang harus sampai sebelum deadline",
      "Spare part atau komponen untuk menghindari downtime di pabrik klien",
      "Barang elektronik, farmasi, atau perishable bernilai tinggi",
      "Pengiriman dokumen atau sampel urgent ke partner bisnis di luar negeri",
    ],
  },
  {
    name: "FCL Import",
    shortName: "FCL Import",
    description:
      "Impor kontainer penuh dari negara asal ke Indonesia. Kami koordinasi dengan shipper di luar negeri, monitor perjalanan kontainer, dan pastikan semua dokumen siap untuk proses customs di Indonesia.",
    keyPoints: [
      "Koordinasi booking dan pickup dengan shipper di negara asal",
      "Monitoring real-time posisi kontainer selama perjalanan",
      "Persiapan dokumen impor sebelum kapal tiba (pre-clearance)",
      "Koordinasi dengan customs broker untuk proses di pelabuhan Indonesia",
      "Delivery dari pelabuhan ke gudang atau pabrik Anda",
    ],
    bestFor: [
      "Importir bahan baku untuk manufaktur (baja, plastik, kimia, dll.)",
      "Perusahaan retail yang impor barang jadi dari China, Korea, Eropa",
      "Distributor mesin atau peralatan industri",
      "Importir reguler yang butuh jadwal dan koordinasi yang konsisten",
    ],
  },
  {
    name: "LCL Import",
    shortName: "LCL Import",
    description:
      "Impor dengan volume kurang dari satu kontainer. Barang Anda dikonsolidasikan di CFS negara asal, dikirim bersama muatan lain, lalu dipisahkan kembali di CFS Indonesia untuk Anda ambil atau kami antarkan.",
    keyPoints: [
      "Minimum volume mulai dari 1 CBM",
      "Konsolidasi di CFS negara asal, deconsolidation di CFS Indonesia",
      "Rute reguler dari port-port utama: Shanghai, Ningbo, Busan, Singapore, dll.",
      "Biaya per CBM lebih rendah dibanding booking kontainer penuh",
      "Bisa dikombinasikan dengan layanan customs brokerage kami",
    ],
    bestFor: [
      "Importir kecil-menengah yang belum butuh satu kontainer penuh",
      "Perusahaan yang impor dari beberapa supplier berbeda di satu negara",
      "Trial import untuk produk atau supplier baru",
      "Stok refill atau re-order yang volumenya tidak tetap",
    ],
  },
  {
    name: "Airfreight Import",
    shortName: "AF Import",
    description:
      "Impor via udara untuk kebutuhan mendesak atau barang bernilai tinggi. Dari bandara asal, transit, sampai tiba di Indonesia dan siap diambil atau dikirim ke lokasi Anda.",
    keyPoints: [
      "Transit time 2-5 hari dari sebagian besar negara asal",
      "Koordinasi pickup dari supplier di negara asal (jika diperlukan)",
      "Pengurusan dokumen: AWB, Invoice, Packing List, izin impor",
      "Proses customs di bandara Indonesia",
      "Delivery dari bandara ke lokasi Anda",
    ],
    bestFor: [
      "Impor spare part urgent untuk menghindari downtime produksi",
      "Barang elektronik atau farmasi yang sensitif waktu",
      "Dokumen penting atau sampel yang dibutuhkan segera",
      "Pre-launch product yang harus tiba sebelum tanggal tertentu",
    ],
  },
];

export default function InternationalFreightPage() {
  return (
    <ServicePageLayout
      label="International Freight Forwarding"
      title="Ekspor. Impor."
      titleAccent="Laut dan Udara."
      intro="Enam opsi pengiriman internasional yang mencakup ekspor dan impor via laut (FCL dan LCL) serta udara. Setiap mode punya karakteristik berbeda dari segi waktu, biaya, dan volume minimum. Pilih yang paling sesuai dengan situasi Anda."
      subServices={subServices}
    />
  );
}
