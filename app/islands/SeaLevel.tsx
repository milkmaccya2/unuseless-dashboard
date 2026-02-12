import { useState, useEffect } from 'react'
import { Waves } from '../components/icons'
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
      .catch((e) => console.error(e))
      .finally(() => setLoading(false))
  }, [latitude, longitude])

  if (latitude === null || longitude === null) {
    return (
      <Card icon={<Waves size={18} />} title="海面上昇での水没" accent="zinc">
        <div className="h-10 w-3/4 rounded-md bg-zinc-800 animate-pulse" />
      </Card>
    )
  }

  return (
    <Card
      icon={<Waves size={18} />}
      title="海面上昇での水没"
      accent="zinc"
      info={
        <>
          <p>あなたの現在地の標高は約{elevation !== null ? Math.round(elevation) : '—'}m。海面がこの高さ分上昇すると、今いる場所は水没します。</p>
          <p>IPCCの予測では、2100年までに最大1m以上の海面上昇があり得るとされています。南極の氷が全部溶けると約58m上昇。</p>
          <p className="mt-1"><a href="https://open-meteo.com/en/docs/elevation-api" target="_blank" rel="noopener noreferrer" className="underline text-emerald-400 hover:text-emerald-500 transition-colors">出典: Open-Meteo Elevation API</a></p>
        </>
      }
    >
      <div className="flex flex-col h-full justify-center">
        {loading ? (
          <div className="h-8 w-1/2 rounded-md bg-zinc-800 animate-pulse" />
        ) : elevation !== null ? (
          <p className="counter-value text-3xl font-mono font-bold tabular-nums text-zinc-100 tracking-tight">
            +{Math.round(elevation)}
            <span className="text-sm font-sans font-medium text-zinc-500 ml-2">m で水没</span>
          </p>
        ) : (
          <p className="text-sm text-zinc-500">標高データを取得できませんでした</p>
        )}
      </div>
    </Card>
  )
}
