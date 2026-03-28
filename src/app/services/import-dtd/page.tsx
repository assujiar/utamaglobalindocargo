import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import type { SubService } from "@/components/services/ServicePageLayout";

export const metadata: Metadata = {
  title: "Import DTD & Customs Brokerage | Utama Globalindo Cargo",
  description:
    "Layanan impor door-to-door via laut dan udara, termasuk customs brokerage untuk pengurusan bea cukai di Indonesia.",
};

const subServices: SubService[] = [
  {
    name: "FCL Import Door-to-Door",
    shortName: "FCL DTD",
    description:
      "Impor kontainer penuh dari negara asal langsung sampai ke gudang atau pabrik Anda di Indonesia. Kami koordinasi semuanya: dari pickup di supplier, booking kapal, dokumen, customs clearance, sampai delivery ke lokasi Anda. Anda cukup terima barang.",
    keyPoints: [
      "Koordinasi pickup dan stuffing di negara asal melalui jaringan agent kami",
      "Booking shipping line dengan tarif kompetitif dan jadwal yang sesuai",
      "Pengurusan dokumen impor lengkap: B/L, Invoice, Packing List, izin impor",
      "Customs clearance di pelabuhan Indonesia (jalur hijau, kuning, atau merah)",
      "Trucking dari pelabuhan ke gudang atau pabrik Anda",
    ],
    bestFor: [
      "Importir bahan baku yang butuh supply chain end-to-end tanpa repot",
      "Perusahaan yang tidak punya tim logistik sendiri di negara asal",
      "Pengiriman rutin dari supplier tetap yang butuh konsistensi",
      "Bisnis yang ingin satu vendor menangani seluruh proses impor",
    ],
  },
  {
    name: "LCL Import Door-to-Door",
    shortName: "LCL DTD",
    description:
      "Impor door-to-door untuk volume yang belum cukup satu kontainer. Barang Anda dikonsolidasikan di CFS negara asal, dikirim via laut, lalu di-deconsolidate dan diantar sampai ke lokasi Anda di Indonesia. Semua proses customs kami tangani.",
    keyPoints: [
      "Minimum volume mulai dari 1 CBM",
      "Konsolidasi di CFS negara asal oleh agent kami",
      "Rute reguler dari port utama: Shanghai, Ningbo, Busan, Singapore, Bangkok, dll.",
      "Customs clearance dan deconsolidation di CFS Indonesia",
      "Last-mile delivery dari CFS ke lokasi Anda",
    ],
    bestFor: [
      "Importir kecil-menengah yang volume per pengirimannya belum cukup FCL",
      "Perusahaan yang impor dari beberapa supplier di satu negara sekaligus",
      "Trial import untuk produk atau supplier baru sebelum komitmen volume besar",
      "Bisnis yang butuh fleksibilitas volume tanpa kontrak minimum",
    ],
  },
  {
    name: "Airfreight Import Door-to-Door",
    shortName: "AF DTD",
    description:
      "Impor via udara dari negara asal langsung ke lokasi Anda. Transit time 3-7 hari termasuk customs clearance. Untuk barang yang sensitif waktu, bernilai tinggi, atau volume kecil yang tidak efisien jika dikirim via laut.",
    keyPoints: [
      "Transit time 3-7 hari door-to-door dari sebagian besar negara",
      "Pickup dari supplier di negara asal (jika diperlukan)",
      "Pengurusan AWB, dokumen impor, dan izin yang diperlukan",
      "Customs clearance di bandara Indonesia",
      "Delivery dari bandara ke lokasi Anda",
    ],
    bestFor: [
      "Spare part urgent yang dibutuhkan untuk menghindari downtime produksi",
      "Produk bernilai tinggi yang butuh transit time singkat",
      "Sampel produk atau dokumen penting dari partner bisnis luar negeri",
      "Barang perishable atau sensitif suhu yang tidak bisa transit lama",
    ],
  },
  {
    name: "Customs Brokerage",
    shortName: "Customs",
    description:
      "Pengurusan kepabeanan untuk impor dan ekspor di Indonesia. Kami handle proses bea cukai dari persiapan dokumen, klasifikasi HS Code, perhitungan bea masuk dan pajak, sampai barang release dari pelabuhan atau bandara. Bisa digunakan terpisah atau sebagai bagian dari layanan DTD kami.",
    keyPoints: [
      "Klasifikasi HS Code yang tepat untuk menghindari masalah di kemudian hari",
      "Perhitungan bea masuk, PPN, PPh, dan pungutan lainnya",
      "Pengurusan PIB (Pemberitahuan Impor Barang) dan PEB (Pemberitahuan Ekspor Barang)",
      "Penanganan pemeriksaan fisik jika diperlukan (jalur kuning/merah)",
      "Konsultasi regulasi impor: LNSW, lartas, SNI, dan perizinan khusus",
    ],
    bestFor: [
      "Perusahaan yang sudah punya freight forwarder tapi butuh broker customs terpisah",
      "Importir yang sering menghadapi masalah di bea cukai (notul, denda, dll.)",
      "Bisnis yang impor barang dengan regulasi ketat (farmasi, makanan, elektronik)",
      "Perusahaan yang butuh konsultasi klasifikasi HS Code sebelum impor",
    ],
  },
];

export default function ImportDtdPage() {
  return (
    <ServicePageLayout
      label="Import DTD & Customs Brokerage"
      title="Dari Negara Asal."
      titleAccent="Langsung ke Gudang Anda."
      intro="Tiga opsi impor door-to-door (FCL, LCL, Airfreight) plus layanan customs brokerage yang bisa digunakan terpisah. Setiap opsi punya karakteristik berbeda dari segi kecepatan, volume minimum, dan biaya. Customs brokerage tersedia untuk melengkapi atau sebagai layanan mandiri."
      subServices={subServices}
    />
  );
}
