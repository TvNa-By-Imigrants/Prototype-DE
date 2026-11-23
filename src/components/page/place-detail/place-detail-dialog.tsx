import { useState } from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import {
  CalendarPlusIcon,
  ClockIcon,
  MapPinIcon,
  NavigationIcon,
  StarIcon,
  XIcon,
} from "lucide-react"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { PlaceItem } from "@/data"
import { useLanguage } from "@/i18n"
import { cn } from "cn"

export type PlaceDetailDialogProps = {
  place: PlaceItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddToPlan?: (place: PlaceItem) => void
  onViewOnMap?: (place: PlaceItem) => void
}

export function PlaceDetailDialog({
  place,
  open,
  onOpenChange,
  onAddToPlan,
  onViewOnMap,
}: PlaceDetailDialogProps) {
  const { language, t } = useLanguage()
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)

  if (!place) return null

  // Collect photos: main image + any additional gallery photos or mock fallbacks
  const photos = [place.image]
  const currentPhoto = photos[activePhotoIndex] || place.image
  const show24Hours =
    place.is24Hours === true || place.hours?.toLowerCase() === "24 hours"

  const priceTierLabel =
    place.priceLevel === "$"
      ? t("placeDetail.budget")
      : place.priceLevel === "$$"
        ? t("placeDetail.moderate")
        : place.priceLevel === "$$$"
          ? t("placeDetail.upscale")
          : place.priceLevel === "$$$$"
            ? t("placeDetail.luxury")
            : null

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Backdrop overlay */}
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/60 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs" />

        {/* 
          Adaptive container:
          - Mobile: Full-screen / 90vh Bottom Sheet sliding up from bottom
          - Desktop (sm+): Centered modal dialog (max-w-2xl)
        */}
        <DialogPrimitive.Popup
          data-slot="place-detail-popup"
          className={cn(
            "fixed z-50 flex flex-col bg-card text-card-foreground shadow-2xl transition duration-200 ease-out",
            "focus-visible:outline-none",
            // Mobile: 90vh Bottom Sheet
            "inset-x-0 bottom-0 top-auto max-h-[92vh] h-[92vh] rounded-t-3xl border-t border-border",
            "data-starting-style:translate-y-full data-ending-style:translate-y-full",
            // Desktop: Centered modal dialog
            "sm:inset-auto sm:top-1/2 sm:left-1/2 sm:max-h-[88vh] sm:h-auto sm:w-full sm:max-w-2xl",
            "sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:border sm:border-border",
            "sm:data-starting-style:scale-95 sm:data-starting-style:translate-y-[-50%]",
            "sm:data-ending-style:scale-95 sm:data-ending-style:translate-y-[-50%]"
          )}
        >
          {/* Mobile Drag Indicator Pill */}
          <div className="shrink-0 pt-3 pb-1 sm:hidden">
            <div className="mx-auto h-1.5 w-12 rounded-full bg-muted-foreground/30" />
          </div>

          {/* Desktop Close Button */}
          <DialogPrimitive.Close
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute top-4 right-4 z-20 hidden rounded-full bg-background/80 text-foreground backdrop-blur-xs hover:bg-background sm:flex"
              />
            }
          >
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          {/* Scrollable Body Container */}
          <div className="flex-1 overflow-y-auto px-5 py-3 sm:p-6">
            <div className="flex flex-col gap-5">
              {/* 1. Image Gallery Section */}
              <div className="relative overflow-hidden rounded-xl border border-border/60 bg-muted">
                <AspectRatio ratio={16 / 9} className="w-full">
                  <img
                    src={currentPhoto}
                    alt={place.name}
                    className="size-full object-cover"
                  />
                </AspectRatio>

                {/* Overlaid Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                  {place.isPartnered && (
                    <Badge
                      variant="outline"
                      className="border-primary/40 bg-card/90 text-primary font-medium backdrop-blur-xs"
                    >
                      {t("card.partnered")}
                    </Badge>
                  )}
                  {show24Hours && (
                    <Badge
                      variant="outline"
                      className="border-success/30 bg-card/90 text-success font-medium backdrop-blur-xs"
                    >
                      {t("card.open24Hours")}
                    </Badge>
                  )}
                </div>

                {/* Overlaid Close Button on Mobile */}
                <DialogPrimitive.Close
                  render={
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      className="absolute top-3 right-3 z-10 size-7 rounded-full bg-black/50 text-white backdrop-blur-xs hover:bg-black/70 sm:hidden"
                    />
                  }
                >
                  <XIcon className="size-3.5" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              </div>

              {/* Photo Thumbnail Strip */}
              {photos.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {photos.map((photo, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActivePhotoIndex(idx)}
                      className={cn(
                        "relative size-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all cursor-pointer",
                        activePhotoIndex === idx
                          ? "border-primary ring-2 ring-primary/30"
                          : "border-border/60 opacity-70 hover:opacity-100"
                      )}
                    >
                      <img src={photo} alt="" className="size-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* 2. Header & Meta Section */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="px-2.5 py-0.5 text-xs font-semibold">
                    {place.category}
                  </Badge>

                  {place.priceLevel && (
                    <Badge variant="outline" className="px-2 py-0.5 text-xs font-semibold">
                      {place.priceLevel}
                      {priceTierLabel ? ` • ${priceTierLabel}` : ""}
                    </Badge>
                  )}

                  {place.rating != null && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-foreground">
                      <StarIcon className="size-3.5 fill-rating text-rating" />
                      <span>{place.rating.toFixed(1)}</span>
                      {place.reviewsCount && (
                        <span className="text-muted-foreground font-normal">
                          ({place.reviewsCount})
                        </span>
                      )}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-0.5 pt-1">
                  <DialogPrimitive.Title className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    {language === "km" && place.nameKm ? place.nameKm : place.name}
                  </DialogPrimitive.Title>

                  {place.nameKm && language === "km" && (
                    <p className="text-sm font-medium text-muted-foreground">
                      {place.name}
                    </p>
                  )}

                  {place.hours && (
                    <div className="flex items-center gap-1.5 pt-1 text-xs text-muted-foreground sm:text-sm">
                      <ClockIcon className="size-3.5 shrink-0 text-primary" />
                      <span>{place.hours}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Description & Tags Section */}
              {place.description && (
                <div className="flex flex-col gap-2 border-t border-border/60 pt-4">
                  <h4 className="text-sm font-semibold text-foreground">
                    {t("placeDetail.description")}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {place.description}
                  </p>

                  {place.tags && place.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                      {place.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 4. Location & Address Section */}
              <div className="flex flex-col gap-2 border-t border-border/60 pt-4">
                <h4 className="text-sm font-semibold text-foreground">
                  {t("placeDetail.location")}
                </h4>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPinIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">
                      {place.area}
                      {place.province ? `, ${place.province}` : ""}
                    </span>
                    {place.address && <span>{place.address}</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Sticky Prominent Action Footer */}
          <div className="sticky bottom-0 z-20 flex shrink-0 items-center gap-3 border-t border-border bg-card/95 p-4 backdrop-blur-xs sm:px-6">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => onViewOnMap?.(place)}
            >
              <NavigationIcon className="size-4" />
              <span>{t("placeDetail.viewOnMap")}</span>
            </Button>

            <Button
              variant="default"
              className="flex-1 gap-2"
              onClick={() => onAddToPlan?.(place)}
            >
              <CalendarPlusIcon className="size-4" />
              <span>{t("placeDetail.addToPlan")}</span>
            </Button>
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
