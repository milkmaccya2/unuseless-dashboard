import { Globe } from 'lucide-react'
import Card from '../components/Card'

const EQUATOR_SPEED_KMH = 1_670

interface Props {
  latitude: number | null
}

export default function RotationSpeed({ latitude }: Props) {
  if (latitude === null) {
    return (
      <Card icon={<Globe size={20} />} title="地球の自転速度">
        <p className="text-xl text-gray-600">位置情報を取得中...</p>
      </Card>
    )
  }

  const speed = EQUATOR_SPEED_KMH * Math.cos((latitude * Math.PI) / 180)

  return (
    <Card icon={<Globe size={20} />} title="地球の自転速度">
      <p className="counter-value text-3xl font-mono font-bold tabular-nums text-cyan-300">
        {Math.round(speed).toLocaleString()} km/h
      </p>
      <p className="text-xs text-gray-600 mt-2">
        緯度{latitude.toFixed(1)}° での速度（赤道で{EQUATOR_SPEED_KMH.toLocaleString()} km/h）
      </p>
    </Card>
  )
}
