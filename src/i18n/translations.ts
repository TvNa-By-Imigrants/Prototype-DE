import { en, type TranslationDictionary } from "./en"
import { km } from "./km"

export type Language = "km" | "en"

export const languages: ReadonlyArray<{ value: Language; label: string; short: string }> = [
  { value: "km", label: "ភាសាខ្មែរ", short: "ខ្មែរ" },
  { value: "en", label: "English", short: "EN" },
]

export const translations: Record<Language, TranslationDictionary> = {
  en,
  km,
}

export type TranslationKey = {
  [Section in keyof TranslationDictionary]: `${Section & string}.${keyof TranslationDictionary[Section] & string}`
}[keyof TranslationDictionary]

export function translate(language: Language, key: TranslationKey): string {
  const [section, item] = key.split(".") as [keyof TranslationDictionary, string]
  const dict = translations[language] ?? translations.en
  const sectionDict = dict[section] as Record<string, string> | undefined
  const fallbackDict = translations.en[section] as Record<string, string> | undefined
  return sectionDict?.[item] ?? fallbackDict?.[item] ?? key
}
