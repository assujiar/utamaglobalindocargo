import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/type";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  id: () => import("./dictionaries/id").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
