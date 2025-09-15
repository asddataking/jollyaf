'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

// Section Component
const Section = ({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) => (
  <section id={id} className={`py-16 px-4 ${className}`}>
    <div className="max-w-6xl mx-auto">
      {children}
    </div>
  </section>
)

// Accordion Component
const Accordion = ({ title, children, isOpen, onToggle }: { title: string; children: React.ReactNode; isOpen: boolean; onToggle: () => void }) => (
  <div className="border-b border-gray-200">
    <button
      className="w-full py-4 text-left flex justify-between items-center hover:text-deep-red transition-colors"
      onClick={onToggle}
    >
      <span className="font-medium">{title}</span>
      <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
        ▼
      </span>
    </button>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="pb-4 text-gray-600"
      >
        {children}
      </motion.div>
    )}
  </div>
)

// Package Card Component
const PackageCard = ({ title, price, duration, features, onBook }: { 
  title: string; 
  price: string; 
  duration: string; 
  features: string[]; 
  onBook: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-lg p-6 border-2 border-transparent hover:border-deep-red transition-all"
  >
    <h3 className="text-2xl font-display text-deep-red mb-2">{title}</h3>
    <div className="text-3xl font-bold text-gray-900 mb-1">{price}</div>
    <div className="text-sm text-gray-600 mb-4">{duration}</div>
    <ul className="space-y-2 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <span className="text-gold mr-2">✓</span>
          <span className="text-sm">{feature}</span>
        </li>
      ))}
    </ul>
    <button
      onClick={onBook}
      className="w-full bg-deep-red text-white py-3 px-4 rounded-lg font-medium hover:bg-red-800 transition-colors"
    >
      Book This
    </button>
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
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-display text-deep-red font-bold">
              JOLLY AF
            </div>
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('about')} className="hover:text-deep-red transition-colors">About</button>
              <button onClick={() => scrollToSection('packages')} className="hover:text-deep-red transition-colors">Packages</button>
              <button onClick={() => scrollToSection('faq')} className="hover:text-deep-red transition-colors">FAQ</button>
              <button onClick={() => scrollToSection('booking')} className="hover:text-deep-red transition-colors">Book</button>
            </nav>
            <button
              onClick={() => scrollToSection('booking')}
              className="bg-deep-red text-white px-6 py-2 rounded-lg font-medium hover:bg-red-800 transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Section id="hero" className="bg-gradient-to-br from-deep-red to-red-800 text-white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-gold text-deep-red px-3 py-1 rounded-full text-sm font-medium mb-4">
              December Only • Limited Slots
            </div>
            <h1 className="text-5xl md:text-6xl font-display mb-6 leading-tight">
              Jolly AF — The Santa Your Mom Warned You About.
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              Comedy Santa for bars, house parties, and office shenanigans. December bookings only.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('booking')}
                className="bg-gold text-deep-red px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors"
              >
                Book Your Date
              </button>
              <button
                onClick={() => scrollToSection('packages')}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-deep-red transition-colors"
              >
                See Packages
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">Adults Only</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Clean(ish) Comedy</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Metro Detroit</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="w-80 h-80 bg-white/10 rounded-lg flex items-center justify-center text-8xl">
              🎅
            </div>
          </motion.div>
        </div>
      </Section>

      {/* About Section */}
      <Section id="about">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-display text-deep-red mb-6">About Jolly AF</h2>
            <p className="text-lg mb-6">
              I'm Jolly AF — the loud laugh, big red suit, and zero boring bits. Expect crowd banter, a few roasts, and pics you'll still laugh at in July. Clean(ish) or spicy — your call.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-gold mr-3">🎤</span>
                <span>30–45 min sets</span>
              </div>
              <div className="flex items-center">
                <span className="text-gold mr-3">📸</span>
                <span>Photo ops included</span>
              </div>
              <div className="flex items-center">
                <span className="text-gold mr-3">🔥</span>
                <span>Custom roasts (optional)</span>
              </div>
              <div className="flex items-center">
                <span className="text-gold mr-3">🎭</span>
                <span>PG-13 to R-rated on request</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-display text-deep-red mb-4">What to Expect</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-gold mr-2">✓</span>
                <span>Big personality, bigger laughs</span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-2">✓</span>
                <span>Crowd interaction & banter</span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-2">✓</span>
                <span>Memorable photo moments</span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-2">✓</span>
                <span>Customized content for your crowd</span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-2">✓</span>
                <span>Professional setup & cleanup</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Packages Section */}
      <Section id="packages" className="bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display text-deep-red mb-4">Packages</h2>
          <p className="text-lg text-gray-600">Pick your perfect party package</p>
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
      <Section id="gallery">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display text-deep-red mb-4">Gallery</h2>
          <p className="text-lg text-gray-600">Clips dropping soon.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
              <span className="text-4xl">📸</span>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section id="faq" className="bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display text-deep-red mb-4">FAQ</h2>
          <p className="text-lg text-gray-600">Got questions? We've got answers.</p>
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
      <Section id="booking">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display text-deep-red mb-4">Lock Your Date</h2>
          <p className="text-lg text-gray-600">
            Pick a package & send your preferred date/time. I'll confirm fast.
          </p>
        </div>
        
        {formSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center bg-green-50 border border-green-200 rounded-lg p-8"
          >
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h3 className="text-2xl font-display text-green-800 mb-2">Thanks!</h3>
            <p className="text-green-700">I'll confirm within 24 hours.</p>
          </motion.div>
        ) : (
          <div className="max-w-2xl mx-auto">
            {/* TODO: Replace form with GHL calendar embed */}
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-red focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-red focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-red focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="package" className="block text-sm font-medium text-gray-700 mb-2">
                    Package *
                  </label>
                  <select
                    id="package"
                    name="package"
                    required
                    value={formData.package}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-red focus:border-transparent"
                  >
                    <option value="">Select a package</option>
                    <option value="Bar Set - $200">Bar Set - $200</option>
                    <option value="House Party - $250">House Party - $250</option>
                    <option value="Office Party - $300+">Office Party - $300+</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-2">
                  Venue Address *
                </label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  required
                  value={formData.venue}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-red focus:border-transparent"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-red focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time *
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-red focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any special requests, crowd size, or other details..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-red focus:border-transparent"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-deep-red text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-red-800 transition-colors"
              >
                Lock It In
              </button>
            </form>
          </div>
        )}
      </Section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-display text-gold mb-4">JOLLY AF</div>
              <p className="text-gray-400">
                The Santa your mom warned you about.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg mb-4">Contact</h3>
              <p className="text-gray-400 mb-2">
                <a href="mailto:bookings@bookjollyaf.com" className="hover:text-gold transition-colors">
                  bookings@bookjollyaf.com
                </a>
              </p>
              <p className="text-gray-400">
                Metro Detroit Area
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg mb-4">Follow</h3>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gold transition-colors cursor-pointer">
                  📘
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gold transition-colors cursor-pointer">
                  📷
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gold transition-colors cursor-pointer">
                  🐦
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>BookJollyAF.com • © {new Date().getFullYear()} Jolly AF</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
