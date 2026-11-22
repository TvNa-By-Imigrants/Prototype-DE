import { useEffect, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon, SparklesIcon } from "lucide-react"

import heroImg from "@/assets/hero.png"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LogoMark } from "@/components/shell/logo"
import { useLanguage } from "@/i18n"
import { cn } from "cn"

export type HeroBannerProps = {
  onNavigate?: (href: string) => void
  className?: string
}

type SlideItem = {
  id: string
  isBrandSlide?: boolean
  badgeKey?: string
  headlineKey?: string
  headlineText?: string
  taglineKey?: string
  taglineText?: string
  meta?: string
  image: string
}

const slides: SlideItem[] = [
  {
    id: "tvna-brand",
    isBrandSlide: true,
    headlineKey: "discovery.heroHeadline",
    taglineKey: "discovery.heroTagline",
    image: heroImg,
  },
  {
    id: "rosewood-phnom-penh",
    headlineText: "Rosewood Phnom Penh",
    taglineText: "សណ្ឋាគារប្រណិត និងទេសភាពរាជធានីភ្នំពេញពីលើអាកាស",
    meta: "Doun Penh · Luxury Hotel",
    image: heroImg,
  },
  {
    id: "malis-restaurant",
    headlineText: "Malis Living Cambodian Cuisine",
    taglineText: "ម្ហូបខ្មែរបុរាណ និងទំនើបដ៏ឈ្ងុយឆ្ងាញ់ក្នុងរាជធានី",
    meta: "BKK1 · Fine Dining",
    image: heroImg,
  },
  {
    id: "tsutaya-cafe",
    headlineText: "Tatsuya Bookstore Cafe",
    taglineText: "ហាងកាហ្វេ និងសៀវភៅ សម្រាប់ជួបជុំ និងលំហែកាយ",
    meta: "BKK1 · Cafe & Books",
    image: heroImg,
  },
]

/**
 * Hero promo banner with infinite auto-sliding loop (... -> end -> front -> ...).
 * Features official partner places and TvNa brand showcase.
 */
export function HeroBanner({ onNavigate, className }: HeroBannerProps) {
  const { language, t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-slide loop: advances every 4 seconds, wraps back to front infinitely
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 4200)

    return () => clearInterval(timer)
  }, [isPaused])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  return (
    <section
      aria-label="Hero promotion slider"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={cn(
        "group relative h-56 sm:h-64 lg:h-76 w-full overflow-hidden rounded-2xl bg-muted shadow-sm select-none",
        className
      )}
    >
      {/* Sliding Carousel Track */}
      <div
        className="flex h-full w-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => {
          const headline = slide.headlineKey ? t(slide.headlineKey as any) : slide.headlineText
          const tagline = slide.taglineKey ? t(slide.taglineKey as any) : slide.taglineText

          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slides.length}`}
              className="relative flex h-full min-w-full flex-col justify-end overflow-hidden p-5 sm:p-6 lg:p-8"
            >
              {/* Slide Background Image */}
              <img
                src={slide.image}
                alt=""
                aria-hidden="true"
                loading="eager"
                className="absolute inset-0 size-full object-cover"
              />

              {/* Dark Gradient Overlay for optimal text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />

              {/* Slide Content */}
              <div className="relative z-10 flex max-w-xl flex-col items-start gap-2.5 text-white">
                {slide.isBrandSlide ? (
                  <div className="flex items-center gap-2">
                    <LogoMark className="size-8 rounded-md bg-primary text-primary-foreground shadow-xs" />
                    <Badge
                      variant="outline"
                      className="border-white/30 bg-white/15 text-white backdrop-blur-xs font-semibold"
                    >
                      <SparklesIcon className="size-3.5" aria-hidden="true" />
                      <span>TvNa · ទៅណា២៤</span>
                    </Badge>
                  </div>
                ) : (
                  <Badge
                    variant="outline"
                    className="border-primary/40 bg-primary/25 text-white backdrop-blur-xs font-medium"
                  >
                    <span>{t("discovery.partnerPromotion")}</span>
                    {slide.meta ? <span className="opacity-75">· {slide.meta}</span> : null}
                  </Badge>
                )}

                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl line-clamp-1">
                  {headline}
                </h2>

                <p
                  className={cn(
                    "text-white/85 line-clamp-2 max-w-md",
                    language === "km" ? "text-sm leading-relaxed" : "text-sm sm:text-base"
                  )}
                >
                  {tagline}
                </p>

                {onNavigate ? (
                  <Button
                    size="sm"
                    onClick={() => onNavigate("/place")}
                    className="mt-1 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <span>{t("discovery.exploreNow")}</span>
                    <ChevronRightIcon data-icon="inline-end" />
                  </Button>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>

      {/* Prev / Next Controls (visible on hover or focus) */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex size-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-xs opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/60 focus-visible:opacity-100 cursor-pointer"
      >
        <ChevronLeftIcon className="size-5" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex size-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-xs opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/60 focus-visible:opacity-100 cursor-pointer"
      >
        <ChevronRightIcon className="size-5" />
      </button>

      {/* Slide Indicator Dots / Pills */}
      <div className="absolute bottom-3.5 right-4 z-20 flex items-center gap-1.5 sm:bottom-4 sm:right-6">
        {slides.map((s, idx) => {
          const isActive = idx === currentIndex
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary",
                isActive ? "w-6 bg-primary" : "w-2 bg-white/40 hover:bg-white/70"
              )}
            />
          )
        })}
      </div>
    </section>
  )
}
