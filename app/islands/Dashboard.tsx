import { useState, useEffect, useRef } from 'react'
import { MapPin, Cake } from '../components/icons'
import Card from '../components/Card'
import BlinkCounter from './BlinkCounter'
import BreathCounter from './BreathCounter'
import RiceCounter from './RiceCounter'
import RotationSpeed from './RotationSpeed'
import SeaLevel from './SeaLevel'
import IssTracker from './IssTracker'
import HairGrowth from './HairGrowth'
import NailGrowth from './NailGrowth'
import Heartbeat from './Heartbeat'
import SalivaLake from './SalivaLake'
import MikanConsumption from './MikanConsumption'
import GyozaConsumption from './GyozaConsumption'
import { PREFECTURES } from '../utils/prefectures'

const STORAGE_KEY = 'useless-dashboard-birthday'
const STORAGE_KEY_PREF = 'useless-dashboard-prefecture'

interface GeoLocation {
  latitude: number
  longitude: number
}

export default function Dashboard() {
  const container = useRef<HTMLDivElement>(null)
  const [birthday, setBirthday] = useState<string>('')
  const [prefecture, setPrefecture] = useState<string>('')
  const [inputValue, setInputValue] = useState<string>('')
  const [inputPref, setInputPref] = useState<string>('')
  const [location, setLocation] = useState<GeoLocation | null>(null)
  const [geoError, setGeoError] = useState<string | null>(null)

  // Load birthday from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    const savedPref = localStorage.getItem(STORAGE_KEY_PREF)
    if (saved) {
      setBirthday(saved)
      setInputValue(saved)
    } else {
      const today = new Date();
      today.setFullYear(today.getFullYear() - 30);
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      setInputValue(`${year}-${month}-${day}`);
    }
    if (savedPref) {
      setPrefecture(savedPref)
      setInputPref(savedPref)
    }
  }, [])

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation not supported')
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
        setGeoError('Could not retrieve location')
      }
    )
  }, [])

  // Staggered card entrance with Intersection Observer
  useEffect(() => {
    if (!birthday || !container.current) return

    const cards = container.current.querySelectorAll<HTMLElement>('.dashboard-card')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.classList.add('card-visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px -5% 0px' }
    )

    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 50}ms`
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [birthday])

  const handleStart = () => {
    if (!inputValue || !inputPref) return
    localStorage.setItem(STORAGE_KEY, inputValue)
    localStorage.setItem(STORAGE_KEY_PREF, inputPref)
    setBirthday(inputValue)
    setPrefecture(inputPref)
  }

  // Onboarding: birthday input
  if (!birthday) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="dashboard-card card-visible p-8 sm:p-10 max-w-sm w-full text-center flex flex-col items-center border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-800 text-zinc-400">
              <Cake size={32} strokeWidth={1.5} />
            </div>
          </div>
          <h2 className="text-xl font-bold text-zinc-100 mb-2 font-display">
            Enter Your Birthday
          </h2>
          <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
            We need this to calculate your useless personal stats.
          </p>
          <input
            type="date"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-base text-zinc-300 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-colors mb-4 placeholder-zinc-600 appearance-none"
          />
          <div className="w-full relative mb-4">
            <select
              value={inputPref}
              onChange={(e) => setInputPref(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-base text-zinc-300 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-colors appearance-none"
            >
              <option value="" disabled>Select your prefecture</option>
              {PREFECTURES.map((pref) => (
                <option key={pref.code} value={pref.code}>
                  {pref.name} ({pref.en})
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
          <button
            onClick={handleStart}
            disabled={!inputValue || !inputPref}
            className="w-full py-3 rounded-lg font-medium text-sm transition-all duration-200 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/30 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            Start Tracking
          </button>
        </div>
      </div>
    )
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your data?')) {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(STORAGE_KEY_PREF)
      setBirthday('')
      setInputValue('')
      setPrefecture('')
      setInputPref('')
    }
  }

  return (
    <div ref={container} className="space-y-12 pb-20">
      
      {/* Bio Metrics Section */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">Bio Metrics</h2>
          <div className="h-px bg-zinc-800 flex-1" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 auto-rows-fr">
          <BlinkCounter birthday={birthday} />
          <BreathCounter birthday={birthday} />
          <Heartbeat birthday={birthday} />

          <HairGrowth birthday={birthday} />
          <NailGrowth birthday={birthday} />
          <SalivaLake birthday={birthday} />
        </div>
      </section>

      {/* Regional Metrics Section */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">Regional Metrics</h2>
          <div className="h-px bg-zinc-800 flex-1" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 auto-rows-fr">
          <RiceCounter birthday={birthday} prefecture={prefecture} />
          <MikanConsumption birthday={birthday} prefecture={prefecture} />
          <GyozaConsumption birthday={birthday} prefecture={prefecture} />
        </div>
      </section>

      {/* Planetary Metrics Section */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">Planetary Metrics</h2>
          <div className="h-px bg-zinc-800 flex-1" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 auto-rows-fr">
          <RotationSpeed latitude={location?.latitude ?? null} />
          <SeaLevel latitude={location?.latitude ?? null} longitude={location?.longitude ?? null} />
          
           {/* ISS Tracker spans 2 columns on large screens if we want, or keeping it 1x1 for now */}
          <IssTracker latitude={location?.latitude ?? null} longitude={location?.longitude ?? null} />
          
          {geoError && (
            <Card icon={<MapPin size={18} />} title="Location Status" accent="zinc">
              <p className="text-zinc-500 text-sm">{geoError}</p>
            </Card>
          )}
        </div>
      </section>

      <div className="mt-12 text-right">
        <button
          onClick={handleReset}
          className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors border-b border-transparent hover:border-zinc-600 pb-0.5"
        >
          Reset Data
        </button>
      </div>
    </div>
  )
}
