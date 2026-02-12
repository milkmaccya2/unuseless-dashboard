import { useState, useEffect } from 'react'
import { Rocket } from '../components/icons'
import Card from '../components/Card'

interface Props {
  latitude: number | null
  longitude: number | null
}

function haversineDistance(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const R = 6371
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
    const interval = setInterval(fetchIss, 30_000)
    return () => clearInterval(interval)
  }, [latitude, longitude])

  const isVisible = distance !== null && distance < 2000

  return (
    <Card
      icon={<Rocket size={18} />}
      title="ISS（国際宇宙ステーション）"
      wide
      accent="zinc"
      info={
        <>
          <p>ISSは高度約400kmを時速約28,000kmで周回しています。地球を約90分で1周するので、1日に約16回も日の出と日の入りを見られます。</p>
          <p>2,000km以内にいるときは肉眼で見える可能性があります（明るい星のように動く光）。</p>
          {issLat !== null && issLng !== null && (
            <p>現在のISS位置: 緯度{issLat.toFixed(2)}°, 経度{issLng.toFixed(2)}°（30秒ごとに更新）</p>
          )}
          <p className="mt-1"><a href="http://open-notify.org/Open-Notify-API/ISS-Location-Now/" target="_blank" rel="noopener noreferrer" className="underline text-emerald-400 hover:text-emerald-500 transition-colors">出典: Open Notify ISS API</a></p>
        </>
      }
    >
      <div className="flex flex-col h-full justify-center">
        {distance !== null ? (
          <div className="flex flex-col gap-1">
            <p className="counter-value text-3xl font-mono font-bold tabular-nums text-zinc-100 tracking-tight">
              {Math.round(distance).toLocaleString()}
              <span className="text-sm font-sans font-medium text-zinc-500 ml-2">km 先</span>
            </p>
            <p className={`text-xs font-medium uppercase tracking-wider ${isVisible ? 'text-emerald-400' : 'text-zinc-600'}`}>
              {isVisible ? 'VISIBILITY: POSSIBLE' : 'VISIBILITY: NONE'}
            </p>
          </div>
        ) : latitude === null ? (
          <div className="h-8 w-3/4 rounded-md bg-zinc-800 animate-pulse" />
        ) : (
          <div className="h-8 w-3/4 rounded-md bg-zinc-800 animate-pulse" />
        )}
      </div>
    </Card>
  )
}
