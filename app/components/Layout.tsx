'use client'

import { ReactNode } from 'react'
import { Squares } from "./ui/squares-background"
import CandlestickBackground from "./ui/candlestick-background"
import FloatingParticles from "./ui/floating-particles"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-[#050505] relative">
      {/* Grid background */}
      <div className="absolute inset-0 z-10">
        <Squares 
          direction="diagonal"
          speed={0.3}
          squareSize={50}
          borderColor="rgba(0,232,135,0.06)"
          hoverFillColor="rgba(0,232,135,0.04)"
        />
      </div>
      {/* Candlestick background */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <CandlestickBackground />
      </div>
      {/* Floating particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <FloatingParticles />
      </div>
      <div className="relative z-20 h-full">
        {children}
      </div>
    </div>
  )
}
