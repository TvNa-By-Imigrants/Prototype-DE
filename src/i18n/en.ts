export const en = {
  nav: {
    home: "Home",
    feed: "Feed",
    plan: "Plan",
    map: "Map",
    hub: "Hub",
  },
  header: {
    homeAria: "TvNa home",
    login: "Login",
    register: "Register",
    search: "Search places, food, hotels…",
    searchAria: "Search",
    clearSearch: "Clear search",
    language: "Language",
    changeLanguage: "Change language",
    toggleTheme: "Toggle theme",
  },
} as const

type Widen<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown> ? Widen<T[K]> : string
}

export type TranslationDictionary = Widen<typeof en>
