import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import type { SubService } from "@/components/services/ServicePageLayout";

export const metadata: Metadata = {
  title: "Project Cargo & Special Handling | Utama Globalindo Cargo",
  description:
    "Pengiriman kargo proyek dan muatan khusus: heavy lift, oversize, dangerous goods, dan temperature controlled.",
};

const subServices: SubService[] = [
  {
    name: "Heavy Lift & Oversize Cargo",
    shortName: "Heavy Lift",
    description:
      "Pengiriman muatan berat dan berukuran besar yang tidak bisa masuk kontainer standar. Meliputi perencanaan rute, pemilihan alat angkut khusus, pengurusan izin jalan, dan koordinasi bongkar muat dengan crane atau alat berat. Setiap pengiriman direncanakan secara individual.",
    keyPoints: [
      "Survey lokasi dan perencanaan rute untuk muatan oversize",
      "Pemilihan alat angkut: lowbed, modular trailer, multi-axle, dll.",
      "Pengurusan izin jalan khusus dan pengawalan (jika diperlukan)",
      "Koordinasi crane dan alat berat untuk loading/unloading",
      "Lashing dan securing sesuai standar keselamatan kargo",
    ],
    bestFor: [
      "Perusahaan konstruksi yang kirim alat berat, baja, atau komponen struktur",
      "Proyek infrastruktur (pembangkit listrik, jembatan, pabrik) yang butuh pengiriman mesin besar",
      "Industri pertambangan yang kirim peralatan ke site terpencil",
      "Manufaktur yang impor atau ekspor mesin produksi berukuran besar",
    ],
  },
  {
    name: "Dangerous Goods Handling",
    shortName: "DG Cargo",
    description:
      "Pengiriman barang berbahaya (dangerous goods) sesuai regulasi IMDG untuk laut dan IATA DGR untuk udara. Termasuk klasifikasi, pengemasan, pelabelan, dokumentasi, dan pemilihan carrier yang bersertifikat untuk mengangkut jenis DG yang dimaksud.",
    keyPoints: [
      "Klasifikasi dangerous goods sesuai UN Number dan kelas bahaya",
      "Pengemasan dan pelabelan sesuai standar IMDG/IATA DGR",
      "Dokumentasi khusus: DG Declaration, MSDS, dan sertifikat yang diperlukan",
      "Pemilihan carrier dan rute yang menerima jenis DG spesifik",
      "Konsultasi regulasi untuk memastikan kepatuhan sebelum pengiriman",
    ],
    bestFor: [
      "Perusahaan kimia yang kirim bahan kimia berbahaya (asam, pelarut, resin, dll.)",
      "Industri farmasi yang kirim bahan aktif atau reagent terklasifikasi DG",
      "Perusahaan cat, lem, atau aerosol yang produknya masuk kategori flammable",
      "Manufaktur yang kirim baterai lithium, gas compressed, atau bahan korosif",
    ],
  },
  {
    name: "Temperature Controlled Cargo",
    shortName: "Reefer",
    description:
      "Pengiriman barang yang butuh kontrol suhu sepanjang perjalanan. Dari kontainer reefer untuk pengiriman laut, cold truck untuk darat, sampai cold chain packaging untuk kargo udara. Monitoring suhu dilakukan sepanjang transit untuk memastikan integritas produk.",
    keyPoints: [
      "Kontainer reefer (frozen, chilled, atau ambient) untuk pengiriman laut",
      "Cold truck atau van berpendingin untuk distribusi darat",
      "Cold chain packaging untuk kargo udara (gel pack, dry ice, dll.)",
      "Monitoring suhu real-time selama transit",
      "Dokumentasi temperature log untuk kepatuhan regulasi",
    ],
    bestFor: [
      "Perusahaan farmasi dan biotech yang kirim vaksin, obat, atau sampel biologis",
      "Industri makanan dan minuman (seafood, daging, dairy, frozen food)",
      "Eksportir buah-buahan dan sayuran segar",
      "Perusahaan yang kirim bahan kimia sensitif suhu",
    ],
  },
  {
    name: "Breakbulk & Out-of-Gauge",
    shortName: "Breakbulk",
    description:
      "Pengiriman muatan yang tidak bisa dikontainerisasi secara konvensional. Barang dimuat langsung ke kapal (breakbulk) atau menggunakan kontainer khusus seperti flat rack dan open top. Untuk muatan yang bentuk atau ukurannya tidak masuk ke kontainer standar.",
    keyPoints: [
      "Flat rack container untuk muatan lebar atau tinggi",
      "Open top container untuk muatan yang perlu diangkat dari atas",
      "Breakbulk shipping langsung ke kapal tanpa kontainer",
      "Perhitungan out-of-gauge surcharge dan slot planning",
      "Securing dan bracing khusus untuk muatan non-standar",
    ],
    bestFor: [
      "Pengiriman mesin industri yang dimensinya melebihi kontainer standar",
      "Ekspor kayu log, pipa baja, atau profil besi panjang",
      "Impor kendaraan atau alat berat yang tidak muat di kontainer box",
      "Proyek yang butuh pengiriman komponen prefabrikasi berukuran besar",
    ],
  },
];

export default function ProjectCargoPage() {
  return (
    <ServicePageLayout
      label="Project Cargo & Special Handling"
      title="Muatan Khusus."
      titleAccent="Penanganan Khusus."
      intro="Empat kategori layanan untuk muatan yang tidak bisa dikirim dengan cara biasa. Setiap jenis punya regulasi, peralatan, dan prosedur yang berbeda. Kami bantu dari perencanaan sampai eksekusi, termasuk pengurusan izin dan dokumentasi khusus yang diperlukan."
      subServices={subServices}
    />
  );
}
