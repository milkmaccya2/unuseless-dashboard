import { useState, useEffect } from 'react'
import { Droplets } from 'lucide-react'
import Card from '../components/Card'

// 1.5L / day
const LITERS_PER_DAY = 1.5
const LITERS_PER_MS = LITERS_PER_DAY / (24 * 60 * 60 * 1000)

interface Props {
  birthday: string
}

export default function SalivaLake({ birthday }: Props) {
  const [liters, setLiters] = useState(0)

  useEffect(() => {
    const birth = new Date(birthday)
    let animId: number
    
    const update = () => {
      const now = new Date()
      const diffMs = now.getTime() - birth.getTime()
      setLiters(diffMs * LITERS_PER_MS)
      animId = requestAnimationFrame(update)
    }
    update()
    return () => cancelAnimationFrame(animId)
  }, [birthday])

  // Bathtub approx 200L
  const bathtubs = liters / 200

  return (
    <Card
      icon={<Droplets size={18} />}
      title="唾液生産量"
      accent="blue"
      info={
        <>
          <p>人は1日に約1.5リットルの唾液を分泌します。これまでにあなたが生成した唾液の総量です。</p>
          <p>一生（80年）では約43,800リットル、25mプールいっぱいになることもあります。</p>
        </>
      }
    >
      <div className="flex flex-col h-full justify-center">
        <p className="counter-value text-3xl font-mono font-bold tabular-nums text-zinc-100 tracking-tight">
          {liters.toFixed(2)}
          <span className="text-sm font-sans font-medium text-zinc-500 ml-2">L</span>
        </p>
        <p className="text-xs text-zinc-600 mt-2">
           ≒ お風呂 {bathtubs.toFixed(1)} 杯分
        </p>
      </div>
    </Card>
  )
}
