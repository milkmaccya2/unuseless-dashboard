import { useState, useEffect, useRef } from 'react'
import { PiEyeBold } from 'react-icons/pi'
import Card from '../components/Card'

const BLINKS_PER_MINUTE = 17

export default function BlinkCounter() {
  const [count, setCount] = useState(0)
  const startTime = useRef(Date.now())

  useEffect(() => {
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    startTime.current = startOfDay.getTime()

    let animId: number
    const update = () => {
      const elapsed = (Date.now() - startTime.current) / 60_000
      setCount(Math.floor(elapsed * BLINKS_PER_MINUTE))
      animId = requestAnimationFrame(update)
    }
    update()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <Card icon={<PiEyeBold />} title="まばたき">
      <p className="counter-value text-3xl font-mono font-bold tabular-nums text-indigo-300">
        今日 {count.toLocaleString()}回
      </p>
      <p className="text-xs text-gray-600 mt-2">平均 {BLINKS_PER_MINUTE}回/分 で推定</p>
    </Card>
  )
}
