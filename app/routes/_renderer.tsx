import { reactRenderer } from '@hono/react-renderer'

export default reactRenderer(({ children, title }) => {
  return (
    <html lang="ja" className="dark">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="知っても何の役にも立たない、あなたの今" />
        <title>{title ?? 'Useless Dashboard'}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Added Inter and JetBrains Mono for modern look */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=LINE+Seed+JP:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href={import.meta.env.PROD ? '/static/assets/style.css' : '/app/style.css'} />
        {import.meta.env.PROD ? (
          <script type="module" src="/static/client.js"></script>
        ) : (
          <script type="module" src="/app/client.ts"></script>
        )}
      </head>
      <body className="min-h-screen text-zinc-50 antialiased selection:bg-zinc-700 selection:text-white bg-zinc-950">
        <div className="flex min-h-screen">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:flex w-64 flex-col border-r border-zinc-800 bg-zinc-950/80 backdrop-blur-xl fixed inset-y-0 left-0 z-50">
            <div className="h-16 flex items-center px-6 border-b border-zinc-800">
              <div className="flex items-center gap-2 select-none">

                <span className="font-mono text-sm font-bold tracking-wider text-zinc-100">USELESS<span className="text-zinc-600">DB</span></span>
              </div>
            </div>
            
            <nav className="flex-1 px-4 py-6 space-y-1">
              <a href="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-zinc-900 text-zinc-100 border border-zinc-800 shadow-sm transition-all hover:border-zinc-700">
                <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Dashboard
              </a>
              <div className="pt-6 pb-2">
                <p className="px-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">System</p>
              </div>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </a>
            </nav>

          </aside>

          {/* Main Content Wrapper */}
          <main className="flex-1 lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
             {/* Mobile Header */}
            <div className="lg:hidden h-14 border-b border-zinc-800 flex items-center justify-between px-4 sticky top-0 bg-zinc-950/80 backdrop-blur-md z-40">
               <div className="flex items-center gap-2">

                <span className="font-mono text-sm font-bold tracking-wider text-zinc-100">USELESS<span className="text-zinc-600">DB</span></span>
               </div>
               <button className="text-zinc-400 hover:text-zinc-100">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                 </svg>
               </button>
            </div>
            
            <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
              {children}
            </div>
            
            <footer className="py-6 px-8 border-t border-zinc-900 mt-auto">
              <div className="flex items-center justify-between text-[10px] text-zinc-600 uppercase tracking-widest">
                <span>© 2026 Useless Dashboard</span>
                <span>v0.1.0-beta</span>
              </div>
            </footer>
          </main>
        </div>
      </body>
    </html>
  )
})
