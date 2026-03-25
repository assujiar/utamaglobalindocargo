import type { Locale } from "./config";

const dictionaries = {
  id: () => import("./dictionaries/id.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["id"]>>;

export function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
