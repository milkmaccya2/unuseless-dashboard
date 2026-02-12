import { LayoutDashboard, Info, Settings } from './icons'

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-zinc-800 bg-zinc-950/80 backdrop-blur-xl fixed inset-y-0 left-0 z-50">
      <div className="h-16 flex items-center px-6 border-b border-zinc-800">
        <div className="flex items-center gap-2 select-none">
          <span className="font-mono text-sm font-bold tracking-wider text-zinc-100">USELESS<span className="text-zinc-600">DB</span></span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1">
        <a href="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-zinc-900 text-zinc-100 border border-zinc-800 shadow-sm transition-all hover:border-zinc-700">
          <LayoutDashboard className="w-4 h-4 text-zinc-400" />
          Dashboard
        </a>
        <div className="pt-6 pb-2">
          <p className="px-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">System</p>
        </div>
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 transition-colors">
          <Info className="w-4 h-4" />
          About
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 transition-colors">
          <Settings className="w-4 h-4" />
          Settings
        </a>
      </nav>
    </aside>
  )
}
