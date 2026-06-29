'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function Countdown() {
  const target = new Date('2026-09-15T09:00:00')
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const diff = target.getTime() - now.getTime()
      if (diff <= 0) return
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex gap-3 md:gap-5 mt-8">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds },
      ].map(({ label, value }) => (
        <div key={label} className="glass rounded-xl px-4 py-3 min-w-[72px] text-center">
          <div className="text-2xl md:text-3xl font-bold font-mono text-emerald-brand tabular-nums">
            {String(value).padStart(2, '0')}
          </div>
          <div className="text-xs text-white/50 mt-1 uppercase tracking-widest">{label}</div>
        </div>
      ))}
    </div>
  )
}

interface HeroSectionProps {
  isActive: boolean
}

export default function HeroSection({ isActive }: HeroSectionProps) {
  return (
    <section id="hero" className="relative h-screen w-full snap-start flex items-center px-6 md:px-16 lg:px-24">
      {/* Radial glow behind logo */}
      <div className="absolute right-8 md:right-24 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12 max-w-7xl mx-auto">
        {/* Left */}
        <div className="flex-1 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="text-xs font-semibold tracking-[0.3em] text-emerald-brand uppercase">Est. 2026 / CRCE</span>
            <div className="h-px w-10 bg-emerald-brand/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight uppercase text-white text-balance"
          >
            CRCE&apos;s<br />Finance<br />Council
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-5"
          >
            <span className="inline-block glass-green text-emerald-brand text-sm font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full">
              Flagship Event 2026
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-6 text-3xl md:text-4xl font-bold text-white/80 tracking-tight"
          >
            Trade.<span className="text-emerald-brand"> Learn.</span> Compete.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-base text-white/50 max-w-md leading-relaxed"
          >
            A student-led council for market literacy, investing discipline, and fintech thinking at Fr. Conceicao Rodrigues College of Engineering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Countdown />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            <a
              href="/register"
              className="bg-emerald-brand text-black font-bold px-7 py-3 rounded-lg text-sm tracking-wide hover:opacity-90 transition-opacity animate-pulse-glow"
            >
              Register Now
            </a>
            <a
              href="#about"
              className="glass text-white font-semibold px-7 py-3 rounded-lg text-sm tracking-wide hover:bg-white/10 transition-colors"
            >
              Learn More
            </a>
          </motion.div>
        </div>

        {/* Right — Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isActive ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3, type: 'spring', stiffness: 80 }}
          className="flex-shrink-0 flex flex-col items-center animate-float"
        >
          <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
            <div className="absolute inset-0 rounded-full bg-emerald-500/8 blur-2xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-06-26%20222817-MN0p0mHmGZnWGG5UgHwh3D6v0HfWuv.png"
              alt="FINVEST - CRCE's Finance Council bull logo"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
