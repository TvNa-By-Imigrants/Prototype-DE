import { Place } from '@/components/page'
import { AppShell } from '@/components/shell'

function App() {
  return (
    <AppShell>
      <div className="flex flex-col items-center gap-6 py-8">
        {/* <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Tovna24</CardTitle>
            <CardDescription>ទៅណា២៤ — where to go in Phnom Penh</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              shadcn/ui is wired up with the Tovna24 design tokens.
            </p>
          </CardContent>
        </Card> */}

        <Place />
      </div>
    </AppShell>
  )
}

export default App
