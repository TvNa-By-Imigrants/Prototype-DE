import { useState } from "react"
import {
  CalendarDaysIcon,
  LockIcon,
  MapPinIcon,
  SearchXIcon,
} from "lucide-react"

import { FeedCard, PlanCard } from "@/components/cards"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { curatedPlans, postsByHandle, type Profile } from "@/data"
import { useLanguage } from "@/i18n"

import { EditProfileDialog } from "./edit-profile-dialog"
import { ProfileHeader } from "./profile-header"

export type ProfilePageProps = {
  profile: Profile
  isOwner: boolean
  onBack?: () => void
  onSaveProfile?: (next: Profile) => void
  onNavigate?: (href: string) => void
}

const tabTriggerClass =
  "h-auto flex-none rounded-none border-0 pr-3 pl-0 pb-2.5 text-sm font-medium text-muted-foreground after:bottom-0 after:h-0.5 after:bg-primary after:opacity-0 hover:text-foreground data-active:border-0 data-active:bg-transparent data-active:text-foreground data-active:after:opacity-100"

function EmptyState({
  title,
  body,
  onNavigate,
}: {
  title: string
  body: string
  onNavigate?: (href: string) => void
}) {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border px-4 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <SearchXIcon aria-hidden="true" className="size-6" />
      </div>
      <h3 className="mt-3 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{body}</p>
      <Button
        variant="outline"
        size="sm"
        className="mt-4"
        onClick={() => onNavigate?.("/place")}
      >
        {t("profile.explorePlaces")}
      </Button>
    </div>
  )
}

/** Bio, location and joined — the factual content the header gave up. */
function IntroCard({ profile }: { profile: Profile }) {
  const { language, t } = useLanguage()

  return (
    <Card
      size="sm"
      className="lg:sticky lg:top-[calc(var(--header-h,4rem)+2.75rem)] lg:self-start"
    >
      <CardContent className="flex flex-col gap-3 text-sm">
        <h2 className="font-semibold text-foreground">{t("profile.intro")}</h2>
        <p className="text-foreground">
          {language === "km" ? profile.bioKm : profile.bio}
        </p>
        <div className="flex flex-col gap-2 text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <MapPinIcon aria-hidden="true" className="size-4 shrink-0" />
            {language === "km" ? profile.locationKm : profile.location}
          </span>
          <span className="inline-flex items-center gap-2">
            <CalendarDaysIcon aria-hidden="true" className="size-4 shrink-0" />
            {t("profile.joined").replace(
              "{date}",
              language === "km" ? profile.joinedKm : profile.joined
            )}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * One component for both views. `isOwner` is the only switch:
 * owner gets Edit profile + the private Saved Plans tab; visitors get Follow
 * and the tab is not rendered at all.
 */
export function ProfilePage({
  profile,
  isOwner,
  onBack,
  onSaveProfile,
  onNavigate,
}: ProfilePageProps) {
  const { t } = useLanguage()
  const [editOpen, setEditOpen] = useState(false)
  const [following, setFollowing] = useState(false)

  const posts = postsByHandle(profile.handle)
  const savedPlans = curatedPlans.filter((plan) =>
    profile.savedPlanIds.includes(plan.id)
  )

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col">
      <ProfileHeader
        profile={profile}
        isOwner={isOwner}
        postCount={posts.length}
        following={following}
        onEdit={() => setEditOpen(true)}
        onFollowToggle={() => setFollowing((prev) => !prev)}
        onBack={isOwner ? undefined : onBack}
      />

      <Tabs defaultValue="posts" className="gap-4">
        {/* Pinned under the measured header height; sits above the columns. */}
        <div className="sticky top-[var(--header-h,4rem)] z-30 border-b border-border bg-background/95 backdrop-blur">          <TabsList
            variant="line"
            className="h-auto w-full justify-start gap-0 rounded-none p-0"
          >
            <TabsTrigger value="posts" className={tabTriggerClass}>
              {t("profile.myPosts")}
            </TabsTrigger>
            {isOwner ? (
              <TabsTrigger
                value="saved"
                className={tabTriggerClass}
                title={t("profile.privateNote")}
              >
                {t("profile.savedPlans")}
                <LockIcon aria-hidden="true" className="size-3.5" />
                <Badge variant="secondary" className="hidden sm:inline-flex">
                  {t("profile.onlyYou")}
                </Badge>
              </TabsTrigger>
            ) : null}
          </TabsList>
        </div>

        <div className="grid gap-4 lg:grid-cols-[280px_1fr] lg:gap-6">
          <IntroCard profile={profile} />

          <div className="flex min-w-0 flex-col gap-3">
            <TabsContent value="posts">
              {posts.length === 0 ? (
                <EmptyState
                  title={t("profile.emptyPosts")}
                  body={t("profile.emptyPostsBody")}
                  onNavigate={onNavigate}
                />
              ) : (
                <div className="flex flex-col gap-3">
                  {posts.map((post) => (
                    <FeedCard key={post.id} post={post} full />
                  ))}
                </div>
              )}
            </TabsContent>

            {isOwner ? (
              <TabsContent value="saved" className="flex flex-col gap-3">
                <Card size="sm" className="bg-muted/40">
                  <CardContent className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
                    <LockIcon aria-hidden="true" className="size-3.5 shrink-0" />
                    <span className="leading-relaxed">
                      {t("profile.privateNote")}
                    </span>
                  </CardContent>
                </Card>

                {savedPlans.length === 0 ? (
                  <EmptyState
                    title={t("profile.emptySaved")}
                    body={t("profile.emptySavedBody")}
                    onNavigate={onNavigate}
                  />
                ) : (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {savedPlans.map((plan) => (
                      <PlanCard
                        key={plan.id}
                        plan={plan}
                        onClick={() => onNavigate?.("/plan")}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            ) : null}
          </div>
        </div>
      </Tabs>

      {isOwner && onSaveProfile ? (
        <EditProfileDialog
          key={profile.handle}
          open={editOpen}
          profile={profile}
          onOpenChange={setEditOpen}
          onSave={onSaveProfile}
        />
      ) : null}
    </div>
  )
}
