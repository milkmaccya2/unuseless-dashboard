import { createRoute } from 'honox/factory'
import Dashboard from '../islands/Dashboard'

export default createRoute((c) => {
  return c.render(
    <main className="min-h-screen grid-bg">
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-black mb-3 tracking-tight">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Useless Dashboard
            </span>
          </h1>
          <p className="text-gray-500 text-lg tracking-wide">~ 知っても何の役にも立たない情報 ~</p>
        </header>
        <Dashboard />
        <footer className="text-center mt-12 pb-8">
          <p className="text-gray-700 text-xs">
            Powered by completely useless calculations
          </p>
        </footer>
      </div>
    </main>
  )
})
