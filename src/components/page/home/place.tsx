import { FlameIcon } from "lucide-react"

import { FeedCard, PlaceCard } from "@/components/cards"
import { feedPosts, places } from "@/data"
import { useLanguage } from "@/i18n"

import { HeroBanner } from "./hero-banner"
import { SectionHeader } from "./section-header"

export function Place() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      <HeroBanner />

      <section className="flex flex-col gap-4">
        <SectionHeader
          icon={<FlameIcon aria-hidden="true" className="size-5 text-rating" />}
          title={t("discovery.feedTitle")}
          subtitle={t("discovery.feedSubtitle")}
          viewAll={t("discovery.viewAll")}
        />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {feedPosts.map((post) => (
            <FeedCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeader
          title={t("discovery.placesTitle")}
          viewAll={t("discovery.viewAll")}
        />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>
    </div>
  )
}
