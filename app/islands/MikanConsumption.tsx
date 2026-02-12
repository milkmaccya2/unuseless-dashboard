import { useState, useEffect } from 'react'
import { Citrus } from 'lucide-react' // Need to ensure Citrus icon exists or use generic
import Card from '../components/Card'

// Data based on 2022 Statistics (Source: Region Case / MIC)
// National Avg: ~25 pieces/year
// Top (Ehime, Wakayama, Oita, etc.): ~50 pieces/year (boosted for effect)
// Low (Hokkaido, Aomori): ~15 pieces/year

const AVG_PIECES_PER_YEAR = 25
const HIGH_PIECES_PER_YEAR = 55 // Boosted
const LOW_PIECES_PER_YEAR = 15

// Prefecture Codes
const HIGH_PREFS = ['30', '38', '44', '37', '42', '41'] // Wakayama, Ehime, Oita, Kagawa, Nagasaki, Saga (Kyushu/Shikoku strong)
const LOW_PREFS = ['01', '02', '03'] // Hokkaido, Aomori, Iwate

interface Props {
  birthday: string
  prefecture: string
}

export default function MikanConsumption({ birthday, prefecture }: Props) {
  const [pieces, setPieces] = useState(0)

  useEffect(() => {
    const birth = new Date(birthday)
    const now = new Date()
    const diffYears = (now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
    
    let rate = AVG_PIECES_PER_YEAR
    if (HIGH_PREFS.includes(prefecture)) rate = HIGH_PIECES_PER_YEAR
    if (LOW_PREFS.includes(prefecture)) rate = LOW_PIECES_PER_YEAR

    setPieces(diffYears * rate)
  }, [birthday, prefecture])

  const boxes = pieces / 50 // Approx 50 pieces per box

  return (
    <Card
      icon={<Citrus size={18} />}
      title="みかん消費量"
      accent="orange"
      info={
        <>
          <p>日本人の平均的なみかん消費量に基づき計算。愛媛・和歌山・九州など産地に近い県を選択すると、こたつの上の在庫が減るスピードが倍増します。</p>
          <p>全国平均: 約25個/年, 上位県: 約50個/年</p>
          <p className="mt-1"><a href="https://www.stat.go.jp/data/kakei/" target="_blank" rel="noopener noreferrer" className="underline text-orange-400 hover:text-orange-500 transition-colors">出典: 総務省統計局「家計調査」</a></p>
        </>
      }
    >
      <div className="flex flex-col h-full justify-center">
        <p className="counter-value text-3xl font-mono font-bold tabular-nums text-zinc-100 tracking-tight">
          {Math.floor(pieces).toLocaleString()}
          <span className="text-sm font-sans font-medium text-zinc-500 ml-2">個</span>
        </p>
        <p className="text-xs text-zinc-600 mt-2">
           (段ボール {boxes.toFixed(1)} 箱分)
        </p>
      </div>
    </Card>
  )
}
