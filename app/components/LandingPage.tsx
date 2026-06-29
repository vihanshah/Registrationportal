'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Layout from './Layout'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import EventHighlightsSection from './sections/EventHighlightsSection'
import FooterSection from './sections/FooterSection'

const NAV_SECTIONS = ['hero', 'about', 'highlights', 'footer']

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollTop
        const windowHeight = window.innerHeight
        const newActiveSection = Math.round(scrollPosition / windowHeight)
        setActiveSection(newActiveSection)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const handleNavClick = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth',
      })
    }
  }

  return (
    <Layout>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 origin-left z-30"
        style={{ scaleX, background: '#00E887' }}
      />

      {/* Side nav dots */}
      <nav className="fixed top-0 right-0 h-screen flex flex-col justify-center z-30 p-4" aria-label="Section navigation">
        {NAV_SECTIONS.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to section ${index + 1}`}
            className={`w-2 h-2 rounded-full my-2 transition-all ${
              index === activeSection
                ? 'bg-[#00E887] scale-150 shadow-[0_0_8px_#00E887]'
                : 'bg-white/20 hover:bg-white/40'
            }`}
            onClick={() => handleNavClick(index)}
          />
        ))}
      </nav>

      {/* Sections container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto snap-y snap-mandatory"
      >
        <HeroSection isActive={activeSection === 0} />
        <AboutSection isActive={activeSection === 1} />
        <EventHighlightsSection isActive={activeSection === 2} />
        <FooterSection isActive={activeSection === 3} />
      </div>
    </Layout>
  )
}
