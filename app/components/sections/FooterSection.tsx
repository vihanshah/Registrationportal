'use client'

import { motion } from 'framer-motion'
import { Instagram, Twitter, Linkedin, Youtube } from 'lucide-react'

interface FooterSectionProps {
  isActive: boolean
}

export default function FooterSection({ isActive }: FooterSectionProps) {
  return (
    <section id="footer" className="relative h-screen w-full snap-start flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-6 max-w-lg"
      >
        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-06-26%20222817-MN0p0mHmGZnWGG5UgHwh3D6v0HfWuv.png"
          alt="FINVEST logo"
          className="w-24 h-24 object-contain opacity-90"
        />

        <div>
          <h2 className="text-4xl font-black text-white tracking-tight uppercase">FINVEST</h2>
          <p className="text-emerald-brand text-sm font-semibold tracking-[0.2em] uppercase mt-1">CRCE Finance Council</p>
        </div>

        <p className="text-white/40 text-sm leading-relaxed">
          Building the next generation of financially literate engineers at Fr. Conceicao Rodrigues College of Engineering, Mumbai.
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-4 mt-2">
          {[
            { icon: Instagram, label: 'Instagram' },
            { icon: Twitter, label: 'Twitter' },
            { icon: Linkedin, label: 'LinkedIn' },
            { icon: Youtube, label: 'YouTube' },
          ].map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="w-10 h-10 glass rounded-lg flex items-center justify-center text-white/40 hover:text-emerald-brand hover:border-emerald-brand/30 transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        <div className="h-px w-full bg-white/10 mt-4" />

        <p className="text-white/25 text-xs">
          &copy; 2026 FINVEST — CRCE&apos;s Finance Council. All rights reserved.
        </p>
      </motion.div>
    </section>
  )
}
