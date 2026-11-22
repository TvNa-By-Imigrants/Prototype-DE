import { ChevronRightIcon } from "lucide-react"

import { PlaceCard } from "@/components/cards"
import { Button } from "@/components/ui/button"
import { places } from "@/data"
import { useLanguage } from "@/i18n"

export function Place() {
  const { t } = useLanguage()

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-foreground">
          {t("discovery.featuredTitle")}
        </h2>
        <Button variant="ghost" size="sm">
          <span>{t("discovery.viewAll")}</span>
          <ChevronRightIcon data-icon="inline-end" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </section>
  )
}
