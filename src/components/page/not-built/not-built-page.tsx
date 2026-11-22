import {
  CalendarDaysIcon,
  CompassIcon,
  ConstructionIcon,
  HouseIcon,
  MapIcon,
  MapPinIcon,
  RssIcon,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage, type TranslationKey } from "@/i18n"
import { navItems } from "@/components/shell/nav"

const pageIcons: Record<string, LucideIcon> = {
  "/plan": CalendarDaysIcon,
  "/map": MapIcon,
  "/feed": RssIcon,
  "/place": MapPinIcon,
}

export type NotBuiltPageProps = {
  pageHref?: string
  pageName?: string
  onNavigate?: (href: string) => void
}

export function NotBuiltPage({ pageHref, pageName, onNavigate }: NotBuiltPageProps) {
  const { t } = useLanguage()

  const matchedItem = pageHref ? navItems.find((item) => item.href === pageHref) : null
  const localizedPageName = pageName ?? (matchedItem ? t(matchedItem.labelKey as TranslationKey) : null)
  const Icon = (pageHref && pageIcons[pageHref]) || ConstructionIcon

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-10 sm:py-16">
      <Card className="w-full max-w-md border-border/80 bg-card/90 shadow-sm backdrop-blur-xs">
        <CardContent className="flex flex-col items-center gap-5 p-6 text-center sm:p-8">
          {/* Visual Icon Badge */}
          <div className="relative">
            <div className="flex size-20 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground shadow-inner">
              <Icon className="size-9 stroke-[1.75]" />
            </div>
            <div className="absolute -bottom-2 -right-2 flex size-8 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground shadow-xs">
              <ConstructionIcon className="size-4" />
            </div>
          </div>

          {/* Badge & Headings */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5">
              <Badge variant="secondary" className="px-2.5 py-0.5 text-xs font-semibold">
                {t("notBuilt.badge")}
              </Badge>
              {localizedPageName ? (
                <Badge variant="outline" className="px-2.5 py-0.5 text-xs text-muted-foreground">
                  {localizedPageName}
                </Badge>
              ) : null}
            </div>

            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {localizedPageName
                ? `${localizedPageName} — ${t("notBuilt.title")}`
                : t("notBuilt.title")}
            </h1>

            <p className="max-w-sm text-sm text-muted-foreground sm:text-base">
              {t("notBuilt.description")}
            </p>
          </div>

          {/* Action Navigation Buttons */}
          <div className="flex w-full flex-col gap-2.5 pt-2 sm:flex-row">
            <Button
              variant="default"
              className="flex-1 gap-2"
              onClick={() => onNavigate?.("/")}
            >
              <HouseIcon className="size-4" />
              <span>{t("notBuilt.backHome")}</span>
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => onNavigate?.("/place")}
            >
              <CompassIcon className="size-4" />
              <span>{t("notBuilt.explorePlaces")}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
