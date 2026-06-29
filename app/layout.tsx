import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FINVEST 2026 — CRCE Finance Council',
  description: 'Register for FINVEST 2026 — CRCE\'s flagship finance event. Trade. Learn. Compete.',
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white`}>{children}</body>
    </html>
  )
}
