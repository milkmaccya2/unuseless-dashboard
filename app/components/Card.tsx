import type { ReactNode } from 'react'

interface CardProps {
  icon: ReactNode
  title: string
  children: ReactNode
  className?: string
  wide?: boolean
}

export default function Card({ icon, title, children, className = '', wide = false }: CardProps) {
  return (
    <div
      className={`dashboard-card card-glow rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-800/60 p-6 shadow-lg ${wide ? 'col-span-full' : ''} ${className}`}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <span className="text-2xl text-gray-400">{icon}</span>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  )
}
