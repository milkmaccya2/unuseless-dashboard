import { useState, useEffect } from 'react'
import { Bath } from '../components/icons'
import Card from '../components/Card'

const WORLD_POPULATION = 8_100_000_000
const BASE_RATE = 0.035

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

  // 万人単位で表示（例: 28,350万人）
  const manNin = Math.round(count / 10_000)

  return (
    <Card icon={<Bath size={18} />} title="今トイレ中の地球人" accent="amber">
      <p className="counter-value text-2xl sm:text-3xl font-mono font-bold tabular-nums text-gray-800">
        ~{manNin.toLocaleString()}
        <span className="text-sm font-sans font-normal text-gray-400 ml-1.5">万人</span>
      </p>
      <p className="text-[11px] text-gray-400 mt-3">
        世界人口81億 × 滞在率 ~3.5%（1日約50分 ÷ 1440分）
        <br />
        <a href="https://studyfinds.org/average-adult-will-spend-416-days-bathroom/" target="_blank" rel="noopener noreferrer" className="underline text-amber-400 hover:text-amber-500 transition-colors">出典: Study Finds「416 days in the bathroom」</a>
      </p>
    </Card>
  )
}
