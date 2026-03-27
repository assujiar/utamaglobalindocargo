import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Kontak — Utama Global Indo Cargo",
  description:
    "Inisialisasi konsultasi strategis untuk optimasi rantai pasok korporat B2B Anda.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-carbon-dark">
      <ContactForm />
    </main>
  );
}
