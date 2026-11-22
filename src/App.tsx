import { useState } from "react"

import { Home, NotBuiltPage, PlacePage } from "@/components/page"
import { AppShell } from "@/components/shell"

function App() {
  const [active, setActive] = useState("/")

  return (
    <AppShell active={active} onActiveChange={setActive}>
      {active === "/" ? (
        <Home onNavigate={setActive} />
      ) : active === "/place" ? (
        <PlacePage />
      ) : (
        <NotBuiltPage pageHref={active} onNavigate={setActive} />
      )}
    </AppShell>
  )
}

export default App
