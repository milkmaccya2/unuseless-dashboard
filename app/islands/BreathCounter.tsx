import { useState, useEffect } from 'react'
import { Wind } from '../components/icons'
import Card from '../components/Card'

const BREATHS_AWAKE = 15
const BREATHS_SLEEP = 12
const SLEEP_HOURS = 7
const SLEEP_END_HOUR = 7
const BREATHS_PER_DAY =
  SLEEP_HOURS * 60 * BREATHS_SLEEP + (24 - SLEEP_HOURS) * 60 * BREATHS_AWAKE
const OKU = 100_000_000

function formatOku(n: number): string | null {
  if (n < OKU) return null
  return (n / OKU).toFixed(2)
}

interface Props {
  birthday: string
}

export default function BreathCounter({ birthday }: Props) {
  const [lifetime, setLifetime] = useState(0)
  const [today, setToday] = useState(0)

  useEffect(() => {
    const birth = new Date(birthday)

    let animId: number
    const update = () => {
      const now = new Date()
      const hours = now.getHours() + now.getMinutes() / 60

      // Today
      let sleepMinutes: number
      let awakeMinutes: number
      if (hours < SLEEP_END_HOUR) {
        sleepMinutes = hours * 60
        awakeMinutes = 0
      } else {
        sleepMinutes = SLEEP_END_HOUR * 60
        awakeMinutes = (hours - SLEEP_END_HOUR) * 60
      }
      const todayBreaths = Math.floor(
        sleepMinutes * BREATHS_SLEEP + awakeMinutes * BREATHS_AWAKE
      )
      setToday(todayBreaths)

      // Lifetime
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const fullDays = Math.max(0, (startOfToday.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))
      setLifetime(Math.floor(fullDays * BREATHS_PER_DAY) + todayBreaths)

      animId = requestAnimationFrame(update)
    }
    update()
    return () => cancelAnimationFrame(animId)
  }, [birthday])

  const oku = formatOku(lifetime)

  return (
    <Card
      icon={<Wind size={18} />}
      title="呼吸"
      accent="zinc"
      info={
        <>
          <p>起きている間は1分間に約{BREATHS_AWAKE}回、寝ている間は体がリラックスして約{BREATHS_SLEEP}回に減ります。</p>
          <p>一生で約6〜7億回呼吸すると言われています。1回の呼吸で約500mlの空気を吸うので、1日でお風呂約5杯分の空気を出し入れしている計算です。</p>
          <p>睡眠時間は{SLEEP_HOURS}時間（0〜7時）として計算しています。</p>
          <p className="mt-1"><a href="https://www.kango-roo.com/learning/3992/" target="_blank" rel="noopener noreferrer" className="underline text-emerald-400 hover:text-emerald-500 transition-colors">出典: 看護roo!「呼吸測定」</a></p>
        </>
      }
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <p className="counter-value text-3xl font-mono font-bold tabular-nums text-zinc-100 tracking-tight">
            {lifetime.toLocaleString()}
            <span className="text-sm font-sans font-medium text-zinc-500 ml-2">回</span>
          </p>
          {oku && (
            <p className="counter-value text-sm font-mono font-bold tabular-nums text-zinc-500 mt-1">≒ {oku}<span className="text-xs font-sans font-normal text-zinc-600 ml-1">億回</span></p>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-zinc-800/50 flex justify-between items-end">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Today</p>
          <p className="text-xl font-mono font-semibold tabular-nums text-zinc-300">
            {today.toLocaleString()}
            <span className="text-xs font-sans font-normal text-zinc-600 ml-1">回</span>
          </p>
        </div>
      </div>
    </Card>
  )
}
