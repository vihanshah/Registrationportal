'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const stats = [
  { value: '500+', label: 'Students Reached' },
  { value: '12+', label: 'Events Hosted' },
  { value: '₹50K', label: 'Prize Pool' },
  { value: '8', label: 'Partner Firms' },
]

const pillars = [
  {
    index: '01',
    title: 'Market Literacy',
    desc: 'Most students graduate knowing accounting but not markets. We fix that gap. From understanding how a stock exchange actually works to reading an earnings report without a textbook, FINVEST demystifies the systems that move money at scale.',
    points: [
      'Equity markets: how stocks are priced, listed, and traded in real time',
      'Derivatives 101: what options and futures actually do and why institutions use them',
      'Macro thinking: interest rates, inflation, and central bank signals that move everything',
      'Reading between the lines of financial news without being misled',
    ],
  },
  {
    index: '02',
    title: 'Investing Discipline',
    desc: "Knowing what to buy is only half the equation. The other half is knowing how much, when to exit, and how to protect what you have built. FINVEST trains the mental frameworks behind disciplined capital allocation — because discipline is what separates investors from gamblers.",
    points: [
      'Position sizing: why bet size matters as much as the bet itself',
      'Risk management frameworks: stop-losses, max drawdown rules, and portfolio limits',
      'Portfolio construction: diversification that actually reduces risk, not just exposure',
      'Compounding mechanics: time, rate, and consistency as the three variables that matter most',
    ],
  },
  {
    index: '03',
    title: 'Fintech Thinking',
    desc: 'Finance is being rewritten in code. Payments, lending, trading, and compliance are all being rebuilt by engineers who understand markets. FINVEST puts you at that intersection — whether you want to build fintech products or simply understand the tools that are reshaping the industry.',
    points: [
      'Algo trading basics: how systematic strategies are designed, backtested, and deployed',
      'Market data APIs: working with real financial data feeds programmatically',
      'Payments infrastructure: UPI, SWIFT, and what actually happens when money moves',
      'RegTech and compliance automation: the boring layer that makes fintech safe to scale',
    ],
  },
  {
    index: '04',
    title: 'Community',
    desc: "The most valuable thing FINVEST builds is not knowledge — it is people. A room full of students who are genuinely serious about finance, connected to alumni who are building careers in it, and mentored by professionals who have seen what it actually takes. That network compounds long after college ends.",
    points: [
      'Peer learning circles: study groups, trade reviews, and portfolio discussions with like-minded students',
      'Alumni connect: direct access to CRCE graduates working in finance, trading, and fintech',
      'Mentorship pipeline: structured one-on-one time with industry professionals at every FINVEST event',
      'Lifetime access: your FINVEST membership does not expire when the semester does',
    ],
  },
]

const MARQUEE_ITEMS = [
  'MARKET LITERACY', '•', 'INVESTING DISCIPLINE', '•', 'FINTECH THINKING', '•',
  'COMMUNITY', '•', 'LIVE TRADING', '•', 'WORKSHOPS', '•', 'NETWORKING', '•',
  'MARKET LITERACY', '•', 'INVESTING DISCIPLINE', '•', 'FINTECH THINKING', '•',
  'COMMUNITY', '•', 'LIVE TRADING', '•', 'WORKSHOPS', '•', 'NETWORKING', '•',
]

interface AboutSectionProps {
  isActive: boolean
}

export default function AboutSection({ isActive }: AboutSectionProps) {
  const ref = useRef(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section id="about" ref={ref} className="relative h-screen w-full snap-start flex flex-col justify-center overflow-hidden">

      {/* Top marquee strip */}
      <div className="w-full overflow-hidden border-y border-white/5 py-2.5 mb-8">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
          className="flex whitespace-nowrap"
        >
          {MARQUEE_ITEMS.map((item, i) => (
            <span
              key={i}
              className={`text-xs font-bold tracking-[0.25em] px-4 ${
                item === '•' ? 'text-emerald-brand' : 'text-white/20'
              }`}
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start lg:items-center">

        {/* LEFT — Manifesto */}
        <div className="lg:w-5/12 shrink-0">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold tracking-[0.3em] text-emerald-brand uppercase block mb-4">
              Est. 2026 / CRCE
            </span>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-[0.92] text-balance mb-5">
              NOT JUST<br />
              A CLUB.<br />
              <span className="text-emerald-brand">A MINDSET.</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-3">
              Most finance clubs teach theory. FINVEST puts you in the arena.
              We exist because the gap between what classrooms teach and what
              markets demand is too wide to ignore — and someone has to close it.
            </p>
            <p className="text-white/30 text-sm leading-relaxed max-w-sm mb-8">
              Founded at Fr. Conceicao Rodrigues College of Engineering, FINVEST
              is built by students who are tired of waiting until graduation to
              start understanding money, markets, and the systems that run the world.
            </p>

            {/* Stat row */}
            <div className="flex gap-6">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isActive ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex flex-col"
                >
                  <span className="text-2xl md:text-3xl font-black text-emerald-brand glow-green-text leading-none">
                    {s.value}
                  </span>
                  <span className="text-[10px] text-white/30 mt-1 leading-tight">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT — Accordion pillars */}
        <div className="lg:w-7/12 flex flex-col divide-y divide-white/5">
          {pillars.map((p, i) => {
            const isOpen = expanded === p.index
            return (
              <motion.div
                key={p.index}
                initial={{ opacity: 0, x: 40 }}
                animate={isActive ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              >
                {/* Header row — always visible, clickable */}
                <button
                  onClick={() => setExpanded(isOpen ? null : p.index)}
                  className="w-full flex items-start gap-5 py-4 group text-left cursor-pointer"
                >
                  <span className={`text-[11px] font-black tracking-widest w-6 shrink-0 pt-0.5 transition-colors duration-300 ${isOpen ? 'text-emerald-brand' : 'text-emerald-brand/40 group-hover:text-emerald-brand'}`}>
                    {p.index}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className={`text-base font-black tracking-tight transition-colors duration-300 ${isOpen ? 'text-emerald-brand' : 'text-white group-hover:text-emerald-brand'}`}>
                        {p.title}
                      </span>
                      <div className={`flex-1 h-px transition-all duration-500 ${isOpen ? 'bg-emerald-brand/30' : 'bg-white/0 group-hover:bg-emerald-brand/20'}`} />
                      {/* Expand indicator */}
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                        className={`text-lg font-light shrink-0 leading-none transition-colors duration-300 ${isOpen ? 'text-emerald-brand' : 'text-white/20 group-hover:text-white/50'}`}
                      >
                        +
                      </motion.span>
                    </div>
                    {/* Short desc always visible */}
                    {!isOpen && (
                      <p className="text-xs text-white/30 leading-relaxed mt-1 group-hover:text-white/50 transition-colors duration-300 line-clamp-1">
                        {p.desc}
                      </p>
                    )}
                  </div>
                </button>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-11 pb-5 flex flex-col gap-4">
                        <p className="text-sm text-white/50 leading-relaxed">
                          {p.desc}
                        </p>
                        <ul className="flex flex-col gap-2">
                          {p.points.map((pt, j) => (
                            <motion.li
                              key={j}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: j * 0.06, duration: 0.25 }}
                              className="flex items-start gap-3"
                            >
                              <span className="mt-[5px] shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-brand/50" />
                              <span className="text-xs text-white/40 leading-relaxed">{pt}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
