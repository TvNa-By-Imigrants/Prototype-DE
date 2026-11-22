export const en = {
  nav: {
    home: "Home",
    place: "Place",
    plan: "Plan",
    map: "Map",
    feed: "Feed",
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
  card: {
    open24Hours: "24 hours",
    goNow: "Go Now",
    addToPlan: "Add to Plan",
    likes: "Likes",
    comments: "Comments",
    views: "Views",
    verified: "Verified",
  },
  category: {
    visit: "Visit",
    stay: "Stay",
    eat: "Eat",
  },
  discovery: {
    heroHeadline: "Where to go?",
    heroTagline: "Discover places to visit, eat and stay in Phnom Penh",
    feedTitle: "Feed",
    feedSubtitle: "Fresh picks from the community",
    placesTitle: "Places to hang out",
    viewAll: "View All",
  },
} as const

type Widen<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown> ? Widen<T[K]> : string
}

export type TranslationDictionary = Widen<typeof en>
