import { useState, useEffect } from 'react'
import { Eye } from '../components/icons'
import Card from '../components/Card'

const BLINKS_PER_MINUTE = 17
const SLEEP_HOURS = 7
const AWAKE_MINUTES_PER_DAY = (24 - SLEEP_HOURS) * 60
const SLEEP_END_HOUR = 7
const OKU = 100_000_000

function formatOku(n: number): string | null {
  if (n < OKU) return null
  return (n / OKU).toFixed(2)
}

interface Props {
  birthday: string
}

export default function BlinkCounter({ birthday }: Props) {
  const [lifetime, setLifetime] = useState(0)
  const [today, setToday] = useState(0)

  useEffect(() => {
    const birth = new Date(birthday)

    let animId: number
    const update = () => {
      const now = new Date()

      // Today: awake minutes since SLEEP_END_HOUR
      const hours = now.getHours() + now.getMinutes() / 60
      const awakeMinutesToday =
        hours < SLEEP_END_HOUR ? 0 : (hours - SLEEP_END_HOUR) * 60
      setToday(Math.floor(awakeMinutesToday * BLINKS_PER_MINUTE))

      // Lifetime: full days × awake blinks + today's blinks
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const fullDays = Math.max(0, (startOfToday.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))
      const lifetimeBlinks =
        Math.floor(fullDays * AWAKE_MINUTES_PER_DAY * BLINKS_PER_MINUTE) +
        Math.floor(awakeMinutesToday * BLINKS_PER_MINUTE)
      setLifetime(lifetimeBlinks)

      animId = requestAnimationFrame(update)
    }
    update()
    return () => cancelAnimationFrame(animId)
  }, [birthday])

  const oku = formatOku(lifetime)

  return (
    <Card
      icon={<Eye size={18} />}
      title="まばたき"
      accent="zinc"
      info={
        <>
          <p>人は1分間に平均{BLINKS_PER_MINUTE}回まばたきをしています。1回のまばたきは約0.3秒。つまり起きている間の約10%は目を閉じている計算になります。</p>
          <p>70歳まで生きると約5億回、まばたきだけで累計2.5年分も目を閉じていることに。</p>
          <p>睡眠中({SLEEP_HOURS}時間)はまばたきしないので除外して計算しています。</p>
          <p className="mt-1"><a href="https://www.nidek.co.jp/eyestories/vol-21-%E3%81%BE%E3%81%B0%E3%81%9F%E3%81%8D%E3%81%AE%E5%BD%B9%E5%89%B2/" target="_blank" rel="noopener noreferrer" className="underline text-emerald-400 hover:text-emerald-500 transition-colors">出典: ニデック「まばたきの役割」</a></p>
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
