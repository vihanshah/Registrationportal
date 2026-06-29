'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, CheckCircle2, QrCode } from 'lucide-react'

const DEPARTMENTS = ['Computer Engineering', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'Other']
const YEARS = ['First Year', 'Second Year', 'Third Year', 'Final Year']
const CATEGORIES = ['Live Trading Competition', 'Finance Workshop', 'Investment Quiz', 'Networking Only', 'All Events']

interface RegistrationSectionProps {
  isActive: boolean
}

export default function RegistrationSection({ isActive }: RegistrationSectionProps) {
  const [paymentDone, setPaymentDone] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [fileName, setFileName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFileName(e.target.files[0].name)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!termsAccepted || !paymentDone) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="register" className="relative h-screen w-full snap-start flex items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="glass-green rounded-3xl p-12 text-center max-w-md"
        >
          <CheckCircle2 className="w-16 h-16 text-emerald-brand mx-auto mb-4" />
          <h2 className="text-3xl font-black text-white mb-3">You&apos;re Registered!</h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Welcome to FINVEST 2026. Check your email for confirmation and event details. See you on the trading floor!
          </p>
        </motion.div>
      </section>
    )
  }

  return (
    <section id="register" className="relative h-screen w-full snap-start flex items-center px-6 md:px-16 lg:px-24 overflow-y-auto">
      <div className="w-full max-w-7xl mx-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-emerald-brand uppercase">Sign Up</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mt-2">
            Register for <span className="text-emerald-brand">FINVEST 2026</span>
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left — Personal Info */}
            <div className="glass rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white/70 uppercase tracking-widest mb-2">Personal Details</h3>
              {[
                { id: 'fullname', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
                { id: 'college', label: 'College Name', type: 'text', placeholder: 'Fr. CRCE, Mumbai' },
                { id: 'email', label: 'College Email', type: 'email', placeholder: 'name@crce.in' },
                { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 98765 43210' },
                { id: 'studentid', label: 'Student ID', type: 'text', placeholder: 'CRCE2024001' },
              ].map(f => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-xs text-white/50 mb-1.5 font-medium">{f.label}</label>
                  <input
                    id={f.id}
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-emerald-brand/50 focus:bg-emerald-brand/5 transition-colors"
                  />
                </div>
              ))}
            </div>

            {/* Right — Academic + Payment */}
            <div className="space-y-4">
              <div className="glass rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white/70 uppercase tracking-widest mb-2">Academic Details</h3>
                <div>
                  <label htmlFor="department" className="block text-xs text-white/50 mb-1.5 font-medium">Department</label>
                  <select id="department" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-brand/50 transition-colors appearance-none">
                    <option value="" className="bg-[#050505]">Select department</option>
                    {DEPARTMENTS.map(d => <option key={d} value={d} className="bg-[#050505]">{d}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="year" className="block text-xs text-white/50 mb-1.5 font-medium">Year</label>
                  <select id="year" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-brand/50 transition-colors appearance-none">
                    <option value="" className="bg-[#050505]">Select year</option>
                    {YEARS.map(y => <option key={y} value={y} className="bg-[#050505]">{y}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="category" className="block text-xs text-white/50 mb-1.5 font-medium">Event Category</label>
                  <select id="category" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-brand/50 transition-colors appearance-none">
                    <option value="" className="bg-[#050505]">Select category</option>
                    {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#050505]">{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Payment */}
              <div className="glass rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white/70 uppercase tracking-widest mb-2">Payment</h3>
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 glass-green rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                    <QrCode className="w-8 h-8 text-emerald-brand" />
                    <span className="text-[9px] text-emerald-brand mt-1">Scan QR</span>
                  </div>
                  <div className="text-xs text-white/50 leading-relaxed">
                    Scan the QR code to pay the registration fee of <span className="text-emerald-brand font-bold">₹199</span>. Then upload a screenshot below.
                  </div>
                </div>

                <label className="flex items-center gap-3 glass rounded-lg px-4 py-3 cursor-pointer hover:border-emerald-brand/30 transition-colors group">
                  <Upload className="w-4 h-4 text-emerald-brand flex-shrink-0" />
                  <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors truncate">
                    {fileName || 'Upload payment screenshot'}
                  </span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setPaymentDone(!paymentDone)}
                    className={`w-5 h-5 rounded flex items-center justify-center border transition-colors flex-shrink-0 ${paymentDone ? 'bg-emerald-brand border-emerald-brand' : 'border-white/20'}`}
                  >
                    {paymentDone && <svg viewBox="0 0 12 10" className="w-3 h-3 fill-black"><path d="M1 5l3 3 7-7" stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <span className="text-xs text-white/50">I have completed the payment</span>
                </label>
              </div>

              {/* Terms + Submit */}
              <label className="flex items-start gap-3 cursor-pointer">
                <div
                  onClick={() => setTermsAccepted(!termsAccepted)}
                  className={`w-5 h-5 mt-0.5 rounded flex items-center justify-center border transition-colors flex-shrink-0 ${termsAccepted ? 'bg-emerald-brand border-emerald-brand' : 'border-white/20'}`}
                >
                  {termsAccepted && <svg viewBox="0 0 12 10" className="w-3 h-3 fill-black"><path d="M1 5l3 3 7-7" stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span className="text-xs text-white/50 leading-relaxed">
                  I agree to the FINVEST 2026 terms & conditions. I understand registrations are non-refundable.
                </span>
              </label>

              <button
                type="submit"
                disabled={!termsAccepted || !paymentDone}
                className="w-full bg-emerald-brand text-black font-black py-3.5 rounded-xl text-sm tracking-wide transition-all hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed glow-green"
              >
                Complete Registration
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
