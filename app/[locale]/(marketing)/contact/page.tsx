import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { generatePageMetadata } from "@/lib/utils/seo";
import {
  ContactHero,
  ContactInfoCards,
  ContactForm,
  OfficeLocation,
} from "@/components/sections/ContactPageSections";

const content = {
  seo: {
    title:
      "Contact UGC Logistics | Get in Touch with Our Team in Jakarta",
    description:
      "Reach UGC Logistics for freight forwarding inquiries, rate requests, and partnership opportunities. Our Jakarta team responds within 2 business hours.",
  },
  hero: {
    headline: "Let's Start a Conversation",
    subline:
      "Whether you need a rate quote, operational support, or want to explore a logistics partnership, our team is ready to listen. Reach out through the channel that works best for you.",
  },
  breadcrumb: [
    { label: "Home", href: "/en" },
    { label: "Contact" },
  ] as const,
  infoCards: [
    {
      icon: "\uD83D\uDCDE",
      title: "Phone / WhatsApp",
      value: "+62 812-8459-6614",
      action: {
        label: "Chat on WhatsApp",
        href: "https://wa.me/6281284596614",
      },
    },
    {
      icon: "\uD83D\uDCE7",
      title: "Email",
      value: "services@ugc.co.id",
      action: {
        label: "Send Email",
        href: "mailto:services@ugc.co.id",
      },
    },
    {
      icon: "\uD83D\uDCCD",
      title: "Head Office",
      value: "Jakarta, Indonesia",
    },
  ] as const,
  form: {
    heading: "Send Us a Message",
    submitLabel: "Send Message",
    namePlaceholder: "Full name",
    emailPlaceholder: "Email address",
    phonePlaceholder: "Phone number (optional)",
    companyPlaceholder: "Company name (optional)",
    messagePlaceholder: "Tell us about your logistics needs...",
    successMessage:
      "Thank you for reaching out. Our team will respond within 2 business hours.",
  },
  office: {
    heading: "Visit Our Office",
    address:
      "PT Utama Globalindo Cargo\nJl. Raya Bekasi KM 28\nKota Jakarta Timur, DKI Jakarta\nIndonesia",
    hoursLabel: "Business Hours",
    hours: "Monday to Friday, 08:00 - 17:00 WIB",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  return generatePageMetadata({
    pageKey: "contact",
    locale: locale as Locale,
    title: content.seo.title,
    description: content.seo.description,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const typedLocale = locale as Locale;

  return (
    <>
      <ContactHero
        headline={content.hero.headline}
        subline={content.hero.subline}
        breadcrumbItems={content.breadcrumb}
      />

      <ContactInfoCards cards={content.infoCards} />

      <ContactForm
        locale={typedLocale}
        heading={content.form.heading}
        submitLabel={content.form.submitLabel}
        namePlaceholder={content.form.namePlaceholder}
        emailPlaceholder={content.form.emailPlaceholder}
        phonePlaceholder={content.form.phonePlaceholder}
        companyPlaceholder={content.form.companyPlaceholder}
        messagePlaceholder={content.form.messagePlaceholder}
        successMessage={content.form.successMessage}
      />

      <OfficeLocation
        heading={content.office.heading}
        address={content.office.address}
        hours={content.office.hours}
        hoursLabel={content.office.hoursLabel}
      />
    </>
  );
}
