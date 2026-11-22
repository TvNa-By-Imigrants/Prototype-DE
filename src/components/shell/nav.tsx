import {
  CalendarDaysIcon,
  CircleUserRoundIcon,
  HouseIcon,
  MapIcon,
  RssIcon,
  type LucideIcon,
} from "lucide-react"

import { useLanguage, type TranslationKey } from "@/i18n"
import { cn } from "cn"

export type NavItem = {
  labelKey: TranslationKey
  href: string
  icon: LucideIcon
}

/**
 * The five primary destinations — one per epic (Discovery, Community, Plan,
 * Map, Auth/Profile).
 */
export const navItems: NavItem[] = [
  { labelKey: "nav.home", href: "/", icon: HouseIcon },
  { labelKey: "nav.feed", href: "/feed", icon: RssIcon },
  { labelKey: "nav.plan", href: "/plan", icon: CalendarDaysIcon },
  { labelKey: "nav.map", href: "/map", icon: MapIcon },
  { labelKey: "nav.hub", href: "/hub", icon: CircleUserRoundIcon },
]

export type NavProps = {
  /** href of the current page; drives the active state. */
  active?: string
  onActiveChange?: (href: string) => void
  className?: string
}

/** Desktop top navigation (promoted from the mobile bottom bar). */
export function NavLinks({ active, onActiveChange, className }: NavProps) {
  const { t } = useLanguage()

  return (
    <nav aria-label="Primary" className={cn("flex items-center gap-1", className)}>
      {navItems.map((item) => {
        const isActive = item.href === active
        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            onClick={(event) => {
              // No router yet — keep the prototype on one page.
              event.preventDefault()
              onActiveChange?.(item.href)
            }}
            className={cn(
              "border-b-2 border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
              isActive &&
                "border-primary text-secondary-foreground hover:text-secondary-foreground"
            )}
          >
            {t(item.labelKey)}
          </a>
        )
      })}
    </nav>
  )
}

/**
 * Mobile bottom navigation bar (fixed; hidden from `lg` up).
 * Note: Design.md requires a 14px (`text-sm`) minimum for Khmer text;
 * English can use 12px (`text-xs`).
 */
export function BottomNav({ active, onActiveChange, className }: NavProps) {
  const { language, t } = useLanguage()

  return (
    <nav
      aria-label="Mobile"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card lg:hidden",
        className
      )}
    >
      <div className="grid grid-cols-5 px-2 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const isActive = item.href === active
          const Icon = item.icon
          return (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              onClick={(event) => {
                // No router yet — keep the prototype on one page.
                event.preventDefault()
                onActiveChange?.(item.href)
              }}
              className={cn(
                "flex flex-col items-center gap-1 py-2 font-medium text-muted-foreground transition-colors hover:text-foreground",
                language === "km" ? "text-sm" : "text-xs",
                isActive &&
                  "text-secondary-foreground hover:text-secondary-foreground"
              )}
            >
              <Icon className={cn("size-5", isActive && "text-primary")} />
              <span className="truncate">{t(item.labelKey)}</span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
