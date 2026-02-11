import { useState, useEffect } from 'react'
import Card from '../components/Card'
import BlinkCounter from './BlinkCounter'
import BreathCounter from './BreathCounter'
import ToiletCounter from './ToiletCounter'
import RiceCounter from './RiceCounter'
import RotationSpeed from './RotationSpeed'
import SeaLevel from './SeaLevel'
import IssTracker from './IssTracker'

interface GeoLocation {
  latitude: number
  longitude: number
}

export default function Dashboard() {
  const [location, setLocation] = useState<GeoLocation | null>(null)
  const [geoError, setGeoError] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError('位置情報がサポートされていません')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        })
      },
      () => {
        setGeoError('位置情報を取得できませんでした')
      }
    )
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BlinkCounter />
      <BreathCounter />
      <ToiletCounter />
      <RiceCounter />
      <RotationSpeed latitude={location?.latitude ?? null} />
      <SeaLevel latitude={location?.latitude ?? null} longitude={location?.longitude ?? null} />
      <IssTracker latitude={location?.latitude ?? null} longitude={location?.longitude ?? null} />
      {geoError && (
        <Card emoji="📍" title="位置情報">
          <p className="text-yellow-400 text-sm">{geoError}</p>
        </Card>
      )}
    </div>
  )
}
