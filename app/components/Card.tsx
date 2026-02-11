interface CardProps {
  emoji: string
  title: string
  children: React.ReactNode
  className?: string
  wide?: boolean
}

export default function Card({ emoji, title, children, className = '', wide = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-gray-900 border border-gray-800 p-6 shadow-lg ${wide ? 'col-span-full' : ''} ${className}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{emoji}</span>
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  )
}
