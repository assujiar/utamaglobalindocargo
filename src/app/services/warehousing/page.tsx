import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import type { SubService } from "@/components/services/ServicePageLayout";

export const metadata: Metadata = {
  title: "Warehousing & Fulfillment | Utama Globalindo Cargo",
  description:
    "Layanan pergudangan dan fulfillment: penyimpanan, inventory management, pick & pack, dan distribusi dari gudang kami.",
};

const subServices: SubService[] = [
  {
    name: "General Warehousing",
    shortName: "Warehousing",
    description:
      "Penyimpanan barang di gudang kami dengan sistem inventory management. Cocok untuk perusahaan yang butuh buffer stock sebelum distribusi, atau yang belum mau investasi gudang sendiri. Lokasi strategis dekat pelabuhan dan akses tol utama.",
    keyPoints: [
      "Gudang dengan kapasitas fleksibel, sewa berdasarkan volume yang dipakai",
      "Sistem WMS (Warehouse Management System) untuk tracking stok real-time",
      "Handling in dan out termasuk bongkar muat, sortir, dan penempatan",
      "Keamanan 24 jam dengan CCTV dan akses terkontrol",
      "Laporan stok berkala (harian, mingguan, atau bulanan sesuai kebutuhan)",
    ],
    bestFor: [
      "Perusahaan yang butuh buffer stock dekat pelabuhan sebelum distribusi",
      "Bisnis yang volume stoknya fluktuatif dan tidak mau sewa gudang jangka panjang",
      "Importir yang butuh tempat penyimpanan sementara setelah customs clearance",
      "Perusahaan yang sedang ekspansi dan belum siap investasi gudang sendiri",
    ],
  },
  {
    name: "Bonded Warehouse",
    shortName: "Bonded WH",
    description:
      "Gudang berikat untuk penyimpanan barang impor yang belum dibayar bea masuk dan pajaknya. Barang bisa disimpan di gudang berikat sambil menunggu kebutuhan distribusi, tanpa perlu membayar bea di muka. Bea masuk baru dibayar saat barang dikeluarkan.",
    keyPoints: [
      "Penundaan pembayaran bea masuk dan pajak sampai barang dikeluarkan",
      "Izin gudang berikat resmi dari DJBC (Direktorat Jenderal Bea dan Cukai)",
      "Cocok untuk barang yang disimpan lama sebelum didistribusikan",
      "Re-export tanpa bea masuk jika barang dikirim kembali ke luar negeri",
      "Administrasi dan pelaporan ke bea cukai kami tangani",
    ],
    bestFor: [
      "Importir yang butuh cash flow management (menunda pembayaran bea)",
      "Perusahaan yang impor stok besar tapi distribusinya bertahap",
      "Bisnis yang melakukan re-packing atau re-labeling sebelum distribusi lokal",
      "Trading company yang sebagian barang impornya akan di-re-export",
    ],
  },
  {
    name: "Pick & Pack Fulfillment",
    shortName: "Fulfillment",
    description:
      "Layanan fulfillment untuk e-commerce atau distribusi retail. Dari menerima stok, menyimpan per SKU, memproses order (pick, pack, label), sampai serah terima ke kurir. Cocok untuk bisnis yang volume ordernya sudah cukup besar tapi belum mau bangun operasi fulfillment sendiri.",
    keyPoints: [
      "Receiving dan putaway stok per SKU",
      "Order processing: pick, pack, dan labeling sesuai SOP Anda",
      "Integrasi dengan marketplace atau sistem order Anda (manual atau API)",
      "Packaging sesuai standar brand Anda (custom packaging tersedia)",
      "Serah terima ke kurir atau ekspedisi pilihan Anda",
    ],
    bestFor: [
      "Brand e-commerce yang order hariannya sudah ratusan tapi belum punya gudang sendiri",
      "Perusahaan retail yang distribusi ke banyak toko atau outlet",
      "Bisnis subscription box atau bundling produk",
      "Brand yang baru masuk pasar Indonesia dan butuh operasi fulfillment cepat",
    ],
  },
  {
    name: "Cross-Docking",
    shortName: "Cross-Dock",
    description:
      "Barang yang masuk ke gudang langsung disortir dan dikirim ke tujuan akhir tanpa penyimpanan lama. Cocok untuk distribusi cepat di mana barang hanya perlu transit sebentar untuk disortir, di-repack, atau dipecah ke beberapa tujuan.",
    keyPoints: [
      "Transit time di gudang minimal (biasanya kurang dari 24 jam)",
      "Sortir dan pemecahan muatan ke beberapa tujuan sekaligus",
      "Tidak ada biaya penyimpanan karena barang tidak disimpan",
      "Koordinasi langsung dengan armada distribusi",
      "Cocok dikombinasikan dengan layanan FTL/LTL kami",
    ],
    bestFor: [
      "Distributor FMCG yang kirim ke banyak outlet dari satu titik masuk",
      "Perusahaan yang terima kontainer impor dan langsung distribusi ke beberapa kota",
      "Bisnis dengan model hub-and-spoke distribution",
      "Pengiriman seasonal atau promosi yang butuh distribusi cepat ke banyak lokasi",
    ],
  },
];

export default function WarehousingPage() {
  return (
    <ServicePageLayout
      label="Warehousing & Fulfillment"
      title="Gudang yang Bekerja."
      titleAccent="Bukan Sekadar Menyimpan."
      intro="Empat layanan pergudangan untuk kebutuhan yang berbeda. Dari penyimpanan biasa sampai fulfillment e-commerce, dari gudang berikat untuk efisiensi bea masuk sampai cross-docking untuk distribusi cepat. Pilih sesuai situasi bisnis Anda."
      subServices={subServices}
    />
  );
}
