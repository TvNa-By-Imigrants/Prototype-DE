import { useState, type ReactNode } from "react"

import { Header } from "./header"
import { BottomNav } from "./nav"

export type AppShellProps = {
  children: ReactNode
  active?: string
  onActiveChange?: (href: string) => void
  hideBottomNav?: boolean
  signedIn?: boolean
  onAuthAction?: (mode: "login" | "register") => void
  onSignOut?: () => void
}

/**
 * App shell: sticky header, a centered 1280px content column, and a fixed
 * bottom nav on mobile. Supports controlled or uncontrolled active-nav state.
 */
export function AppShell({
  children,
  active: controlledActive,
  onActiveChange,
  hideBottomNav = false,
  signedIn,
  onAuthAction,
  onSignOut,
}: AppShellProps) {
  const [internalActive, setInternalActive] = useState("/")
  const active = controlledActive ?? internalActive

  const handleActiveChange = (href: string) => {
    setInternalActive(href)
    onActiveChange?.(href)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header
        active={active}
        onActiveChange={handleActiveChange}
        signedIn={signedIn}
        onAuthAction={onAuthAction}
        onSignOut={onSignOut}
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
