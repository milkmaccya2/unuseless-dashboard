import { useState, useEffect } from 'react'
import Card from '../components/Card'

interface Props {
  latitude: number | null
  longitude: number | null
}

export default function SeaLevel({ latitude, longitude }: Props) {
  const [elevation, setElevation] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (latitude === null || longitude === null) return

    setLoading(true)
    fetch(`/api/elevation?lat=${latitude}&lng=${longitude}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.elevation && data.elevation[0] !== undefined) {
          setElevation(data.elevation[0])
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [latitude, longitude])

  if (latitude === null || longitude === null) {
    return (
      <Card emoji="🌊" title="海面上昇で沈む水位">
        <p className="text-xl text-gray-500">位置情報を取得中...</p>
      </Card>
    )
  }

  return (
    <Card emoji="🌊" title="海面上昇で沈む水位">
      {loading ? (
        <p className="text-xl text-gray-500">標高を取得中...</p>
      ) : elevation !== null ? (
        <>
          <p className="text-3xl font-mono font-bold tabular-nums">
            海面+{Math.round(elevation)}m で水没
          </p>
          <p className="text-xs text-gray-500 mt-1">
            現在の標高: 約{Math.round(elevation)}m
          </p>
        </>
      ) : (
        <p className="text-xl text-gray-500">標高データを取得できませんでした</p>
      )}
    </Card>
  )
}
