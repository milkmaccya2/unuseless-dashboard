import { createRoute } from 'honox/factory'
import Dashboard from '../islands/Dashboard'

export default createRoute((c) => {
  return c.render(
    <main className="container mx-auto px-4 py-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">
          <span className="mr-2">🌍</span>Useless Dashboard
        </h1>
        <p className="text-gray-400 text-lg">~ 知っても何の役にも立たない情報 ~</p>
      </header>
      <Dashboard />
    </main>
  )
})
