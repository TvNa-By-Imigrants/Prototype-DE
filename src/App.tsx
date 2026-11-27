import { useState } from "react"

import {
  AuthDialog,
  Home,
  LogoutDialog,
  NotBuiltPage,
  PlaceDetailPage,
  PlacePage,
  ProfilePage,
  SettingsPage,
  type AuthMode,
} from "@/components/page"
import { AppShell } from "@/components/shell"
import { Toaster } from "@/components/ui/toast"
import {
  currentUserHandle,
  getProfile,
  type PlaceItem,
  type Profile,
} from "@/data"

/** Prototype only: the signed-in user's profile lives in local state. */
const seedUser = getProfile(currentUserHandle)!

function App() {
  const [active, setActive] = useState("/")
  const [selectedPlace, setSelectedPlace] = useState<PlaceItem | null>(null)
  const [profileHandle, setProfileHandle] = useState<string | null>(null)
  const [authMode, setAuthMode] = useState<AuthMode | null>(null)
  const [signedIn, setSignedIn] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [user, setUser] = useState<Profile>(seedUser)

  const handleNavChange = (href: string) => {
    setSelectedPlace(null)
    setProfileHandle(null)
    setActive(href)
  }

  const openProfile = (handle: string) => {
    setSelectedPlace(null)
    setProfileHandle(handle)
    setActive("/profile")
  }

  const openAuth = (mode: AuthMode) => {
    setSelectedPlace(null)
    setProfileHandle(null)
    setAuthMode(mode)
  }

  /** Signed-in users can view any profile; visitors get the auth dialog. */
  const handleOpenAuthor = (handle: string) => {
    if (!signedIn) {
      openAuth("login")
      return
    }
    openProfile(handle)
  }

  const viewingProfile = profileHandle ? getProfile(profileHandle) : undefined
  const isOwnerProfile = !!viewingProfile && viewingProfile.handle === user.handle

  return (
    <Toaster>
      <AppShell
        active={active}
        onActiveChange={handleNavChange}
        hideBottomNav={!!selectedPlace}
        signedIn={signedIn}
        user={{ name: user.name, handle: user.handle, avatar: user.avatar }}
        onAuthAction={openAuth}
        onSignOut={() => setLogoutOpen(true)}
        onOpenProfile={() => openProfile(user.handle)}
        onOpenSettings={() => handleNavChange("/settings")}
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
        ) : active === "/profile" ? (
          viewingProfile ? (
            <ProfilePage
              key={viewingProfile.handle}
              profile={isOwnerProfile ? user : viewingProfile}
              isOwner={isOwnerProfile}
              onBack={() => handleNavChange("/feed")}
              onSaveProfile={setUser}
              onNavigate={handleNavChange}
            />
          ) : (
            <NotBuiltPage pageName="Profile" onNavigate={handleNavChange} />
          )
        ) : active === "/settings" ? (
          <SettingsPage
            profile={user}
            email="dara@example.com"
            onSaveProfile={setUser}
            onSignOut={() => setLogoutOpen(true)}
          />
        ) : active === "/" ? (
          <Home
            onNavigate={setActive}
            onSelectPlace={setSelectedPlace}
            onGoNow={() => setActive("/map")}
            onAddToPlan={() => setActive("/plan")}
            onOpenAuthor={handleOpenAuthor}
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
          setProfileHandle(null)
          openAuth("login")
        }}
      />
    </Toaster>
  )
}

export default App
