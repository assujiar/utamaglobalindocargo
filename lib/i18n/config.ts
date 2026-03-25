export const i18nConfig = {
  defaultLocale: "id" as const,
  locales: ["id", "en"] as const,
};

export type Locale = (typeof i18nConfig.locales)[number];

export function isValidLocale(locale: string): locale is Locale {
  return i18nConfig.locales.includes(locale as Locale);
}
