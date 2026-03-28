import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Kontak | Utama Globalindo Cargo",
  description:
    "Sampaikan kebutuhan logistik Anda dan kami akan merespons dalam 1 hari kerja dengan rekomendasi yang sesuai.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-carbon-dark">
      <ContactForm />
    </main>
  );
}
