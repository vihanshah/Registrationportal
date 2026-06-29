'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const events = [
  {
    id: 'trading',
    index: '01',
    tag: 'MAIN EVENT',
    title: 'Live Trading\nCompetition',
    blurb: 'The flagship.',
    desc: 'This is not a simulation you can phone in. Teams are handed a virtual portfolio and dropped into a live market environment fed by real-time data. Every buy, sell, and hold decision is tracked and broadcast on a central leaderboard that the entire room can see.',
    highlights: [
      'Real-time market data feed — prices shift every 30 seconds',
      'Portfolio P&L tracked live on a projected leaderboard',
      'Mid-round "market shocks" force teams to adapt on the fly',
      'Final round: defend your top trade decision to a panel of judges',
      'Individual performance scores factor in risk management, not just returns',
    ],
    takeaway: 'Walk out with a real understanding of position sizing, risk/reward, and market psychology under pressure.',
    prize: '₹25,000',
    duration: '3 hrs',
    teamSize: '2–3',
    format: 'Team Rounds',
    level: 'All Levels',
  },
  {
    id: 'workshop',
    index: '02',
    tag: 'WORKSHOP',
    title: 'Technical\nAnalysis Lab',
    blurb: 'Chart like a pro.',
    desc: 'Most people look at charts and see noise. This workshop teaches you to see structure. You will work through real historical charts — identifying patterns, marking key levels, and building an entry thesis — guided by someone who actually trades, not just teaches.',
    highlights: [
      'Candlestick anatomy: doji, engulfing, hammer, and shooting star patterns',
      'Support & resistance: how to draw levels that actually hold',
      'Momentum indicators: RSI divergence and MACD crossover setups',
      'Live chart exercise: mark your entry, stop-loss, and target on a real chart',
      'Peer critique: present your trade setup and receive structured feedback',
    ],
    takeaway: 'Leave with a repeatable chart-reading framework and a sample trade journal template you can start using the same week.',
    prize: 'Certificate',
    duration: '2 hrs',
    teamSize: 'Solo',
    format: 'Guided Lab',
    level: 'Beginner–Mid',
  },
  {
    id: 'quiz',
    index: '03',
    tag: 'QUIZ',
    title: 'Market\nMastermind',
    blurb: 'Test your edge.',
    desc: 'Finance trivia is not enough here. Market Mastermind runs three elimination rounds that test macroeconomic reasoning, financial history, current market news, and fintech literacy — all on a buzzer system where hesitation costs you the point.',
    highlights: [
      'Round 1 — Macro Fundamentals: GDP, inflation, central bank policy, yield curves',
      'Round 2 — Market History: Black Monday, Dot-com crash, 2008, COVID dump',
      'Round 3 — Live News Sprint: questions based on events from the last 90 days',
      'Sudden-death final: one question, both teams buzzing, highest-stakes 60 seconds',
      'Audience lifeline: finalist teams can poll the crowd once per match',
    ],
    takeaway: 'Beyond the prize — you will leave with a sharper mental map of how global events move markets.',
    prize: '₹10,000',
    duration: '1.5 hrs',
    teamSize: '2',
    format: 'Buzzer Rounds',
    level: 'Intermediate',
  },
  {
    id: 'networking',
    index: '04',
    tag: 'NETWORKING',
    title: 'The Trading\nFloor',
    blurb: 'Build the network.',
    desc: 'The Trading Floor is the most underrated part of FINVEST. It is where the real conversations happen — between students who are serious about finance and professionals who were in their shoes not long ago. Structured, intentional, and worth more than any prize.',
    highlights: [
      'Roundtable A — Markets: equity research, derivatives, crypto, and commodities',
      'Roundtable B — Careers: how to break into trading, investment banking, and fintech',
      'Roundtable C — Fintech: payments, lending, RegTech, and what is actually being built',
      'Speed networking: 5-minute rotations with each professional guest',
      'Open floor: unstructured time to follow up on conversations that mattered',
    ],
    takeaway: 'Walk away with real contacts, honest career advice, and a clearer picture of where you want to go.',
    prize: 'Connections',
    duration: '1 hr',
    teamSize: 'Open',
    format: 'Open Floor',
    level: 'All Welcome',
  },
]

interface EventHighlightsSectionProps {
  isActive: boolean
}

