import { CalendarDaysIcon, MapPinIcon } from "lucide-react"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TravelPlan } from "@/data"
import { useLanguage } from "@/i18n"
import { cn } from "cn"

export type PlanCardProps = {
  plan: TravelPlan
  className?: string
  onClick?: (plan: TravelPlan) => void
}

/** Saved-plan card: cover 16:9, title, duration + stop count, tags. */
export function PlanCard({ plan, className, onClick }: PlanCardProps) {
  const { language } = useLanguage()
  const stopCount = plan.days.reduce((total, day) => total + day.stops.length, 0)

  return (
    <Card
      size="sm"
      className={cn(
        "h-full pt-0",
        onClick && "cursor-pointer transition-colors hover:border-primary/40",
        className
      )}
      onClick={() => onClick?.(plan)}
    >
      <AspectRatio ratio={16 / 9} className="overflow-hidden bg-muted">
        <img
          src={plan.coverImage}
          alt={plan.title}
          loading="lazy"
          className="size-full object-cover"
        />
      </AspectRatio>

      <CardHeader>
        <CardTitle className="line-clamp-2">
          {language === "km" ? plan.titleKm : plan.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <CalendarDaysIcon aria-hidden="true" className="size-3.5" />
            {plan.durationDays}d
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPinIcon aria-hidden="true" className="size-3.5" />
            {stopCount} stops
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {plan.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
