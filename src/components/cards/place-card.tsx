import { CalendarPlusIcon, NavigationIcon, StarIcon } from "lucide-react"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { PlaceItem } from "@/data"
import { useLanguage } from "@/i18n"
import { cn } from "cn"

export type PlaceCardProps = {
  place: PlaceItem
  className?: string
  onClick?: (place: PlaceItem) => void
  onAddToPlan?: (place: PlaceItem) => void
  onGoNow?: (place: PlaceItem) => void
}

/**
 * Compact place card built from shadcn `Card` (size "sm") + `AspectRatio`
 * (16:9) + `Badge`, with `Go Now` / `Add to Plan` actions. See `design/card.md`.
 */
export function PlaceCard({
  place,
  className,
  onClick,
  onAddToPlan,
  onGoNow,
}: PlaceCardProps) {
  const { language, t } = useLanguage()
  const show24Hours =
    place.is24Hours === true || place.hours?.toLowerCase() === "24 hours"

  return (
    <Card
      size="sm"
      className={cn(
        "h-full pt-0 transition-all duration-200",
        onClick && "cursor-pointer hover:shadow-md hover:border-primary/40",
        className
      )}
      onClick={() => onClick?.(place)}
    >
      <AspectRatio ratio={16 / 9} className="overflow-hidden bg-muted">
        <img
          src={place.image}
          alt={place.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-300 group-hover/card:scale-105"
        />
      </AspectRatio>

      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "font-medium text-muted-foreground",
              language === "km" ? "text-sm" : "text-xs"
            )}
          >
            {place.area}
          </span>

          {place.rating != null ? (
            <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-foreground">
              <StarIcon
                aria-hidden="true"
                className="size-3.5 fill-rating text-rating"
              />
              {place.rating.toFixed(1)}
            </span>
          ) : null}
        </div>

        <CardTitle className="line-clamp-2">{place.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-wrap items-center gap-1.5">
        <Badge variant="secondary">{place.category}</Badge>
        {place.isPartnered ? (
          <Badge
            variant="outline"
            className="border-primary/40 bg-primary/10 text-primary font-medium"
          >
            {t("card.partnered")}
          </Badge>
        ) : null}
        {show24Hours ? (
          <Badge
            variant="outline"
            className="border-success/30 bg-success/15 text-success"
          >
            {t("card.open24Hours")}
          </Badge>
        ) : null}
      </CardContent>

      <CardFooter className="mt-auto flex flex-row gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 cursor-pointer"
          aria-label={t("card.goNow")}
          title={t("card.goNow")}
          onClick={(e) => {
            e.stopPropagation()
            if (onGoNow) {
              onGoNow(place)
            } else {
              onClick?.(place)
            }
          }}
        >
          <NavigationIcon />
          <span className="hidden sm:inline">{t("card.goNow")}</span>
        </Button>
        <Button
          size="sm"
          className="flex-1 cursor-pointer"
          aria-label={t("card.addToPlan")}
          title={t("card.addToPlan")}
          onClick={(e) => {
            e.stopPropagation()
            if (onAddToPlan) {
              onAddToPlan(place)
            } else {
              onClick?.(place)
            }
          }}
        >
          <CalendarPlusIcon />
          <span className="hidden sm:inline">{t("card.addToPlan")}</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
