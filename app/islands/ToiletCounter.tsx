import { useState, useEffect } from 'react'
import Card from '../components/Card'

const WORLD_POPULATION = 8_100_000_000
const BASE_RATE = 0.035 // 3.5%

export default function ToiletCounter() {
  const [count, setCount] = useState(Math.floor(WORLD_POPULATION * BASE_RATE))

  useEffect(() => {
    const interval = setInterval(() => {
      const fluctuation = (Math.random() - 0.5) * 0.002
      const rate = BASE_RATE + fluctuation
      setCount(Math.floor(WORLD_POPULATION * rate))
    }, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card emoji="🚽" title="今トイレ中の地球人">
      <p className="text-3xl font-mono font-bold tabular-nums">
        約{(count / 100_000_000).toFixed(1)}億人
      </p>
      <p className="text-xs text-gray-500 mt-1">世界人口81億 × 平均滞在率約3.5%</p>
    </Card>
  )
}
