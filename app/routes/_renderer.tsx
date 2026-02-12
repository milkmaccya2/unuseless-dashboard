import { reactRenderer } from '@hono/react-renderer'
import Sidebar from '../components/Sidebar'
import MobileHeader from '../components/MobileHeader'
import Footer from '../components/Footer'

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
          <Sidebar />

          {/* Main Content Wrapper */}
          <main className="flex-1 lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
            <MobileHeader />
            
            <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
              {children}
            </div>
            
            <Footer />
          </main>
        </div>
      </body>
    </html>
  )
})
