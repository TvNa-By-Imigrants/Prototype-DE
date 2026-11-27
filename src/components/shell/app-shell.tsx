import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

import { Header } from "./header"
import { BottomNav } from "./nav"

export type AppShellProps = {
  children: ReactNode
  active?: string
  onActiveChange?: (href: string) => void
  hideBottomNav?: boolean
  signedIn?: boolean
  user?: { name: string; handle: string; avatar?: string }
  onAuthAction?: (mode: "login" | "register") => void
  onSignOut?: () => void
  onOpenProfile?: () => void
  onOpenSettings?: () => void
}

/**
 * App shell: sticky header, a centered 1280px content column, and a fixed
 * bottom nav on mobile. Supports controlled or uncontrolled active-nav state.
 *
 * Publishes the header's real height as `--header-h` so sticky sub-bars (the
 * profile tabs) can sit under it without a hardcoded offset — the mobile header
 * is content-height and grows with Khmer copy or browser zoom.
 */
export function AppShell({
  children,
  active: controlledActive,
  onActiveChange,
  hideBottomNav = false,
  signedIn,
  user,
  onAuthAction,
  onSignOut,
  onOpenProfile,
  onOpenSettings,
}: AppShellProps) {
  const [internalActive, setInternalActive] = useState("/")
  const active = controlledActive ?? internalActive
  const headerRef = useRef<HTMLElement>(null)
  const [headerHeight, setHeaderHeight] = useState<number>()

  useEffect(() => {
    const element = headerRef.current
    if (!element) return

    const observer = new ResizeObserver(([entry]) => {
      if (entry) setHeaderHeight(entry.contentRect.height)
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const handleActiveChange = (href: string) => {
    setInternalActive(href)
    onActiveChange?.(href)
  }

  return (
    <div
      className="flex min-h-screen flex-col bg-background text-foreground"
      style={
        headerHeight
          ? ({ "--header-h": `${headerHeight}px` } as CSSProperties)
          : undefined
      }
    >
      <Header
        ref={headerRef}
        active={active}
        onActiveChange={handleActiveChange}
        signedIn={signedIn}
        user={user}
        onAuthAction={onAuthAction}
        onSignOut={onSignOut}
        onOpenProfile={onOpenProfile}
        onOpenSettings={onOpenSettings}
      />
      <main className="mx-auto w-full max-w-7xl flex-1 pt-6 pb-24 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] lg:pt-8 lg:pb-10 sm:pl-[max(1.5rem,env(safe-area-inset-left))] sm:pr-[max(1.5rem,env(safe-area-inset-right))]">
        {children}
      </main>
      {!hideBottomNav && (
        <BottomNav active={active} onActiveChange={handleActiveChange} />
      )}
    </div>
  )
}
