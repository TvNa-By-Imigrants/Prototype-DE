import {
  GlobeIcon,
  LogOutIcon,
  MoonIcon,
  SearchIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
  XIcon,
} from "lucide-react"
import { useState, type Ref } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { languages, useLanguage, type Language } from "@/i18n"
import { cn } from "cn"

import { Logo } from "./logo"
import { NavLinks, type NavProps } from "./nav"

/** Search bar (visual only for now — results wiring comes with the API). */
function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState("")
  const { t } = useLanguage()

  return (
    <InputGroup className={cn("h-10", className)}>
      <InputGroupAddon align="inline-start">
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t("header.search")}
        aria-label={t("header.searchAria")}
      />
      {query ? (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label={t("header.clearSearch")}
            onClick={() => setQuery("")}
          >
            <XIcon />
          </InputGroupButton>
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  )
}

function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            aria-label={t("header.changeLanguage")}
          />
        }
      >
        <GlobeIcon data-icon="inline-start" />
        <span>{language.toUpperCase()}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t("header.language")}</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={language}
            onValueChange={(value) => {
              if (value === "km" || value === "en") {
                setLanguage(value as Language)
              }
            }}
          >
            {languages.map((item) => (
              <DropdownMenuRadioItem
                key={item.value}
                value={item.value}
                closeOnClick
              >
                {item.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  )
  const { t } = useLanguage()

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)
    try {
      localStorage.setItem("theme", next ? "dark" : "light")
    } catch {
      // localStorage unavailable (private mode) — the toggle still works.
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={t("header.toggleTheme")}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
      <span className="sr-only">{t("header.toggleTheme")}</span>
    </Button>
  )
}

function AuthButtons({
  size = "lg",
  signedIn,
  user,
  onAuthAction,
  onSignOut,
  onOpenProfile,
  onOpenSettings,
}: {
  size?: "sm" | "lg"
  signedIn?: boolean
  user?: { name: string; handle: string; avatar?: string }
  onAuthAction?: (mode: "login" | "register") => void
  onSignOut?: () => void
  onOpenProfile?: () => void
  onOpenSettings?: () => void
}) {
  const { t } = useLanguage()

  if (signedIn && user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              aria-label={user.name}
              className={size === "sm" ? "size-8 rounded-full p-0" : "rounded-full pl-1"}
            />
          }
        >
          <Avatar className="size-7">
            {user.avatar ? <AvatarImage src={user.avatar} alt="" /> : null}
            <AvatarFallback className="bg-secondary text-xs font-semibold text-secondary-foreground">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {size === "lg" ? (
            <span className="max-w-28 truncate text-sm">{user.name}</span>
          ) : null}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-48">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="flex flex-col gap-0.5">
              <span className="truncate text-sm font-semibold text-foreground">
                {user.name}
              </span>
              <span className="truncate font-normal">@{user.handle}</span>
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onOpenProfile}>
            <UserIcon />
            {t("profile.myProfile")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onOpenSettings}>
            <SettingsIcon />
            {t("settings.title")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={onSignOut}>
            <LogOutIcon />
            {t("auth.signOut")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (signedIn) {
    return (
      <Button variant="ghost" size={size} onClick={onSignOut}>
        <LogOutIcon data-icon="inline-start" />
        <span>{t("auth.signOut")}</span>
      </Button>
    )
  }

  return (
    <>
      <Button
        variant="ghost"
        size={size}
        onClick={() => onAuthAction?.("login")}
      >
        {t("header.login")}
      </Button>
      <Button size={size} onClick={() => onAuthAction?.("register")}>
        {t("header.register")}
      </Button>
    </>
  )
}

export type HeaderProps = NavProps & {
  /** Measured by `AppShell` to publish `--header-h` for sticky sub-bars. */
  ref?: Ref<HTMLElement>
  signedIn?: boolean
  user?: { name: string; handle: string; avatar?: string }
  onAuthAction?: (mode: "login" | "register") => void
  onSignOut?: () => void
  onOpenProfile?: () => void
  onOpenSettings?: () => void
}

/**
 * Sticky app chrome. Mobile: two rows (brand + auth/lang, then search + theme).
 * Desktop (`lg`): a single row with the primary nav promoted into the header.
 */
export function Header({
  ref,
  active,
  onActiveChange,
  signedIn,
  user,
  onAuthAction,
  onSignOut,
  onOpenProfile,
  onOpenSettings,
}: HeaderProps) {
  return (
    <header ref={ref} className="sticky top-0 z-40 border-b border-border bg-card">
      {/* Desktop */}
      <div className="mx-auto hidden h-16 w-full max-w-7xl items-center justify-between gap-6 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] lg:flex">
        <div className="flex items-center gap-8">
          <Logo />
          <NavLinks active={active} onActiveChange={onActiveChange} />
        </div>
        <div className="flex items-center gap-2">
          <SearchBar className="w-64" />
          <ThemeToggle />
          <LanguageSwitcher />
          <AuthButtons
            signedIn={signedIn}
            user={user}
            onAuthAction={onAuthAction}
            onSignOut={onSignOut}
            onOpenProfile={onOpenProfile}
            onOpenSettings={onOpenSettings}
          />
        </div>
      </div>

      {/* Mobile */}
      <div className="mx-auto w-full max-w-7xl py-3 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] lg:hidden">
        <div className="flex items-center justify-between gap-2">
          <Logo />
          <div className="flex items-center gap-1">
            <AuthButtons
              size="sm"
              signedIn={signedIn}
              user={user}
              onAuthAction={onAuthAction}
              onSignOut={onSignOut}
              onOpenProfile={onOpenProfile}
              onOpenSettings={onOpenSettings}
            />
            <LanguageSwitcher />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <SearchBar />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
