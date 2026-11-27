import { useState } from "react"
import { LogOutIcon, MailIcon, MoonIcon, SunIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { Profile } from "@/data"
import { languages, useLanguage, type Language } from "@/i18n"
import { cn } from "cn"

import { EditProfileDialog } from "@/components/page/profile"

export type SettingsPageProps = {
  profile: Profile
  email: string
  onSaveProfile: (next: Profile) => void
  onSignOut: () => void
}

function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const { t } = useLanguage()

  return (
    <nav
      aria-label={t("settings.navAria")}
      className="hidden lg:sticky lg:top-24 lg:block lg:self-start"
    >
      <ul className="flex flex-col gap-0.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** Three honest sections. Nothing here is a dead placeholder. */
export function SettingsPage({
  profile,
  email,
  onSaveProfile,
  onSignOut,
}: SettingsPageProps) {
  const { language, setLanguage, t } = useLanguage()
  const [editOpen, setEditOpen] = useState(false)
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  )

  const toggleTheme = (dark: boolean) => {
    setIsDark(dark)
    document.documentElement.classList.toggle("dark", dark)
    try {
      localStorage.setItem("theme", dark ? "dark" : "light")
    } catch {
      // localStorage unavailable (private mode) — the toggle still works.
    }
  }

  const sections = [
    { id: "profile", label: t("settings.sectionProfile") },
    { id: "account", label: t("settings.sectionAccount") },
    { id: "appearance", label: t("settings.sectionAppearance") },
  ]

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t("settings.title")}
        </h1>
        <p className={cn("text-sm text-muted-foreground sm:text-base", language === "km" && "leading-relaxed")}>
          {t("settings.subtitle")}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-6 lg:grid lg:grid-cols-[200px_1fr] lg:gap-8">
        <SectionNav items={sections} />

        <div className="flex min-w-0 flex-col gap-4">
          {/* Profile */}
          <Card id="profile" className="scroll-mt-24">
            <CardHeader>
              <CardTitle>{t("settings.sectionProfile")}</CardTitle>
              <CardDescription>{t("settings.sectionProfileBody")}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="size-12">
                  {profile.avatar ? (
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                  ) : null}
                  <AvatarFallback className="bg-secondary font-semibold text-secondary-foreground">
                    {profile.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-semibold text-foreground">
                    {profile.name}
                  </span>
                  <span className="truncate text-sm text-muted-foreground">
                    @{profile.handle}
                  </span>
                </div>
              </div>
              <Separator />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p
                  className={cn(
                    "max-w-prose text-sm text-muted-foreground",
                    language === "km" && "leading-relaxed"
                  )}
                >
                  {language === "km" ? profile.bioKm : profile.bio}
                </p>
                <Button variant="outline" onClick={() => setEditOpen(true)}>
                  {t("settings.editProfile")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account */}
          <Card id="account" className="scroll-mt-24">
            <CardHeader>
              <CardTitle>{t("settings.sectionAccount")}</CardTitle>
              <CardDescription>{t("settings.sectionAccountBody")}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2 text-sm">
                  <MailIcon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
                  <span className="text-muted-foreground">{t("settings.email")}</span>
                  <span className="truncate font-medium text-foreground">{email}</span>
                </div>
                <p className="text-xs text-muted-foreground">{t("settings.emailLocked")}</p>
              </div>
              <Separator />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{t("settings.role")}</span>
                  <span className="font-medium text-foreground">
                    {t("settings.roleTraveler")}
                  </span>
                </div>
                <Button variant="destructive" onClick={onSignOut}>
                  <LogOutIcon data-icon="inline-start" />
                  {t("settings.signOut")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Language & appearance */}
          <Card id="appearance" className="scroll-mt-24">
            <CardHeader>
              <CardTitle>{t("settings.sectionAppearance")}</CardTitle>
              <CardDescription>{t("settings.sectionAppearanceBody")}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">
                  {t("settings.language")}
                </span>
                <ToggleGroup
                  variant="outline"
                  value={[language]}
                  onValueChange={(value) => {
                    const next = value[0]
                    if (next === "km" || next === "en") setLanguage(next as Language)
                  }}
                >
                  {languages.map((item) => (
                    <ToggleGroupItem key={item.value} value={item.value} className="px-3">
                      {item.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
              <Separator />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">{t("settings.theme")}</span>
                <ToggleGroup
                  variant="outline"
                  value={[isDark ? "dark" : "light"]}
                  onValueChange={(value) => {
                    const next = value[0]
                    if (next === "dark" || next === "light") toggleTheme(next === "dark")
                  }}
                >
                  <ToggleGroupItem value="light" className="px-3">
                    <SunIcon aria-hidden="true" />
                    {t("settings.light")}
                  </ToggleGroupItem>
                  <ToggleGroupItem value="dark" className="px-3">
                    <MoonIcon aria-hidden="true" />
                    {t("settings.dark")}
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <EditProfileDialog
        key={profile.handle}
        open={editOpen}
        profile={profile}
        onOpenChange={setEditOpen}
        onSave={onSaveProfile}
      />
    </div>
  )
}
