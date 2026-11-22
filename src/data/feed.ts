import heroImg from "@/assets/hero.png"

export type FeedAuthor = {
  name: string
  verified?: boolean
}

export type FeedStats = {
  likes: number
  comments: number
  views: number
}

export type FeedPost = {
  id: string
  image: string
  title: string
  description: string
  author: FeedAuthor
  stats: FeedStats
}

export const feedPosts: FeedPost[] = [
  {
    id: "feed-1",
    image: heroImg,
    title: "1000 bags of smile",
    description:
      "Tv cadt help ke klas tv kom dek teas ot pyouch pek all nop — come volunteer this weekend.",
    author: { name: "Chayy", verified: true },
    stats: { likes: 210, comments: 18, views: 2400 },
  },
  {
    id: "feed-2",
    image: heroImg,
    title: "klengofvitage",
    description:
      "Come and thrift for some clothes on the weekend — a lot of heat in the racks.",
    author: { name: "Dara", verified: true },
    stats: { likes: 154, comments: 9, views: 1180 },
  },
  {
    id: "feed-3",
    image: heroImg,
    title: "WalkStreet",
    description: "Tv walk street pherk cocktail jis tuk pel weekend — riverside night vibes.",
    author: { name: "Sophea" },
    stats: { likes: 98, comments: 6, views: 860 },
  },
  {
    id: "feed-4",
    image: heroImg,
    title: "Matcha & MacBook corner",
    description: "Cozy bookstore cafe with matcha — perfect for a slow study afternoon.",
    author: { name: "Ashxioo", verified: true },
    stats: { likes: 132, comments: 11, views: 1530 },
  },
]
