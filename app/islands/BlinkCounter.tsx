import { useState, useEffect, useRef } from 'react'
import Card from '../components/Card'

const BLINKS_PER_MINUTE = 17

export default function BlinkCounter() {
  const [count, setCount] = useState(0)
  const startTime = useRef(Date.now())

  useEffect(() => {
    // 今日の0時からの経過分を初期値にする
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const minutesSinceMidnight = (now.getTime() - startOfDay.getTime()) / 60_000
    const initialBlinks = Math.floor(minutesSinceMidnight * BLINKS_PER_MINUTE)
    startTime.current = startOfDay.getTime()

    let animId: number
    const update = () => {
      const elapsed = (Date.now() - startTime.current) / 60_000
      setCount(Math.floor(elapsed * BLINKS_PER_MINUTE))
      animId = requestAnimationFrame(update)
    }
    setCount(initialBlinks)
    animId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <Card emoji="👁" title="まばたき">
      <p className="text-3xl font-mono font-bold tabular-nums">
        今日 {count.toLocaleString()}回
      </p>
      <p className="text-xs text-gray-500 mt-1">平均 {BLINKS_PER_MINUTE}回/分 で推定</p>
    </Card>
  )
}
