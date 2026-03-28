import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import type { SubService } from "@/components/services/ServicePageLayout";

export const metadata: Metadata = {
  title: "Domestic Distribution | Utama Globalindo Cargo",
  description:
    "Distribusi domestik ke seluruh Indonesia: Full Truck Load, Less Than Truck Load, FCL, LCL, dan Airfreight.",
};

const subServices: SubService[] = [
  {
    name: "Full Truck Load",
    shortName: "FTL",
    description:
      "Satu truk penuh untuk satu pengiriman Anda. Barang dijemput dari lokasi asal dan diantar langsung ke tujuan tanpa transit atau konsolidasi dengan muatan lain. Waktu tempuh lebih cepat karena tidak ada pemberhentian tambahan.",
    keyPoints: [
      "Truk eksklusif untuk satu pengirim, tanpa berbagi ruang",
      "Pickup dan delivery langsung dari pintu ke pintu",
      "Cocok untuk volume besar atau barang yang perlu penanganan khusus",
      "Jadwal keberangkatan fleksibel sesuai kebutuhan Anda",
      "Pilihan jenis truk: box, wingbox, flatbed, lowbed, trailer",
    ],
    bestFor: [
      "Perusahaan manufaktur yang kirim bahan baku atau produk jadi dalam jumlah besar",
      "Distributor yang butuh pengiriman rutin ke gudang regional",
      "Pengiriman barang sensitif yang tidak boleh dicampur dengan muatan lain",
      "Kebutuhan pengiriman mendesak dengan jadwal ketat",
    ],
  },
  {
    name: "Less Than Truck Load",
    shortName: "LTL",
    description:
      "Untuk volume yang tidak cukup mengisi satu truk penuh. Muatan Anda dikonsolidasikan dengan pengiriman lain yang menuju arah sama, sehingga biaya transportasi dibagi dan lebih efisien. Pilihan yang tepat ketika FTL terlalu mahal untuk volume Anda.",
    keyPoints: [
      "Bayar sesuai ruang yang dipakai, bukan satu truk penuh",
      "Konsolidasi muatan dengan pengirim lain untuk rute yang sama",
      "Tersedia untuk pengiriman reguler maupun insidental",
      "Jaringan distribusi mencakup kota-kota utama di seluruh Indonesia",
      "Tracking pengiriman tersedia",
    ],
    bestFor: [
      "UKM atau perusahaan dengan volume pengiriman kecil sampai menengah",
      "Pengiriman rutin ke beberapa kota tapi volume per kota tidak besar",
      "Perusahaan yang ingin menekan biaya transportasi tanpa mengorbankan jangkauan",
      "Pengiriman sampel, spare part, atau barang promosi",
    ],
  },
  {
    name: "Full Container Load Domestik",
    shortName: "FCL",
    description:
      "Pengiriman kontainer penuh antar pulau melalui jalur laut. Satu kontainer (20ft atau 40ft) eksklusif untuk muatan Anda, cocok untuk volume besar yang perlu dikirim antar pulau dengan biaya per unit yang lebih rendah dibanding trucking jarak jauh.",
    keyPoints: [
      "Kontainer 20ft atau 40ft eksklusif untuk satu pengirim",
      "Jalur laut antar pulau: Jawa, Sumatera, Kalimantan, Sulawesi, Papua, dll.",
      "Biaya per kg lebih rendah untuk volume besar",
      "Stuffing dan unstuffing bisa dibantu di gudang kami",
      "Koordinasi dengan trucking untuk pickup dan delivery di kedua ujung",
    ],
    bestFor: [
      "Distribusi produk antar pulau dalam volume besar",
      "Perusahaan yang supply chain-nya mencakup beberapa pulau",
      "Pengiriman bahan baku dari pelabuhan utama ke pabrik di luar Jawa",
      "Proyek infrastruktur yang butuh pengiriman material secara berkala",
    ],
  },
  {
    name: "Less Than Container Load Domestik",
    shortName: "LCL",
    description:
      "Untuk pengiriman antar pulau yang volumenya belum cukup untuk mengisi satu kontainer. Muatan Anda digabung dengan muatan lain di Container Freight Station (CFS), lalu dikirim bersama. Prinsipnya sama seperti LTL, tapi untuk jalur laut.",
    keyPoints: [
      "Bayar berdasarkan volume (CBM) yang dipakai, bukan satu kontainer",
      "Konsolidasi di CFS sebelum pengiriman",
      "Tersedia untuk rute-rute utama antar pulau",
      "Minimum volume biasanya mulai dari 1 CBM",
      "Cocok dikombinasikan dengan trucking di kota tujuan",
    ],
    bestFor: [
      "Perusahaan yang kirim barang antar pulau tapi volume per pengiriman kecil",
      "Toko online atau distributor yang supply ke beberapa pulau",
      "Pengiriman stok awal ke cabang baru di luar pulau",
      "Kebutuhan pengiriman berkala yang volumenya fluktuatif",
    ],
  },
  {
    name: "Airfreight Domestik",
    shortName: "Airfreight",
    description:
      "Pengiriman via udara ke seluruh Indonesia. Pilihan tercepat untuk barang yang sensitif waktu atau tujuan yang sulit dijangkau jalur darat dan laut. Waktu transit biasanya 1-2 hari ke hampir semua kota di Indonesia.",
    keyPoints: [
      "Transit time 1-2 hari untuk sebagian besar rute domestik",
      "Jaringan ke bandara-bandara utama dan kota tier-2",
      "Cocok untuk barang bernilai tinggi, dokumen, atau produk perishable",
      "Opsi same-day dan next-day delivery untuk rute tertentu",
      "Packaging dan handling sesuai standar kargo udara",
    ],
    bestFor: [
      "Perusahaan farmasi atau lab yang kirim sampel dan produk sensitif suhu",
      "E-commerce dengan SLA pengiriman cepat ke seluruh Indonesia",
      "Pengiriman spare part urgent untuk menghindari downtime produksi",
      "Distribusi ke wilayah Indonesia timur yang transit lautnya lama",
    ],
  },
];

export default function DomesticDistributionPage() {
  return (
    <ServicePageLayout
      label="Domestic Distribution"
      title="Distribusi ke Seluruh Indonesia."
      titleAccent="Satu Koordinasi."
      intro="Lima mode pengiriman domestik untuk kebutuhan yang berbeda-beda. Dari truk penuh sampai kargo udara, setiap mode punya kelebihan dan situasi di mana ia paling masuk akal. Berikut penjelasan lengkapnya supaya Anda bisa memilih yang tepat."
      subServices={subServices}
    />
  );
}
