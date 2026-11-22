import { BedDoubleIcon, FootprintsIcon, UtensilsCrossedIcon, type LucideIcon } from "lucide-react"

import type { TranslationKey } from "@/i18n"

export type CategoryItem = {
  id: string
  labelKey: TranslationKey
  icon: LucideIcon
}

/** Hero quick-filter entry points: Visit / Stay / Eat. */
export const categories: CategoryItem[] = [
  { id: "visit", labelKey: "category.visit", icon: FootprintsIcon },
  { id: "stay", labelKey: "category.stay", icon: BedDoubleIcon },
  { id: "eat", labelKey: "category.eat", icon: UtensilsCrossedIcon },
]
