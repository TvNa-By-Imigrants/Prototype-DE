import { useState } from "react"

import { FeedCard } from "@/components/cards"
import { Home, PlacePage } from "@/components/page"
import { AppShell } from "@/components/shell"
import { feedPosts } from "@/data"
import { useLanguage } from "@/i18n"

function FeedView() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t("discovery.feedTitle")}
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          {t("discovery.feedSubtitle")}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {feedPosts.map((post) => (
          <FeedCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

function App() {
  const [active, setActive] = useState("/")

  return (
    <AppShell active={active} onActiveChange={setActive}>
      {active === "/place" ? (
        <PlacePage />
      ) : active === "/feed" ? (
        <FeedView />
      ) : (
        <Home onNavigate={setActive} />
      )}
    </AppShell>
  )
}

export default App
