'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

export function CharityInfo() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 h-full bg-zinc-800/50 border-zinc-700">
          <h3 className="text-2xl font-semibold mb-4 text-white">Our Mission</h3>
          <p className="text-zinc-400 mb-4">
            We are dedicated to creating a sustainable future through environmental 
            conservation and community empowerment. Our mission is to plant trees, 
            provide clean water, and ensure food security for communities in need.
          </p>
          <ul className="space-y-2 text-zinc-400">
            <li className="flex items-center">
              <span className="mr-2">🌱</span>
              Planted over 1 million trees globally
            </li>
            <li className="flex items-center">
              <span className="mr-2">💧</span>
              Provided clean water to 500,000+ people
            </li>
            <li className="flex items-center">
              <span className="mr-2">🍱</span>
              Delivered 2 million meals to communities
            </li>
          </ul>
        </Card>
      </motion.div>

      <motion.div
        initial={{ x: 20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 h-full bg-zinc-800/50 border-zinc-700">
          <h3 className="text-2xl font-semibold mb-4 text-white">Why Trust Us?</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="mt-1">✨</div>
              <div>
                <h4 className="font-medium text-white">Transparency</h4>
                <p className="text-zinc-400">
                  100% of your donation goes directly to our projects, with detailed 
                  impact reporting.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-1">🏆</div>
              <div>
                <h4 className="font-medium text-white">Award-Winning Impact</h4>
                <p className="text-zinc-400">
                  Recognized by leading environmental organizations for our effective 
                  approach.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-1">🤝</div>
              <div>
                <h4 className="font-medium text-white">Community-Driven</h4>
                <p className="text-zinc-400">
                  We work directly with local communities to ensure sustainable, 
                  long-term impact.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
} 