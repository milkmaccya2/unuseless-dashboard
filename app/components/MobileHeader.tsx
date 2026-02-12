import { Menu } from './icons'

export default function MobileHeader() {
  return (
    <div className="lg:hidden h-14 border-b border-zinc-800 flex items-center justify-between px-4 sticky top-0 bg-zinc-950/80 backdrop-blur-md z-40">
       <div className="flex items-center gap-2">
        <span className="font-mono text-sm font-bold tracking-wider text-zinc-100">USELESS<span className="text-zinc-600">DB</span></span>
       </div>
       <button className="text-zinc-400 hover:text-zinc-100">
         <Menu className="w-6 h-6" />
       </button>
    </div>
  )
}
