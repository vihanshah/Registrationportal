'use client'

import { useEffect, useRef } from 'react'

export default function CandlestickBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const candles: { x: number; open: number; close: number; high: number; low: number; bullish: boolean; alpha: number }[] = []
    const count = 28

    const generateCandles = () => {
      candles.length = 0
      let price = canvas.height * 0.5
      for (let i = 0; i < count; i++) {
        const change = (Math.random() - 0.48) * 40
        const open = price
        const close = price + change
        const high = Math.max(open, close) + Math.random() * 20
        const low = Math.min(open, close) - Math.random() * 20
        const bullish = close >= open
        candles.push({
          x: (canvas.width / count) * i + canvas.width / (count * 2),
          open,
          close,
          high,
          low,
          bullish,
          alpha: 0.08 + Math.random() * 0.12,
        })
        price = close
      }
    }

    generateCandles()

    let offset = 0
    let frame: number

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      offset += 0.15

      candles.forEach((c, i) => {
        const x = ((c.x - offset) % (canvas.width + 60)) - 30
        const color = c.bullish ? `rgba(0,232,135,${c.alpha})` : `rgba(255,80,80,${c.alpha * 0.6})`
        const bodyTop = Math.min(c.open, c.close)
        const bodyHeight = Math.abs(c.close - c.open) || 2
        const w = canvas.width / count * 0.4

        ctx.strokeStyle = color
        ctx.lineWidth = 1

        // Wick
        ctx.beginPath()
        ctx.moveTo(x, c.high)
        ctx.lineTo(x, c.low)
        ctx.stroke()

        // Body
        ctx.fillStyle = color
        ctx.fillRect(x - w / 2, bodyTop, w, bodyHeight)
      })

      frame = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full opacity-60"
      style={{ position: 'absolute', inset: 0 }}
    />
  )
}
