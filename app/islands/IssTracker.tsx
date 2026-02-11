import { useState, useEffect } from 'react'
import Card from '../components/Card'

interface Props {
  latitude: number | null
  longitude: number | null
}

function haversineDistance(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const R = 6371 // 地球の半径 (km)
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export default function IssTracker({ latitude, longitude }: Props) {
  const [issLat, setIssLat] = useState<number | null>(null)
  const [issLng, setIssLng] = useState<number | null>(null)
  const [distance, setDistance] = useState<number | null>(null)

  useEffect(() => {
    const fetchIss = async () => {
      try {
        const res = await fetch('/api/iss')
        const data = await res.json()
        const lat = parseFloat(data.iss_position.latitude)
        const lng = parseFloat(data.iss_position.longitude)
        setIssLat(lat)
        setIssLng(lng)

        if (latitude !== null && longitude !== null) {
          setDistance(haversineDistance(latitude, longitude, lat, lng))
        }
      } catch {
        // ignore
      }
    }

    fetchIss()
    const interval = setInterval(fetchIss, 30_000) // 30秒ごと
    return () => clearInterval(interval)
  }, [latitude, longitude])

  const isVisible = distance !== null && distance < 2000

  return (
    <Card emoji="🛰" title="ISS（国際宇宙ステーション）" wide>
      {distance !== null ? (
        <>
          <p className="text-3xl font-mono font-bold tabular-nums">
            あなたから {Math.round(distance).toLocaleString()}km 先
          </p>
          <p className={`text-lg mt-1 ${isVisible ? 'text-green-400' : 'text-gray-400'}`}>
            {isVisible ? '見えるかも！空を見上げてみて！' : '見えません。残念。'}
          </p>
        </>
      ) : latitude === null ? (
        <p className="text-xl text-gray-500">位置情報を取得中...</p>
      ) : (
        <p className="text-xl text-gray-500">ISSの位置を取得中...</p>
      )}
      {issLat !== null && issLng !== null && (
        <p className="text-xs text-gray-500 mt-1">
          ISS現在位置: {issLat.toFixed(2)}°, {issLng.toFixed(2)}°（30秒ごとに更新）
        </p>
      )}
    </Card>
  )
}
