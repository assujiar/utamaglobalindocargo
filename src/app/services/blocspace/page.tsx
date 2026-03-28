import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import type { SubService } from "@/components/services/ServicePageLayout";

export const metadata: Metadata = {
  title: "Blocspace & Airfreight Charter | Utama Globalindo Cargo",
  description:
    "Booking space terjamin di kapal dan pesawat: blocspace allocation, airfreight charter, dan sea freight charter.",
};

const subServices: SubService[] = [
  {
    name: "Blocspace Allocation",
    shortName: "Blocspace",
    description:
      "Alokasi ruang terjamin di kapal-kapal pada rute tertentu. Dengan kontrak blocspace, Anda punya jatah slot kontainer yang sudah di-book di muka, sehingga tidak perlu khawatir kehabisan space saat peak season atau saat tarif spot naik drastis.",
    keyPoints: [
      "Alokasi slot kontainer terjamin pada rute dan jadwal yang disepakati",
      "Tarif kontrak yang stabil, tidak terpengaruh fluktuasi spot market",
      "Prioritas loading dibanding booking spot biasa",
      "Fleksibilitas untuk menambah atau mengurangi volume dalam batas tertentu",
      "Cocok dikombinasikan dengan layanan FCL Export/Import kami",
    ],
    bestFor: [
      "Eksportir atau importir dengan volume reguler yang butuh kepastian space",
      "Perusahaan yang pernah mengalami rolled cargo (muatan ditinggal kapal) saat peak season",
      "Bisnis dengan kontrak supply yang menuntut ketepatan jadwal pengiriman",
      "Trading company yang volume bulanannya cukup besar untuk negosiasi kontrak",
    ],
  },
  {
    name: "Airfreight Charter",
    shortName: "AF Charter",
    description:
      "Sewa pesawat kargo penuh untuk pengiriman volume besar atau mendesak. Satu pesawat eksklusif untuk muatan Anda, tanpa berbagi dengan kargo lain. Jadwal dan rute bisa disesuaikan dengan kebutuhan. Biasanya digunakan untuk situasi darurat atau proyek besar yang butuh pengiriman sekaligus.",
    keyPoints: [
      "Pesawat kargo eksklusif untuk satu pengirim",
      "Jadwal keberangkatan fleksibel, tidak tergantung jadwal penerbangan komersial",
      "Kapasitas besar dalam satu kali pengiriman (tergantung tipe pesawat)",
      "Bisa ke bandara yang tidak dilayani rute kargo reguler",
      "Koordinasi ground handling di bandara asal dan tujuan",
    ],
    bestFor: [
      "Situasi darurat: pabrik shutdown menunggu spare part, bencana alam, bantuan kemanusiaan",
      "Proyek besar yang butuh pengiriman ratusan ton dalam waktu singkat",
      "Pengiriman ke lokasi terpencil yang tidak ada rute kargo reguler",
      "Event atau kampanye yang butuh barang tiba serentak di banyak lokasi",
    ],
  },
  {
    name: "Sea Freight Charter",
    shortName: "Sea Charter",
    description:
      "Sewa kapal penuh atau sebagian untuk pengiriman volume sangat besar via laut. Dari tongkang untuk rute antar pulau sampai vessel charter untuk rute internasional. Untuk volume yang terlalu besar untuk ditangani dengan FCL biasa atau saat rute yang dibutuhkan tidak dilayani liner reguler.",
    keyPoints: [
      "Charter kapal penuh (voyage charter atau time charter)",
      "Charter tongkang untuk rute antar pulau di Indonesia",
      "Bisa untuk bulk cargo, breakbulk, atau kontainerisasi",
      "Rute custom yang tidak tersedia di jadwal liner reguler",
      "Koordinasi loading/unloading dan port agency",
    ],
    bestFor: [
      "Perusahaan tambang yang kirim kargo curah (batu bara, nikel, bauksit) dalam volume besar",
      "Proyek infrastruktur yang butuh pengiriman material masif ke lokasi proyek",
      "Pengiriman ke pelabuhan kecil atau remote yang tidak dilayani kapal liner",
      "Perusahaan yang butuh satu kapal untuk satu kali pengiriman besar",
    ],
  },
];

export default function BlocspacePage() {
  return (
    <ServicePageLayout
      label="Blocspace & Charter"
      title="Kapasitas Terjamin."
      titleAccent="Bukan Sekadar Tersedia."
      intro="Tiga layanan untuk memastikan kapasitas pengiriman Anda aman. Blocspace untuk alokasi ruang terjamin di kapal reguler, dan charter untuk sewa eksklusif pesawat atau kapal. Pilihan ini relevan ketika volume Anda cukup besar atau situasi mengharuskan kepastian kapasitas."
      subServices={subServices}
    />
  );
}
