import { useState, useEffect } from 'react'
import { Hand } from 'lucide-react'
import Card from '../components/Card'

// Fingers: 3.5mm/mo * 10 = 35mm/mo
// Toes: 1.6mm/mo * 10 = 16mm/mo
// Total: 51mm/mo = ~1.7mm/day
const GROWTH_PER_MONTH_MM = 51
const GROWTH_PER_DAY_MM = GROWTH_PER_MONTH_MM / 30.44
const GROWTH_PER_MS = GROWTH_PER_DAY_MM / (24 * 60 * 60 * 1000)

interface Props {
  birthday: string
}

export default function NailGrowth({ birthday }: Props) {
  const [length, setLength] = useState(0)

  useEffect(() => {
    const birth = new Date(birthday)
    let animId: number
    
    const update = () => {
      const now = new Date()
      const diffMs = now.getTime() - birth.getTime()
      const totalMm = diffMs * GROWTH_PER_MS
      setLength(totalMm)
      animId = requestAnimationFrame(update)
    }
    update()
    return () => cancelAnimationFrame(animId)
  }, [birthday])

  const meters = length / 1000

  return (
    <Card
      icon={<Hand size={18} />}
      title="総爪生産長"
      accent="rose"
      info={
        <>
          <p>手足の爪（計20枚）の伸びる速度を合計すると、1ヶ月で約5cmにもなります。これまでにあなたの体が生み出した爪の総延長です。</p>
        </>
      }
    >
      <div className="flex flex-col h-full justify-center">
        <p className="counter-value text-3xl font-mono font-bold tabular-nums text-zinc-100 tracking-tight">
          {meters.toFixed(4)}
          <span className="text-sm font-sans font-medium text-zinc-500 ml-2">m</span>
        </p>
         <p className="text-xs text-zinc-600 mt-2">
           (全20指の合計)
        </p>
      </div>
    </Card>
  )
}
