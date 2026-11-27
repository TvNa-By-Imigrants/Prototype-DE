import {
  ArrowLeftIcon,
  BadgeCheckIcon,
  PencilIcon,
  UserPlusIcon,
  UserCheckIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { Profile } from "@/data"
import { useLanguage } from "@/i18n"

export type ProfileHeaderProps = {
  profile: Profile
  isOwner: boolean
  postCount: number
  following?: boolean
  onEdit?: () => void
  onFollowToggle?: () => void
  onBack?: () => void
}

/**
 * Cover + avatar + identity + stats. Deliberately cardless: the cover runs the
 * full column width and the identity sits on the page background, so the page
 * reads as a profile rather than another settings card. Bio/location/joined
 * live in the Intro card, not here.
 */
export function ProfileHeader({
  profile,
  isOwner,
  postCount,
  following = false,
  onEdit,
  onFollowToggle,
  onBack,
}: ProfileHeaderProps) {
  const { t } = useLanguage()
  const initial = profile.name.charAt(0)

  const stats = [
    { term: t("profile.posts"), value: postCount },
    { term: t("profile.followers"), value: profile.followers },
    { term: t("profile.followingCount"), value: profile.following },
  ]

  const action = isOwner ? (
    <Button onClick={onEdit} className="w-full sm:w-auto">
      <PencilIcon data-icon="inline-start" />
      {t("profile.editProfile")}
    </Button>
  ) : (
    <Button
      variant={following ? "outline" : "default"}
      onClick={onFollowToggle}
      aria-pressed={following}
      className="w-full sm:w-auto"
    >
      {following ? (
        <UserCheckIcon data-icon="inline-start" />
      ) : (
        <UserPlusIcon data-icon="inline-start" />
      )}
      {following ? t("profile.following") : t("profile.follow")}
    </Button>
  )

  return (
    <header>
      {/* Token gradient only — no stock photo invented for the user. */}
      <div className="relative h-32 bg-linear-to-br from-secondary to-primary/25 sm:h-40 lg:h-48">
        {onBack ? (
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("profile.back")}
            onClick={onBack}
            className="absolute top-2 left-2 bg-card/80 backdrop-blur-sm hover:bg-card"
          >
            <ArrowLeftIcon />
          </Button>
        ) : null}
      </div>

      <div>
        <div className="-mt-10 flex items-end justify-between gap-3 sm:-mt-14">
          <div className="flex min-w-0 items-end gap-3">
            <Avatar className="size-20 shrink-0 after:border-background sm:size-28">
              {profile.avatar ? (
                <AvatarImage src={profile.avatar} alt={profile.name} />
              ) : null}
              <AvatarFallback className="bg-secondary text-2xl font-semibold text-secondary-foreground">
                {initial}
              </AvatarFallback>
            </Avatar>

            <div className="flex min-w-0 flex-col gap-0.5 pb-1">
              <div className="flex items-center gap-1.5">
                <h1 className="truncate text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {profile.name}
                </h1>
                {profile.verified ? (
                  <BadgeCheckIcon
                    aria-label={t("card.verified")}
                    className="size-5 shrink-0 text-primary"
                  />
                ) : null}
              </div>
              <p className="truncate text-sm text-muted-foreground">
                @{profile.handle}
              </p>
            </div>
          </div>

          <div className="hidden shrink-0 pb-1 sm:block">{action}</div>
        </div>

        {/* Inline, wrapping stats: Khmer labels never have to fit a grid cell. */}
        <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          {stats.map((stat, index) => (
            <span key={stat.term} className="inline-flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-border">
                  ·
                </span>
              ) : null}
              <span>
                <span className="font-semibold text-foreground">
                  {stat.value}
                </span>{" "}
                {stat.term}
              </span>
            </span>
          ))}
        </p>

        <div className="mt-3 sm:hidden">{action}</div>
      </div>
    </header>
  )
}
