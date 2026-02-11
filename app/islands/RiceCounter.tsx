import { useState, useEffect, useCallback } from 'react'
import Card from '../components/Card'

const GRAINS_PER_MEAL = 3_250
const MEALS_PER_DAY = 3
const STORAGE_KEY = 'useless-dashboard-birthday'

export default function RiceCounter() {
  const [birthday, setBirthday] = useState<string>('')
  const [grains, setGrains] = useState<number | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setBirthday(saved)
  }, [])

  const calcGrains = useCallback((birthStr: string) => {
    if (!birthStr) return null
    const birth = new Date(birthStr)
    const now = new Date()
    const days = (now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)
    if (days < 0) return null
    return Math.floor(days * MEALS_PER_DAY * GRAINS_PER_MEAL)
  }, [])

  useEffect(() => {
    if (!birthday) {
      setGrains(null)
      return
    }

    let animId: number
    const update = () => {
      setGrains(calcGrains(birthday))
      animId = requestAnimationFrame(update)
    }
    update()
    return () => cancelAnimationFrame(animId)
  }, [birthday, calcGrains])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setBirthday(val)
    if (val) {
      localStorage.setItem(STORAGE_KEY, val)
    }
  }

  return (
    <Card emoji="🍚" title="食べたご飯の粒数">
      {grains !== null ? (
        <p className="text-3xl font-mono font-bold tabular-nums">
          {grains.toLocaleString()}粒
        </p>
      ) : (
        <p className="text-xl text-gray-500">生年月日を入力してね</p>
      )}
      <div className="mt-3">
        <input
          type="date"
          value={birthday}
          onChange={handleChange}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">1食約{GRAINS_PER_MEAL.toLocaleString()}粒 × 1日{MEALS_PER_DAY}食で計算</p>
    </Card>
  )
}
