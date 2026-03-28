import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Kontak — Utama Globalindo Cargo",
  description:
    "Ceritakan kebutuhan logistik Anda, kami dengarkan dan bantu carikan solusi yang pas.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-carbon-dark">
      <ContactForm />
    </main>
  );
}
