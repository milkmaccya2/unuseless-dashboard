import { Globe } from '../components/icons'
import Card from '../components/Card'

const EQUATOR_SPEED_KMH = 1_670

interface Props {
  latitude: number | null
}

export default function RotationSpeed({ latitude }: Props) {
  if (latitude === null) {
    return (
      <Card icon={<Globe size={18} />} title="地球の自転速度" accent="zinc">
        <div className="h-10 w-3/4 rounded-md bg-zinc-800 animate-pulse" />
      </Card>
    )
  }

  const speed = EQUATOR_SPEED_KMH * Math.cos((latitude * Math.PI) / 180)

  return (
    <Card
      icon={<Globe size={18} />}
      title="地球の自転速度"
      accent="zinc"
      info={
        <>
          <p>地球は24時間で1回転しています。赤道上では時速{EQUATOR_SPEED_KMH.toLocaleString()}km、音速の約1.4倍という猛スピードです。</p>
          <p>でも緯度が高くなるほど回転の円が小さくなるので遅くなります。あなたの位置（緯度{latitude.toFixed(1)}°）での速度を表示しています。</p>
          <p>こんなに速く動いているのに感じないのは、大気も一緒に動いているから。</p>
          <p className="mt-1"><a href="https://ja.wikipedia.org/wiki/%E5%9C%B0%E7%90%83%E3%81%AE%E8%87%AA%E8%BB%A2" target="_blank" rel="noopener noreferrer" className="underline text-emerald-400 hover:text-emerald-500 transition-colors">出典: Wikipedia「地球の自転」</a></p>
        </>
      }
    >
      <div className="flex flex-col h-full justify-center">
        <p className="counter-value text-3xl font-mono font-bold tabular-nums text-zinc-100 tracking-tight">
          {Math.round(speed).toLocaleString()}
          <span className="text-sm font-sans font-medium text-zinc-500 ml-2">km/h</span>
        </p>
      </div>
    </Card>
  )
}
