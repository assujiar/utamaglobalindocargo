import type { Metadata } from "next";
import Script from "next/script";
import { inter, instrumentSerif, jetbrainsMono } from "@/lib/fonts";
import { i18nConfig, isValidLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "UGC Logistics — PT Utama Globalindo Cargo",
    template: "%s | UGC Logistics",
  },
  description:
    "Mitra logistik terpercaya sejak 1995. Layanan freight forwarding domestik & internasional, kepabeanan, pergudangan, dan kargo proyek.",
  metadataBase: new URL("https://utamaglobalindocargo.com"),
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;

  return (
    <html
      lang={typedLocale}
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-primary bg-bg-light text-text-primary antialiased">
        {children}

        {/* Google Tag Manager — loaded after interactive */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script
            id="gtm"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
