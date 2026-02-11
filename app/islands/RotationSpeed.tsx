import Card from '../components/Card'

const EQUATOR_SPEED_KMH = 1_670

interface Props {
  latitude: number | null
}

export default function RotationSpeed({ latitude }: Props) {
  if (latitude === null) {
    return (
      <Card emoji="🌏" title="地球の自転速度">
        <p className="text-xl text-gray-500">位置情報を取得中...</p>
      </Card>
    )
  }

  const speed = EQUATOR_SPEED_KMH * Math.cos((latitude * Math.PI) / 180)

  return (
    <Card emoji="🌏" title="地球の自転速度">
      <p className="text-3xl font-mono font-bold tabular-nums">
        {Math.round(speed).toLocaleString()} km/h
      </p>
      <p className="text-xs text-gray-500 mt-1">
        緯度{latitude.toFixed(1)}°での速度（赤道で{EQUATOR_SPEED_KMH.toLocaleString()} km/h）
      </p>
    </Card>
  )
}
