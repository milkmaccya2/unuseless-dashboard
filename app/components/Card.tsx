import { type ReactNode, useState, useRef, useEffect } from 'react'
import { HelpCircle, X } from './icons'

type AccentColor = 'blue' | 'emerald' | 'amber' | 'rose' | 'cyan' | 'violet' | 'sky' | 'zinc' | 'red' | 'orange' | 'yellow'

interface CardProps {
  icon: ReactNode
  title: string
  children: ReactNode
  info?: ReactNode
  className?: string
  wide?: boolean
  accent?: AccentColor
}

const accentStyles: Record<AccentColor, { iconBg: string; iconText: string; border: string }> = {
  blue:    { iconBg: 'bg-blue-500/10',    iconText: 'text-blue-400',    border: 'border-blue-500/20' },
  emerald: { iconBg: 'bg-emerald-500/10', iconText: 'text-emerald-400', border: 'border-emerald-500/20' },
  amber:   { iconBg: 'bg-amber-500/10',   iconText: 'text-amber-400',   border: 'border-amber-500/20' },
  rose:    { iconBg: 'bg-rose-500/10',    iconText: 'text-rose-400',    border: 'border-rose-500/20' },
  cyan:    { iconBg: 'bg-cyan-500/10',    iconText: 'text-cyan-400',    border: 'border-cyan-500/20' },
  violet:  { iconBg: 'bg-violet-500/10',  iconText: 'text-violet-400',  border: 'border-violet-500/20' },
  sky:     { iconBg: 'bg-sky-500/10',     iconText: 'text-sky-400',     border: 'border-sky-500/20' },
  zinc:    { iconBg: 'bg-zinc-500/10',    iconText: 'text-zinc-400',    border: 'border-zinc-500/20' },
  red:     { iconBg: 'bg-red-500/10',     iconText: 'text-red-400',     border: 'border-red-500/20' },
  orange:  { iconBg: 'bg-orange-500/10',  iconText: 'text-orange-400',  border: 'border-orange-500/20' },
  yellow:  { iconBg: 'bg-yellow-500/10',  iconText: 'text-yellow-400',  border: 'border-yellow-500/20' },
}

export default function Card({ icon, title, children, info, className = '', wide = false, accent = 'zinc' }: CardProps) {
  const a = accentStyles[accent] || accentStyles.zinc
  const [showInfo, setShowInfo] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showInfo) return
    const handleClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setShowInfo(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showInfo])

  useEffect(() => {
    cardRef.current?.classList.toggle('z-40', showInfo)
  }, [showInfo])

  return (
    <div
      ref={cardRef}
      className={`dashboard-card group flex flex-col p-5 ${wide ? 'col-span-1 sm:col-span-2' : ''} ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`icon-container transition-colors duration-300 ${a.iconBg} ${a.iconText}`}>
          {icon}
        </div>
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400 font-display flex-1">
          {title}
        </h2>
        {info && (
          <div className="relative">
            <button
              onClick={() => setShowInfo(!showInfo)}
              // Increased click area with padding, compensated with negative margin
              className="text-zinc-600 hover:text-zinc-300 transition-colors p-2 -m-2"
            >
              <HelpCircle size={14} />
            </button>
            {showInfo && (
              <div
                ref={popoverRef}
                className="absolute right-0 top-6 z-50 w-64 rounded-lg bg-zinc-900 border border-zinc-700 p-3 shadow-xl backdrop-blur-md"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">About Data</span>
                  <button onClick={() => setShowInfo(false)} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                    <X size={12} />
                  </button>
                </div>
                <div className="text-[11px] leading-relaxed text-zinc-300 space-y-1">
                  {info}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center">{children}</div>
      
      {/* Subtle border shine on hover could go here, but handled via CSS already */}
    </div>
  )
}
