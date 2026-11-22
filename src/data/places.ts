import heroImg from "@/assets/hero.png"

export type PlaceItem = {
  id: string
  name: string
  area: string
  category: string
  image: string
  /** Optional star rating (e.g. 4.8). Omitted from UI when missing. */
  rating?: number
  /** Optional operating hours; `"24 Hours"` or `is24Hours` renders the success badge. */
  hours?: string
  is24Hours?: boolean
}

export const places: PlaceItem[] = [
  {
    id: "tsutaya-bkk1",
    name: "Tatsuya Bookstore Cafe",
    area: "BKK1",
    category: "Cafe",
    image: heroImg,
    rating: 4.8,
    hours: "8:00 AM - 9:00 PM",
  },
  {
    id: "sisowath-riverside",
    name: "Sisowath Quay Riverside",
    area: "Doun Penh",
    category: "Park",
    image: heroImg,
    rating: 4.9,
    hours: "24 Hours",
    is24Hours: true,
  },
  {
    id: "kaixin-hotpot",
    name: "Kaixin Hotpot",
    area: "Toul Kork",
    category: "Restaurant",
    image: heroImg,
    rating: 4.6,
    hours: "11:00 AM - 10:00 PM",
  },
  {
    id: "koh-norea",
    name: "Koh Norea Walk",
    area: "Chamkar Mon",
    category: "Park",
    image: heroImg,
  },
]
