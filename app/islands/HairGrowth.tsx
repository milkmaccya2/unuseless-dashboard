import { useState, useEffect } from 'react'
import { Scissors } from 'lucide-react'
import Card from '../components/Card'

// Average hair growth: 0.4mm/day
const GROWTH_PER_DAY_MM = 0.4
const GROWTH_PER_MS = GROWTH_PER_DAY_MM / (24 * 60 * 60 * 1000)

interface Props {
  birthday: string
}

export default function HairGrowth({ birthday }: Props) {
  const [length, setLength] = useState(0)

  useEffect(() => {
    const birth = new Date(birthday)
    let animId: number
    
    const update = () => {
      const now = new Date()
      const diffMs = now.getTime() - birth.getTime()
      // Total mm
      const totalMm = diffMs * GROWTH_PER_MS
      setLength(totalMm)
      animId = requestAnimationFrame(update)
    }
    update()
    return () => cancelAnimationFrame(animId)
  }, [birthday])

  // Convert to meters for display
  const meters = length / 1000

  return (
    <Card
      icon={<Scissors size={18} />}
      title="総毛髪生産長"
      accent="emerald"
      info={
        <>
          <p>ヒトの髪の毛は1日に約0.4mm伸びます。あなたが生まれてから現在までに頭皮から生み出された髪の毛の総延長（切った分を含む）はこれくらいです。</p>
        </>
      }
    >
      <div className="flex flex-col h-full justify-center">
        <p className="counter-value text-3xl font-mono font-bold tabular-nums text-zinc-100 tracking-tight">
          {meters.toFixed(4)}
          <span className="text-sm font-sans font-medium text-zinc-500 ml-2">m</span>
        </p>
        <p className="text-xs text-zinc-600 mt-2">
           (≒ {(length).toFixed(1)} mm)
        </p>
      </div>
    </Card>
  )
}
