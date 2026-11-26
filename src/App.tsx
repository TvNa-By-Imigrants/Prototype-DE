import { useState } from "react"

import {
  AuthDialog,
  Home,
  LogoutDialog,
  NotBuiltPage,
  PlaceDetailPage,
  PlacePage,
  type AuthMode,
} from "@/components/page"
import { AppShell } from "@/components/shell"
import { Toaster } from "@/components/ui/toast"
import type { PlaceItem } from "@/data"

function App() {
  const [active, setActive] = useState("/")
  const [selectedPlace, setSelectedPlace] = useState<PlaceItem | null>(null)
  const [authMode, setAuthMode] = useState<AuthMode | null>(null)
  const [signedIn, setSignedIn] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)

  const handleNavChange = (href: string) => {
    setSelectedPlace(null)
    setActive(href)
  }

  const openAuth = (mode: AuthMode) => {
    setSelectedPlace(null)
    setAuthMode(mode)
  }

  return (
    <Toaster>
      <AppShell
        active={active}
        onActiveChange={handleNavChange}
        hideBottomNav={!!selectedPlace}
        signedIn={signedIn}
        onAuthAction={openAuth}
        onSignOut={() => setLogoutOpen(true)}
      >
        {selectedPlace ? (
          <PlaceDetailPage
            place={selectedPlace}
            onBack={() => setSelectedPlace(null)}
            onViewOnMap={() => {
              setSelectedPlace(null)
              setActive("/map")
            }}
            onAddToPlan={() => {
              setSelectedPlace(null)
              setActive("/plan")
            }}
          />
        ) : active === "/" ? (
          <Home
            onNavigate={setActive}
            onSelectPlace={setSelectedPlace}
            onGoNow={() => setActive("/map")}
            onAddToPlan={() => setActive("/plan")}
          />
        ) : active === "/place" ? (
          <PlacePage
            onSelectPlace={setSelectedPlace}
            onNavigate={setActive}
            onGoNow={() => setActive("/map")}
            onAddToPlan={() => setActive("/plan")}
          />
        ) : (
          <NotBuiltPage pageHref={active} onNavigate={setActive} />
        )}
      </AppShell>

      <AuthDialog
        open={authMode !== null}
        mode={authMode ?? "login"}
        onOpenChange={(open) => setAuthMode(open ? (authMode ?? "login") : null)}
        onSignedIn={() => {
          setSignedIn(true)
          setAuthMode(null)
          setActive("/")
        }}
      />

      <LogoutDialog
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        onConfirm={() => {
          setLogoutOpen(false)
          setSignedIn(false)
          openAuth("login")
        }}
      />
    </Toaster>
  )
}

export default App
