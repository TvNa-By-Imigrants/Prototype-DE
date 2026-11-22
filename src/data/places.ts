import heroImg from "@/assets/hero.png"

export type PlaceCategoryId = "visit" | "eat" | "cafe" | "stay"

export type PlaceItem = {
  id: string
  name: string
  area: string
  category: string
  categoryId: PlaceCategoryId
  image: string
  /** Optional star rating (e.g. 4.8). Omitted from UI when missing. */
  rating?: number
  /** Optional operating hours; `"24 Hours"` or `is24Hours` renders the success badge. */
  hours?: string
  is24Hours?: boolean
  /** Whether the place is an official partner featured in promotions and on the home page. */
  isPartnered?: boolean
}

export const places: PlaceItem[] = [
  // --- Cafe ---
  {
    id: "tsutaya-bkk1",
    name: "Tatsuya Bookstore Cafe",
    area: "BKK1",
    category: "Cafe",
    categoryId: "cafe",
    image: heroImg,
    rating: 4.8,
    hours: "8:00 AM - 9:00 PM",
    isPartnered: true,
  },
  {
    id: "brown-roastery-bkk",
    name: "Brown Coffee Roastery",
    area: "BKK1",
    category: "Specialty Cafe",
    categoryId: "cafe",
    image: heroImg,
    rating: 4.8,
    hours: "6:30 AM - 9:00 PM",
  },
  {
    id: "farm-to-table",
    name: "Farm to Table Garden Cafe",
    area: "BKK1",
    category: "Organic Cafe",
    categoryId: "cafe",
    image: heroImg,
    rating: 4.7,
    hours: "8:00 AM - 8:00 PM",
  },
  {
    id: "enso-cafe",
    name: "Enso Cafe & Roastery",
    area: "BKK1",
    category: "Brunch & Coffee",
    categoryId: "cafe",
    image: heroImg,
    rating: 4.6,
    hours: "7:00 AM - 6:00 PM",
  },
  {
    id: "lot-369-cafe",
    name: "LOT 369 Cafe & Bar",
    area: "Tuol Tompoung",
    category: "Brunch Cafe",
    categoryId: "cafe",
    image: heroImg,
    rating: 4.7,
    hours: "7:30 AM - 5:00 PM",
  },
  {
    id: "tubo-tea-tk",
    name: "Tubo Milk Tea & Dessert",
    area: "Toul Kork",
    category: "Dessert & Tea",
    categoryId: "cafe",
    image: heroImg,
    rating: 4.5,
    hours: "9:00 AM - 10:00 PM",
  },

  // --- Visit / Sightseeing & Parks ---
  {
    id: "sisowath-riverside",
    name: "Sisowath Quay Riverside",
    area: "Doun Penh",
    category: "Park & Promenade",
    categoryId: "visit",
    image: heroImg,
    rating: 4.9,
    hours: "24 Hours",
    is24Hours: true,
    isPartnered: true,
  },
  {
    id: "koh-norea",
    name: "Koh Norea Waterfront Walk",
    area: "Chamkar Mon",
    category: "Park",
    categoryId: "visit",
    image: heroImg,
    rating: 4.7,
    is24Hours: true,
  },
  {
    id: "wat-phnom-sanctuary",
    name: "Wat Phnom Historical Sanctuary",
    area: "Doun Penh",
    category: "Attraction",
    categoryId: "visit",
    image: heroImg,
    rating: 4.7,
    hours: "7:00 AM - 6:00 PM",
  },
  {
    id: "royal-palace-silver-pagoda",
    name: "Royal Palace & Silver Pagoda",
    area: "Doun Penh",
    category: "Attraction",
    categoryId: "visit",
    image: heroImg,
    rating: 4.9,
    hours: "8:00 AM - 5:00 PM",
  },
  {
    id: "national-museum-cambodia",
    name: "National Museum of Cambodia",
    area: "Doun Penh",
    category: "Museum",
    categoryId: "visit",
    image: heroImg,
    rating: 4.8,
    hours: "8:00 AM - 5:00 PM",
  },
  {
    id: "koh-dach-silk-island",
    name: "Koh Dach Silk Island",
    area: "Chroy Changvar",
    category: "Ecotourism",
    categoryId: "visit",
    image: heroImg,
    rating: 4.6,
  },
  {
    id: "bokor-national-park",
    name: "Bokor National Park",
    area: "Kampot",
    category: "Nature & Mountain",
    categoryId: "visit",
    image: heroImg,
    rating: 4.8,
    is24Hours: true,
  },

  // --- Eat / Dining & Street Food ---
  {
    id: "kaixin-hotpot",
    name: "Kaixin Hotpot",
    area: "Toul Kork",
    category: "Restaurant",
    categoryId: "eat",
    image: heroImg,
    rating: 4.6,
    hours: "11:00 AM - 10:00 PM",
  },
  {
    id: "malis-restaurant-bkk",
    name: "Malis Living Cambodian Cuisine",
    area: "BKK1",
    category: "Fine Dining",
    categoryId: "eat",
    image: heroImg,
    rating: 4.9,
    hours: "6:30 AM - 10:30 PM",
    isPartnered: true,
  },
  {
    id: "sovanna-bbq-street",
    name: "Sovanna BBQ & Craft Beer",
    area: "Chamkar Mon",
    category: "Street BBQ",
    categoryId: "eat",
    image: heroImg,
    rating: 4.5,
    hours: "4:00 PM - 11:30 PM",
  },
  {
    id: "orpuk-kuy-teav",
    name: "Orpuk Traditional Kuy Teav",
    area: "Tuol Tompoung",
    category: "Noodle Shop",
    categoryId: "eat",
    image: heroImg,
    rating: 4.7,
    hours: "6:00 AM - 1:00 PM",
  },
  {
    id: "kep-crab-market-stalls",
    name: "Kep Crab Market Seafood",
    area: "Kep",
    category: "Seafood Market",
    categoryId: "eat",
    image: heroImg,
    rating: 4.8,
    hours: "7:00 AM - 8:00 PM",
  },
  {
    id: "romdeng-restaurant",
    name: "Romdeng Khmer Cuisine",
    area: "Doun Penh",
    category: "Khmer Cuisine",
    categoryId: "eat",
    image: heroImg,
    rating: 4.7,
    hours: "11:00 AM - 9:30 PM",
  },

  // --- Stay / Hotels & Resorts ---
  {
    id: "rosewood-phnom-penh",
    name: "Rosewood Phnom Penh",
    area: "Doun Penh",
    category: "Luxury Hotel",
    categoryId: "stay",
    image: heroImg,
    rating: 4.9,
    hours: "24 Hours",
    is24Hours: true,
    isPartnered: true,
  },
  {
    id: "raffles-hotel-le-royal",
    name: "Raffles Hotel Le Royal",
    area: "Doun Penh",
    category: "Heritage Hotel",
    categoryId: "stay",
    image: heroImg,
    rating: 4.9,
    hours: "24 Hours",
    is24Hours: true,
  },
  {
    id: "plantation-urban-resort",
    name: "The Plantation Urban Resort & Spa",
    area: "Doun Penh",
    category: "Boutique Resort",
    categoryId: "stay",
    image: heroImg,
    rating: 4.7,
    hours: "24 Hours",
    is24Hours: true,
  },
  {
    id: "baitong-hotel-resort",
    name: "Baitong Hotel & Resort",
    area: "BKK1",
    category: "Urban Resort",
    categoryId: "stay",
    image: heroImg,
    rating: 4.8,
    hours: "24 Hours",
    is24Hours: true,
  },
  {
    id: "amber-kampot-resort",
    name: "Amber Kampot Riverfront",
    area: "Kampot",
    category: "Riverside Resort",
    categoryId: "stay",
    image: heroImg,
    rating: 4.9,
    hours: "24 Hours",
    is24Hours: true,
  },
]

/**
 * Filtered subset of places that are official partners, promoted on the Home page.
 */
export const partneredPlaces = places.filter((p) => p.isPartnered === true)
