'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

// Floating Elements Component
const FloatingElement = ({ children, delay = 0, duration = 6 }: { children: React.ReactNode; delay?: number; duration?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ 
      opacity: [0, 1, 0],
      y: [20, -20, 20],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute"
  >
    {children}
  </motion.div>
)

// Section Component with enhanced animations
const Section = ({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) => (
  <motion.section 
    id={id} 
    className={`py-20 px-4 relative overflow-hidden ${className}`}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <div className="max-w-4xl mx-auto relative z-10">
      {children}
    </div>
  </motion.section>
)

// Enhanced Accordion Component
const Accordion = ({ title, children, isOpen, onToggle }: { title: string; children: React.ReactNode; isOpen: boolean; onToggle: () => void }) => (
  <motion.div 
    className="border-b border-gray-200 bg-white/50 backdrop-blur-sm rounded-lg mb-4 overflow-hidden"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <motion.button
      className="w-full py-6 px-6 text-left flex justify-between items-center hover:text-emerald transition-colors"
      onClick={onToggle}
      whileTap={{ scale: 0.98 }}
    >
      <span className="font-semibold text-lg">{title}</span>
      <motion.span 
        className={`text-emerald text-xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        animate={{ rotate: isOpen ? 180 : 0 }}
      >
        ▼
      </motion.span>
    </motion.button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 pb-6 text-gray-600"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
)

// Enhanced Package Card Component
const PackageCard = ({ title, price, duration, features, onBook, isPopular = false }: { 
  title: string; 
  price: string; 
  duration: string; 
  features: string[]; 
  onBook: () => void;
  isPopular?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    whileHover={{ y: -10, scale: 1.02 }}
    className={`relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-2 transition-all duration-300 ${
      isPopular 
        ? 'border-emerald shadow-emerald/20 ring-2 ring-emerald/20' 
        : 'border-gray-200 hover:border-emerald'
    }`}
  >
    {isPopular && (
      <motion.div 
        className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald to-lime text-white px-6 py-2 rounded-full text-sm font-bold"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        MOST POPULAR
      </motion.div>
    )}
    
    <div className="text-center mb-6">
      <h3 className="text-3xl font-display text-gray-900 mb-2">{title}</h3>
      <div className="text-4xl font-bold bg-gradient-to-r from-emerald to-lime bg-clip-text text-transparent mb-2">
        {price}
      </div>
      <div className="text-sm text-gray-600">{duration}</div>
    </div>
    
    <ul className="space-y-3 mb-8">
      {features.map((feature, index) => (
        <motion.li 
          key={index} 
          className="flex items-start"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <span className="text-emerald mr-3 text-lg">✓</span>
          <span className="text-gray-700">{feature}</span>
        </motion.li>
      ))}
    </ul>
    
    <motion.button
      onClick={onBook}
      className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
        isPopular
          ? 'bg-gradient-to-r from-emerald to-lime text-white hover:shadow-lg hover:shadow-emerald/25'
          : 'bg-gray-900 text-white hover:bg-emerald'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Book This Package
    </motion.button>
  </motion.div>
)

export default function Home() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    venue: '',
    date: '',
    time: '',
    package: '',
    notes: ''
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleAccordionToggle = (title: string) => {
    setActiveAccordion(activeAccordion === title ? null : title)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setFormSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          venue: '',
          date: '',
          time: '',
          package: '',
          notes: ''
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white via-white to-emerald/5 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <FloatingElement delay={0} duration={8}>
          <div className="text-6xl opacity-10 text-emerald absolute top-20 left-10">🎅</div>
        </FloatingElement>
        <FloatingElement delay={2} duration={10}>
          <div className="text-4xl opacity-10 text-lime absolute top-40 right-20">🎄</div>
        </FloatingElement>
        <FloatingElement delay={4} duration={12}>
          <div className="text-5xl opacity-10 text-emerald absolute bottom-40 left-20">🎁</div>
        </FloatingElement>
        <FloatingElement delay={1} duration={9}>
          <div className="text-3xl opacity-10 text-lime absolute bottom-20 right-10">❄️</div>
        </FloatingElement>
      </div>

      {/* Modern Header */}
      <motion.header 
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-emerald/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="text-3xl font-display bg-gradient-to-r from-deep-red to-emerald bg-clip-text text-transparent font-bold"
              whileHover={{ scale: 1.05 }}
            >
              JOLLY AF
            </motion.div>
            <nav className="hidden md:flex space-x-8">
              {['About', 'Packages', 'FAQ', 'Book'].map((item) => (
                <motion.button 
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())} 
                  className="hover:text-emerald transition-colors font-medium"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.button>
              ))}
            </nav>
            <motion.button
              onClick={() => scrollToSection('booking')}
              className="bg-gradient-to-r from-emerald to-lime text-white px-6 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-emerald/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Now
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section - More Linktree Style */}
      <Section id="hero" className="min-h-screen flex items-center justify-center relative">
        <div className="text-center space-y-8">
          {/* Profile Avatar */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative mx-auto w-32 h-32 mb-8"
          >
            <div className="w-full h-full bg-gradient-to-br from-emerald to-lime rounded-full flex items-center justify-center text-6xl shadow-2xl ring-4 ring-emerald/20">
              🎅
            </div>
            <motion.div 
              className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-deep-red to-emerald rounded-full flex items-center justify-center text-white text-sm font-bold"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              AF
            </motion.div>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-7xl font-display bg-gradient-to-r from-deep-red via-emerald to-lime bg-clip-text text-transparent leading-tight">
              Jolly AF
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              The Santa Your Mom Warned You About
            </p>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Comedy Santa for bars, house parties, and office shenanigans. December bookings only.
            </p>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {['Adults Only', 'Clean(ish) Comedy', 'Metro Detroit'].map((badge, index) => (
              <motion.span 
                key={badge}
                className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-emerald/20 text-emerald"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onClick={() => scrollToSection('booking')}
              className="bg-gradient-to-r from-emerald to-lime text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-emerald/25 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Your Date
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('packages')}
              className="border-2 border-emerald text-emerald px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              See Packages
            </motion.button>
          </motion.div>

          {/* Limited Time Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8"
          >
            <div className="inline-block bg-gradient-to-r from-deep-red to-emerald text-white px-6 py-3 rounded-full text-sm font-bold animate-pulse">
              December Only • Limited Slots
            </div>
          </motion.div>
        </div>
      </Section>

      {/* About Section */}
      <Section id="about" className="bg-white/50 backdrop-blur-sm">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-5xl font-display bg-gradient-to-r from-deep-red to-emerald bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Jolly AF
          </motion.h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-emerald/10 to-lime/10 p-8 rounded-2xl border border-emerald/20">
              <p className="text-xl text-gray-700 leading-relaxed">
                I'm Jolly AF — the loud laugh, big red suit, and zero boring bits. Expect crowd banter, a few roasts, and pics you'll still laugh at in July. Clean(ish) or spicy — your call.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🎤', text: '30–45 min sets' },
                { icon: '📸', text: 'Photo ops included' },
                { icon: '🔥', text: 'Custom roasts' },
                { icon: '🎭', text: 'PG-13 to R-rated' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-white/80 rounded-xl border border-emerald/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-emerald/5 to-lime/5 p-8 rounded-2xl border border-emerald/20"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-display text-emerald mb-6">What to Expect</h3>
            <div className="space-y-4">
              {[
                'Big personality, bigger laughs',
                'Crowd interaction & banter', 
                'Memorable photo moments',
                'Customized content for your crowd',
                'Professional setup & cleanup'
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-emerald text-xl mt-1">✓</span>
                  <span className="text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Packages Section */}
      <Section id="packages" className="bg-gradient-to-br from-emerald/5 to-lime/5">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-5xl font-display bg-gradient-to-r from-deep-red to-emerald bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Packages
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Pick your perfect party package
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <PackageCard
            title="Bar Set"
            price="$200"
            duration="45 minutes"
            features={[
              "Host hype & crowd banter",
              "Photo ops with patrons",
              "Bar-appropriate comedy",
              "Perfect for happy hour"
            ]}
            onBook={() => scrollToSection('booking')}
          />
          <PackageCard
            title="House Party"
            price="$250"
            duration="60 minutes"
            features={[
              "Epic entrance bit",
              "Party games & activities",
              "Naughty List gag",
              "Group photos & memories"
            ]}
            onBook={() => scrollToSection('booking')}
            isPopular={true}
          />
          <PackageCard
            title="Office Party"
            price="$300+"
            duration="60-90 minutes"
            features={[
              "Clean(ish) comedy set",
              "Light roasts (optional)",
              "Raffle/white-elephant MC",
              "Team building activities"
            ]}
            onBook={() => scrollToSection('booking')}
          />
        </div>
      </Section>

      {/* Gallery Section */}
      <Section id="gallery" className="bg-white/50 backdrop-blur-sm">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-5xl font-display bg-gradient-to-r from-deep-red to-emerald bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Gallery
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Clips dropping soon.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div 
              key={i} 
              className="aspect-square bg-gradient-to-br from-emerald/10 to-lime/10 rounded-2xl flex items-center justify-center text-gray-400 border border-emerald/20 hover:border-emerald/40 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <span className="text-6xl">📸</span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section id="faq" className="bg-gradient-to-br from-emerald/5 to-lime/5">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-5xl font-display bg-gradient-to-r from-deep-red to-emerald bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            FAQ
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Got questions? We've got answers.
          </motion.p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion
            title="Is this kid-friendly?"
            isOpen={activeAccordion === "Is this kid-friendly?"}
            onToggle={() => handleAccordionToggle("Is this kid-friendly?")}
          >
            Mostly adult content, but I can do a clean set if needed. Just let me know when booking!
          </Accordion>
          <Accordion
            title="What's your travel area?"
            isOpen={activeAccordion === "What's your travel area?"}
            onToggle={() => handleAccordionToggle("What's your travel area?")}
          >
            St. Clair & Macomb Counties plus nearby areas. Travel fees may apply for longer distances.
          </Accordion>
          <Accordion
            title="What about deposits and cancellations?"
            isOpen={activeAccordion === "What about deposits and cancellations?"}
            onToggle={() => handleAccordionToggle("What about deposits and cancellations?")}
          >
            $50 deposit required to secure your date. 72-hour cancellation window for full refund.
          </Accordion>
          <Accordion
            title="Do you bring props?"
            isOpen={activeAccordion === "Do you bring props?"}
            onToggle={() => handleAccordionToggle("Do you bring props?")}
          >
            Yes! I bring the Naughty List, candy canes, and other festive props to enhance the experience.
          </Accordion>
        </div>
      </Section>

      {/* Booking Section */}
      <Section id="booking" className="bg-white/50 backdrop-blur-sm">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-5xl font-display bg-gradient-to-r from-deep-red to-emerald bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Lock Your Date
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Pick a package & send your preferred date/time. I'll confirm fast.
          </motion.p>
        </div>
        
        {formSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center bg-gradient-to-br from-emerald/10 to-lime/10 border border-emerald/20 rounded-2xl p-12"
          >
            <motion.div 
              className="text-emerald text-8xl mb-6"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✓
            </motion.div>
            <h3 className="text-3xl font-display text-emerald mb-4">Thanks!</h3>
            <p className="text-gray-700 text-lg">I'll confirm within 24 hours.</p>
          </motion.div>
        ) : (
          <div className="max-w-2xl mx-auto">
            {/* TODO: Replace form with GHL calendar embed */}
            <motion.form 
              onSubmit={handleFormSubmit} 
              className="space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-emerald/20 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-emerald/20 rounded-xl focus:ring-2 focus:ring-emerald focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-emerald/20 rounded-xl focus:ring-2 focus:ring-emerald focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-emerald/20 rounded-xl focus:ring-2 focus:ring-emerald focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="package" className="block text-sm font-semibold text-gray-700 mb-2">
                    Package *
                  </label>
                  <select
                    id="package"
                    name="package"
                    required
                    value={formData.package}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-emerald/20 rounded-xl focus:ring-2 focus:ring-emerald focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select a package</option>
                    <option value="Bar Set - $200">Bar Set - $200</option>
                    <option value="House Party - $250">House Party - $250</option>
                    <option value="Office Party - $300+">Office Party - $300+</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="venue" className="block text-sm font-semibold text-gray-700 mb-2">
                  Venue Address *
                </label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  required
                  value={formData.venue}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-emerald/20 rounded-xl focus:ring-2 focus:ring-emerald focus:border-transparent transition-all duration-300"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-emerald/20 rounded-xl focus:ring-2 focus:ring-emerald focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Time *
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-emerald/20 rounded-xl focus:ring-2 focus:ring-emerald focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any special requests, crowd size, or other details..."
                  className="w-full px-4 py-3 border border-emerald/20 rounded-xl focus:ring-2 focus:ring-emerald focus:border-transparent transition-all duration-300"
                />
              </div>
              
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald to-lime text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-emerald/25 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Lock It In
              </motion.button>
            </motion.form>
          </div>
        )}
      </Section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-dark-green text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-3xl font-display bg-gradient-to-r from-emerald to-lime bg-clip-text text-transparent mb-4">JOLLY AF</div>
              <p className="text-gray-400">
                The Santa your mom warned you about.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-display text-xl mb-4 text-emerald">Contact</h3>
              <p className="text-gray-400 mb-2">
                <a href="mailto:bookings@bookjollyaf.com" className="hover:text-emerald transition-colors">
                  bookings@bookjollyaf.com
                </a>
              </p>
              <p className="text-gray-400">
                Metro Detroit Area
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="font-display text-xl mb-4 text-emerald">Follow</h3>
              <div className="flex space-x-4">
                {['📘', '📷', '🐦'].map((icon, index) => (
                  <motion.div 
                    key={index}
                    className="w-12 h-12 bg-emerald/20 rounded-full flex items-center justify-center hover:bg-emerald transition-colors cursor-pointer text-xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {icon}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="border-t border-emerald/20 mt-12 pt-8 text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p>BookJollyAF.com • © {new Date().getFullYear()} Jolly AF</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
