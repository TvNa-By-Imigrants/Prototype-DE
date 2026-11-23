import { useState } from "react"
import {
  ArrowLeftIcon,
  CalendarPlusIcon,
  CheckCircle2Icon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  ImageIcon,
  MapPinIcon,
  NavigationIcon,
  Share2Icon,
  StarIcon,
} from "lucide-react"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { PlaceItem } from "@/data"
import { useLanguage } from "@/i18n"
import { cn } from "cn"

export type PlaceDetailPageProps = {
  place: PlaceItem
  onBack: () => void
  onAddToPlan?: (place: PlaceItem) => void
  onViewOnMap?: (place: PlaceItem) => void
}

export function PlaceDetailPage({
  place,
  onBack,
  onAddToPlan,
  onViewOnMap,
}: PlaceDetailPageProps) {
  const { language, t } = useLanguage()
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)
  const [copiedLink, setCopiedLink] = useState(false)
  const [addedFeedback, setAddedFeedback] = useState(false)

  // Interactive user rating state (design mockup, no auth required)
  const [userRating, setUserRating] = useState<number | null>(null)
  const [hoverRating, setHoverRating] = useState<number | null>(null)

  // Collect photos from place gallery or fallback to main image
  const photos =
    place.gallery && place.gallery.length > 0 ? place.gallery : [place.image]
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

  const activeStarScore = hoverRating ?? userRating ?? 0

  const handleNextPhoto = () => {
    setActivePhotoIndex((prev) => (prev + 1) % photos.length)
  }

  const handlePrevPhoto = () => {
    setActivePhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const handleShare = () => {
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const handleAddToPlan = () => {
    setAddedFeedback(true)
    onAddToPlan?.(place)
    setTimeout(() => setAddedFeedback(false), 2200)
  }

  return (
    <div className="flex flex-col gap-4 pb-28 lg:pb-12">
      {/* 1. Top Navigation Bar with Back Button & Share */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="-ml-2 gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
        >
          <ArrowLeftIcon className="size-4" />
          <span>{t("placeDetail.back")}</span>
        </Button>

        <div className="flex items-center gap-2">
          {copiedLink && (
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-success font-medium animate-in fade-in">
              <CheckIcon className="size-3.5" />
              {t("placeDetail.copied")}
            </span>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <Share2Icon className="size-3.5" />
            <span className="hidden sm:inline">{t("placeDetail.share")}</span>
          </Button>

          <Badge variant="secondary" className="text-xs font-semibold">
            {place.category}
          </Badge>
          {place.isPartnered && (
            <Badge
              variant="outline"
              className="border-primary/40 bg-primary/10 text-primary font-medium"
            >
              {t("card.partnered")}
            </Badge>
          )}
        </div>
      </div>

      {/* 2. Responsive Content Grid (Desktop: 2 Columns / Mobile: Single Stack) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Left Column: Gallery, Description, Address, Mobile Rating (7 cols on desktop) */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          {/* Main Hero Gallery */}
          <div className="flex flex-col gap-2.5">
            <div className="group/hero relative overflow-hidden rounded-2xl border border-border/80 bg-muted shadow-xs">
              <AspectRatio ratio={16 / 9} className="w-full">
                <img
                  src={currentPhoto}
                  alt={place.name}
                  className="size-full object-cover transition-all duration-300"
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

              {/* Prev / Next Photo Arrow Buttons (if multiple images) */}
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevPhoto}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-xs transition-opacity hover:bg-black/75 cursor-pointer sm:opacity-0 sm:group-hover/hero:opacity-100"
                    aria-label="Previous photo"
                  >
                    <ChevronLeftIcon className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextPhoto}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-xs transition-opacity hover:bg-black/75 cursor-pointer sm:opacity-0 sm:group-hover/hero:opacity-100"
                    aria-label="Next photo"
                  >
                    <ChevronRightIcon className="size-5" />
                  </button>
                </>
              )}

              {/* Photo Count Pill */}
              <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-black/65 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-xs">
                <ImageIcon className="size-3.5" />
                <span>
                  {activePhotoIndex + 1}/{photos.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip (Multi-Image Gallery Preview) */}
            {photos.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
                {photos.map((photo, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePhotoIndex(idx)}
                    className={cn(
                      "relative size-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer sm:size-20",
                      activePhotoIndex === idx
                        ? "border-primary ring-2 ring-primary/40 scale-95"
                        : "border-border/70 opacity-70 hover:opacity-100"
                    )}
                  >
                    <img src={photo} alt="" className="size-full object-cover" />
                    <span className="absolute bottom-0 right-0 rounded-tl-md bg-black/60 px-1 text-[10px] text-white">
                      {idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile-only Place Header Info (Visible < lg) */}
          <div className="flex flex-col gap-2.5 lg:hidden">
            <div className="flex flex-wrap items-center gap-2">
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

            <div className="flex flex-col gap-0.5">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {language === "km" && place.nameKm ? place.nameKm : place.name}
              </h1>
              {place.nameKm && language === "km" && (
                <p className="text-base font-medium text-muted-foreground">
                  {place.name}
                </p>
              )}
            </div>

            {place.hours && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <ClockIcon className="size-4 shrink-0 text-primary" />
                <span>{place.hours}</span>
              </div>
            )}
          </div>

          {/* Interactive Rating & Review Summary Card */}
          <Card className="border-border/80 bg-card">
            <CardContent className="flex flex-col gap-4 p-5 sm:p-6">
              {/* Rating Summary Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-secondary font-bold text-xl text-secondary-foreground shadow-xs">
                    {place.rating != null ? place.rating.toFixed(1) : "0.0"}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={cn(
                            "size-4",
                            star <= Math.round(place.rating || 0)
                              ? "fill-rating text-rating"
                              : "text-muted-foreground/30"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground pt-0.5">
                      {place.reviewsCount ? `${place.reviewsCount} Google reviews` : "Verified Google Maps rating"}
                    </span>
                  </div>
                </div>

                <Badge variant="outline" className="text-xs text-muted-foreground">
                  Google Maps
                </Badge>
              </div>

              {/* Interactive Rate This Place Bar */}
              <div className="border-t border-border/60 pt-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">
                      {t("placeDetail.rateThisPlace")}
                    </span>
                    {userRating != null && (
                      <span className="inline-flex items-center gap-1 text-xs text-success font-medium">
                        <CheckCircle2Icon className="size-3.5" />
                        {t("placeDetail.thankYouRating").replace("{rating}", String(userRating))}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setUserRating(star)}
                          className="group p-1 transition-transform hover:scale-110 cursor-pointer"
                          aria-label={`Rate ${star} stars`}
                        >
                          <StarIcon
                            className={cn(
                              "size-6 transition-colors",
                              star <= activeStarScore
                                ? "fill-rating text-rating"
                                : "text-muted-foreground/30 group-hover:text-rating/60"
                            )}
                          />
                        </button>
                      ))}
                    </div>

                    {userRating != null && (
                      <button
                        type="button"
                        onClick={() => setUserRating(null)}
                        className="text-xs text-muted-foreground hover:text-foreground hover:underline ml-2 cursor-pointer"
                      >
                        Reset
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {t("placeDetail.ratePrompt")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description Card */}
          {place.description && (
            <Card className="border-border/80 bg-card">
              <CardContent className="flex flex-col gap-3 p-5 sm:p-6">
                <h3 className="text-base font-semibold text-foreground">
                  {t("placeDetail.description")}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {place.description}
                </p>

                {place.tags && place.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    {place.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Location & Address Card */}
          <Card className="border-border/80 bg-card">
            <CardContent className="flex flex-col gap-3 p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-foreground">
                  {t("placeDetail.location")}
                </h3>
                {place.lat != null && place.lng != null && (
                  <Badge variant="outline" className="text-[11px] text-muted-foreground">
                    {place.lat.toFixed(4)}, {place.lng.toFixed(4)}
                  </Badge>
                )}
              </div>

              <div className="flex items-start gap-2.5 text-sm sm:text-base text-muted-foreground">
                <MapPinIcon className="mt-0.5 size-5 shrink-0 text-primary" />
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">
                    {place.area}
                    {place.province ? `, ${place.province}` : ""}
                  </span>
                  {place.address && (
                    <span className="text-sm text-muted-foreground">
                      {place.address}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Sticky Action Card on Desktop (5 cols on desktop) */}
        <div className="hidden lg:col-span-5 lg:block">
          <Card className="sticky top-20 border-border/80 bg-card shadow-sm">
            <CardContent className="flex flex-col gap-5 p-6">
              {/* Badges & Rating */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="px-2.5 py-0.5 text-xs font-semibold">
                    {place.category}
                  </Badge>

                  {place.priceLevel && (
                    <Badge variant="outline" className="px-2 py-0.5 text-xs font-semibold">
                      {place.priceLevel}
                      {priceTierLabel ? ` • ${priceTierLabel}` : ""}
                    </Badge>
                  )}
                </div>

                {place.rating != null && (
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                    <StarIcon className="size-4 fill-rating text-rating" />
                    <span>{place.rating.toFixed(1)}</span>
                    {place.reviewsCount && (
                      <span className="text-xs font-normal text-muted-foreground">
                        ({place.reviewsCount})
                      </span>
                    )}
                  </span>
                )}
              </div>

              {/* Title & Hours */}
              <div className="flex flex-col gap-1 border-b border-border/60 pb-4">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  {language === "km" && place.nameKm ? place.nameKm : place.name}
                </h1>
                {place.nameKm && language === "km" && (
                  <p className="text-sm font-medium text-muted-foreground">
                    {place.name}
                  </p>
                )}

                {place.hours && (
                  <div className="flex items-center gap-1.5 pt-2 text-sm text-muted-foreground">
                    <ClockIcon className="size-4 shrink-0 text-primary" />
                    <span>{place.hours}</span>
                  </div>
                )}
              </div>

              {/* Prominent CTAs on Desktop with Feedback Animation */}
              <div className="flex flex-col gap-3 pt-1">
                <Button
                  variant="default"
                  size="lg"
                  className={cn(
                    "w-full gap-2 text-base font-semibold transition-all duration-200 cursor-pointer",
                    addedFeedback && "bg-success text-white hover:bg-success"
                  )}
                  onClick={handleAddToPlan}
                >
                  {addedFeedback ? (
                    <>
                      <CheckIcon className="size-5" />
                      <span>{t("placeDetail.addedToPlan")}</span>
                    </>
                  ) : (
                    <>
                      <CalendarPlusIcon className="size-5" />
                      <span>{t("placeDetail.addToPlan")}</span>
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full gap-2 text-base cursor-pointer hover:bg-muted"
                  onClick={() => onViewOnMap?.(place)}
                >
                  <NavigationIcon className="size-5" />
                  <span>{t("placeDetail.viewOnMap")}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 3. Mobile Fixed Sticky Bottom Action Bar (Sole mobile CTA bar, elevated at z-50) */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-3 border-t border-border bg-card/95 p-3.5 backdrop-blur-md shadow-2xl lg:hidden pb-[max(1rem,env(safe-area-inset-bottom))]">
        <Button
          variant="outline"
          className="flex-1 gap-2 cursor-pointer"
          onClick={() => onViewOnMap?.(place)}
        >
          <NavigationIcon className="size-4" />
          <span>{t("placeDetail.viewOnMap")}</span>
        </Button>

        <Button
          variant="default"
          className={cn(
            "flex-1 gap-2 font-semibold cursor-pointer transition-all duration-200",
            addedFeedback && "bg-success text-white hover:bg-success"
          )}
          onClick={handleAddToPlan}
        >
          {addedFeedback ? (
            <>
              <CheckIcon className="size-4" />
              <span>{t("placeDetail.addedToPlan")}</span>
            </>
          ) : (
            <>
              <CalendarPlusIcon className="size-4" />
              <span>{t("placeDetail.addToPlan")}</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
