import { useState, type ReactNode } from "react"

import { Header } from "./header"
import { BottomNav } from "./nav"

export type AppShellProps = {
  children: ReactNode
}

/**
 * App shell: sticky header, a centered 1280px content column, and a fixed
 * bottom nav on mobile. Owns the active-nav state until a router takes over.
 */
export function AppShell({ children }: AppShellProps) {
  const [active, setActive] = useState("/")

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header active={active} onActiveChange={setActive} />
      <main className="mx-auto w-full max-w-7xl flex-1 pt-6 pb-24 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] lg:pt-8 lg:pb-10 sm:pl-[max(1.5rem,env(safe-area-inset-left))] sm:pr-[max(1.5rem,env(safe-area-inset-right))]">
        {children}
      </main>
      <BottomNav active={active} onActiveChange={setActive} />
    </div>
  )
}
