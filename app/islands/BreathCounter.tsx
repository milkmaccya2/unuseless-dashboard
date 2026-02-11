import { useState, useEffect, useRef } from 'react'
import Card from '../components/Card'

const BREATHS_PER_MINUTE = 15

export default function BreathCounter() {
  const [count, setCount] = useState(0)
  const startTime = useRef(Date.now())

  useEffect(() => {
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    startTime.current = startOfDay.getTime()

    let animId: number
    const update = () => {
      const elapsed = (Date.now() - startTime.current) / 60_000
      setCount(Math.floor(elapsed * BREATHS_PER_MINUTE))
      animId = requestAnimationFrame(update)
    }
    update()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <Card emoji="🫁" title="呼吸">
      <p className="text-3xl font-mono font-bold tabular-nums">
        今日 {count.toLocaleString()}回
      </p>
      <p className="text-xs text-gray-500 mt-1">平均 {BREATHS_PER_MINUTE}回/分 で推定</p>
    </Card>
  )
}
