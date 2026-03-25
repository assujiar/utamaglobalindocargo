import type { Locale } from "@/lib/i18n/config";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { PageTransition } from "@/components/motion/PageTransition";

export default async function UtilityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Header locale={locale as Locale} dictionary={dict} />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <Footer locale={locale as Locale} dictionary={dict} />
      <MobileBottomBar locale={locale as Locale} dictionary={dict} />
    </>
  );
}
