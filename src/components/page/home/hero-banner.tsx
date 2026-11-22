import heroImg from "@/assets/hero.png"
import { useLanguage } from "@/i18n"

/**
 * Full-width hero promo banner: headline + tagline over the hero image.
 */
export function HeroBanner() {
  const { t } = useLanguage()

  return (
    <section className="relative flex min-h-48 flex-col justify-end overflow-hidden rounded-2xl lg:min-h-64">
      <img
        src={heroImg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/5" />
      <div className="relative flex flex-col gap-2 p-4 lg:p-5">
        <h2 className="text-2xl font-semibold text-primary-foreground lg:text-3xl">
          {t("discovery.heroHeadline")}
        </h2>
        <p className="max-w-xs text-sm text-primary-foreground/85">
          {t("discovery.heroTagline")}
        </p>
      </div>
    </section>
  )
}
