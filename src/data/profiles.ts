import { feedPosts, type FeedPost } from "./feed"

/**
 * A community author. Posts are not stored here — they are derived from
 * `feedPosts` by handle so the feed stays the single source of truth.
 */
export type Profile = {
  /** Handle without the leading `@`. */
  handle: string
  name: string
  avatar?: string
  verified?: boolean
  bio: string
  bioKm: string
  location: string
  locationKm: string
  /** Display date, e.g. "March 2025". */
  joined: string
  joinedKm: string
  followers: number
  following: number
  /** Ids into `curatedPlans` — private, owner-only. */
  savedPlanIds: string[]
}

export const currentUserHandle = "dara"

export const profiles: Profile[] = [
  {
    handle: "dara",
    name: "Dara",
    avatar: "/assets/dara.webp",
    verified: true,
    bio: "Thrift hunter | Vintage lover",
    bioKm: "អ្នករកស៊ីសម្លៀកបំពាក់ចាស់ | ចូលចិត្តរបស់វីនថេច",
    location: "Phnom Penh, Cambodia",
    locationKm: "ភ្នំពេញ កម្ពុជា",
    joined: "March 2025",
    joinedKm: "មីនា ២០២៥",
    followers: 256,
    following: 180,
    savedPlanIds: ["plan-pp-weekend"],
  },
  {
    handle: "chayy",
    name: "Chayy",
    avatar: "/assets/chay.webp",
    verified: true,
    bio: "Community helper | Love exploring PP",
    bioKm: "អ្នកជួយសហគមន៍ | ចូលចិត្តរុករកភ្នំពេញ",
    location: "Phnom Penh, Cambodia",
    locationKm: "ភ្នំពេញ កម្ពុជា",
    joined: "January 2025",
    joinedKm: "មករា ២០២៥",
    followers: 128,
    following: 95,
    savedPlanIds: ["plan-siem-reap-angkor"],
  },
  {
    handle: "sophea",
    name: "Sophea",
    avatar: "/assets/sophea.webp",
    bio: "Nightlife explorer | Cocktail enthusiast",
    bioKm: "អ្នករុករកជីវិតរសៀល | ចូលចិត្តកុកតែល",
    location: "Phnom Penh, Cambodia",
    locationKm: "ភ្នំពេញ កម្ពុជា",
    joined: "February 2025",
    joinedKm: "កុម្ភៈ ២០២៥",
    followers: 342,
    following: 210,
    savedPlanIds: [],
  },
  {
    handle: "ashxioo",
    name: "Ashxioo",
    avatar: "/assets/ashxio.webp",
    verified: true,
    bio: "Bookworm | Matcha addict | Performative boss",
    bioKm: "អ្នកអានសៀវភៅ | ចូលចិត្តម៉ាត់ឆា | ចូលចិត្តធ្វើជាប្រធាន",
    location: "Phnom Penh, Cambodia",
    locationKm: "ភ្នំពេញ កម្ពុជា",
    joined: "December 2024",
    joinedKm: "ធ្នូ ២០២៤",
    followers: 89,
    following: 120,
    savedPlanIds: ["plan-pp-weekend", "plan-siem-reap-angkor"],
  },
]

export function getProfile(handle: string): Profile | undefined {
  return profiles.find((profile) => profile.handle === handle)
}

export function postsByHandle(handle: string): FeedPost[] {
  return feedPosts.filter((post) => post.author.handle === `@${handle}`)
}