export default function EventHighlightsSection({ isActive }: EventHighlightsSectionProps) {
  const [active, setActive] = useState(0)

  return (
    <section
      id="highlights"
      className="relative h-screen w-full snap-start flex flex-col justify-center overflow-hidden px-6 md:px-16 lg:px-24"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col h-full justify-center gap-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between"
        >
          <div>
            <span className="text-xs font-bold tracking-[0.3em] text-emerald-brand uppercase">
              What&apos;s Inside
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mt-1 leading-[0.9]">
              THE ARENA
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-xs text-white/25 tracking-widest">
              {String(active + 1).padStart(2, '0')} / {String(events.length).padStart(2, '0')}
            </span>
          </div>
        </motion.div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0 pb-4">

          {/* Left — event list */}
          <div className="flex flex-col justify-center gap-1 lg:w-2/5">
            {events.map((ev, i) => (
              <motion.button
                key={ev.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isActive ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                onClick={() => setActive(i)}
                className={`group flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-300 ${
                  active === i
                    ? 'bg-emerald-brand/10 border border-emerald-brand/25'
                    : 'border border-transparent hover:border-white/8 hover:bg-white/3'
                }`}
              >
                <span className={`text-xs font-black tracking-widest transition-colors duration-300 w-5 ${
                  active === i ? 'text-emerald-brand' : 'text-white/20 group-hover:text-white/40'
                }`}>
                  {ev.index}
                </span>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-black tracking-tight transition-colors duration-300 ${
                    active === i ? 'text-white' : 'text-white/50 group-hover:text-white/80'
                  }`}>
                    {ev.title.replace('\n', ' ')}
                  </div>
                  <div className={`text-[10px] mt-0.5 transition-colors duration-300 ${
                    active === i ? 'text-emerald-brand/70' : 'text-white/20'
                  }`}>
                    {ev.blurb}
                  </div>
                </div>
                <span className={`text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full border transition-all duration-300 ${
                  active === i
                    ? 'border-emerald-brand/40 text-emerald-brand bg-emerald-brand/10'
                    : 'border-white/10 text-white/20'
                }`}>
                  {ev.tag}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Right — detail panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-3/5 relative rounded-2xl overflow-hidden border border-white/8 flex flex-col justify-between"
            style={{ background: 'rgba(0,232,135,0.03)' }}
          >
            {/* Big index watermark */}
            <div
              className="absolute top-4 right-6 text-[120px] font-black leading-none select-none pointer-events-none"
              style={{ color: 'rgba(0,232,135,0.04)' }}
            >
              {events[active].index}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col h-full p-6 md:p-8 relative z-10 gap-0 overflow-hidden"
              >
                <div className="flex-1 min-h-0 overflow-y-auto pr-1 custom-scrollbar">
                  <span className="text-[10px] font-bold tracking-[0.3em] text-emerald-brand/60 uppercase">
                    {events[active].tag}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black text-white mt-2 leading-[0.9] whitespace-pre-line">
                    {events[active].title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mt-4 max-w-lg">
                    {events[active].desc}
                  </p>

                  {/* Highlights list */}
                  <ul className="mt-5 flex flex-col gap-2">
                    {events[active].highlights.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 group">
                        <span className="mt-[3px] shrink-0 w-4 h-4 rounded-full border border-emerald-brand/30 bg-emerald-brand/8 flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand/60" />
                        </span>
                        <span className="text-xs text-white/45 leading-relaxed group-hover:text-white/70 transition-colors duration-200">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Takeaway */}
                  <div className="mt-5 px-4 py-3 rounded-xl border border-emerald-brand/15 bg-emerald-brand/5">
                    <span className="text-[9px] font-bold tracking-[0.3em] text-emerald-brand/50 uppercase block mb-1">What You Take Away</span>
                    <p className="text-xs text-white/60 leading-relaxed italic">
                      {events[active].takeaway}
                    </p>
                  </div>
                </div>

                {/* Meta chips */}
                <div className="flex flex-wrap gap-3 mt-5 shrink-0">
                  <div className="flex flex-col gap-0.5 px-4 py-2.5 rounded-xl border border-white/8 bg-white/3">
                    <span className="text-[9px] tracking-widest text-white/25 uppercase">Prize</span>
                    <span className="text-lg font-black text-emerald-brand leading-none">{events[active].prize}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 px-4 py-2.5 rounded-xl border border-white/8 bg-white/3">
                    <span className="text-[9px] tracking-widest text-white/25 uppercase">Duration</span>
                    <span className="text-lg font-black text-white leading-none">{events[active].duration}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 px-4 py-2.5 rounded-xl border border-white/8 bg-white/3">
                    <span className="text-[9px] tracking-widest text-white/25 uppercase">Team Size</span>
                    <span className="text-lg font-black text-white leading-none">{events[active].teamSize}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 px-4 py-2.5 rounded-xl border border-white/8 bg-white/3">
                    <span className="text-[9px] tracking-widest text-white/25 uppercase">Format</span>
                    <span className="text-lg font-black text-white leading-none">{events[active].format}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 px-4 py-2.5 rounded-xl border border-white/8 bg-white/3">
                    <span className="text-[9px] tracking-widest text-white/25 uppercase">Level</span>
                    <span className="text-lg font-black text-white leading-none">{events[active].level}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-emerald-brand/20" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
