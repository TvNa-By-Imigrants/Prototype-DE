import { useState } from "react"

import { Home, NotBuiltPage, PlaceDetailPage, PlacePage } from "@/components/page"
import { AppShell } from "@/components/shell"
import type { PlaceItem } from "@/data"

function App() {
  const [active, setActive] = useState("/")
  const [selectedPlace, setSelectedPlace] = useState<PlaceItem | null>(null)

  const handleNavChange = (href: string) => {
    setSelectedPlace(null)
    setActive(href)
  }

  return (
    <AppShell
      active={active}
      onActiveChange={handleNavChange}
      hideBottomNav={!!selectedPlace}
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
  )
}

export default App
