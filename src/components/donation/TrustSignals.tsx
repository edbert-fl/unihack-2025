'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

const TESTIMONIALS = [
  {
    quote: "The transparency and impact of this organization is remarkable. I can see exactly how my donations are making a difference.",
    author: "Sarah M.",
    role: "Monthly Donor",
    avatar: "👩"
  },
  {
    quote: "Their commitment to environmental conservation and community support is truly inspiring. A trustworthy organization.",
    author: "James R.",
    role: "Corporate Partner",
    avatar: "👨"
  },
  {
    quote: "I've seen firsthand how they transform communities through their water projects. The impact is real and lasting.",
    author: "Dr. Emily Chen",
    role: "Environmental Scientist",
    avatar: "👩‍🔬"
  }
]

const ACCREDITATIONS = [
  {
    name: "Environmental Excellence Award",
    year: "2024",
    icon: "🏆"
  },
  {
    name: "Charity Navigator",
    rating: "4-Star Rating",
    icon: "⭐"
  },
  {
    name: "GuideStar",
    rating: "Platinum Transparency",
    icon: "✨"
  }
]

export function TrustSignals() {
  return (
    <div className="space-y-12">
      {/* Testimonials */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">What People Say</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Hear from our donors and partners about their experience working with us
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="p-6 bg-zinc-800/50 border-zinc-700 h-full">
                <div className="space-y-4">
                  <span className="text-4xl">{testimonial.avatar}</span>
                  <p className="text-zinc-300 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="text-white font-medium">{testimonial.author}</p>
                    <p className="text-zinc-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Accreditations */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Our Accreditations</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Recognized for our transparency, impact, and commitment to excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACCREDITATIONS.map((accreditation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-center"
            >
              <Card className="p-6 bg-zinc-800/50 border-zinc-700 text-center w-full">
                <span className="text-4xl mb-3 block">{accreditation.icon}</span>
                <h3 className="text-white font-medium mb-1">{accreditation.name}</h3>
                <p className="text-emerald-500 text-sm">
                  {accreditation.rating || accreditation.year}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 