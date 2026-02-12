import { createRoute } from 'honox/factory'
import Dashboard from '../islands/Dashboard'

export default createRoute((c) => {
  return c.render(
    <div className="space-y-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-zinc-100 font-display">Overview</h1>
        <p className="text-sm text-zinc-400">Real-time useless metrics monitoring.</p>
      </header>

      <Dashboard />
    </div>
  )
})
