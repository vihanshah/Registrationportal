'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, CheckCircle2, QrCode, ArrowLeft, AlertCircle } from 'lucide-react'
import Confetti from 'react-confetti'
import Link from 'next/link'

const DEPARTMENTS = ['Computer Engineering', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'Other']
const YEARS = ['First Year', 'Second Year', 'Third Year', 'Final Year']
const EVENTS = [
  'Live Trading Competition — ₹25,000 prize',
  'Technical Analysis Lab — Workshop',
  'Market Mastermind — Quiz (₹10,000 prize)',
  'The Trading Floor — Networking',
]

interface FormData {
  fullname: string
  college: string
  email: string
  phone: string
  studentid: string
  department: string
  year: string
  event: string
}

interface Errors {
  fullname?: string
  email?: string
  phone?: string
  studentid?: string
  department?: string
  year?: string
  event?: string
  file?: string
  payment?: string
  terms?: string
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    college: '',
    email: '',
    phone: '',
    studentid: '',
    department: '',
    year: '',
    event: '',
  })
  const [paymentDone, setPaymentDone] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [fileName, setFileName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const confettiRef = useRef<HTMLDivElement>(null)

  const validateForm = (): boolean => {
    const newErrors: Errors = {}

    // Full Name validation
    if (!formData.fullname.trim()) {
      newErrors.fullname = 'Full name is required'
    } else if (!/^[a-zA-Z\s]*$/.test(formData.fullname)) {
      newErrors.fullname = 'Only letters and spaces allowed'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'College email is required'
    } else if (!formData.email.endsWith('@crce.ac.in')) {
      newErrors.email = 'Email must end with @crce.ac.in'
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone must contain exactly 10 digits'
    }

    // Student ID validation
    if (!formData.studentid.trim()) {
      newErrors.studentid = 'Student ID is required'
    }

    // Department validation
    if (!formData.department) {
      newErrors.department = 'Department is required'
    }

    // Year validation
    if (!formData.year) {
      newErrors.year = 'Year is required'
    }

    // Event validation
    if (!formData.event) {
      newErrors.event = 'Event selection is required'
    }

    // File validation
    if (!fileName) {
      newErrors.file = 'Payment screenshot is required'
    }

    // Payment checkbox validation
    if (!paymentDone) {
      newErrors.payment = 'Payment confirmation is required'
    }

    // Terms checkbox validation
    if (!termsAccepted) {
      newErrors.terms = 'You must accept the terms & conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
    // Clear error for this field when user starts typing
    if (errors[id as keyof Errors]) {
      setErrors(prev => ({
        ...prev,
        [id]: undefined
      }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFileName(e.target.files[0].name)
      if (errors.file) {
        setErrors(prev => ({
          ...prev,
          file: undefined
        }))
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#050505] flex items-center justify-center px-6 py-12 overflow-hidden" ref={confettiRef}>
        <Confetti
          width={typeof window !== 'undefined' ? window.innerWidth : 0}
          height={typeof window !== 'undefined' ? window.innerHeight : 0}
          colors={['#00E887', '#ffffff', '#050505']}
          numberOfPieces={150}
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80 }}
          className="max-w-lg w-full relative z-10"
        >
          {/* Success checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-emerald-brand/20"
              />
              <CheckCircle2 className="w-20 h-20 text-emerald-brand" />
            </div>
          </motion.div>

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-3xl p-8 space-y-6 border border-white/10"
          >
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-black text-white">
                Registration Successful!
              </h2>
              <p className="text-white/50 text-sm">
                Thank you for registering for FINVEST&apos;s Flagship Event.
              </p>
            </div>

            {/* Registration details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-3 p-4 rounded-xl bg-emerald-brand/5 border border-emerald-brand/10"
            >
              <div className="flex justify-between items-start gap-4">
                <span className="text-xs text-white/40 font-medium">Participant Name</span>
                <span className="text-sm font-bold text-white text-right">{formData.fullname}</span>
              </div>
              <div className="flex justify-between items-start gap-4">
                <span className="text-xs text-white/40 font-medium">Event</span>
                <span className="text-sm font-bold text-emerald-brand text-right">{formData.event}</span>
              </div>
              <div className="flex justify-between items-start gap-4">
                <span className="text-xs text-white/40 font-medium">Email</span>
                <span className="text-xs font-mono text-white/60 text-right">{formData.email}</span>
              </div>
            </motion.div>

            {/* Confirmation message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="text-xs text-white/50 leading-relaxed text-center"
            >
              Your registration details have been submitted successfully.
            </motion.p>

            {/* Final Verification Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3 p-4 rounded-xl border border-emerald-brand/30 bg-emerald-brand/8"
            >
              <h3 className="text-xs font-black uppercase tracking-wider text-emerald-brand">
                Final Verification Required
              </h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Please send the same payment screenshot that you uploaded during registration to our WhatsApp number for payment verification.
              </p>

              {/* WhatsApp CTA */}
              <div className="flex items-center justify-center gap-2 w-full bg-emerald-brand text-black font-bold px-4 py-3 rounded-lg text-sm tracking-wide">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.966 0-3.79.788-5.171 2.162-1.384 1.377-2.146 3.195-2.146 5.158 0 1.928.627 3.785 1.775 5.301l-1.881 6.871 7.08-1.865c1.47.92 3.255 1.404 5.147 1.404 1.967 0 3.792-.789 5.173-2.162 1.384-1.377 2.146-3.195 2.146-5.157 0-1.927-.627-3.785-1.775-5.301l1.881-6.871-7.08 1.865c-1.47-.92-3.254-1.404-5.146-1.404z"/>
                </svg>
                WhatsApp: +91 XXXXXXXXXX
              </div>

              <p className="text-xs text-white/40 text-center">
                Our team will verify your payment and confirm your registration shortly.
              </p>
            </motion.div>

            {/* Back button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
            >
              <Link
                href="/"
                className="flex items-center justify-center gap-2 w-full border border-white/10 text-white font-bold px-6 py-2.5 rounded-lg text-sm tracking-wide hover:bg-white/5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to FINVEST
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#050505] px-6 md:px-16 lg:px-24 py-12">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-emerald-brand text-sm font-medium transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to FINVEST
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-emerald-brand uppercase">Sign Up</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mt-2 text-balance">
            Register for <span className="text-emerald-brand">FINVEST 2026</span>
          </h1>
          <p className="mt-3 text-white/40 text-sm max-w-lg leading-relaxed">
            Fill in your details below and complete the payment to secure your spot at CRCE&apos;s flagship finance event.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
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
                { id: 'email', label: 'College Email', type: 'email', placeholder: 'name@crce.ac.in' },
                { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 98765 43210' },
                { id: 'studentid', label: 'Student ID', type: 'text', placeholder: 'CRCE2024001' },
              ].map(f => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-xs text-white/50 mb-1.5 font-medium">{f.label}</label>
                  <input
                    id={f.id}
                    type={f.type}
                    placeholder={f.placeholder}
                    value={formData[f.id as keyof FormData]}
                    onChange={handleInputChange}
                    className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none transition-all ${
                      errors[f.id as keyof Errors]
                        ? 'border-red-500/50 focus:bg-red-500/5 focus:border-red-500/80'
                        : 'border-white/10 focus:border-emerald-brand/50 focus:bg-emerald-brand/5'
                    }`}
                  />
                  {errors[f.id as keyof Errors] && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1.5 mt-1.5 text-red-400 text-xs"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors[f.id as keyof Errors]}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Right — Academic + Payment */}
            <div className="space-y-4">
              <div className="glass rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white/70 uppercase tracking-widest mb-2">Academic Details</h3>
                <div>
                  <label htmlFor="department" className="block text-xs text-white/50 mb-1.5 font-medium">Department</label>
                  <select
                    id="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none transition-all appearance-none ${
                      errors.department
                        ? 'border-red-500/50 focus:bg-red-500/5 focus:border-red-500/80'
                        : 'border-white/10 focus:border-emerald-brand/50 focus:bg-emerald-brand/5'
                    }`}
                  >
                    <option value="" className="bg-[#050505]">Select department</option>
                    {DEPARTMENTS.map(d => <option key={d} value={d} className="bg-[#050505]">{d}</option>)}
                  </select>
                  {errors.department && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1.5 mt-1.5 text-red-400 text-xs"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.department}
                    </motion.div>
                  )}
                </div>
                <div>
                  <label htmlFor="year" className="block text-xs text-white/50 mb-1.5 font-medium">Year</label>
                  <select
                    id="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none transition-all appearance-none ${
                      errors.year
                        ? 'border-red-500/50 focus:bg-red-500/5 focus:border-red-500/80'
                        : 'border-white/10 focus:border-emerald-brand/50 focus:bg-emerald-brand/5'
                    }`}
                  >
                    <option value="" className="bg-[#050505]">Select year</option>
                    {YEARS.map(y => <option key={y} value={y} className="bg-[#050505]">{y}</option>)}
                  </select>
                  {errors.year && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1.5 mt-1.5 text-red-400 text-xs"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.year}
                    </motion.div>
                  )}
                </div>
                <div>
                  <label htmlFor="event" className="block text-xs text-white/50 mb-1.5 font-medium">Event to Register For</label>
                  <select
                    id="event"
                    value={formData.event}
                    onChange={handleInputChange}
                    className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none transition-all appearance-none ${
                      errors.event
                        ? 'border-red-500/50 focus:bg-red-500/5 focus:border-red-500/80'
                        : 'border-white/10 focus:border-emerald-brand/50 focus:bg-emerald-brand/5'
                    }`}
                  >
                    <option value="" className="bg-[#050505]">Select an event</option>
                    {EVENTS.map(e => <option key={e} value={e} className="bg-[#050505]">{e}</option>)}
                  </select>
                  {errors.event && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1.5 mt-1.5 text-red-400 text-xs"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.event}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Payment */}
              <div className={`glass rounded-2xl p-6 space-y-4 border transition-colors ${
                errors.payment ? 'border-red-500/30' : 'border-white/10'
              }`}>
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

                <label className={`flex items-center gap-3 glass rounded-lg px-4 py-3 cursor-pointer transition-all group border ${
                  errors.file
                    ? 'border-red-500/30 hover:border-red-500/50'
                    : 'border-white/10 hover:border-emerald-brand/30'
                }`}>
                  <Upload className="w-4 h-4 text-emerald-brand flex-shrink-0" />
                  <span className={`text-xs flex-shrink-0 transition-colors truncate ${
                    errors.file ? 'text-red-400' : 'text-white/50 group-hover:text-white/70'
                  }`}>
                    {fileName || 'Upload payment screenshot'}
                  </span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} required />
                </label>
                {errors.file && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 text-red-400 text-xs"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.file}
                  </motion.div>
                )}

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => {
                      setPaymentDone(!paymentDone)
                      if (errors.payment) {
                        setErrors(prev => ({ ...prev, payment: undefined }))
                      }
                    }}
                    className={`w-5 h-5 rounded flex items-center justify-center border transition-all flex-shrink-0 ${
                      paymentDone
                        ? 'bg-emerald-brand border-emerald-brand'
                        : errors.payment
                        ? 'border-red-500/50'
                        : 'border-white/20'
                    }`}
                  >
                    {paymentDone && <svg viewBox="0 0 12 10" className="w-3 h-3 fill-black"><path d="M1 5l3 3 7-7" stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <span className={`text-xs transition-colors ${errors.payment ? 'text-red-400' : 'text-white/50 group-hover:text-white/70'}`}>
                    I have completed the payment
                  </span>
                </label>
                {errors.payment && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 text-red-400 text-xs"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.payment}
                  </motion.div>
                )}
              </div>

              {/* Terms + Submit */}
              <label className={`flex items-start gap-3 cursor-pointer p-4 rounded-lg transition-colors border ${
                errors.terms
                  ? 'border-red-500/30 bg-red-500/5'
                  : 'border-white/10 hover:bg-white/3'
              }`}>
                <div
                  onClick={() => {
                    setTermsAccepted(!termsAccepted)
                    if (errors.terms) {
                      setErrors(prev => ({ ...prev, terms: undefined }))
                    }
                  }}
                  className={`w-5 h-5 mt-0.5 rounded flex items-center justify-center border transition-all flex-shrink-0 ${
                    termsAccepted
                      ? 'bg-emerald-brand border-emerald-brand'
                      : errors.terms
                      ? 'border-red-500/50'
                      : 'border-white/20'
                  }`}
                >
                  {termsAccepted && <svg viewBox="0 0 12 10" className="w-3 h-3 fill-black"><path d="M1 5l3 3 7-7" stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <div className="flex-1">
                  <span className={`text-xs leading-relaxed block ${errors.terms ? 'text-red-400' : 'text-white/50'}`}>
                    I agree to the FINVEST 2026 terms & conditions. I understand registrations are non-refundable.
                  </span>
                  {errors.terms && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.terms}
                    </motion.div>
                  )}
                </div>
              </label>

              <button
                type="submit"
                className="w-full bg-emerald-brand text-black font-black py-3.5 rounded-xl text-sm tracking-wide transition-all hover:opacity-90 active:scale-95"
              >
                Complete Registration
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </main>
  )
}
