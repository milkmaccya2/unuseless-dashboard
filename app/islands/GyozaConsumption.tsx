import { useState, useEffect } from 'react'
import { Utensils } from 'lucide-react'
import Card from '../components/Card'

// Data: Local Gyoza Expenditure/Volume
// Top (Miyazaki, Utsunomiya, Hamamatsu, Kyoto): ~90-100 pieces/year
// Avg: ~40 pieces/year
// Low: ~20 pieces/year

const AVG_PIECES = 42
const TOP_PIECES = 95
const LOW_PIECES = 20

// 09: Tochigi (Utsunomiya), 22: Shizuoka (Hamamatsu), 45: Miyazaki, 26: Kyoto
const TOP_PREFS = ['09', '22', '45', '26']
const LOW_PREFS = ['06', '32', '39'] // Yamagata, Shimane, Kochi (low in some rankings)

interface Props {
  birthday: string
  prefecture: string
}

export default function GyozaConsumption({ birthday, prefecture }: Props) {
  const [pieces, setPieces] = useState(0)

  useEffect(() => {
    const birth = new Date(birthday)
    const now = new Date()
    const diffYears = (now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
    
    let rate = AVG_PIECES
    if (TOP_PREFS.includes(prefecture)) rate = TOP_PIECES
    if (LOW_PREFS.includes(prefecture)) rate = LOW_PIECES

    setPieces(diffYears * rate)
  }, [birthday, prefecture])

  const calories = pieces * 40 // Approx 40kcal per gyoza

  const getMessage = () => {
    if (TOP_PREFS.includes(prefecture)) {
       if (prefecture === '09') return '宇都宮の誇りを胸に刻んだ数です。'
       if (prefecture === '22') return '浜松の情熱が生んだ数字です。'
       if (prefecture === '45') return '宮崎の隠れた実力が光ります。'
       return 'さすが餃子大国。'
    }
    return '一般的な日本人のペースです。'
  }

  return (
    <Card
      icon={<Utensils size={18} />}
      title="餃子消費量"
      accent="yellow"
      info={
        <>
          <p>「餃子戦争」の激戦区（栃木・静岡・宮崎・京都）出身者は、一般人の2倍以上のペースで餃子を摂取しています。</p>
          <p>全国平均: 約42個/年, 上位県: 約95個/年</p>
          <p className="mt-1"><a href="https://www.stat.go.jp/data/kakei/" target="_blank" rel="noopener noreferrer" className="underline text-yellow-400 hover:text-yellow-500 transition-colors">出典: 総務省統計局「家計調査」</a></p>
        </>
      }
    >
      <div className="flex flex-col h-full justify-center">
        <p className="counter-value text-3xl font-mono font-bold tabular-nums text-zinc-100 tracking-tight">
          {Math.floor(pieces).toLocaleString()}
          <span className="text-sm font-sans font-medium text-zinc-500 ml-2">個</span>
        </p>
        <p className="text-xs text-zinc-600 mt-2">
           (累計 {calories.toLocaleString()} kcal)
        </p>
      </div>
    </Card>
  )
}
