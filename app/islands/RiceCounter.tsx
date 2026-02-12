import { useState, useEffect } from 'react'
import { UtensilsCrossed } from '../components/icons'
import Card from '../components/Card'

// 日本人の平均米消費量: 年間約53kg → 1日約145g → 約6,600粒/日
const GRAIN_WEIGHT_G = 0.022
const ANNUAL_CONSUMPTION_KG = 53
const GRAINS_PER_DAY = Math.round(
  (ANNUAL_CONSUMPTION_KG * 1000) / 365 / GRAIN_WEIGHT_G
)
// 離乳食開始: 生後5ヶ月
const RICE_START_DAYS = 5 * 30
const OKU = 100_000_000
const MAN = 10_000

function formatLarge(n: number): { value: string; unit: string } | null {
  if (n >= OKU) return { value: (n / OKU).toFixed(2), unit: '億' }
  if (n >= MAN * 100) return { value: Math.round(n / MAN).toLocaleString(), unit: '万' }
  return null
}

interface Props {
  birthday: string
  prefecture: string
}

// Top Consumers: Fukui (18), Toyama (16), Niigata (15), Yamagata (06), Akita (05), Hokkaido (01)
const RICE_LOVERS = ['18', '16', '15', '06', '05', '01']
const RICE_LOVER_MULTIPLIER = 1.4 // ~75-80kg vs 53kg

export default function RiceCounter({ birthday, prefecture }: Props) {
  const [grains, setGrains] = useState(0)

  useEffect(() => {
    const birth = new Date(birthday)

    let animId: number
    const update = () => {
      const now = new Date()
      const totalDays = (now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)
      const riceDays = Math.max(0, totalDays - RICE_START_DAYS)
      let dailyGrains = GRAINS_PER_DAY
      if (RICE_LOVERS.includes(prefecture)) {
        dailyGrains = Math.round(dailyGrains * RICE_LOVER_MULTIPLIER)
      }
      setGrains(Math.floor(riceDays * dailyGrains))
      animId = requestAnimationFrame(update)
    }
    update()
    return () => cancelAnimationFrame(animId)
  }, [birthday])

  const large = formatLarge(grains)

  return (
    <Card
      icon={<UtensilsCrossed size={18} />}
      title="米粒消費量"
      accent="zinc"
      info={
        <>
          <p>日本人は年間約{ANNUAL_CONSUMPTION_KG}kgのお米を食べています。お米1粒の重さは約{GRAIN_WEIGHT_G}gなので、1日あたり約{GRAINS_PER_DAY.toLocaleString()}粒を食べている計算です。</p>
          {RICE_LOVERS.includes(prefecture) && (
            <p className="text-emerald-300 font-bold mt-1">※北陸・東北・北海道などの米どころ出身者は、平均の1.4倍（推計）のご飯を食べていることになります。</p>
          )}
          <p>ちなみに1960年代は年間118kgも食べていたので、今の倍以上。お米離れが進んでいるんですね。</p>
          <p>赤ちゃんは離乳食が始まる生後5ヶ月頃からお米デビュー。それ以前は除外しています。</p>
          <p className="mt-1 flex flex-col gap-1">
            <a href="https://www.maff.go.jp/j/heya/sodan/1808/01.html" target="_blank" rel="noopener noreferrer" className="underline text-emerald-400 hover:text-emerald-500 transition-colors">出典: 農林水産省「お米の1人当たりの消費量」</a>
            <a href="https://www.stat.go.jp/data/kakei/" target="_blank" rel="noopener noreferrer" className="underline text-emerald-400 hover:text-emerald-500 transition-colors">参考: 総務省統計局「家計調査」（地域別消費）</a>
          </p>
        </>
      }
    >
      <div className="flex flex-col h-full justify-center">
        <p className="counter-value text-3xl font-mono font-bold tabular-nums text-zinc-100 tracking-tight">
          {grains.toLocaleString()}
          <span className="text-sm font-sans font-medium text-zinc-500 ml-2">粒</span>
        </p>
        {large && (
          <p className="counter-value text-sm font-mono font-bold tabular-nums text-zinc-500 mt-2">
            ≒ {large.value}<span className="text-xs font-sans font-normal text-zinc-600 ml-1">{large.unit}粒</span>
          </p>
        )}
      </div>
    </Card>
  )
}
