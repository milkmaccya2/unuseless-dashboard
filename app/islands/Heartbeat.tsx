import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import Card from '../components/Card'

// Avg 80 bpm
const BEATS_PER_MIN = 80
const BEATS_PER_MS = BEATS_PER_MIN / (60 * 1000)

interface Props {
  birthday: string
}

export default function Heartbeat({ birthday }: Props) {
  const [beats, setBeats] = useState(0)

  useEffect(() => {
    const birth = new Date(birthday)
    let animId: number
    
    const update = () => {
      const now = new Date()
      const diffMs = now.getTime() - birth.getTime()
      setBeats(diffMs * BEATS_PER_MS)
      animId = requestAnimationFrame(update)
    }
    update()
    return () => cancelAnimationFrame(animId)
  }, [birthday])

  return (
    <Card
      icon={<Heart size={18} />}
      title="生涯心拍数"
      accent="red"
      info={
        <>
          <p>人間の心臓は平均して1分間に約80回拍動します。あなたが生まれてから今この瞬間までに、心臓が動いた回数の推定値です。</p>
          <p>哺乳類の心臓は一生で約20億回打つと言われていますが、人間は医療の進歩によりそれ以上生きます。</p>
        </>
      }
    >
      <div className="flex flex-col h-full justify-center">
        <p className="counter-value text-3xl font-mono font-bold tabular-nums text-zinc-100 tracking-tight">
          {Math.floor(beats).toLocaleString()}
          <span className="text-sm font-sans font-medium text-zinc-500 ml-2">回</span>
        </p>
        <div className="w-2 h-2 rounded-full bg-red-500 mt-3 animate-pulse" />
      </div>
    </Card>
  )
}
